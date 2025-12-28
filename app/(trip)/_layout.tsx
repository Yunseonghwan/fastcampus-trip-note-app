import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { Stack, useRouter } from "expo-router";
import { Pressable } from "react-native";

const TripLayout = () => {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="createTrip/index"
        options={{
          title: "여행생성",
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
        name="updateTrip/index"
        options={{
          title: "여행수정",
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
      <Stack.Screen name="[tripId]" options={{ headerShown: false }} />
    </Stack>
  );
};

export default TripLayout;
