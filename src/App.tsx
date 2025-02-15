import { useAuth } from "@/src/hooks/AuthContext";
import { NavigationContainer, NavigatorScreenParams } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BottomNavigation, Icon } from "react-native-paper";
import LoginScreen from "./screens/LoginScreen";
import MapScreen, { MapStackParamList } from "./screens/MapScreen";
import ProfileScreen from "./screens/ProfileScreen";
import theme from "./util/theme";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export type TabStackParamList = {
    Map: NavigatorScreenParams<MapStackParamList>;
    Profile: undefined;
};

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
            }}
            tabBar={({ navigation, state, descriptors, insets }) => (
                <BottomNavigation.Bar
                    navigationState={state}
                    safeAreaInsets={insets}
                    onTabPress={({ route, preventDefault }) => {
                        const event = navigation.emit({
                            type: "tabPress",
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (event.defaultPrevented) {
                            preventDefault();
                        } else {
                            navigation.navigate(route.name);
                        }
                    }}
                    getLabelText={({ route }) => descriptors[route.key].options.title || route.name}
                    renderIcon={({ route, focused, color }) =>
                        descriptors[route.key].options.tabBarIcon?.({ focused, color, size: 24 })
                    }
                />
            )}
        >
            <Tab.Screen
                name="Map"
                component={MapScreen}
                options={{
                    title: "Mapa",
                    tabBarIcon: ({ focused, color, size }) => (
                        <Icon source={focused ? "map" : "map-outline"} color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    title: "Profil",
                    tabBarIcon: ({ focused, color, size }) => (
                        <Icon source={focused ? "account" : "account-outline"} color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default function App() {
    const { user, isLoading } = useAuth();

    if (isLoading) return null;

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    contentStyle: {
                        backgroundColor: theme.colors.background,
                    },
                }}
            >
                {!user ? (
                    <Stack.Screen name="Login" component={LoginScreen} />
                ) : (
                    <Stack.Screen name="MainTabs" component={TabNavigator} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
