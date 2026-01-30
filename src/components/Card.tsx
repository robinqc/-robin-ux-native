import React from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import { useTheme } from "../theme";
import { borderRadius, shadows, spacing } from "../utils/styles";

type CardVariant = "default" | "elevated" | "outlined";

export interface CardProps extends Omit<ViewProps, "style"> {
    variant?: CardVariant;
    padding?: keyof typeof spacing;
    style?: ViewProps["style"];
    children: React.ReactNode;
    bg?: "primary" | "secondary";
}

export function Card({ variant = "default", padding = "md", style, children, bg, ...props }: CardProps) {
    const { colors } = useTheme();
    let backgroundColor = colors.card;
    if (bg === "primary") {
        backgroundColor = colors.background;
    } else if (bg === "secondary") {
        backgroundColor = colors.background;
    }

    const variantStyles = {
        default: {
            backgroundColor: backgroundColor,
        },
        elevated: {
            backgroundColor: backgroundColor,
            ...shadows.md,
        },
        outlined: {
            backgroundColor: backgroundColor,
            borderWidth: 1,
            borderColor: colors.border,
        },
    }[variant];

    const cardStyle = [styles.card, variantStyles, { padding: spacing[padding] }, style];

    return (
        <View style={cardStyle} {...props}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: borderRadius.lg,
    },
});
