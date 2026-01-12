import ExpenseItem from "@/components/ExpenseItem";
import ExpensesHeader from "@/components/ExpensesHeader";
import Modal from "@/components/Modal";
import PlusButton from "@/components/PlusButton";
import { theme } from "@/constants/theme";
import { useDeleteExpenses, useGetExpenses } from "@/hooks/useExpenses";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo, useState } from "react";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExpenseId, setSelectedExpenseId] = useState<string | null>(
    null
  );

  const { mutateAsync: deleteExpense } = useDeleteExpenses();

  const {
    data: expenses,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useGetExpenses(tripId as string);

  const combinedExpenses = useMemo(() => {
    const data = expenses?.pages.flatMap((page) => page.data);
    const meta = expenses?.pages[0]?.meta;
    const totalAmount = expenses?.pages[0].totalAmount;
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

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedExpenseId(null);
  };

  const handleDeleteExpense = (expenseId: string) => {
    deleteExpense(expenseId, {
      onSuccess: () => {
        handleCloseModal();
      },
    });
  };

  const handleModal = (expenseId: string) => {
    setIsModalOpen(true);
    setSelectedExpenseId(expenseId);
  };

  const handleEditExpense = (expenseId: string) => {
    router.navigate({
      pathname: "/(trip)/[tripId]/expenses/updateExpenses",
      params: { tripId: tripId as string, expenseId },
    });
    handleCloseModal();
  };

  return (
    <SafeAreaView edges={["bottom"]} style={styles.container}>
      <FlatList
        data={combinedExpenses.data ?? []}
        contentContainerStyle={{ gap: 20 }}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={() => (
          <ExpensesHeader totalAmount={combinedExpenses.totalAmount} />
        )}
        renderItem={({ item }) => (
          <ExpenseItem item={item} handleModal={handleModal} />
        )}
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
      <Modal
        isOpen={isModalOpen}
        selectedId={selectedExpenseId}
        updateTrip={handleEditExpense}
        removeTrip={handleDeleteExpense}
        closeModal={handleCloseModal}
      />
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
