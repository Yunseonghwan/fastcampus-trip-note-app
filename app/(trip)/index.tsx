import PlusButton from "@/components/PlusButton";
import TripCard from "@/components/TripCard";
import { theme } from "@/constants/theme";
import { useGetTripList } from "@/hooks/useTrip";
import { useRouter } from "expo-router";
import { useMemo } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MyTripList = () => {
  const router = useRouter();
  const {
    data: trips,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetTripList();

  const combinedTrips = useMemo(() => {
    const data = trips?.pages.flatMap((page) => page.data) ?? [];
    const meta = trips?.pages[0].meta;
    return {
      data,
      meta,
    };
  }, [trips]);

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>내 여행</Text>
      <FlatList
        data={combinedTrips.data}
        contentContainerStyle={{ gap: 20 }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TripCard
            id={item.id}
            title={item.title}
            startDate={item.startDate}
            endDate={item.endDate}
          />
        )}
        ListEmptyComponent={() => (
          <Text
            style={{
              textAlign: "center",
            }}
          >
            여행을 추가해 주세요
          </Text>
        )}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
      />
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
