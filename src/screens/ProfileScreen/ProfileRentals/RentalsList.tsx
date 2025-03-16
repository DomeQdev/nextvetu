import { Rental } from "@/util/typings";
import { FlatList, StyleSheet, View } from "react-native";
import RentalOnList from "./RentalOnList";
import { useRef } from "react";
import * as Haptics from "expo-haptics";
import { Icon } from "react-native-paper";
import theme from "@/util/theme";

type Props = {
    rentals: Rental[];
    activeRental?: Rental;
    setActiveRental: (rental: Rental) => void;
};

export default ({ rentals, activeRental, setActiveRental }: Props) => {
    const listRef = useRef<FlatList>(null);

    return (
        <FlatList
            ref={listRef}
            data={rentals}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => (
                <RentalOnList
                    rental={item}
                    // displayDate={
                    //     index === 0 ||
                    //     new Date(item.start_time * 1000).toLocaleDateString("pl-PL") !==
                    //         new Date(rentals[index - 1].start_time * 1000).toLocaleDateString("pl-PL")
                    // }
                    isActive={item.id === activeRental?.id}
                    setActive={() => {
                        listRef.current?.scrollToItem({ item, animated: true });
                        setActiveRental(item);
                        Haptics.selectionAsync();
                    }}
                />
            )}
            style={{ flex: 1 }}
            decelerationRate="fast"
            viewabilityConfig={{
                itemVisiblePercentThreshold: 90,
                minimumViewTime: 0,
                waitForInteraction: true,
            }}
            onViewableItemsChanged={({ viewableItems }) => {
                if (!viewableItems.length) return;

                const item = viewableItems[0].item;
                if (item.id === activeRental?.id) return;

                setActiveRental(item);
                Haptics.selectionAsync();
            }}
            ListFooterComponent={() => (
                <View style={styles.ghostContainer}>
                    <Icon source="ghost" size={200} color={theme.colors.surfaceDisabled} />
                </View>
            )}
        />
    );
};

const styles = StyleSheet.create({
    ghostContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        margin: 36,
    },
});
