import s from "./SortSelect.module.css";
import type { ChangeEvent } from "react";
import type {SortBy} from "@/entities/movie/model/types.ts";


const sortOptions = [
  { value: "popularity.asc", label: "Popularity ↑" },
  { value: "popularity.desc", label: "Popularity ↓" },
  { value: "vote_average.asc", label: "Rating ↑" },
  { value: "vote_average.desc", label: "Rating ↓" },
  { value: "primary_release_date.asc", label: "Release Date ↑" },
  { value: "primary_release_date.desc", label: "Release Date ↓" },
  { value: "original_title.asc", label: "Title A-Z" },
  { value: "original_title.desc", label: "Title Z-A" },
];

export const SortSelect = ({ value, onChange }: { value: SortBy; onChange: (value: SortBy) => void }) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value as SortBy);
  };

  return (
    <div className={s["sort-container"]}>
      <span className={s["sort-label"]}>Sort by</span>
      <select className={s.select} value={value} onChange={handleChange}>
        {sortOptions.map((option) => (
          <option className={s.options} key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};