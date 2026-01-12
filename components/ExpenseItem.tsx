import { theme } from "@/constants/theme";
import { ExpensesCategoryType, ExpensesItemType } from "@/types/expensesType";

import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import dayjs from "dayjs";
import { memo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface ExpenseItemProps {
  item: ExpensesItemType;
}

const ExpenseItem = ({ item }: ExpenseItemProps) => {
  const getCategoryIcon = (category: ExpensesCategoryType) => {
    switch (category) {
      case "FOOD":
        return <Ionicons name="restaurant" size={20} color="#F97316" />;
      case "TRANSPORT":
        return <Ionicons name="car" size={20} color="#3B82F6" />;
      case "LODGING":
        return <MaterialIcons name="hotel" size={20} color="#8B5CF6" />;
      case "ACTIVITY":
        return <Ionicons name="camera" size={20} color="#10B981" />;
    }
  };

  const getCategoryLabel = (category: ExpensesCategoryType) => {
    switch (category) {
      case "FOOD":
        return "식비";
      case "TRANSPORT":
        return "교통";
      case "LODGING":
        return "숙박";
      case "ACTIVITY":
        return "관광";
    }
  };

  const getCategoryColor = (category: ExpensesCategoryType) => {
    switch (category) {
      case "FOOD":
        return "#FFF7ED"; // 오렌지 계열 배경
      case "TRANSPORT":
        return "#EFF6FF"; // 파란색 계열 배경
      case "LODGING":
        return "#F5F3FF"; // 보라색 계열 배경
      case "ACTIVITY":
        return "#ECFDF5"; // 초록색 계열 배경
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: getCategoryColor(item.category) },
          ]}
        >
          {getCategoryIcon(item.category)}
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.category}>
            {getCategoryLabel(item.category)} {item.amount.toLocaleString()}원
          </Text>
          <Text style={styles.createdAt}>
            {dayjs(item.createdAt).format("YYYY.MM.DD:HH:mm")}
          </Text>
        </View>
      </View>
      <Pressable>
        <AntDesign name="more" size={24} color="black" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: theme.colors.white,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  infoContainer: {
    gap: 4,
  },
  category: {
    fontSize: 16,
    fontFamily: theme.fonts.semibold,
    color: theme.colors.black,
  },
  createdAt: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: theme.colors.gray,
  },
});

export default memo(ExpenseItem);
