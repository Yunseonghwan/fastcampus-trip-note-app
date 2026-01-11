import PlusButton from "@/components/PlusButton";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ExpensesListScreen = () => {
  const { tripId } = useLocalSearchParams();
  const router = useRouter();
  return (
    <SafeAreaView edges={["bottom"]} style={styles.container}>
      <ScrollView></ScrollView>
      <View style={styles.plusContainer}>
        <PlusButton
          onPress={() => {
            router.navigate({
              pathname: "/(trip)/[tripId]/expenses/createExpenses",
              params: {
                tripId: tripId as string,
              },
            });
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  plusContainer: {
    alignItems: "flex-end",
  },
});

export default ExpensesListScreen;
