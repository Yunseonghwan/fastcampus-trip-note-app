import { theme } from "@/constants/theme";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { memo, useState } from "react";
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

const formatDate = (date: Date) => {
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}.`;
};

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
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const handleStartDateChange = (
    event: DateTimePickerEvent,
    date?: Date,
  ) => {
    if (Platform.OS === "android") {
      setShowStartPicker(false);
    }
    if (event.type === "set" && date) {
      setStartDate(date);
      if (endDate && date > endDate) {
        setEndDate(date);
      }
    }
  };

  const handleEndDateChange = (
    event: DateTimePickerEvent,
    date?: Date,
  ) => {
    if (Platform.OS === "android") {
      setShowEndPicker(false);
    }
    if (event.type === "set" && date) {
      setEndDate(date);
    }
  };

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
                {Platform.OS === "android" ? (
                  <Pressable
                    onPress={() => setShowStartPicker(true)}
                    style={styles.dateButton}
                  >
                    <Text style={styles.dateText}>
                      {formatDate(startDate ?? new Date())}
                    </Text>
                  </Pressable>
                ) : (
                  <DateTimePicker
                    value={startDate ?? new Date()}
                    mode="date"
                    display="default"
                    locale="ko-KR"
                    onChange={handleStartDateChange}
                  />
                )}
                {Platform.OS === "android" && showStartPicker && (
                  <DateTimePicker
                    value={startDate ?? new Date()}
                    mode="date"
                    display="default"
                    onChange={handleStartDateChange}
                  />
                )}
              </View>
              <View style={[styles.dateContainer, { marginTop: 12 }]}>
                <Text>종료일</Text>
                {Platform.OS === "android" ? (
                  <Pressable
                    onPress={() => setShowEndPicker(true)}
                    style={styles.dateButton}
                  >
                    <Text style={styles.dateText}>
                      {formatDate(endDate ?? new Date())}
                    </Text>
                  </Pressable>
                ) : (
                  <DateTimePicker
                    value={endDate ?? new Date()}
                    mode="date"
                    display="default"
                    locale="ko-KR"
                    onChange={handleEndDateChange}
                    minimumDate={startDate}
                  />
                )}
                {Platform.OS === "android" && showEndPicker && (
                  <DateTimePicker
                    value={endDate ?? new Date()}
                    mode="date"
                    display="default"
                    onChange={handleEndDateChange}
                    minimumDate={startDate}
                  />
                )}
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
  dateButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
  },
  dateText: {
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    color: "#333",
  },
  buttonContainer: {
    marginTop: "auto",
  },
});

export default memo(TripForm);
