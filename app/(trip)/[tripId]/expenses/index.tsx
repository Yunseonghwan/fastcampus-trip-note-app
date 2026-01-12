import PlusButton from "@/components/PlusButton";
import { theme } from "@/constants/theme";
import { useGetExpenses } from "@/hooks/useExpenses";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ExpensesListScreen = () => {
  const { tripId } = useLocalSearchParams();
  const router = useRouter();

  const {
    data: expenses,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useGetExpenses(tripId as string);

  const combinedExpenses = useMemo(() => {
    const data = expenses?.pages.flatMap((page) => page.data);
    const meta = expenses?.pages[0]?.meta;
    const totalAmount = expenses?.totalAmount;
    return {
      data: data ?? [],
      meta: meta ?? undefined,
      totalAmount: totalAmount ?? 0,
    };
  }, [expenses]);

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <SafeAreaView edges={["bottom"]} style={styles.container}>
      <FlatList
        data={combinedExpenses.data ?? []}
        contentContainerStyle={{ gap: 20 }}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={() => <></>}
        renderItem={({ item }) => <></>}
        ListEmptyComponent={() => (
          <Text
            style={{
              textAlign: "center",
              marginTop: 30,
              color: theme.colors.gray,
              fontFamily: theme.fonts.medium,
            }}
          >
            경비를 추가해 주세요!
          </Text>
        )}
        ListFooterComponent={() =>
          isFetchingNextPage ? <ActivityIndicator /> : null
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
      />
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
