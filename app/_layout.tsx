import "../global.css";

import { Nunito_200ExtraLight, Nunito_400Regular, Nunito_900Black } from "@expo-google-fonts/nunito";
import { Poppins_400Regular, Poppins_700Bold, Poppins_900Black, useFonts } from "@expo-google-fonts/poppins";
import React, { useEffect } from "react";
import { Stack, useGlobalSearchParams, useLocalSearchParams, usePathname, useRouter } from 'expo-router';

import AuthService from "../src/services/authService";
import Loading from "../src/components/Loading";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import pb from "../src/services/pocketbase";
import useAuth from "../src/store/useAuth";

function AuthWrapper() {
    const { setRole } = useAuth();
    const router = useRouter();

    const pathname = usePathname();
    const searchParams = useGlobalSearchParams();
    const token = searchParams.token;
    const budgetId = searchParams.budgetId;

    useEffect(() => {
        if (pathname.includes("/customer/budget/show") && token && budgetId) {
            // if (token && budgetId) {
            pb.authStore.clear();

            pb.authStore.save(token.toString(), {
                role: "customer",
            })

            setRole("customer");

            return;
        }

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
