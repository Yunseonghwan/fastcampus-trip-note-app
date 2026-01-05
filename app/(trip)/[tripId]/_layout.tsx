import { useTripTitleStore } from "@/store/useTripTitleStore";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router, Stack } from "expo-router";
import { Pressable } from "react-native";

const TripDetailLayout = () => {
  const { title } = useTripTitleStore((state) => state);
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: title,
          headerLeft: () => (
            <Pressable onPress={() => router.back()}>
              <MaterialIcons
                name="arrow-back-ios-new"
                size={24}
                color="black"
              />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="createTripDetail/index"
        options={{
          title: `${title} 생성`,
          headerLeft: () => (
            <Pressable onPress={() => router.back()}>
              <MaterialIcons
                name="arrow-back-ios-new"
                size={24}
                color="black"
              />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="updateTripDetail/index"
        options={{
          title: `${title} 수정`,
          headerLeft: () => (
            <Pressable onPress={() => router.back()}>
              <MaterialIcons
                name="arrow-back-ios-new"
                size={24}
                color="black"
              />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="[tripDetailId]/index"
        options={{
          title: title,
          headerLeft: () => (
            <Pressable onPress={() => router.back()}>
              <MaterialIcons
                name="arrow-back-ios-new"
                size={24}
                color="black"
              />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="expenses/index"
        options={{
          title: `${title} 여행 경비`,
          headerLeft: () => (
            <Pressable onPress={() => router.back()}>
              <MaterialIcons
                name="arrow-back-ios-new"
                size={24}
                color="black"
              />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="expenses/createExpenses/index"
        options={{
          title: `${title} 경비 생성`,
          headerLeft: () => (
            <Pressable onPress={() => router.back()}>
              <MaterialIcons
                name="arrow-back-ios-new"
                size={24}
                color="black"
              />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="expenses/updateExpenses/index"
        options={{
          title: `${title} 경비 수정`,
          headerLeft: () => (
            <Pressable onPress={() => router.back()}>
              <MaterialIcons
                name="arrow-back-ios-new"
                size={24}
                color="black"
              />
            </Pressable>
          ),
        }}
      />
    </Stack>
  );
};

export default TripDetailLayout;
