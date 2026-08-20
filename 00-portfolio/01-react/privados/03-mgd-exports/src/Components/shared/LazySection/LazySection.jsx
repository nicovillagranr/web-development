import { Suspense } from "react"
import { useInView } from "react-intersection-observer"

export default function LazySection({ children, id }) {
    const { ref, inView } = useInView({
        triggerOnce: true,
        rootMargin: "300px",
    });

    return (
        <div ref={ref} id={id} style={!inView ? { minHeight: '100vh' } : undefined}>
            {inView && (
                <Suspense fallback={null}>
                    {children}
                </Suspense>
            )}
        </div>
    )
}