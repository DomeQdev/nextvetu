import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import MapMarkers from "./MapMarkers";
import { MapNavigation } from "./MapRouter";

export default ({ navigation }: { navigation: MapNavigation }) => {
    return (
        <>
            <MapMarkers navigation={navigation} />

            <Button icon="qrcode-scan" mode="contained" style={styles.rentButton} onPress={() => {}}>
                Hello, World!
            </Button>
        </>
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
