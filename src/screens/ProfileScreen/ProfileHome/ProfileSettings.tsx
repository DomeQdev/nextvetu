import Switch from "@/components/Switch";
import theme from "@/util/theme";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { List, Text } from "react-native-paper";

export default () => {
    const [vibrate, setVibrate] = useState(true);

    return (
        <>
            <Text variant="bodyMedium" style={{ marginHorizontal: 24 }}>
                Ustawienia
            </Text>
            <View style={styles.box}>
                <List.Item
                    title=":)"
                    onPress={() => setVibrate(!vibrate)}
                    right={() => <Switch selected={vibrate} />}
                />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    box: {
        backgroundColor: theme.colors.elevation.level2,
        borderRadius: 16,
        marginTop: 8,
        marginBottom: 16,
        marginHorizontal: 16,
    },
});
