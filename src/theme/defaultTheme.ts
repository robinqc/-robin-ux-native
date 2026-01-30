import { Theme, ThemeColors } from "./types";

/**
 * Default light theme colors - a neutral, accessible color palette.
 */
export const defaultLightColors: ThemeColors = {
    // Backgrounds
    background: "#ffffff",
    backgroundSecondary: "#f5f5f5",

    // Foreground (text)
    foreground: "#1a1a1a",
    foregroundSecondary: "#666666",
    foregroundTertiary: "#999999",

    // Primary brand colors
    primary: "#3b82f6",
    primaryLight: "#60a5fa",
    primaryDark: "#2563eb",

    // Accent colors
    accent: "#8b5cf6",
    accentLight: "#a78bfa",
    icon: "#1a1a1a",

    // Semantic/status colors
    destructive: "#ef4444",
    destructiveForeground: "#ffffff",
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
    info: "#3b82f6",

    // UI element colors
    border: "#e5e5e5",
    muted: "#f5f5f5",
    mutedForeground: "#666666",
    card: "#ffffff",
};

/**
 * Default dark theme colors - a neutral, accessible dark color palette.
 */
export const defaultDarkColors: ThemeColors = {
    // Backgrounds
    background: "#0a0a0a",
    backgroundSecondary: "#171717",

    // Foreground (text)
    foreground: "#fafafa",
    foregroundSecondary: "#a3a3a3",
    foregroundTertiary: "#737373",

    // Primary brand colors
    primary: "#60a5fa",
    primaryLight: "#93c5fd",
    primaryDark: "#3b82f6",

    // Accent colors
    accent: "#a78bfa",
    accentLight: "#c4b5fd",
    icon: "#fafafa",

    // Semantic/status colors
    destructive: "#f87171",
    destructiveForeground: "#ffffff",
    success: "#34d399",
    warning: "#fbbf24",
    error: "#f87171",
    info: "#60a5fa",

    // UI element colors
    border: "#262626",
    muted: "#262626",
    mutedForeground: "#a3a3a3",
    card: "#171717",
};

/**
 * Default light theme - used as fallback when no ThemeProvider is present.
 */
export const defaultTheme: Theme = {
    colors: defaultLightColors,
    isDark: false,
};

/**
 * Default dark theme variant.
 */
export const defaultDarkTheme: Theme = {
    colors: defaultDarkColors,
    isDark: true,
};
