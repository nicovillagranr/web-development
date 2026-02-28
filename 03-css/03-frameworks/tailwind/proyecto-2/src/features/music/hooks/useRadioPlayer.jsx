import { useEffect, useMemo, useRef, useState } from "react";
import {
    DEFAULT_RADIO_STATION_ID,
    RADIO_STATIONS,
} from "../constants/radioStations.js";

const PLAYER_STORAGE_KEY = "smart_cooler_radio_player_v1";
const DEFAULT_VOLUME = 0.65;

function clampVolume(value) {
    const parsed = Number(value);
    if (Number.isNaN(parsed)) return DEFAULT_VOLUME;
    return Math.max(0, Math.min(1, parsed));
}

function isStationIdValid(stationId) {
    return RADIO_STATIONS.some((station) => station.id === stationId);
}

function getStationById(stationId) {
    return (
        RADIO_STATIONS.find((station) => station.id === stationId) ||
        RADIO_STATIONS[0]
    );
}

function readPlayerState() {
    if (typeof window === "undefined") {
        return {
            stationId: DEFAULT_RADIO_STATION_ID,
            volume: DEFAULT_VOLUME,
            isMuted: false,
        };
    }

    try {
        const raw = localStorage.getItem(PLAYER_STORAGE_KEY);
        if (!raw) {
            return {
                stationId: DEFAULT_RADIO_STATION_ID,
                volume: DEFAULT_VOLUME,
                isMuted: false,
            };
        }

        const parsed = JSON.parse(raw);
        return {
            stationId: isStationIdValid(parsed.stationId)
                ? parsed.stationId
                : DEFAULT_RADIO_STATION_ID,
            volume: clampVolume(parsed.volume),
            isMuted: Boolean(parsed.isMuted),
        };
    } catch {
        return {
            stationId: DEFAULT_RADIO_STATION_ID,
            volume: DEFAULT_VOLUME,
            isMuted: false,
        };
    }
}

export function useRadioPlayer() {
    const initialState = useMemo(() => readPlayerState(), []);

    const [stationId, setStationId] = useState(initialState.stationId);
    const [streamIndex, setStreamIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [status, setStatus] = useState("idle");
    const [volume, setVolumeState] = useState(initialState.volume);
    const [isMuted, setIsMuted] = useState(initialState.isMuted);
    const [error, setError] = useState("");
    const [shouldPlay, setShouldPlay] = useState(false);
    const [reloadToken, setReloadToken] = useState(0);

    const audioRef = useRef(null);
    const shouldPlayRef = useRef(shouldPlay);
    const stationIdRef = useRef(stationId);
    const streamIndexRef = useRef(streamIndex);

    const activeStation = useMemo(
        () => getStationById(stationId),
        [stationId],
    );
    const sourceCount = activeStation.streams.length;
    const activeStream =
        activeStation.streams[streamIndex] || activeStation.streams[0];

    useEffect(() => {
        shouldPlayRef.current = shouldPlay;
    }, [shouldPlay]);

    useEffect(() => {
        stationIdRef.current = stationId;
    }, [stationId]);

    useEffect(() => {
        streamIndexRef.current = streamIndex;
    }, [streamIndex]);

    useEffect(() => {
        if (typeof Audio === "undefined") return;

        const audio = new Audio();
        audio.preload = "none";
        audioRef.current = audio;

        const handlePlay = () => {
            setIsPlaying(true);
            setStatus("playing");
            setError("");
        };

        const handlePause = () => {
            setIsPlaying(false);
            if (!shouldPlayRef.current) setStatus("paused");
        };

        const handleLoading = () => {
            if (shouldPlayRef.current) {
                setStatus("loading");
                setError("");
            }
        };

        const handleError = () => {
            const station = getStationById(stationIdRef.current);
            const nextIndex = streamIndexRef.current + 1;

            if (nextIndex < station.streams.length) {
                setError("Signal unstable. Switching source...");
                setStreamIndex(nextIndex);
                return;
            }

            setShouldPlay(false);
            setStatus("error");
            setIsPlaying(false);
            setError("Could not load this station right now.");
        };

        const handleEnded = () => {
            if (!shouldPlayRef.current) return;

            const station = getStationById(stationIdRef.current);
            if (!station.streams.length) return;

            if (station.streams.length === 1) {
                // Reinicia la unica fuente disponible si termina.
                setReloadToken((prev) => prev + 1);
                return;
            }

            setStatus("loading");
            setStreamIndex((prev) => (prev + 1) % station.streams.length);
        };

        audio.addEventListener("play", handlePlay);
        audio.addEventListener("pause", handlePause);
        audio.addEventListener("loadstart", handleLoading);
        audio.addEventListener("waiting", handleLoading);
        audio.addEventListener("error", handleError);
        audio.addEventListener("ended", handleEnded);

        return () => {
            audio.pause();
            audio.removeAttribute("src");
            audio.load();
            audio.removeEventListener("play", handlePlay);
            audio.removeEventListener("pause", handlePause);
            audio.removeEventListener("loadstart", handleLoading);
            audio.removeEventListener("waiting", handleLoading);
            audio.removeEventListener("error", handleError);
            audio.removeEventListener("ended", handleEnded);
            audioRef.current = null;
        };
    }, []);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio || !activeStream) return;

        audio.src = activeStream;
        audio.load();

        if (shouldPlayRef.current) {
            audio.play().catch(() => {
                setShouldPlay(false);
                setStatus("paused");
                setError("Playback blocked. Press play again.");
            });
        }
    }, [activeStream, reloadToken]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.volume = clampVolume(volume);
        audio.muted = isMuted;
    }, [volume, isMuted]);

    useEffect(() => {
        if (typeof window === "undefined") return;

        localStorage.setItem(
            PLAYER_STORAGE_KEY,
            JSON.stringify({ stationId, volume, isMuted }),
        );
    }, [stationId, volume, isMuted]);

    const togglePlay = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (shouldPlayRef.current) {
            setShouldPlay(false);
            audio.pause();
            return;
        }

        setShouldPlay(true);
        setStatus("loading");
        audio.play().catch(() => {
            setShouldPlay(false);
            setStatus("paused");
            setError("Playback blocked. Press play again.");
        });
    };

    const selectStation = (nextStationId) => {
        if (!isStationIdValid(nextStationId)) return;
        setStationId(nextStationId);
        setStreamIndex(0);
        setError("");
    };

    const nextSource = () => {
        if (!sourceCount) return;
        setError("");
        setStreamIndex((prev) => (prev + 1) % sourceCount);
    };

    const prevSource = () => {
        if (!sourceCount) return;
        setError("");
        setStreamIndex((prev) => (prev - 1 + sourceCount) % sourceCount);
    };

    const nextStation = () => {
        const currentIndex = RADIO_STATIONS.findIndex(
            (station) => station.id === stationId,
        );
        const safeIndex = currentIndex >= 0 ? currentIndex : 0;
        const nextIndex = (safeIndex + 1) % RADIO_STATIONS.length;
        selectStation(RADIO_STATIONS[nextIndex].id);
    };

    const prevStation = () => {
        const currentIndex = RADIO_STATIONS.findIndex(
            (station) => station.id === stationId,
        );
        const safeIndex = currentIndex >= 0 ? currentIndex : 0;
        const prevIndex =
            (safeIndex - 1 + RADIO_STATIONS.length) % RADIO_STATIONS.length;
        selectStation(RADIO_STATIONS[prevIndex].id);
    };

    const setVolume = (value) => {
        const clamped = clampVolume(value);
        setVolumeState(clamped);
        if (clamped > 0 && isMuted) setIsMuted(false);
    };

    const toggleMute = () => {
        setIsMuted((prev) => !prev);
    };

    const retryStation = () => {
        setError("");
        setStreamIndex(0);
        setShouldPlay(true);
        setReloadToken((prev) => prev + 1);
    };

    return {
        stations: RADIO_STATIONS,
        activeStation,
        sourceCount,
        sourcePosition: Math.min(streamIndex + 1, sourceCount || 1),
        isPlaying,
        status,
        volume,
        isMuted,
        error,
        selectStation,
        nextSource,
        prevSource,
        nextStation,
        prevStation,
        togglePlay,
        setVolume,
        toggleMute,
        retryStation,
    };
}
