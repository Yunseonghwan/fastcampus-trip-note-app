import { theme } from "@/constants/theme";
import { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface ModalProps {
  selectedId: string | null;
  isOpen: boolean;
  closeModal: () => void;
  updateTrip: (id: string) => void;
  removeTrip: (id: string) => void;
}

const Modal = ({
  selectedId,
  isOpen,
  closeModal,
  updateTrip,
  removeTrip,
}: ModalProps) => {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);

  useEffect(() => {
    if (isOpen) {
      opacity.value = withTiming(1, {
        duration: 200,
      });
      scale.value = withTiming(1, {
        duration: 200,
      });
    } else {
      opacity.value = withTiming(0, {
        duration: 150,
      });
      scale.value = withTiming(0.8, {
        duration: 150,
      });
    }
  }, [isOpen, opacity, scale]);

  const contentStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  if (!isOpen) return null;
  return (
    <View style={styles.container}>
      <Pressable style={styles.dimArea} onPress={closeModal} />
      <Animated.View style={[styles.content, contentStyle]}>
        <Pressable
          style={styles.button}
          onPress={() => updateTrip(selectedId!)}
        >
          <Text style={styles.text}>수정</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => removeTrip(selectedId!)}
        >
          <Text style={styles.text}>삭제</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dimArea: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  content: {
    width: 200,
    height: 150,
    backgroundColor: theme.colors.white,
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  button: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: theme.colors.gray,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: theme.fonts.medium,
  },
});

export default Modal;
