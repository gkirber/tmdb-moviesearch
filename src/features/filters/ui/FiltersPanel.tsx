import s from './FiltersPanel.module.css'
import { useCallback, useState } from 'react'
import { selectFilters } from '@/features/filters/model/selectors'
import {
	resetFilters,
	updateFilters,
} from '@/features/filters/model/filtersSlice'
import type { DiscoverParams, SortBy } from '@/entities/movie/model/types'
import { useDebouncedValue } from '@/features/filters/lib/useDebouncedValue'
import { SortSelect } from '@/features/filters/ui/SortSelect'
import { RatingRange } from '@/features/filters/ui/RatingRange'
import { GenreMultiSelect } from '@/features/filters/ui/GenreMultiSelect'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch.ts'
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector.ts'

export function FiltersPanel() {
	const dispatch = useAppDispatch()
	const filters = useAppSelector(selectFilters)

	const filtersMin = filters['vote_average.gte'] ?? 0
	const filtersMax = filters['vote_average.lte'] ?? 10
	const [rating, setRating] = useState({ min: filtersMin, max: filtersMax })

	const update = useCallback(
		(patch: Partial<DiscoverParams>) => dispatch(updateFilters(patch)),
		[dispatch],
	)

	const reset = useCallback(() => dispatch(resetFilters()), [dispatch])

	const debouncedUpdateRating = useDebouncedValue(
		(min: number, max: number) => {
			update({
				'vote_average.gte': min,
				'vote_average.lte': max,
				page: 1,
			})
		},
		200,
	)

	const handleSortChange = (sort_by: SortBy) => update({ sort_by, page: 1 })
	const handleRatingChange = (min: number, max: number) => {
		setRating({ min, max })
		debouncedUpdateRating(min, max)
	}

	return (
		<aside className={s.panel}>
			<h3 className={s.title}>Filter / Sort</h3>

			<SortSelect
				value={(filters.sort_by ?? 'popularity.desc') as SortBy}
				onChange={handleSortChange}
			/>

			<RatingRange
				minRating={rating.min}
				maxRating={rating.max}
				onRatingChange={handleRatingChange}
			/>

			<section className={s.tags}>
				<GenreMultiSelect />
			</section>

			<button
				className={s.reset}
				onClick={() => {
					reset()
					setRating({ min: 0, max: 10 })
				}}
			>
				Reset filters
			</button>
		</aside>
	)
}
