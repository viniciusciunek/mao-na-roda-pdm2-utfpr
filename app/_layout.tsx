import "../global.css";

import React, { useEffect } from "react";
import { Stack, useRouter, usePathname } from 'expo-router';
import { SafeAreaProvider } from "react-native-safe-area-context";

import { useFonts, Poppins_700Bold, Poppins_900Black, Poppins_400Regular } from "@expo-google-fonts/poppins";
import { Nunito_900Black, Nunito_400Regular, Nunito_200ExtraLight } from "@expo-google-fonts/nunito";

import useAuth from "../src/store/useAuth";
import Loading from "../src/components/Loading";

function AuthWrapper() {
    const { user, role, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (user) {
                if (role === "admin") {
                    router.replace("/(admin)");
                } else if (role === "customer") {
                    router.replace("/(customer)");
                }
            } else {
                router.replace("/");
                router.navigate("/");
                router.push("/");
            }
        }
    }, [loading, user, role]);

    if (loading) return <Loading />;

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
        </SafeAreaProvider>
    );
}
