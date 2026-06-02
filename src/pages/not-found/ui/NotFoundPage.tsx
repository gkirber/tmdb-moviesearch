import s from "./NotFoundPage.module.css"
import not from "@/assets/images/notFound.jpg"
import {NavLink} from "react-router-dom"
import {routes} from "@/app/providers/router/routes.ts"

export function NotFoundPage() {
  return (
    <div className={s.container}>
      <img className={s.image} src={not} alt={"not found image"} />
      <p className={s.text}>We can’t find what you’re looking for...</p>
      <NavLink to={routes.root()} className={s.link}>
        Go to home
      </NavLink>
    </div>
  )
}