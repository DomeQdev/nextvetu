import theme from "@/util/theme";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";
import { Divider, List, Text } from "react-native-paper";
import { ProfileStackParamList } from "..";
import { useAuth } from "@/hooks/AuthContext";
import { getPaymentLinks } from "@/util/api";
import * as Linking from "expo-linking";

export default ({ navigation }: NativeStackScreenProps<ProfileStackParamList, "ProfileHome">) => {
    const { user, apiKey } = useAuth();

    return (
        <>
            <Text variant="bodyMedium" style={{ marginHorizontal: 24 }}>
                Twoje konto
            </Text>
            <View style={styles.box}>
                <List.Item
                    title="Historia wypożyczeń"
                    left={(props) => <List.Icon {...props} icon="bike" />}
                    onPress={() => navigation.navigate("ProfileRentals")}
                />
                <Divider />
                <List.Item
                    title="Doładuj konto"
                    left={(props) => <List.Icon {...props} icon="cash-plus" />}
                    onPress={async () => {
                        const links = await getPaymentLinks(user!.loginkey, apiKey!);

                        const link = links.unlocklinks.find((l) => l.option === "transferuj_freeamount");
                        if (!link) return;

                        await Linking.openURL(link.link_url);
                    }}
                />
                <Divider />
                <List.Item
                    title="Pomoc techniczna"
                    left={(props) => <List.Icon {...props} icon="lifebuoy" />}
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
