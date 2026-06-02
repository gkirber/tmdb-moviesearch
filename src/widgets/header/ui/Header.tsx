import styles from './Header.module.css'
import {
	selectThemeMode,
	toggleThemeMode,
} from '@/app/providers/theme/themeSlice'
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector.ts'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch.ts'
import { NavMenu } from '@/widgets/header/ui/NavMenu'

export function Header() {
	const themeMode = useAppSelector(selectThemeMode)
	const dispatch = useAppDispatch()

	return (
		<header className={styles.header}>
			<div className={styles.container}>
				<NavMenu />

				<div className={styles.actions}>
					<button
						type='button'
						className={styles.btnTheme}
						onClick={() => dispatch(toggleThemeMode())}
						aria-label='Toggle theme'
						title='Toggle theme'
					>
						{themeMode === 'light' ? '🌙' : '☀️'}
					</button>
				</div>
			</div>
		</header>
	)
}
