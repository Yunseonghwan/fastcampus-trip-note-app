import PlusButton from "@/components/PlusButton";
import TripDetailCard from "@/components/TripDetailCard";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

const TripDetailListScreen = () => {
  const { tripId } = useLocalSearchParams();
  const router = useRouter();

  return (
    <SafeAreaView edges={["bottom"]} style={styles.container}>
      <ScrollView>
        <TripDetailCard handleModal={() => {}} />
      </ScrollView>
      <View style={styles.plusButtonContainer}>
        <PlusButton
          onPress={() => router.navigate(`/${tripId}/createTripDetail`)}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  plusButtonContainer: {
    alignItems: "flex-end",
  },
});

export default TripDetailListScreen;
