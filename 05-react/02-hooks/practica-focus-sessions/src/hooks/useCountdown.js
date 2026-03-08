import { useEffect, useRef, useState } from 'react'

export function useCountdown(initialSeconds, onComplete) {
  const [remaining, setRemaining] = useState(initialSeconds)
  const [isRunning, setIsRunning] = useState(false)
  const onCompleteRef = useRef(onComplete)

  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  useEffect(() => {
    setRemaining(initialSeconds)
    setIsRunning(false)
  }, [initialSeconds])

  useEffect(() => {
    if (!isRunning) return

    const timerId = window.setInterval(() => {
      setRemaining((current) => {
        if (current <= 1) {
          window.clearInterval(timerId)
          setIsRunning(false)
          onCompleteRef.current?.()
          return 0
        }

        return current - 1
      })
    }, 1000)

    return () => window.clearInterval(timerId)
  }, [isRunning])

  return {
    remaining,
    isRunning,
    start: () => setIsRunning(true),
    pause: () => setIsRunning(false),
    reset: () => {
      setRemaining(initialSeconds)
      setIsRunning(false)
    },
  }
}
