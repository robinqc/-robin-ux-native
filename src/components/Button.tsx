import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ActivityIndicator, StyleSheet, TouchableOpacity, TouchableOpacityProps, View, ViewStyle } from "react-native";
import { useThemeSafe } from "../theme";
import { borderRadius, spacing } from "../utils/styles";
import { Text } from "./Text";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "destructive";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends Omit<TouchableOpacityProps, "style"> {
    /** Button visual variant */
    variant?: ButtonVariant;
    /** Button size */
    size?: ButtonSize;
    /** Show loading spinner */
    loading?: boolean;
    /** Disable button interactions */
    disabled?: boolean;
    /** Icon name from Ionicons */
    icon?: keyof typeof Ionicons.glyphMap;
    /** Icon position relative to children */
    iconPosition?: "left" | "right";
    /** Button content */
    children?: React.ReactNode;
    /** Custom style */
    style?: TouchableOpacityProps["style"];
    /** Ref to the button view */
    ref?: React.RefObject<View | null>;
}

interface SizeConfig {
    paddingVertical: number;
    paddingHorizontal: number;
    fontSize: number;
    iconSize: number;
}

/**
 * Button component with variants, sizes, and icon support.
 *
 * @example
 * ```tsx
 * <Button variant="primary" onPress={handlePress}>
 *   Submit
 * </Button>
 *
 * <Button variant="secondary" icon="add" size="sm">
 *   Add Item
 * </Button>
 *
 * <Button variant="ghost" icon="settings" />
 * ```
 */
export function Button({ variant = "primary", size = "md", loading = false, disabled = false, icon, iconPosition = "left", children, style, ref, ...props }: ButtonProps) {
    const { colors } = useThemeSafe();

    const isDisabled = disabled || loading;

    // Size configurations
    const sizeConfigs: Record<ButtonSize, SizeConfig> = {
        sm: {
            paddingVertical: spacing.sm,
            paddingHorizontal: spacing.md,
            fontSize: 14,
            iconSize: 16,
        },
        md: {
            paddingVertical: 14,
            paddingHorizontal: spacing.lg,
            fontSize: 16,
            iconSize: 20,
        },
        lg: {
            paddingVertical: 18,
            paddingHorizontal: spacing.xl,
            fontSize: 18,
            iconSize: 24,
        },
    };

    const sizeConfig = sizeConfigs[size];

    // Variant styles
    const variantStyles: Record<ButtonVariant, { backgroundColor: string; textColor: string }> = {
        primary: {
            backgroundColor: isDisabled ? colors.primaryLight : colors.primary,
            textColor: colors.background,
        },
        secondary: {
            backgroundColor: isDisabled ? colors.muted : colors.backgroundSecondary,
            textColor: colors.foreground,
        },
        ghost: {
            backgroundColor: "transparent",
            textColor: colors.foreground,
        },
        destructive: {
            backgroundColor: isDisabled ? colors.muted : colors.destructive,
            textColor: colors.destructiveForeground,
        },
    };

    const currentVariant = variantStyles[variant];

    const buttonStyle: ViewStyle[] = [
        styles.button,
        {
            backgroundColor: currentVariant.backgroundColor,
            paddingVertical: sizeConfig.paddingVertical,
            paddingHorizontal: sizeConfig.paddingHorizontal,
            opacity: isDisabled ? 0.5 : 1,
        },
        style as ViewStyle,
    ];

    const renderContent = () => {
        if (loading) {
            return <ActivityIndicator size="small" color={currentVariant.textColor} />;
        }

        const iconElement = icon ? (
            <Ionicons
                name={icon}
                size={sizeConfig.iconSize}
                color={currentVariant.textColor}
                style={children && iconPosition === "left" ? styles.iconLeft : children && iconPosition === "right" ? styles.iconRight : undefined}
            />
        ) : null;

        if (!children) {
            return iconElement;
        }

        return (
            <View style={styles.content}>
                {iconPosition === "left" && iconElement}
                <Text
                    style={{
                        color: currentVariant.textColor,
                        fontSize: sizeConfig.fontSize,
                        fontWeight: "600",
                    }}
                >
                    {children}
                </Text>
                {iconPosition === "right" && iconElement}
            </View>
        );
    };

    return (
        <TouchableOpacity style={buttonStyle} disabled={isDisabled} activeOpacity={0.7} ref={ref} {...props}>
            {renderContent()}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: borderRadius.full,
        alignItems: "center",
        justifyContent: "center",
    },
    content: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    iconLeft: {
        marginRight: spacing.sm,
    },
    iconRight: {
        marginLeft: spacing.sm,
    },
});
