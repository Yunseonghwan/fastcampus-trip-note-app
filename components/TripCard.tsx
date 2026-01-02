import { theme } from "@/constants/theme";
import AntDesign from "@expo/vector-icons/AntDesign";
import { memo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const TripCard = () => {
  return (
    <Pressable style={styles.container}>
      <View style={{ gap: 5 }}>
        <Text style={styles.title}>제목</Text>
        <Text style={styles.dateText}>시작날짜 ~ 종료날짜</Text>
      </View>
      <Pressable>
        <AntDesign name="more" size={24} color="black" />
      </Pressable>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    height: 80,
    backgroundColor: theme.colors.white,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontFamily: theme.fonts.semibold,
  },
  dateText: {
    fontSize: 14,
    color: theme.colors.gray,
    fontFamily: theme.fonts.regular,
  },
});

export default memo(TripCard);
