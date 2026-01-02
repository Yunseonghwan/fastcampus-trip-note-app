import PlusButton from "@/components/PlusButton";
import TripCard from "@/components/TripCard";
import { theme } from "@/constants/theme";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MyTripList = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>내 여행</Text>
      <ScrollView contentContainerStyle={{ gap: 10 }}>
        <TripCard />
        <TripCard />
        <TripCard />
      </ScrollView>
      <View style={styles.buttonContainer}>
        <PlusButton onPress={() => router.navigate("/createTrip")} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: theme.fonts.bold,
    marginBottom: 30,
  },
  buttonContainer: {
    alignItems: "flex-end",
  },
});

export default MyTripList;
