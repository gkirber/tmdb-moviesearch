import { Outlet } from "react-router-dom"
import styles from "./RootLayout.module.css"
import { Header } from "../../../widgets/header/ui/Header"
import { Footer } from "../../../widgets/footer/ui/Footer"

export function RootLayout() {
  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
