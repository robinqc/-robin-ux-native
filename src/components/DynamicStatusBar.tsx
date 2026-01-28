import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemeSafe } from '../theme';

export interface DynamicStatusBarProps {
  /** Animated scroll value to track */
  scrollY: Animated.Value;
  /** Scroll threshold for style change */
  threshold?: number;
  /** Default status bar style */
  defaultStyle?: 'light' | 'dark';
}

/**
 * Dynamic status bar that changes style based on scroll position.
 * Provides a smooth transition with animated background.
 *
 * @example
 * ```tsx
 * const scrollY = useRef(new Animated.Value(0)).current;
 *
 * <DynamicStatusBar scrollY={scrollY} threshold={200} />
 * <Animated.ScrollView
 *   onScroll={Animated.event(
 *     [{ nativeEvent: { contentOffset: { y: scrollY } } }],
 *     { useNativeDriver: true }
 *   )}
 * >
 *   {content}
 * </Animated.ScrollView>
 * ```
 */
export function DynamicStatusBar({
  scrollY,
  threshold = 200,
  defaultStyle = 'light',
}: DynamicStatusBarProps) {
  const { isDark, colors } = useThemeSafe();
  const insets = useSafeAreaInsets();
  const [style, setStyle] = useState<'light' | 'dark'>(defaultStyle);

  useEffect(() => {
    const listener = scrollY.addListener(({ value }) => {
      if (isDark) {
        if (style !== 'light') setStyle('light');
        return;
      }

      const newStyle = value > threshold ? 'dark' : 'light';
      if (newStyle !== style) {
        setStyle(newStyle);
      }
    });

    return () => scrollY.removeListener(listener);
  }, [isDark, threshold, style, scrollY]);

  const backgroundOpacity = scrollY.interpolate({
    inputRange: [threshold - 40, threshold],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const activeStyle = isDark ? 'light' : style;

  return (
    <>
      <StatusBar style={activeStyle} />
      <Animated.View
        style={[
          styles.background,
          {
            height: insets.top,
            backgroundColor: colors.background,
            opacity: backgroundOpacity,
          },
        ]}
      />
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
});
