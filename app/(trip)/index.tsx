import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const MyTripList = () => {
  return (
    <SafeAreaView>
      <Link href="/(trip)/createTrip">여행 생성 화면으로 이동</Link>
      <Link href="/(trip)/updateTrip">여행 수정 화면으로 이동</Link>
    </SafeAreaView>
  );
};

export default MyTripList;
