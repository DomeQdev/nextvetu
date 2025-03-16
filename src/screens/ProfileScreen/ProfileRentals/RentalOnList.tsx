import theme from "@/util/theme";
import { Rental } from "@/util/typings";
import { Image, StyleSheet, View } from "react-native";
import { Icon, Text, TouchableRipple } from "react-native-paper";

type Props = {
    rental: Rental;
    displayDate?: boolean;
    isActive: boolean;
    setActive: () => void;
};

// export type Rental = {
//     node: "rental";
//     id: number;
//     bike: string;
//     biketype: number;
// domain: string;
//     start_place: number;
//     start_place_lat: number;
//     start_place_lng: number;
//     start_place_name: string;
//     end_place: number;
//     end_place_lat: number;
//     end_place_lng: number;
//     end_place_name: string;
//     start_time: number;
//     end_time: number;
//     price: number;
//     price_service: number;
//     distance: number;
// };

export default ({ rental, displayDate, isActive, setActive }: Props) => {
    return (
        <View>
            {displayDate && <Text>{new Date(rental.start_time * 1000).toLocaleDateString("pl-PL")}</Text>}

            <TouchableRipple onPress={setActive}>
                <View style={[styles.rental, isActive && styles.rentalActive]}>
                    <RentalStations rental={rental} />

                    <Image
                        source={{
                            uri: `https://static.nextbike.net/app/biketypes/type/${rental.domain}/${rental.biketype}/h200.png`,
                        }}
                        style={styles.image}
                    />
                </View>
            </TouchableRipple>
        </View>
    );
};

const RentalStations = ({ rental }: { rental: Rental }) => {
    return (
        <View style={styles.stationsContainer}>
            <View style={styles.station}>
                <Text>{getTimeString(rental.start_time)}</Text>
                <StationIcon source="map-marker" />
                <Text>{rental.start_place_name}</Text>
            </View>

            <View style={styles.station}>
                <Text>{getTimeString(rental.end_time)}</Text>
                <StationIcon source="flag-checkered" />
                <Text>{rental.end_place_name}</Text>
            </View>
        </View>
    );
};

const StationIcon = ({ source }: { source: string }) => {
    return (
        <View style={styles.stationIcon}>
            <Icon source={source} size={16} color={theme.colors.onPrimaryContainer} />
        </View>
    );
};

const getTimeString = (time: number) => {
    return new Date(time * 1000).toLocaleTimeString("pl-PL", { hour: "2-digit", minute: "2-digit" });
};

const styles = StyleSheet.create({
    rental: {
        backgroundColor: theme.colors.elevation.level5,
        borderRadius: 16,
        margin: 8,
        padding: 16,
        minHeight: 100,
    },
    rentalActive: {
        borderColor: theme.colors.primary,
        borderWidth: 2,
        padding: 14,
    },
    stationsContainer: {
        flex: 1,
        flexDirection: "column",
        zIndex: 10,
    },
    station: {
        flexDirection: "row",
        alignItems: "center",
    },
    stationIcon: {
        backgroundColor: theme.colors.primaryContainer,
        borderRadius: 8,
        padding: 6,
    },
    image: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        opacity: 0.1,
    },
});
