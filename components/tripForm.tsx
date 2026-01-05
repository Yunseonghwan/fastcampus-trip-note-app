import { theme } from "@/constants/theme";
import DateTimePicker from "@react-native-community/datetimepicker";
import { memo } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "./Button";
import Input from "./Input";

interface TripFormProps {
  id?: string;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  handleChangeText: (text: string) => void;
  startDate?: Date;
  endDate?: Date;
  setStartDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  setEndDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  onPress: () => void;
}

const TripForm = ({
  id,
  title,
  handleChangeText,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  onPress,
}: TripFormProps) => {
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
            <Button label={id ? "여행 수정" : "여행 생성"} onPress={onPress} />
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

export default memo(TripForm);
