import PlusButton from "@/components/PlusButton";
import TripDetailCard from "@/components/TripDetailCard";
import { theme } from "@/constants/theme";
import { useGetTripDetailList } from "@/hooks/useTripDetail";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

const TripDetailListScreen = () => {
  const { tripId } = useLocalSearchParams();
  const router = useRouter();

  const {
    data: tripDetailList,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetTripDetailList(String(tripId));

  const combinedTripDetailList = useMemo(() => {
    const data = tripDetailList?.pages.flatMap((page) => page.data);
    const meta = tripDetailList?.pages[0].meta;
    return {
      data: data ?? [],
      meta: meta ?? undefined,
    };
  }, [tripDetailList]);

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <SafeAreaView edges={["bottom"]} style={styles.container}>
      <FlatList
        data={combinedTripDetailList.data ?? []}
        contentContainerStyle={{ gap: 10 }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TripDetailCard item={item} handleModal={() => {}} />
        )}
        ListEmptyComponent={() => (
          <Text
            style={{
              marginTop: 50,
              textAlign: "center",
              color: theme.colors.gray,
            }}
          >
            여행 기록을 추가해 주세요!
          </Text>
        )}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
      />

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
