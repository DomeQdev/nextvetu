import { useAuth } from "@/src/hooks/AuthContext";
import theme from "@/src/util/theme";
import { CommonActions } from "@react-navigation/native";
import { Redirect, Tabs } from "expo-router";
import { BottomNavigation, Icon } from "react-native-paper";

export default () => {
    const { user, isLoading } = useAuth();

    if (isLoading) return null;
    if (!user) return <Redirect href="/login" />;

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                sceneStyle: {
                    backgroundColor: theme.colors.background,
                },
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
                            navigation.dispatch({
                                ...CommonActions.navigate(route.name, route.params),
                                target: state.key,
                            });
                        }
                    }}
                    getLabelText={({ route }) => descriptors[route.key].options.title}
                    renderIcon={({ route, focused, color }) =>
                        descriptors[route.key].options.tabBarIcon?.({ focused, color, size: 24 })
                    }
                />
            )}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Mapa",
                    tabBarIcon: ({ focused, color, size }) => (
                        <Icon source={focused ? "map" : "map-outline"} color={color} size={size} />
                    ),
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profil",
                    tabBarIcon: ({ focused, color, size }) => (
                        <Icon source={focused ? "account" : "account-outline"} color={color} size={size} />
                    ),
                }}
            />
        </Tabs>
    );
};
