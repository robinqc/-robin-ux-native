import React, { useRef } from "react";
import { Animated, ScrollViewProps, StyleProp, View, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { layouts, spacing, useThemedStyles } from "../utils";
import { DynamicStatusBar } from "./DynamicStatusBar";
import { Text } from "./Text";

export interface HeaderViewProps {
    title: string;
    actionButton?: React.ReactNode;
    children: React.ReactNode;
    scrollViewProps?: ScrollViewProps;
    style?: StyleProp<ViewStyle>;
    fixed?: boolean;
    defaultStyle?: "light" | "dark";
}

export function HeaderView({ title, actionButton, children, scrollViewProps, style, defaultStyle, fixed = false }: HeaderViewProps) {
    const scrollY = useRef(new Animated.Value(0)).current;

    const styles = useThemedStyles((colors) => ({
        container: {
            flex: 1,
            backgroundColor: colors.background,
        },
        header: {
            paddingHorizontal: spacing.md,
            paddingTop: spacing.md,
            ...layouts.rowBetween,
        },
        content: {
            flexGrow: 1,
        },
    }));

    return (
        <SafeAreaView style={[styles.container, style]} edges={["top", "left", "right"]}>
            <DynamicStatusBar scrollY={scrollY} threshold={100} defaultStyle={defaultStyle} />
            <View style={styles.header}>
                <Text variant="heading" weight="extrabold">
                    {title}
                </Text>
                {actionButton}
            </View>
            {fixed ? (
                <View style={styles.content}>{children}</View>
            ) : (
                <Animated.ScrollView
                    style={styles.container}
                    contentContainerStyle={styles.content}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
                    scrollEventThrottle={16}
                    {...scrollViewProps}
                >
                    {children}
                </Animated.ScrollView>
            )}
        </SafeAreaView>
    );
}
