import Button from "@/components/Button";
import Input from "@/components/Input";
import { theme } from "@/constants/theme";
import Entypo from "@expo/vector-icons/Entypo";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { memo } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface TripDetailFormProps {
  tripDetailId?: string;
  image: ImagePicker.ImagePickerAsset | null;
  imageUrl?: string;
  pickImage: () => void;
  onPress: () => void;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  weatherData: string;
}

const TripDetailForm = ({
  tripDetailId,
  image,
  imageUrl,
  pickImage,
  onPress,
  title,
  setTitle,
  content,
  setContent,
  weatherData,
}: TripDetailFormProps) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <SafeAreaView edges={["bottom"]} style={styles.container}>
        <ScrollView contentContainerStyle={styles.formContainer}>
          <Pressable style={styles.imageContainer} onPress={pickImage}>
            {image || imageUrl ? (
              <Image
                source={{ uri: !image ? imageUrl : image.uri }}
                style={styles.image}
              />
            ) : (
              <View>
                <Entypo name="camera" size={24} color="black" />
                <Text style={styles.imageText}>이미지 추가</Text>
              </View>
            )}
          </Pressable>
          <Input
            label="제목"
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
          <Input label="날씨" value={weatherData ?? ""} editable={false} />
          <Input
            label="내용"
            value={content}
            style={{ height: 150, paddingVertical: 10 }}
            onChangeText={(text) => setContent(text)}
            multiline
          />
          <View style={{ marginTop: "auto" }}>
            <Button
              label={tripDetailId ? "여행기록 수정" : "여행기록 생성"}
              onPress={onPress}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  formContainer: {
    gap: 20,
    flexGrow: 1,
  },
  imageContainer: {
    width: "100%",
    height: 150,
    backgroundColor: theme.colors.white,
    borderRadius: 20,
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  imageText: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: theme.colors.gray,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 20,
  },
});

export default memo(TripDetailForm);
