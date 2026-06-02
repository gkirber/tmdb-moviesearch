import s from "./RatingRange.module.css"
import type { ChangeEvent } from "react"

type Props = {
  minRating: number;
  maxRating: number;
  onRatingChange: (minRating: number, maxRating: number) => void;
};

export const RatingRange = ({ minRating, maxRating, onRatingChange }: Props) => {
  const handleMinChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value)
    const clampedValue = Math.min(value, maxRating - 0.1)
    onRatingChange(clampedValue, maxRating)
  }

  const handleMaxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value)
    const clampedValue = Math.max(value, minRating + 0.1)
    onRatingChange(minRating, clampedValue)
  }

  const minPercent = (minRating / 10) * 100
  const maxPercent = (maxRating / 10) * 100

  return (
    <div className={s.container}>
      <div className={s["rating-header"]}>
        <span>Rating</span>
        <span>
          {minRating.toFixed(1)} - {maxRating.toFixed(1)}
        </span>
      </div>
      <div className={s["slider-container"]} data-no-global-styles="true">
        <div className={s.track}></div>
        <div
          className={s.progress}
          style={{
            left: `${minPercent}%`,
            width: `${maxPercent - minPercent}%`,
          }}
        ></div>
        <input type="range" min="0" max="10" step="0.1" value={minRating} onChange={handleMinChange} className={s.slider} />
        <input type="range" min="0" max="10" step="0.1" value={maxRating} onChange={handleMaxChange} className={s.slider} />
      </div>
    </div>
  )
}
