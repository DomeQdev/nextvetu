import { useAuth } from "@/hooks/AuthContext";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomNavigation, Icon } from "react-native-paper";
import ProfileScreen from "./screens/ProfileScreen";
import LoginScreen from "./screens/LoginScreen";
import MapScreen from "./screens/MapScreen";
import { useNavigationState } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    const navigationState = useNavigationState((state) => state);

    const getRouteName = () => {
        const routes = navigationState?.routes;
        const currentTab = routes?.[navigationState.index];
        const nestedState = currentTab?.state;
        return nestedState?.routes?.[nestedState.index!]?.name;
    };

    const shouldShowTab = () => {
        const currentRoute = getRouteName();
        return !["ProfileRentals"].includes(currentRoute!);
    };

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
            }}
            tabBar={({ navigation, state, descriptors, insets }) => (
                <BottomNavigation.Bar
                    navigationState={state}
                    safeAreaInsets={insets}
                    style={{
                        display: shouldShowTab() ? "flex" : "none",
                    }}
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

export default () => {
    const { user, isLoading } = useAuth();

    if (isLoading) return null;

    if (user) return <TabNavigator />;
    return <LoginScreen />;
};
