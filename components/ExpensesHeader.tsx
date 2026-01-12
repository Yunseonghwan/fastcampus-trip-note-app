import { theme } from "@/constants/theme";
import { LinearGradient } from "expo-linear-gradient";
import { memo } from "react";
import { StyleSheet, Text } from "react-native";

interface ExpensesHeaderProps {
  totalAmount: number;
}

const ExpensesHeader = ({ totalAmount }: ExpensesHeaderProps) => {
  return (
    <LinearGradient
      colors={["#3B82F6", "#CBE3FF"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Text style={styles.title}>총 지출</Text>
      <Text style={styles.amount}>{totalAmount.toLocaleString()} 원</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: "100%",
    height: 100,
    borderRadius: 10,
    gap: 8,
    justifyContent: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 14,
    fontFamily: theme.fonts.medium,
    color: theme.colors.white,
  },
  amount: {
    fontSize: 28,
    fontFamily: theme.fonts.bold,
    color: theme.colors.white,
  },
});

export default memo(ExpensesHeader);
