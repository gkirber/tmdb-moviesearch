import { useState, type FormEvent } from "react";
import styles from "./SearchForm.module.css";

type Props = {
  initialValue: string;
  disabled?: boolean;
  onSearch: (value: string) => void;
  onClear: () => void;
};

export function SearchForm({ initialValue, disabled, onSearch, onClear }: Props) {
  const [value, setValue] = useState(initialValue);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(value);
  };

  const isEmpty = value.trim().length === 0;

  return (
    <form className={styles.form} onSubmit={submit}>
      <input
        className={styles.input}
        type="search"
        placeholder="Search movies..."
        value={value}
        disabled={disabled}
        onChange={(e) => {
          const v = e.target.value;
          setValue(v);

          if (v === "") onClear();
        }}
      />

      <button className={styles.button} type="submit" disabled={disabled || isEmpty}>
        Search
      </button>
    </form>
  );
}