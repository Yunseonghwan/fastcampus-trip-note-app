import { useState } from "react";
import { Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MyTripList = () => {
  const [inputValue, setInputValue] = useState("");
  return (
    <SafeAreaView>
      <TextInput
        keyboardType="email-address"
        value={inputValue}
        style={{ width: 200, height: 40, borderWidth: 1 }}
        onChangeText={(text) => setInputValue(text)}
      />
      <Text>{inputValue}</Text>
    </SafeAreaView>
  );
};

export default MyTripList;
