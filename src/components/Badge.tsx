import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { useThemeSafe } from '../theme';
import { borderRadius, spacing, useThemedStyles } from '../utils/styles';
import { Text } from './Text';

export type BadgeStatus = 'active' | 'archived' | 'draft' | string;

export interface BadgeProps {
  /** Status or label to display */
  status: BadgeStatus;
  /** Badge size */
  size?: 'sm' | 'md';
  /** Custom container style */
  style?: StyleProp<ViewStyle>;
  /** Custom color override */
  customColor?: {
    background: string;
    text: string;
    border: string;
  };
}

/**
 * Badge component for displaying status or labels.
 *
 * @example
 * ```tsx
 * <Badge status="active" />
 * <Badge status="draft" size="sm" />
 * <Badge
 *   status="Custom"
 *   customColor={{
 *     background: '#e0f2fe',
 *     text: '#0369a1',
 *     border: '#7dd3fc',
 *   }}
 * />
 * ```
 */
export function Badge({ status, size = 'md', style, customColor }: BadgeProps) {
  const { colors } = useThemeSafe();

  // Default status colors
  const getStatusColors = () => {
    if (customColor) return customColor;

    switch (status) {
      case 'active':
        return {
          background: colors.success + '15', // 15% opacity
          text: colors.success,
          border: colors.success + '30', // 30% opacity
        };
      case 'archived':
        return {
          background: colors.foregroundTertiary + '15',
          text: colors.foregroundTertiary,
          border: colors.foregroundTertiary + '30',
        };
      case 'draft':
        return {
          background: colors.warning + '15',
          text: colors.warning,
          border: colors.warning + '30',
        };
      default:
        return {
          background: colors.muted,
          text: colors.foregroundSecondary,
          border: colors.border,
        };
    }
  };

  const statusColors = getStatusColors();

  const styles = useThemedStyles(() => ({
    badge: {
      backgroundColor: statusColors.background,
      borderWidth: 1,
      borderColor: statusColors.border,
      borderRadius: borderRadius.full,
      paddingHorizontal: size === 'sm' ? spacing.sm : spacing.md,
      paddingVertical: size === 'sm' ? spacing.xs : spacing.sm,
      alignSelf: 'flex-start' as const,
    },
    text: {
      color: statusColors.text,
      fontSize: size === 'sm' ? 10 : 12,
      fontWeight: '600' as const,
      textTransform: 'capitalize' as const,
    },
  }));

  return (
    <View style={[styles.badge, style]}>
      <Text style={styles.text}>{status}</Text>
    </View>
  );
}
