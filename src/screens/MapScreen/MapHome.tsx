import { MapChildrenPortal } from "@/hooks/MapContext";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";

export default () => {
    return (
        <MapChildrenPortal>
            <Button icon="qrcode-scan" mode="contained" style={styles.rentButton} onPress={() => {}}>
                Hello, World!
            </Button>
        </MapChildrenPortal>
    );
};

const styles = StyleSheet.create({
    rentButton: {
        position: "absolute",
        bottom: 16,
        left: 16,
        right: 16,
        zIndex: 1,
    },
});
