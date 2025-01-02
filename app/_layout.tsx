import "../global.css";

import React, { useEffect } from "react";
import { Stack, useRouter, usePathname } from 'expo-router';
import { SafeAreaProvider } from "react-native-safe-area-context";

import { useFonts, Poppins_700Bold, Poppins_900Black, Poppins_400Regular } from "@expo-google-fonts/poppins";
import { Nunito_900Black, Nunito_400Regular, Nunito_200ExtraLight } from "@expo-google-fonts/nunito";

import Toast from "react-native-toast-message";
import Loading from "../src/components/Loading";
import AuthService from "../src/services/authService";

function AuthWrapper() {
    const router = useRouter();

    useEffect(() => {
        if (!AuthService.isAuthenticated()) {
            AuthService.clearAuth();
            router.replace("/");
        } else {
            const role = AuthService.getRole();

            switch (role) {
                case "admin":
                    router.replace("/admin/home");
                    break;

                case "customer":
                    router.replace("/customer/home");
                    break;

                default:
                    router.replace("/customer/home");
                    break;
            }
        }
    }, []);

    return <Stack screenOptions={{ headerShown: false }} />;
}

export default function Layout() {
    let [fontsLoaded] = useFonts({
        Poppins_700Bold,
        Poppins_400Regular,
        Poppins_900Black,
        Nunito_900Black,
        Nunito_400Regular,
        Nunito_200ExtraLight,
    });

    if (!fontsLoaded) {
        return <Loading />;
    }

    return (
        <SafeAreaProvider>
            <AuthWrapper />
            <Toast />
        </SafeAreaProvider>
    );
}
