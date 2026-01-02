import Button from "@/components/Button";
import Input from "@/components/Input";
import { theme } from "@/constants/theme";
import DateTimePicker from "@react-native-community/datetimepicker";
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
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <SafeAreaView edges={["bottom"]} style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Input label="제목" />
          <View>
            <Text style={styles.label}>여행 기간</Text>
            <View>
              <View style={styles.dateContainer}>
                <Text>시작일</Text>
                <DateTimePicker
                  value={new Date()}
                  mode="date"
                  display="default"
                  locale="ko-KR"
                />
              </View>
              <View style={[styles.dateContainer, { marginTop: 12 }]}>
                <Text>종료일</Text>
                <DateTimePicker
                  value={new Date()}
                  mode="date"
                  display="default"
                  locale="ko-KR"
                />
              </View>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Button label="여행 생성하기" />
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
