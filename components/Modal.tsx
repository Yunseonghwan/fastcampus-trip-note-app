import { theme } from "@/constants/theme";
import { Pressable, StyleSheet, Text, View } from "react-native";

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
  if (!isOpen) return null;
  return (
    <View style={styles.container}>
      <Pressable style={styles.dimArea} onPress={closeModal} />
      <View style={styles.content}>
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
      </View>
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
