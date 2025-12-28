import { theme } from "@/constants/theme";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MyTripList = () => {
  return (
    <SafeAreaView>
      <Text style={{ fontFamily: theme.fonts.bold }}>폰트 적용 확인</Text>
    </SafeAreaView>
  );
};

export default MyTripList;
