export type Theme = "dark" | "light" | "system"

export type ThemeProviderProps = {
	children: React.ReactNode
	defaultTheme?: Theme
	storageKey?: string
}

export type ThemeProviderState = {
	theme: Theme
	setTheme: (newTheme: Theme) => void
}