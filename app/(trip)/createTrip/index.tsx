import Input from "@/components/Input";
import { theme } from "@/constants/theme";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CreateTripScreen = () => {
  return (
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
          <Pressable style={styles.button}>
            <Text
              style={{
                color: theme.colors.white,
                fontSize: 18,
                fontFamily: theme.fonts.semibold,
              }}
            >
              여행 생성하기
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
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
  button: {
    width: "100%",
    height: 52,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CreateTripScreen;
