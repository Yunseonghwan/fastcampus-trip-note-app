import { theme } from "@/constants/theme";
import { useGetTripDetail } from "@/hooks/useTripDetail";
import dayjs from "dayjs";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";
import { SafeAreaView } from "react-native-safe-area-context";

const TripDetailScreen = () => {
  const { tripDetailId } = useLocalSearchParams();
  const { data: tripDetail } = useGetTripDetail(tripDetailId as string);

  return (
    <SafeAreaView edges={["bottom"]} style={styles.container}>
      <ScrollView>
        <Image
          source={{ uri: tripDetail?.image }}
          contentFit="cover"
          style={{ width: "100%", height: 250 }}
        />
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{tripDetail?.title}</Text>
          <View style={styles.infoRow}>
            <Text style={styles.date}>
              {dayjs(tripDetail?.createdAt).format("YYYY.MM.DD HH:mm")}
            </Text>
            <Text style={styles.date}>{tripDetail?.weather}</Text>
          </View>
          <Text style={styles.content}>{tripDetail?.content}</Text>
        </View>
        <View>
          <BannerAd
            unitId={TestIds.ADAPTIVE_BANNER}
            size={BannerAdSize.LARGE_BANNER}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  contentContainer: {
    padding: 20,
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: theme.fonts.bold,
    color: theme.colors.black,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  date: {
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    color: theme.colors.gray,
  },
  content: {
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    color: theme.colors.black,
  },
});

export default TripDetailScreen;
