// ============================================================================
// @robin-ux/native - Themeable React Native UI Components
// ============================================================================

// Theme system
export {
  ThemeProvider,
  ThemeContext,
  useTheme,
  useThemeSafe,
  defaultTheme,
  defaultDarkTheme,
  defaultLightColors,
  defaultDarkColors,
} from './theme';

export type {
  Theme,
  ThemeColors,
  ThemeContextValue,
  ThemeProviderProps,
} from './theme';

// Components
export {
  Button,
  Text,
  Input,
  PasswordInput,
  BaseInput,
  SegmentedControl,
  Badge,
  DynamicStatusBar,
} from './components';

export type {
  ButtonProps,
  ButtonVariant,
  ButtonSize,
  TextProps,
  TextVariant,
  TextWeight,
  TextColor,
  TextAlign,
  InputProps,
  SegmentedControlProps,
  Segment,
  BadgeProps,
  BadgeStatus,
  DynamicStatusBarProps,
} from './components';

// Utilities
export {
  spacing,
  borderRadius,
  typography,
  shadows,
  layouts,
  useThemedStyles,
  createThemedStyle,
} from './utils';

export type {
  SpacingKey,
  BorderRadiusKey,
  TypographyVariant,
  ShadowKey,
  LayoutKey,
} from './utils';
