import React from 'react';
import { Text as RNText, TextProps as RNTextProps, TextStyle } from 'react-native';
import { useThemeSafe } from '../theme';
import { typography } from '../utils/styles';

export type TextVariant =
  | 'heading'
  | 'subheading'
  | 'title'
  | 'body'
  | 'bodyMedium'
  | 'bodySemibold'
  | 'caption'
  | 'label';

export type TextWeight = 'regular' | 'medium' | 'semibold' | 'bold' | 'extrabold';

export type TextColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'accent'
  | 'error'
  | 'success'
  | 'warning'
  | 'info'
  | 'white';

export type TextAlign = 'left' | 'center' | 'right' | 'justify';

export interface TextProps extends Omit<RNTextProps, 'style'> {
  /** Typography variant */
  variant?: TextVariant;
  /** Font weight override */
  weight?: TextWeight;
  /** Text color */
  color?: TextColor;
  /** Text alignment */
  align?: TextAlign;
  /** Custom style */
  style?: RNTextProps['style'];
  /** Text content */
  children: React.ReactNode;
}

// Map weights to system font weights
const fontWeightMap: Record<TextWeight, TextStyle['fontWeight']> = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
};

/**
 * Text component with semantic variants and theme support.
 *
 * @example
 * ```tsx
 * <Text variant="heading" color="primary">Hello World</Text>
 * <Text variant="body" weight="semibold">Bold text</Text>
 * <Text variant="caption" color="secondary">Small helper text</Text>
 * ```
 */
export function Text({
  variant = 'body',
  weight,
  color = 'primary',
  align = 'left',
  style,
  children,
  ...props
}: TextProps) {
  const { colors } = useThemeSafe();

  // Get base variant style
  const baseStyle = typography[variant];

  // Determine font weight
  const fontWeight = weight ? fontWeightMap[weight] : baseStyle.fontWeight;

  // Get text color from theme
  const textColor: Record<TextColor, string> = {
    primary: colors.foreground,
    secondary: colors.foregroundSecondary,
    tertiary: colors.foregroundTertiary,
    accent: colors.accent,
    error: colors.error,
    success: colors.success,
    warning: colors.warning,
    info: colors.info,
    white: '#ffffff',
  };

  const computedStyle: TextStyle[] = [
    baseStyle,
    { color: textColor[color], textAlign: align },
    fontWeight ? { fontWeight } : {},
    style as TextStyle,
  ].filter(Boolean);

  return (
    <RNText style={computedStyle} {...props}>
      {children}
    </RNText>
  );
}
