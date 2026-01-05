import { theme } from "@/constants/theme";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import { memo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface TripCardProps {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  handleOpenModal: (id: string) => void;
}

const TripCard = ({
  id,
  title,
  startDate,
  endDate,
  handleOpenModal,
}: TripCardProps) => {
  const router = useRouter();
  return (
    <Pressable
      style={styles.container}
      onPress={() => router.navigate(`/(trips)/${id}`)}
    >
      <View style={{ gap: 5 }}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.dateText}>
          {startDate} ~ {endDate}
        </Text>
      </View>
      <Pressable onPress={() => handleOpenModal(id)}>
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
