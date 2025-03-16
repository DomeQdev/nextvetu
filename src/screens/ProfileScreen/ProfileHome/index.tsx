import { useAuth } from "@/hooks/AuthContext";
import theme from "@/util/theme";
import { Image, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileSettings from "./ProfileSettings";
import ProfileActions from "./ProfileActions";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ProfileStackParamList } from "..";

export default (props: NativeStackScreenProps<ProfileStackParamList, "ProfileHome">) => {
    const { user, logout } = useAuth();

    const isFemale = +user!.pesel[9] % 2 === 0;

    return (
        <SafeAreaView>
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

            <ProfileActions {...props} />
            <ProfileSettings />

            <Button
                mode="outlined"
                icon="logout"
                textColor={theme.colors.onPrimary}
                style={{ margin: 16 }}
                onPress={logout}
            >
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
