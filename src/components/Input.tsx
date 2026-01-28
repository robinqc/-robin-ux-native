import React, { useState } from 'react';
import { Control, useController } from 'react-hook-form';
import { TextInput, TextInputProps, View, ViewStyle } from 'react-native';
import { useThemeSafe } from '../theme';
import { borderRadius, spacing, useThemedStyles } from '../utils/styles';
import { Button } from './Button';
import { Text } from './Text';

export interface InputProps extends Omit<TextInputProps, 'style'> {
  /** Field label */
  label?: string;
  /** Error message to display */
  error?: string;
  /** Helper text below input */
  helperText?: string;
  /** Custom input style */
  style?: TextInputProps['style'];
  /** Container style */
  containerStyle?: ViewStyle;
  /** Input ref */
  ref?: React.RefObject<TextInput | null>;
  /** Element to render at the end of the input */
  endElement?: React.ReactNode;
  /** Child elements */
  children?: React.ReactNode;
  /** React Hook Form control object (optional) */
  control?: Control<any>;
  /** Field name for React Hook Form (optional) */
  name?: string;
}

const inputStyles = {
  paddingHorizontal: spacing.md,
  paddingVertical: spacing.md,
  borderRadius: borderRadius.lg,
  fontSize: 16,
};

/**
 * Base input wrapper providing label, error, and helper text layout.
 */
export function BaseInput({
  label,
  error,
  helperText,
  containerStyle,
  children,
}: Pick<InputProps, 'label' | 'error' | 'helperText' | 'containerStyle' | 'children'>) {
  const styles = useThemedStyles((colors) => ({
    label: {
      marginBottom: spacing.xs,
      color: colors.foregroundSecondary,
      fontSize: 14,
    },
    helperText: {
      marginTop: spacing.xs,
    },
  }));

  return (
    <View style={containerStyle}>
      {label && (
        <Text variant="body" weight="medium" style={styles.label}>
          {label}
        </Text>
      )}
      {children}
      {error && (
        <Text variant="caption" color="error" style={styles.helperText}>
          {error}
        </Text>
      )}
      {!error && helperText && (
        <Text variant="caption" color="secondary" style={styles.helperText}>
          {helperText}
        </Text>
      )}
    </View>
  );
}

/**
 * Password input with visibility toggle.
 *
 * @example
 * ```tsx
 * <PasswordInput
 *   label="Password"
 *   placeholder="Enter your password"
 *   value={password}
 *   onChangeText={setPassword}
 * />
 *
 * // With React Hook Form
 * <PasswordInput
 *   label="Password"
 *   control={control}
 *   name="password"
 * />
 * ```
 */
export const PasswordInput: React.FC<InputProps> = ({
  value,
  onChangeText,
  style,
  onSubmitEditing,
  ref,
  error,
  control,
  name,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const { colors } = useThemeSafe();

  // Use useController if control and name are provided
  const controller = control && name ? useController({ control, name }) : null;

  const inputValue = controller ? controller.field.value : value;
  const inputOnChange = controller ? controller.field.onChange : onChangeText;
  const inputOnBlur = controller ? controller.field.onBlur : props.onBlur;
  const inputRef = controller ? controller.field.ref : ref;

  const hasError = error || controller?.fieldState.error;

  return (
    <BaseInput
      label={props.label}
      error={error || controller?.fieldState.error?.message}
      helperText={props.helperText}
      containerStyle={props.containerStyle}
    >
      <View
        style={[
          {
            backgroundColor: colors.backgroundSecondary,
            borderColor: hasError ? colors.error : colors.border,
            borderWidth: hasError ? 1 : 0,
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: borderRadius.lg,
          },
          style as ViewStyle,
        ]}
      >
        <TextInput
          placeholderTextColor={colors.foregroundSecondary}
          ref={inputRef as any}
          {...props}
          style={[
            inputStyles,
            {
              flex: 1,
              color: colors.foreground,
            },
          ]}
          value={inputValue}
          onChangeText={inputOnChange}
          autoCapitalize="none"
          onBlur={inputOnBlur}
          onSubmitEditing={onSubmitEditing}
          secureTextEntry={!showPassword}
        />
        <Button
          variant="ghost"
          icon={showPassword ? 'eye-off' : 'eye'}
          size="sm"
          onPress={() => setShowPassword(!showPassword)}
        />
      </View>
    </BaseInput>
  );
};

/**
 * Text input component with label, error, and helper text support.
 *
 * @example
 * ```tsx
 * <Input
 *   label="Email"
 *   placeholder="Enter your email"
 *   value={email}
 *   onChangeText={setEmail}
 *   keyboardType="email-address"
 * />
 *
 * // With React Hook Form
 * <Input
 *   label="Email"
 *   control={control}
 *   name="email"
 * />
 * ```
 */
export const Input: React.FC<InputProps> = ({
  value,
  error,
  onChangeText,
  onSubmitEditing,
  style,
  ref,
  control,
  name,
  ...props
}) => {
  const { colors } = useThemeSafe();

  // Use useController if control and name are provided
  const controller = control && name ? useController({ control, name }) : null;

  const inputValue = controller ? controller.field.value : value;
  const inputOnChange = controller ? controller.field.onChange : onChangeText;
  const inputOnBlur = controller ? controller.field.onBlur : props.onBlur;
  const inputRef = controller ? controller.field.ref : ref;

  const hasError = error || controller?.fieldState.error;

  return (
    <BaseInput
      label={props.label}
      error={error || controller?.fieldState.error?.message}
      helperText={props.helperText}
      containerStyle={props.containerStyle}
    >
      <TextInput
        placeholderTextColor={colors.foregroundSecondary}
        ref={inputRef as any}
        value={inputValue}
        onChangeText={inputOnChange}
        onBlur={inputOnBlur}
        onSubmitEditing={onSubmitEditing}
        {...props}
        style={[
          inputStyles,
          {
            backgroundColor: colors.backgroundSecondary,
            color: colors.foreground,
            borderColor: hasError ? colors.error : colors.border,
            borderWidth: hasError ? 1 : 0,
            borderRadius: borderRadius.lg,
          },
          style,
        ]}
      />
    </BaseInput>
  );
};
