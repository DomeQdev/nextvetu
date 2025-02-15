import { useAuth } from "@/src/hooks/AuthContext";
import theme from "@/src/util/theme";
import { CompositeScreenProps, useIsFocused, useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, View } from "react-native";
import { Button, Divider, List, Switch, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { TabStackParamList } from "../App";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

type Props = CompositeScreenProps<
    BottomTabScreenProps<TabStackParamList, "Profile">,
    NativeStackScreenProps<any>
>;

export default ({ navigation }: Props) => {
    const { user, logout } = useAuth();
    const isFocused = useIsFocused();

    const isFemale = +user!.pesel[9] % 2 === 0;

    return (
        <SafeAreaView>
            {isFocused && <StatusBar style="light" />}

            <View style={styles.profileBox}>
                <Image
                    source={isFemale ? require("@/assets/female.png") : require("@/assets/male.png")}
                    style={styles.profile}
                />

                <View>
                    <Text variant="titleMedium">{user!.screen_name}</Text>
                    <Text>
                        {(user!.credits / 100).toFixed(2)} {user!.currency}
                    </Text>
                </View>
            </View>

            <Text variant="bodyMedium" style={{ marginHorizontal: 24 }}>
                Twoje konto
            </Text>
            <View style={styles.box}>
                <List.Item
                    title="Wypożyczenia"
                    left={(props) => <List.Icon {...props} icon="account" />}
                    onPress={() => navigation.navigate("Map", { screen: "Rentals" })}
                />
                <Divider />
                <List.Item
                    title="Doładuj konto"
                    left={(props) => <List.Icon {...props} icon="cash-plus" />}
                />
                <Divider />
                <List.Item
                    title="Pomoc techniczna"
                    left={(props) => <List.Icon {...props} icon="lifebuoy" />}
                />
            </View>

            <Text variant="bodyMedium" style={{ marginHorizontal: 24 }}>
                Ustawienia
            </Text>
            <View style={styles.box}>
                <List.Item title="Agresywnie wibruj" right={(props) => <Switch {...props} />} />
            </View>

            <Button mode="outlined" icon="logout" style={{ margin: 16 }} onPress={logout}>
                Wyloguj się
            </Button>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    profileBox: {
        backgroundColor: theme.colors.elevation.level5,
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 16,
        margin: 16,
        padding: 12,
        gap: 16,
    },
    profile: {
        height: 72,
        width: 72,
        borderRadius: 32,
    },
    box: {
        backgroundColor: theme.colors.elevation.level2,
        borderRadius: 16,
        marginTop: 8,
        marginBottom: 16,
        marginHorizontal: 16,
    },
});
