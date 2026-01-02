import { theme } from "@/constants/theme";
import { memo } from "react";
import { Pressable, PressableProps, StyleSheet, Text } from "react-native";

interface ButtonProps extends PressableProps {
  label: string;
}

const Button = ({ label, ...props }: ButtonProps) => {
  return (
    <Pressable style={styles.button} {...props}>
      <Text
        style={{
          color: theme.colors.white,
          fontSize: 18,
          fontFamily: theme.fonts.semibold,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 52,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default memo(Button);
