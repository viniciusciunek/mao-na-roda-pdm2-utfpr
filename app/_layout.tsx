import React, { useEffect, useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import { ThemeProvider, createTheme } from '@rneui/themed';

import { useFonts, Poppins_700Bold, Poppins_400Regular } from '@expo-google-fonts/poppins'
// import {} from '@expo-google-fonts/nunito'

import useAuth from '../src/store/useAuth';
import Loading from '../src/components/Loading';

/**
 * Componente que gerencia a autenticação e redirecionamento de usuários.
 */
function AuthWrapper() {
    const { user, role, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (user) {
                if (role === 'admin') {
                    router.replace('/(admin)/');
                } else if (role === 'customer') {
                    router.replace('/(customer)/');
                }
            } else {
                router.replace('/(guest)/login');
            }
        }
    }, [loading, user, role]);

    if (loading) return <Loading />;

    return <Stack />;
}

/**
 * Criando um tema para aplicação usando o Native Elements.
 */
const theme = createTheme({
    lightColors: {
        primary: '#e7e7e8',
        secondary: '#0E3087',
        grey0: '#F5FFFA',
        grey1: "#F3F4F6",
        greyOutline: '#0E3087'
    },
    darkColors: {
        primary: '#333639',
        secondary: '#0E3087',
        grey0: '#F5FFFA',
        grey1: "#F3F4F6",
        greyOutline: '#0E3087'
    },
    mode: 'light',
});

/**
 * Componente de layout principal que aplica o tema e gerencia a autenticação.
 */
export default function Layout() {
    let [fontsLoaded] = useFonts({
        Poppins_700Bold,
        Poppins_400Regular
    });

    if (!fontsLoaded) {
        return <Loading />
    }

    return (
        <ThemeProvider theme={theme}>
            <AuthWrapper />
        </ThemeProvider>
    );
}
