import styles from "./RatingBadge.module.css"

type Props = {
  value: number;
};

export function RatingBadge({ value }: Props) {
  const rounded = Math.round(value * 10) / 10

  let colorClass = styles.low
  if (value >= 7) colorClass = styles.high
  else if (value >= 5) colorClass = styles.medium

  return (
    <span className={`${styles.badge} ${colorClass}`}>
      {rounded}
    </span>
  )
}
