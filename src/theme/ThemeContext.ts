import { createContext, useContext } from 'react';
import { defaultTheme } from './defaultTheme';
import { Theme, ThemeContextValue } from './types';

/**
 * Theme context for providing theme to components.
 * Default value is undefined to allow detection of missing provider.
 */
export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

/**
 * Hook to access the theme context.
 * Throws an error if used outside of a ThemeProvider.
 *
 * @throws Error if no ThemeProvider is found in the component tree
 */
export function useTheme(): Theme {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context.theme;
}

/**
 * Safe hook to access theme with fallback to default.
 * Never throws - returns default theme if no provider is found.
 *
 * This is the recommended hook for component libraries to ensure
 * components work even without an explicit ThemeProvider.
 */
export function useThemeSafe(): Theme {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    return defaultTheme;
  }
  return context.theme;
}
