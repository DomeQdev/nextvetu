import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ActivityIndicator, Appbar, Text } from "react-native-paper";
import { ProfileStackParamList } from "..";
import { useQuery } from "react-query";
import { getUserRentals } from "@/util/api";
import { useAuth } from "@/hooks/AuthContext";
import { useEffect, useState } from "react";
import { Rental } from "@/util/typings";
import { View } from "react-native";
import RentalOnMap from "./RentalOnMap";
import RentalsList from "./RentalsList";
import Map from "@/components/Map";

export default ({ navigation }: NativeStackScreenProps<ProfileStackParamList, "ProfileRentals">) => {
    const [activeRental, setActiveRental] = useState<Rental | undefined>();
    const { user, apiKey } = useAuth();

    const { data, isLoading } = useQuery({
        queryKey: ["rentals"],
        queryFn: () => getUserRentals(user!.loginkey, apiKey!),
    });

    useEffect(() => {
        if (data?.length) setActiveRental(data[0]);
    }, [data]);

    return (
        <>
            <Appbar.Header>
                <Appbar.BackAction onPress={navigation.goBack} />
                <Appbar.Content title="Historia wypożyczeń" />
            </Appbar.Header>

            {isLoading && <ActivityIndicator size="large" style={{ marginTop: 16 }} />}

            {!data?.length && !isLoading && (
                <Text variant="titleMedium" style={{ marginLeft: 16 }}>
                    Brak wypożyczeń w tym sezonie
                </Text>
            )}

            {data?.length && (
                <View style={{ flex: 1 }}>
                    <Map style={{ flex: 1 }}>{activeRental && <RentalOnMap rental={activeRental} />}</Map>

                    <RentalsList
                        rentals={data}
                        activeRental={activeRental}
                        setActiveRental={setActiveRental}
                    />
                </View>
            )}
        </>
    );
};
