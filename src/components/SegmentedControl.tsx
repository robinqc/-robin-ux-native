import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleProp, View, ViewStyle } from "react-native";
import { useThemeSafe } from "../theme";
import { borderRadius, spacing, useThemedStyles } from "../utils/styles";
import { Text } from "./Text";

export interface Segment {
    /** Unique value for this segment */
    value: string;
    /** Display label (optional if using icon only) */
    label?: string;
    /** Icon name from Ionicons (optional) */
    icon?: keyof typeof Ionicons.glyphMap;
}

export interface SegmentedControlProps {
    /** Array of segments to display */
    segments: Segment[];
    /** Currently selected segment value */
    value: string;
    /** Callback when selection changes */
    onChange: (value: string) => void;
    /** Control size */
    size?: "sm" | "md";
    /** Custom container style */
    style?: StyleProp<ViewStyle>;
}

/**
 * Segmented control component for switching between options.
 *
 * @example
 * ```tsx
 * <SegmentedControl
 *   segments={[
 *     { value: 'list', label: 'List', icon: 'list' },
 *     { value: 'grid', label: 'Grid', icon: 'grid' },
 *   ]}
 *   value={view}
 *   onChange={setView}
 * />
 * ```
 */
export function SegmentedControl({ segments, value, onChange, size = "sm", style }: SegmentedControlProps) {
    const { isDark } = useThemeSafe();

    const styles = useThemedStyles((colors) => ({
        container: {
            backgroundColor: colors.backgroundSecondary,
            borderRadius: borderRadius.full,
            padding: spacing.xs,
            flexDirection: "row",
        },
        segment: {
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: spacing[size],
            paddingHorizontal: spacing[size],
            borderRadius: borderRadius.full,
            flexDirection: "row",
            gap: spacing[size],
        },
        activeSegment: {
            backgroundColor: isDark ? colors.primaryLight : colors.primaryDark,
        },
        segmentText: {
            color: colors.foregroundSecondary,
            fontSize: size === "sm" ? 12 : 14,
            fontWeight: "600",
        },
        segmentWithText: {
            paddingHorizontal: size == "md" ? spacing.xl : spacing.lg,
        },
        activeSegmentText: {
            color: colors.background,
        },
        segmentIcon: {
            color: colors.foregroundSecondary,
            fontSize: size === "sm" ? 14 : 16,
        },
        activeSegmentIcon: {
            color: colors.background,
        },
    }));

    return (
        <View style={[styles.container, style]}>
            {segments.map((segment) => {
                const isActive = segment.value === value;
                return (
                    <Pressable
                        key={segment.value}
                        style={[styles.segment, isActive && styles.activeSegment, segment.label && styles.segmentWithText]}
                        onPress={() => onChange(segment.value)}
                        accessibilityRole="radio"
                        accessibilityState={{ selected: isActive }}
                    >
                        {segment.icon && <Ionicons name={segment.icon} style={[styles.segmentIcon, isActive && styles.activeSegmentIcon]} />}
                        {segment.label && <Text style={[styles.segmentText, isActive && styles.activeSegmentText]}>{segment.label}</Text>}
                    </Pressable>
                );
            })}
        </View>
    );
}
