import { useEffect } from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import Animated, {
    interpolateColor,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";

export default ({ selected }: { selected: boolean }) => {
    const theme = useTheme();
    const position = useSharedValue(selected ? 10 : -10);
    const handleSize = useSharedValue(selected ? 24 : 16);

    const handleStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: position.value }],
        height: handleSize.value,
        width: handleSize.value,
        backgroundColor: interpolateColor(
            position.value,
            [-10, 10],
            [theme.colors.outline, theme.colors.onPrimary]
        ),
        position: "absolute",
        marginLeft: selected ? 12 : 16,
        borderRadius: 20,
    }));

    const trackStyle = useAnimatedStyle(() => ({
        backgroundColor: interpolateColor(
            position.value,
            [-10, 10],
            [theme.colors.surfaceVariant, theme.colors.primary]
        ),
        borderColor: interpolateColor(
            position.value,
            [-10, 10],
            [theme.colors.outline, theme.colors.primary]
        ),
        borderWidth: 2,
        borderRadius: 16,
        height: 32,
        width: 52,
        justifyContent: "center",
    }));

    useEffect(() => {
        position.value = withTiming(selected ? 10 : -10, { duration: 250 });
        handleSize.value = withTiming(selected ? 24 : 16, { duration: 100 });
    }, [selected]);

    return (
        <View style={{ borderRadius: 20, marginRight: -8 }}>
            <Animated.View style={trackStyle}>
                <Animated.View style={handleStyle} />
            </Animated.View>
        </View>
    );
};
