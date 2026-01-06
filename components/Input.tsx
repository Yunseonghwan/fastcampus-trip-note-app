import { theme } from "@/constants/theme";
import { memo } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

interface InputProps extends TextInputProps {
  label: string;
}

const Input = ({ label, editable, ...props }: InputProps) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={[styles.input, editable === false && styles.editAble]}
        {...props}
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect={false}
        editable={editable}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    gap: 10,
  },
  inputLabel: {
    fontSize: 18,
    fontFamily: theme.fonts.regular,
  },
  input: {
    height: 52,
    backgroundColor: theme.colors.white,
    borderRadius: 20,
    paddingHorizontal: 20,
  },
  editAble: {
    backgroundColor: theme.colors.gray100,
  },
});

export default memo(Input);
