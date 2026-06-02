import {type FormEvent, useState} from "react"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import styles from "./SearchForm.module.css"

export function SearchForm() {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()

  const initialQuery = searchParams.get("query") ?? ""
  const [value, setValue] = useState(initialQuery)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const trimmed = value.trim()
    if (!trimmed) return

    navigate(`/search?query=${encodeURIComponent(trimmed)}`)
  }

  const handleChange = (nextValue: string) => {
    setValue(nextValue)

    if (nextValue === "" && location.pathname.startsWith("/search")) {
      navigate("/search")
    }
  }


  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="search"
        placeholder="Search for a movie..."
        value={value}
        onChange={(e) => handleChange(e.target.value)}
      />

      <button type="submit" className={styles.submit} disabled={!value.trim()}>
        Search
      </button>
    </form>
  )
}