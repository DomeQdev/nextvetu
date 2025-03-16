import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MapStackParamList } from ".";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Text } from "react-native-paper";
import { Station } from "@/util/typings";
import { StyleSheet, View } from "react-native";
import { MapNavigation } from "./MapRouter";

type Props = {
    navigation: MapNavigation;
    params: MapStackParamList["MapStation"];
};

export default ({ navigation, params }: Props) => {
    return (
        <BottomSheet
            snapPoints={[300]}
            style={{
                zIndex: 300,
            }}
            detached
            enablePanDownToClose
            onClose={() => navigation.goBack()}
        >
            <BottomSheetView>
                <Text>Station</Text>
            </BottomSheetView>
        </BottomSheet>
    );
};
