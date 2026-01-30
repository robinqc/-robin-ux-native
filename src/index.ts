// ============================================================================
// @robin-ux/native - Themeable React Native UI Components
// ============================================================================

// Theme system
export { defaultDarkColors, defaultDarkTheme, defaultLightColors, defaultTheme, ThemeContext, ThemeProvider, useTheme, useThemeSafe } from "./theme";

export type { Theme, ThemeColors, ThemeContextValue, ThemeProviderProps } from "./theme";

// Components
export { Badge, BaseInput, Button, DynamicStatusBar, HeaderView, Input, PasswordInput, SegmentedControl, Text } from "./components";

export type {
    BadgeProps,
    BadgeStatus,
    ButtonProps,
    ButtonSize,
    ButtonVariant,
    DynamicStatusBarProps,
    InputProps,
    Segment,
    SegmentedControlProps,
    TextAlign,
    TextColor,
    TextProps,
    TextVariant,
    TextWeight,
} from "./components";

// Utilities
export { borderRadius, createThemedStyle, layouts, shadows, spacing, typography, useThemedStyles } from "./utils";

export type { BorderRadiusKey, LayoutKey, ShadowKey, SpacingKey, TypographyVariant } from "./utils";
