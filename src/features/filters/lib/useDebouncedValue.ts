import { useCallback, useEffect, useRef } from "react"

export function useDebouncedValue(callback: (min: number, max: number) => void, delay?: number) {
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current)
      }
    }
  }, [])

  return useCallback(
    (min: number, max: number) => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current)
      }

      timerRef.current = window.setTimeout(() => {
        callback(min, max)
      }, delay || 200)
    },
    [callback, delay]
  )
}