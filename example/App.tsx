import React, { useRef, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Import components from the package
import { Badge, Button, defaultDarkTheme, defaultTheme, Input, PasswordInput, SegmentedControl, spacing, Text, Theme, ThemeProvider } from "@robin-ux/native";
import { HeaderView } from "@robin-ux/native/components";

export default function App() {
    const [isDark, setIsDark] = useState(false);
    const [selectedView, setSelectedView] = useState("components");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const scrollY = useRef(new Animated.Value(0)).current;

    const theme: Theme = isDark ? defaultDarkTheme : defaultTheme;

    return (
        <SafeAreaProvider>
            <ThemeProvider theme={theme}>
                <HeaderView title="@robin-ux/native">
                    {/* Header */}
                    <View style={styles.header}>
                        <Text variant="body" color="secondary">
                            Themeable React Native UI Components
                        </Text>
                    </View>

                    {/* Theme Toggle */}
                    <Section title="Theme">
                        <SegmentedControl
                            segments={[
                                { value: "light", label: "Light" },
                                { value: "dark", label: "Dark" },
                            ]}
                            value={isDark ? "dark" : "light"}
                            onChange={(v: string) => setIsDark(v === "dark")}
                        />
                    </Section>

                    {/* View Selector */}
                    <Section title="Navigation">
                        <SegmentedControl
                            segments={[
                                { value: "components", label: "Components", icon: "grid-outline" },
                                { value: "forms", label: "Forms", icon: "document-text-outline" },
                            ]}
                            value={selectedView}
                            onChange={setSelectedView}
                            size="sm"
                        />
                    </Section>

                    {selectedView === "components" ? (
                        <>
                            {/* Text Component */}
                            <Section title="Text">
                                <Text variant="heading">Heading</Text>
                                <Text variant="subheading">Subheading</Text>
                                <Text variant="title">Title</Text>
                                <Text variant="body">Body text - regular weight</Text>
                                <Text variant="bodyMedium">Body text - medium weight</Text>
                                <Text variant="bodySemibold">Body text - semibold</Text>
                                <Text variant="caption" color="secondary">
                                    Caption text with secondary color
                                </Text>
                                <Text variant="label" color="tertiary">
                                    Label text with tertiary color
                                </Text>
                                <View style={styles.row}>
                                    <Text color="success">Success</Text>
                                    <Text color="warning">Warning</Text>
                                    <Text color="error">Error</Text>
                                    <Text color="info">Info</Text>
                                </View>
                            </Section>

                            {/* Button Component */}
                            <Section title="Buttons">
                                <Text variant="caption" color="secondary" style={styles.sectionLabel}>
                                    Variants
                                </Text>
                                <View style={styles.buttonRow}>
                                    <Button variant="primary">Primary</Button>
                                    <Button variant="secondary">Secondary</Button>
                                </View>
                                <View style={styles.buttonRow}>
                                    <Button variant="ghost">Ghost</Button>
                                    <Button variant="destructive">Destructive</Button>
                                </View>

                                <Text variant="caption" color="secondary" style={styles.sectionLabel}>
                                    Sizes
                                </Text>
                                <View style={styles.buttonRow}>
                                    <Button size="sm">Small</Button>
                                    <Button size="md">Medium</Button>
                                    <Button size="lg">Large</Button>
                                </View>

                                <Text variant="caption" color="secondary" style={styles.sectionLabel}>
                                    With Icons
                                </Text>
                                <View style={styles.buttonRow}>
                                    <Button icon="add">Add Item</Button>
                                    <Button icon="settings" iconPosition="right" variant="secondary">
                                        Settings
                                    </Button>
                                </View>
                                <View style={styles.buttonRow}>
                                    <Button icon="heart" variant="ghost" />
                                    <Button icon="share-outline" variant="ghost" />
                                    <Button icon="bookmark-outline" variant="ghost" />
                                </View>

                                <Text variant="caption" color="secondary" style={styles.sectionLabel}>
                                    States
                                </Text>
                                <View style={styles.buttonRow}>
                                    <Button loading>Loading</Button>
                                    <Button disabled>Disabled</Button>
                                </View>
                            </Section>

                            {/* Badge Component */}
                            <Section title="Badges">
                                <View style={styles.badgeRow}>
                                    <Badge status="active" />
                                    <Badge status="draft" />
                                    <Badge status="archived" />
                                </View>
                                <View style={styles.badgeRow}>
                                    <Badge status="active" size="sm" />
                                    <Badge status="draft" size="sm" />
                                    <Badge status="archived" size="sm" />
                                </View>
                                <View style={styles.badgeRow}>
                                    <Badge
                                        status="Custom"
                                        customColor={{
                                            background: "#dbeafe",
                                            text: "#1d4ed8",
                                            border: "#93c5fd",
                                        }}
                                    />
                                    <Badge
                                        status="VIP"
                                        customColor={{
                                            background: "#fef3c7",
                                            text: "#92400e",
                                            border: "#fcd34d",
                                        }}
                                    />
                                </View>
                            </Section>

                            {/* Segmented Control */}
                            <Section title="Segmented Control">
                                <Text variant="caption" color="secondary" style={styles.sectionLabel}>
                                    Default Size
                                </Text>
                                <SegmentedControl
                                    segments={[
                                        { value: "day", label: "Day" },
                                        { value: "week", label: "Week" },
                                        { value: "month", label: "Month" },
                                    ]}
                                    value="week"
                                    onChange={() => {}}
                                />

                                <Text variant="caption" color="secondary" style={styles.sectionLabel}>
                                    Small Size with Icons
                                </Text>
                                <SegmentedControl
                                    segments={[
                                        { value: "list", icon: "list" },
                                        { value: "grid", icon: "grid" },
                                        { value: "map", icon: "map" },
                                    ]}
                                    value="grid"
                                    onChange={() => {}}
                                    size="sm"
                                />
                            </Section>
                        </>
                    ) : (
                        <>
                            {/* Form Inputs */}
                            <Section title="Form Inputs">
                                <Input label="Email" placeholder="Enter your email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />

                                <View style={styles.inputSpacer} />

                                <PasswordInput label="Password" placeholder="Enter your password" value={password} onChangeText={setPassword} />

                                <View style={styles.inputSpacer} />

                                <Input label="With Helper Text" placeholder="Username" helperText="This will be your public display name" />

                                <View style={styles.inputSpacer} />

                                <Input label="With Error" placeholder="Email" value="invalid-email" error="Please enter a valid email address" />
                            </Section>

                            {/* Form Submit */}
                            <Section title="Form Actions">
                                <Button variant="primary" icon="log-in-outline" onPress={() => console.log({ email, password })}>
                                    Sign In
                                </Button>
                                <View style={styles.inputSpacer} />
                                <Button variant="secondary" icon="person-add-outline">
                                    Create Account
                                </Button>
                                <View style={styles.inputSpacer} />
                                <Button variant="ghost">Forgot Password?</Button>
                            </Section>
                        </>
                    )}

                    {/* Footer */}
                    <View style={styles.footer}>
                        <Text variant="caption" color="tertiary" align="center">
                            @robin-ux/native v0.1.0
                        </Text>
                        <Text variant="label" color="tertiary" align="center">
                            Built with Expo Module Scripts
                        </Text>
                    </View>
                </HeaderView>
            </ThemeProvider>
        </SafeAreaProvider>
    );
}

// Section component for grouping
function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <View style={styles.section}>
            <Text variant="title" style={styles.sectionTitle}>
                {title}
            </Text>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    content: {
        paddingBottom: spacing.xxl,
    },
    header: {
        padding: spacing.lg,
        paddingTop: spacing.xl,
    },
    section: {
        padding: spacing.lg,
        marginBottom: spacing.sm,
    },
    sectionTitle: {
        marginBottom: spacing.md,
    },
    sectionLabel: {
        marginTop: spacing.md,
        marginBottom: spacing.sm,
    },
    row: {
        flexDirection: "row",
        gap: spacing.md,
        marginTop: spacing.sm,
    },
    buttonRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: spacing.sm,
        marginBottom: spacing.sm,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: spacing.md,
    },
    badgeRow: {
        flexDirection: "row",
        gap: spacing.sm,
        marginBottom: spacing.sm,
    },
    inputSpacer: {
        height: spacing.md,
    },
    footer: {
        padding: spacing.xl,
        gap: spacing.xs,
    },
});
