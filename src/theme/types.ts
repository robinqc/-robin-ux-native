/**
 * Theme color definitions for @robin-ux/native components.
 * These define all the semantic colors used by components.
 */
export interface ThemeColors {
  // Backgrounds
  background: string;
  backgroundSecondary: string;

  // Foreground (text)
  foreground: string;
  foregroundSecondary: string;
  foregroundTertiary: string;

  // Primary brand colors
  primary: string;
  primaryLight: string;
  primaryDark: string;

  // Accent colors
  accent: string;
  accentLight: string;

  // Semantic/status colors
  destructive: string;
  destructiveForeground: string;
  success: string;
  warning: string;
  error: string;
  info: string;

  // UI element colors
  border: string;
  muted: string;
  mutedForeground: string;
  card: string;
}

/**
 * Complete theme object containing colors and mode information.
 */
export interface Theme {
  colors: ThemeColors;
  isDark: boolean;
}

/**
 * Theme context value type.
 */
export interface ThemeContextValue {
  theme: Theme;
}
