import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextInputProps,
} from "react-native";

import { colors, radius, spacing, text } from "../../theme";

type Props = TextInputProps & {
  label?: string;
  helper?: string;
  error?: string | null;
};

export function Input({
  label,
  helper,
  error,
  onFocus,
  onBlur,
  style,
  ...rest
}: Props) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={styles.root}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View
        style={[
          styles.field,
          focused && styles.focused,
          error ? styles.errored : null,
        ]}
      >
        <TextInput
          placeholderTextColor={colors.text.muted}
          selectionColor={colors.teal[400]}
          {...rest}
          style={[styles.input, style]}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
        />
      </View>
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : helper ? (
        <Text style={styles.helper}>{helper}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    gap: spacing.xs,
  },
  label: {
    ...text.smallMedium,
    color: colors.text.secondary,
    paddingHorizontal: spacing.xs,
  },
  field: {
    backgroundColor: colors.bg.muted,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    borderRadius: radius.md,
    paddingHorizontal: spacing.base,
    minHeight: 52,
    justifyContent: "center",
  },
  focused: {
    borderColor: colors.teal[400],
    shadowColor: colors.teal[400],
    shadowOpacity: 0.18,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
  },
  errored: {
    borderColor: colors.danger,
  },
  input: {
    ...text.body,
    color: colors.text.primary,
  },
  helper: {
    ...text.small,
    color: colors.text.muted,
    paddingHorizontal: spacing.xs,
  },
  errorText: {
    ...text.small,
    color: colors.danger,
    paddingHorizontal: spacing.xs,
  },
});
