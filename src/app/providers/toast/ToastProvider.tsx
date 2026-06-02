import type { PropsWithChildren } from "react"
import { ToastContainer } from "react-toastify"

export function ToastProvider({ children }: PropsWithChildren) {
  return (
    <>
      {children}
      <ToastContainer position="top-right" autoClose={3500} />
    </>
  )
}
