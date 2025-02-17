import theme from "@/util/theme";
import { Rental } from "@/util/typings";
import { Image, StyleSheet } from "react-native";
import { Text, TouchableRipple } from "react-native-paper";

type Props = {
    rental: Rental;
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

export default ({ rental, isActive, setActive }: Props) => {
    return (
        <TouchableRipple style={[styles.rental, isActive && styles.rentalActive]} onPress={setActive}>
            <>
                <Image
                    source={{
                        uri: `https://static.nextbike.net/app/biketypes/type/${rental.domain}/${rental.biketype}/h200.png`,
                    }}
                    style={styles.image}
                />

                <Text>
                    {rental.start_place_name} do {rental.end_place_name}, cena: {rental.price} {rental.price_service}
                </Text>
            </>
        </TouchableRipple>
    );
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
    },
    image: {
        // make it as a background image with low opacity
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        opacity: 0.1,
    },
});
