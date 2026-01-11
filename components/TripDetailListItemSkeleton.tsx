import { theme } from "@/constants/theme";
import { memo, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

interface SkeletonBoxProps {
  width: number | string;
  height: number;
  borderRadius?: number;
  style?: object;
}

const SkeletonBox = ({
  width,
  height,
  borderRadius,
  style,
}: SkeletonBoxProps) => {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(withTiming(1, { duration: 800 }), -1, true);
  });

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          borderRadius: borderRadius ?? 0,
          backgroundColor: theme.colors.gray100,
        },
        style,
        animatedStyle,
      ]}
    />
  );
};

const TripDetailListItemSkeleton = () => {
  return (
    <View>
      <SkeletonBox width="100%" height={170} style={styles.imageBox} />
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <SkeletonBox width={150} height={24} borderRadius={4} />
          <SkeletonBox width={150} height={18} borderRadius={4} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageBox: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  container: {
    padding: 24,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: theme.colors.white,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftContainer: {
    gap: 8,
  },
});

export default memo(TripDetailListItemSkeleton);
