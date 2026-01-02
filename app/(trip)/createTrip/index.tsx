import Button from "@/components/Button";
import Input from "@/components/Input";
import { theme } from "@/constants/theme";
import { useCreateTrip } from "@/hooks/useTrip";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CreateTripScreen = () => {
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());

  const { mutateAsync } = useCreateTrip();

  const createTrip = () => {
    mutateAsync(
      {
        title,
        startDate,
        endDate,
      },
      {
        onSuccess: () => {
          router.back();
        },
      }
    );
  };

  const handleChangeText = useCallback(
    (text: string) => {
      setTitle(text);
    },
    [title]
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <SafeAreaView edges={["bottom"]} style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Input label="제목" value={title} onChangeText={handleChangeText} />
          <View>
            <Text style={styles.label}>여행 기간</Text>
            <View>
              <View style={styles.dateContainer}>
                <Text>시작일</Text>
                <DateTimePicker
                  value={startDate ?? new Date()}
                  mode="date"
                  display="default"
                  locale="ko-KR"
                  onChange={(_, date) => setStartDate(date)}
                />
              </View>
              <View style={[styles.dateContainer, { marginTop: 12 }]}>
                <Text>종료일</Text>
                <DateTimePicker
                  value={endDate ?? new Date()}
                  mode="date"
                  display="default"
                  locale="ko-KR"
                  onChange={(_, date) => setEndDate(date)}
                  minimumDate={startDate}
                />
              </View>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Button label="여행 생성하기" onPress={createTrip} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  scrollContainer: {
    gap: 30,
    flexGrow: 1,
  },
  label: {
    marginBottom: 20,
    fontSize: 18,
    fontFamily: theme.fonts.regular,
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonContainer: {
    marginTop: "auto",
  },
});

export default CreateTripScreen;
