import PlusButton from "@/components/PlusButton";
import TripCard from "@/components/TripCard";
import { theme } from "@/constants/theme";
import { useGetTripList } from "@/hooks/useTrip";
import { storageService } from "@/services/storageService";
import { ResponseTripListType } from "@/types/tripType";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CACHE_KEY = "tripListCache";
const CACHE_EXPIRY_KEY = "tripCacheExpiry";
const CACHE_DURATION = 1000 * 50 * 60;

const MyTripList = () => {
  const router = useRouter();
  const [cacheData, setCacheData] = useState<ResponseTripListType | null>(null);
  console.log(cacheData);
  const {
    data: trips,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetTripList();

  const saveToCache = useCallback(async (data: ResponseTripListType) => {
    await Promise.all([
      storageService.setItem(CACHE_KEY, JSON.stringify(data)),
      storageService.setItem(
        CACHE_EXPIRY_KEY,
        JSON.stringify(Date.now() + CACHE_DURATION)
      ),
    ]);
  }, []);

  useEffect(() => {
    if (trips?.pages[0]) {
      saveToCache(trips.pages[0]);
    }
  }, [trips, saveToCache]);

  const loadFromCache = useCallback(async () => {
    const [cached, expiry] = await Promise.all([
      storageService.getItem(CACHE_KEY),
      storageService.getItem(CACHE_EXPIRY_KEY),
    ]);
    if (cached && expiry) {
      const isExpired = Date.now() > expiry;
      if (!isExpired) {
        setCacheData(cached);
      }
    }
  }, []);

  useEffect(() => {
    loadFromCache();
  }, [loadFromCache]);

  const combinedTrips = useMemo(() => {
    if (trips?.pages.length) {
      const data = trips?.pages.flatMap((page) => page.data) ?? [];
      const meta = trips?.pages[0].meta;
      return {
        data,
        meta,
      };
    }
    if (cacheData) {
      return { data: cacheData.data, meta: cacheData.meta };
    }
    return { data: [], meta: undefined };
  }, [trips, cacheData]);

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>내 여행</Text>
      <FlatList
        data={combinedTrips?.data}
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
