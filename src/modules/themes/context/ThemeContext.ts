import { createContext } from "react";
import { ThemeProviderState } from "../types";

export const ThemeContext = createContext<ThemeProviderState | undefined>(undefined)

