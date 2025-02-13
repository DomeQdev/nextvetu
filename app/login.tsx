import { Image, Linking, TextInput as RNTextInput } from "react-native";
import { useState, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { Button, HelperText, TextInput } from "react-native-paper";
import { login, recoverPin } from "@/src/util/api";
import { useRouter } from "expo-router";
import { useAuth } from "@/src/hooks/AuthContext";
import theme from "@/src/util/theme";

export default () => {
    const { setLoginUser } = useAuth();
    const router = useRouter();

    const [phone, setPhone] = useState("");
    const [phoneError, setPhoneError] = useState("");

    const [pin, setPin] = useState("");
    const [pinError, setPinError] = useState("");
    const pinInputRef = useRef<RNTextInput>(null);

    const [loginLoading, setLoginLoading] = useState(false);
    const [recoverLoading, setRecoverLoading] = useState(false);

    const formatNumber = (text: string) => {
        const numbers = text.replace(/[^\d]/g, "");
        return numbers.replace(/(\d{3})(?=\d)/g, "$1 ").trim();
    };

    const handlePhoneChange = (text: string) => {
        const formattedPhone = formatNumber(text);
        setPhone(formattedPhone);
        setPhoneError("");
        setPinError("");

        if (text.replace(/\D/g, "").length === 9) {
            pinInputRef.current?.focus();
        }
    };

    const handlePinChange = (text: string) => {
        const formattedPin = formatNumber(text);
        setPin(formattedPin);
        setPhoneError("");
        setPinError("");

        if (text.replace(/\D/g, "").length === 6) {
            handleLogin(text.replace(/[^0-9]/g, ""));
        }
    };

    const handleLogin = async (forcePin?: string) => {
        setLoginLoading(true);

        const response = await login(phone.replace(/[^0-9]/g, ""), forcePin || pin.replace(/[^0-9]/g, ""));

        if (response.error) {
            setPhoneError("Nieprawidłowy numer telefonu");
            setPinError("Nieprawidłowy PIN");

            return setLoginLoading(false);
        }

        setLoginUser(response.user);
        setTimeout(() => router.replace("/(app)"), 300);
    };

    const handleRecoverPIN = async () => {
        if (phone.replace(/[^0-9]/g, "").length !== 9) return setPhoneError("Wpisz numer telefonu");

        setRecoverLoading(true);

        await recoverPin(phone.replace(/[^0-9]/g, ""));

        setTimeout(() => setRecoverLoading(false), 4500);
    };

    return (
        <View style={styles.container}>
            <Image source={require("@/assets/veturilo.png")} style={styles.logo} />

            <View style={styles.inputContainer}>
                <TextInput
                    label="Telefon"
                    mode="outlined"
                    value={phone}
                    onChangeText={handlePhoneChange}
                    keyboardType="number-pad"
                    placeholder="123 456 789"
                    autoComplete="tel-national"
                    maxLength={11}
                    error={!!phoneError}
                />

                <HelperText type="error" visible={!!phoneError}>
                    {phoneError}
                </HelperText>
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    ref={pinInputRef}
                    label="PIN"
                    mode="outlined"
                    value={pin}
                    onChangeText={handlePinChange}
                    keyboardType="number-pad"
                    placeholder="123 456"
                    autoComplete="current-password"
                    error={!!pinError}
                    maxLength={7}
                    right={
                        <TextInput.Icon icon="message-text" onPress={() => Linking.openURL("sms:nextbike")} />
                    }
                />

                <HelperText type="error" visible={!!pinError}>
                    {pinError}
                </HelperText>
            </View>

            <Button
                mode="contained"
                onPress={() => handleLogin()}
                loading={loginLoading}
                disabled={loginLoading}
            >
                Zaloguj się
            </Button>

            <View style={styles.secondButtons}>
                <Button
                    mode="text"
                    onPress={() => Linking.openURL("https://account.nextbike.pl/pl-PL/pl/register")}
                >
                    Zarejestruj się
                </Button>
                <Button
                    mode="text"
                    onPress={handleRecoverPIN}
                    loading={recoverLoading}
                    disabled={recoverLoading}
                >
                    Przypomnij PIN
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: theme.colors.background,
        padding: 16,
        gap: 16,
    },
    logo: {
        width: 100,
        height: 100,
        alignSelf: "center",
        borderRadius: 16,
    },
    inputContainer: {
        marginBottom: -10,
    },
    secondButtons: {
        flexDirection: "row",
        justifyContent: "flex-end",
    },
});
