import { useRef, useLayoutEffect, useCallback } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";
import styles from "./Preloader.module.css";

const LOGO_SRC = "/logo.png";

gsap.registerPlugin(SplitText, CustomEase);

const TEXT_COLOR = "#ecf2ff";
const TRACK_COLOR = "#1a2444";

export default function Preloader({ onComplete }) {
    const preloaderRef = useRef(null);
    const btnRef = useRef(null);
    const trackRef = useRef(null);
    const progressRef = useRef(null);
    const svgStrokesRef = useRef(null);
    const logoRef = useRef(null);
    const labelRef = useRef(null);
    const outroLabelRef = useRef(null);
    const readyRef = useRef(false);
    const svgPathLengthRef = useRef(0);
    const exitTlRef = useRef(null);

    const handleClick = useCallback(() => {
        if (!readyRef.current) return;
        readyRef.current = false;

        const svgPathLength = svgPathLengthRef.current;
        const exitTl = gsap.timeline({
            onComplete: () => {
                if (preloaderRef.current) {
                    preloaderRef.current.style.display = "none";
                }
                onComplete?.();
            },
        });
        exitTlRef.current = exitTl;

        exitTl
            .to(labelRef.current.querySelectorAll(".line"), {
                y: "-100%",
                opacity: 0,
                duration: 0.5,
                ease: "power3.in",
            })
            .to(outroLabelRef.current.querySelectorAll(".line"), {
                y: "0%",
                opacity: 1,
                duration: 0.5,
                ease: "power3.out",
            })
            .to(
                preloaderRef.current.querySelectorAll(`.${styles.row} p .line`),
                {
                    y: "-100%",
                    opacity: 0,
                    duration: 1.5,
                    ease: "power3.in",
                    stagger: 0.05,
                },
                "<"
            )
            .to(
                [trackRef.current, progressRef.current],
                {
                    strokeDashoffset: -svgPathLength,
                    duration: 1.25,
                    ease: "hop",
                },
                "<"
            )
            .to(
                btnRef.current,
                {
                    scale: 1.5,
                    duration: 1.25,
                    ease: "hop",
                },
                "<"
            )
            .to(
                preloaderRef.current,
                {
                    clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
                    duration: 1.25,
                    ease: "hop",
                },
                "-=0.75"
            );
    }, [onComplete]);

    useLayoutEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            onComplete?.();
            return;
        }

        if (!CustomEase.get("hop")) {
            CustomEase.create("hop", "0.9, 0, 0.1, 1");
        }
        if (!CustomEase.get("glide")) {
            CustomEase.create("glide", "0.8, 0, 0.2, 1");
        }

        const el = preloaderRef.current;
        const track = trackRef.current;
        const progress = progressRef.current;
        const svgPathLength = track.getTotalLength();
        svgPathLengthRef.current = svgPathLength;

        const paragraphs = el.querySelectorAll("p");
        const split = new SplitText(paragraphs, {
            type: "lines",
            linesClass: "line",
            mask: "lines",
        });

        gsap.set([track, progress], {
            strokeDasharray: svgPathLength,
            strokeDashoffset: svgPathLength,
        });

        el.classList.remove(styles.initializing);

        const introTl = gsap.timeline({ delay: 1 });

        introTl
            .to(track, {
                strokeDashoffset: 0,
                duration: 2,
                ease: "hop",
            })
            .to(
                svgStrokesRef.current.querySelector("svg"),
                {
                    rotation: 270,
                    duration: 2,
                    ease: "hop",
                },
                "<"
            );

        const progressStops = [0.2, 0.5, 0.8, 1].map((base, i) => {
            if (i === 3) return 1;
            return base + (Math.random() - 0.5) * 0.1;
        });

        progressStops.forEach((stop, i) => {
            introTl.to(progress, {
                strokeDashoffset: svgPathLength - svgPathLength * stop,
                duration: 0.75,
                ease: "glide",
                delay: i === 0 ? 0.3 : 0.3 + Math.random() * 0.2,
            });
        });

        introTl.to(
            logoRef.current,
            {
                opacity: 0,
                duration: 0.35,
                ease: "power3.out",
            },
            "-=0.25"
        );

        introTl
            .to(
                el.querySelectorAll(`.${styles.row} p .line`),
                {
                    y: "0%",
                    opacity: 1,
                    duration: 0.75,
                    ease: "power3.out",
                    stagger: 0.1,
                },
                "-=0.25"
            )
            .to(
                btnRef.current,
                {
                    scale: 0.9,
                    duration: 1.5,
                    ease: "hop",
                },
                "-=0.5"
            )
            .to(
                labelRef.current.querySelectorAll(".line"),
                {
                    y: "0%",
                    opacity: 1,
                    duration: 0.75,
                    ease: "power3.out",
                    onComplete: () => {
                        readyRef.current = true;
                        if (btnRef.current) {
                            btnRef.current.style.pointerEvents = "auto";
                            btnRef.current.style.cursor = "pointer";
                        }
                    },
                },
                "-=0.75"
            );

        return () => {
            introTl.kill();
            exitTlRef.current?.kill();
            split.revert();
        };
    }, [onComplete]);

    return (
        <div
            ref={preloaderRef}
            className={`${styles.preloader} ${styles.initializing}`}
        >
            <div className={styles.row}>
                <p>Compiling</p>
            </div>

            <div className={styles.row}>
                <p>v1.0.0</p>
                <p>React</p>
                <p>./portfolio</p>
                <p>build:ok</p>
            </div>

            <button
                ref={btnRef}
                type="button"
                className={styles.btnContainer}
                onClick={handleClick}
                aria-label="Run portfolio"
            >
                <img
                    ref={logoRef}
                    className={styles.logo}
                    src={LOGO_SRC}
                    alt=""
                    aria-hidden="true"
                />
                <p ref={labelRef} className={styles.label}>
                    Run
                </p>
                <p ref={outroLabelRef} className={styles.outroLabel}>
                    Ready
                </p>

                <div ref={svgStrokesRef} className={styles.svgStrokes}>
                    <svg width="320" height="320" viewBox="0 0 320 320">
                        <circle
                            cx="160"
                            cy="160"
                            r="155"
                            fill="none"
                            stroke={TRACK_COLOR}
                            strokeWidth="2"
                            ref={trackRef}
                        />
                        <circle
                            cx="160"
                            cy="160"
                            r="155"
                            fill="none"
                            stroke={TEXT_COLOR}
                            strokeWidth="2"
                            ref={progressRef}
                        />
                    </svg>
                </div>
            </button>
        </div>
    );
}
