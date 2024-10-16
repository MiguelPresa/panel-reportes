import { useDispatch, useSelector } from "react-redux";
import { Theme, ThemeProviderProps, ThemeProviderState } from "../types";
import { ThemeContext } from "./ThemeContext";
import { RootState } from "@/app/store";
import { setTheme } from "@/app/slices/theme/themeSlice";
import { useEffect } from "react";

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
	const { theme } = useSelector((state: RootState) => state.theme)
	const dispatch = useDispatch()
	useEffect(() => {
		const root = window.document.documentElement
		root.classList.remove("light", "dark")
		if (theme === "system") {
			const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
			root.classList.add(systemTheme)
			return
		}
		root.classList.add(theme)
	}, [theme]);

	const value: ThemeProviderState = {
		theme,
		setTheme: (newTheme: Theme) => {
			dispatch(setTheme(newTheme))
		}
	}

	return (
		<ThemeContext.Provider value={value} >
			{children}
		</ThemeContext.Provider>
	)
};
