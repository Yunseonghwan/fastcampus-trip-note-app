import Modal from "@/components/Modal";
import PlusButton from "@/components/PlusButton";
import TripDetailCard from "@/components/TripDetailCard";
import TripDetailListItemSkeleton from "@/components/TripDetailListItemSkeleton";
import { theme } from "@/constants/theme";
import {
  useDeleteTripDetail,
  useGetTripDetailList,
} from "@/hooks/useTripDetail";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

const TripDetailListScreen = () => {
  const { tripId } = useLocalSearchParams();
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const {
    data: tripDetailList,
    isPending,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetTripDetailList(String(tripId));
  const { mutateAsync } = useDeleteTripDetail();

  const combinedTripDetailList = useMemo(() => {
    const data = tripDetailList?.pages.flatMap((page) => page.data);
    const meta = tripDetailList?.pages[0].meta;
    return {
      data: data ?? [],
      meta: meta ?? undefined,
    };
  }, [tripDetailList]);

  const handleCloseModal = () => {
    setIsOpen(false);
    setSelectedId(null);
  };

  const onUpdateTripDetail = (id: string) => {
    router.navigate({
      pathname: "/(trip)/[tripId]/updateTripDetail",
      params: {
        tripId: tripId as string,
        tripDetailId: id,
      },
    });
    handleCloseModal();
  };

  const onDeleteTripDetail = (id: string) => {
    mutateAsync(id, {
      onSuccess: () => {
        handleCloseModal();
      },
    });
  };

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  if (isPending) {
    return (
      <SafeAreaView edges={["bottom"]} style={styles.container}>
        <View style={{ gap: 10 }}>
          {[1, 2, 3].map((item) => (
            <TripDetailListItemSkeleton key={item} />
          ))}
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={["bottom"]} style={styles.container}>
      <FlatList
        data={combinedTripDetailList.data ?? []}
        contentContainerStyle={{ gap: 10 }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TripDetailCard
            item={item}
            handleModal={() => {
              setSelectedId(item.id);
              setIsOpen(true);
            }}
          />
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
      <Modal
        isOpen={isOpen}
        selectedId={selectedId}
        closeModal={handleCloseModal}
        updateTrip={onUpdateTripDetail}
        removeTrip={onDeleteTripDetail}
      />
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
