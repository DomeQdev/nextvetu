import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useIsFocused } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import ProfileHome from "./ProfileHome";
import theme from "@/util/theme";
import ProfileRentals from "./ProfileRentals";

export type ProfileStackParamList = {
    ProfileHome: undefined;
    ProfileRentals: undefined;
};

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export default () => {
    const isFocused = useIsFocused();

    return (
        <>
            {isFocused && <StatusBar style="light" />}

            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: theme.colors.background },
                }}
            >
                <Stack.Screen name="ProfileHome" component={ProfileHome} />
                <Stack.Screen name="ProfileRentals" component={ProfileRentals} />
            </Stack.Navigator>
        </>
    );
};
