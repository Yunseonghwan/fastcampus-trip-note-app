import TripDetailForm from "@/components/TripDetailForm";
import { useCreateTripDetail, useGetWeather } from "@/hooks/useTripDetail";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

const CreateTripDetailScreen = () => {
  const { tripId } = useLocalSearchParams();
  const router = useRouter();
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { data: weatherData } = useGetWeather(
    location?.coords.latitude ?? 0,
    location?.coords.longitude ?? 0
  );

  const { mutateAsync } = useCreateTripDetail();

  const createTrip = async () => {
    await mutateAsync(
      {
        tripId: String(tripId),
        title: title,
        content: content,
        image: image as ImagePicker.ImagePickerAsset,
        weather: convertWeather(weatherData?.weather[0].main) ?? "",
      },
      {
        onSuccess: () => {
          router.back();
        },
      }
    );
  };

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert(
        "권한 필요",
        "사진 라이브러리에 접근하려면 권한이 필요합니다.",
        [{ text: "취소", style: "cancel" }]
      );
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  useEffect(() => {
    const getCurrentLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("권한 요청을 거부 했습니다");
        return;
      }
      let location = await Location.getCurrentPositionAsync();
      setLocation(location);
    };
    getCurrentLocation();
  }, []);

  const convertWeather = (weather: string) => {
    switch (weather) {
      case "Clouds":
        return "흐림";
      case "Clear":
        return "맑음";
      case "Rain":
        return "비";
      case "Snow":
        return "눈";
      case "Mist":
        return "안개";
    }
  };

  return (
    <TripDetailForm
      title={title}
      setTitle={setTitle}
      content={content}
      setContent={setContent}
      pickImage={pickImage}
      onPress={createTrip}
      weatherData={convertWeather(weatherData?.weather[0].main) ?? ""}
      image={image}
    />
  );
};

export default CreateTripDetailScreen;
