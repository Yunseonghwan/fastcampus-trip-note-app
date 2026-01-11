import TripDetailForm from "@/components/TripDetailForm";
import { useGetTripDetail, useUpdateTripDetail } from "@/hooks/useTripDetail";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

const UpdateTripDetailScreen = () => {
  const { tripDetailId } = useLocalSearchParams();
  const router = useRouter();
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [imageUrl, setImageUrl] = useState("");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [weatherData, setWeatherData] = useState("");

  const { data: tripDetailInfo } = useGetTripDetail(tripDetailId as string);

  const { mutateAsync } = useUpdateTripDetail();

  useEffect(() => {
    if (tripDetailInfo) {
      setTitle(tripDetailInfo.title);
      setContent(tripDetailInfo.content);
      setWeatherData(tripDetailInfo.weather);
      setImageUrl(tripDetailInfo.image);
    }
  }, [tripDetailInfo]);

  const updateTrip = async () => {
    await mutateAsync(
      {
        tripDetailId: tripDetailId as string,
        title: title,
        content: content,
        image: image as ImagePicker.ImagePickerAsset,
        weather: weatherData ?? "",
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

  return (
    <TripDetailForm
      tripDetailId={tripDetailId as string}
      title={title}
      setTitle={setTitle}
      content={content}
      setContent={setContent}
      pickImage={pickImage}
      onPress={updateTrip}
      weatherData={weatherData}
      image={image}
      imageUrl={imageUrl}
    />
  );
};

export default UpdateTripDetailScreen;
