import type { PropsWithChildren } from "react"
import { useEffect } from "react"
import { selectThemeMode } from "./themeSlice"
import {useAppSelector} from "@/shared/lib/hooks/useAppSelector.ts"

export function ThemeProvider({ children }: PropsWithChildren) {
  const theme = useAppSelector(selectThemeMode)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  return children
}
