import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router, Stack } from "expo-router";
import { Pressable } from "react-native";

const TripDetailLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "여행 상세",
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
          title: "여행 상세 생성",
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
          title: "여행 상세 수정",
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
          title: "여행 상세 보기",
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
          title: "여행 경비",
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
          title: "경비 생성",
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
          title: "경비 수정",
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
