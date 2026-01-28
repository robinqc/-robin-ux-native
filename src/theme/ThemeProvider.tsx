import React, { useMemo } from 'react';
import { ThemeContext } from './ThemeContext';
import { defaultTheme } from './defaultTheme';
import { Theme, ThemeContextValue } from './types';

export interface ThemeProviderProps {
  /**
   * The theme to provide to child components.
   * Falls back to default neutral theme if not provided.
   */
  theme?: Theme;
  children: React.ReactNode;
}

/**
 * Theme provider component that makes theme available to all child components.
 *
 * @example
 * ```tsx
 * import { ThemeProvider } from '@robin-ux/native';
 *
 * const myTheme = {
 *   colors: { ... },
 *   isDark: false,
 * };
 *
 * function App() {
 *   return (
 *     <ThemeProvider theme={myTheme}>
 *       <MyApp />
 *     </ThemeProvider>
 *   );
 * }
 * ```
 */
export function ThemeProvider({ theme = defaultTheme, children }: ThemeProviderProps) {
  const value: ThemeContextValue = useMemo(
    () => ({
      theme,
    }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
