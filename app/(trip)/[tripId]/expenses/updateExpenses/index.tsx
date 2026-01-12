import Button from "@/components/Button";
import Input from "@/components/Input";
import { theme } from "@/constants/theme";
import { useGetExpense, useUpdateExpenses } from "@/hooks/useExpenses";
import { ExpensesCategoryType } from "@/types/expensesType";

import { useLocalSearchParams, useRouter } from "expo-router";

import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const EXPENSE_CATEGORIES: ExpensesCategoryType[] = [
  "FOOD",
  "LODGING",
  "TRANSPORT",
  "ACTIVITY",
];

const UpdateExpenses = () => {
  const router = useRouter();
  const { tripId, expenseId } = useLocalSearchParams<{
    tripId: string;
    expenseId: string;
  }>();
  const [selectedCategory, setSelectedCategory] =
    useState<ExpensesCategoryType>("FOOD");
  const [amount, setAmount] = useState("");
  const [memo, setMemo] = useState("");

  const { mutateAsync } = useUpdateExpenses();

  const { data: expense } = useGetExpense(expenseId as string);

  useEffect(() => {
    if (expense) {
      setSelectedCategory(expense.category);
      setAmount(expense.amount.toString());
      setMemo(expense.memo ?? "");
    }
  }, [expense]);

  const handleCategorySelect = (category: ExpensesCategoryType) => {
    setSelectedCategory(category);
  };

  const handleUpdateExpense = () => {
    // TODO: 경비 생성 로직
    mutateAsync(
      {
        expenseId: expenseId as string,
        tripId: tripId as string,
        amount: Number(amount),
        category: selectedCategory,
        memo,
      },
      {
        onSuccess: () => {
          router.back();
        },
      }
    );
  };

  const getCategoryLabel = (category: ExpensesCategoryType) => {
    switch (category) {
      case "FOOD":
        return "식비";
      case "LODGING":
        return "숙박";
      case "TRANSPORT":
        return "교통";
      case "ACTIVITY":
        return "관광";
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <SafeAreaView style={styles.container} edges={["bottom"]}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.categoryContainer}>
            {EXPENSE_CATEGORIES.map((category) => (
              <Pressable
                key={category}
                style={[
                  styles.categoryTab,
                  selectedCategory === category && styles.categoryTabSelected,
                ]}
                onPress={() => handleCategorySelect(category)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === category &&
                      styles.categoryTextSelected,
                  ]}
                >
                  {getCategoryLabel(category)}
                </Text>
              </Pressable>
            ))}
          </View>
          <Input
            label="금액"
            placeholder="금액을 입력하세요"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
          />
          <Input
            label="메모"
            placeholder="메모를 입력하세요"
            value={memo}
            onChangeText={(text) => setMemo(text)}
          />
          <View style={styles.buttonContainer}>
            <Button label="저장" onPress={handleUpdateExpense} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  scrollContent: {
    flex: 1,
    gap: 20,
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  categoryTab: {
    flex: 1,
    height: 84,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.white,
  },
  categoryTabSelected: {
    borderColor: theme.colors.primary,
    backgroundColor: "rgba(74, 144, 226, 0.2)",
  },
  categoryText: {
    fontSize: 14,
    fontFamily: theme.fonts.medium,
    color: theme.colors.gray,
  },
  categoryTextSelected: {
    color: theme.colors.primary,
  },
  buttonContainer: {
    marginTop: "auto",
  },
});

export default UpdateExpenses;
