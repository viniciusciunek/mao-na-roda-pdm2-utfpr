import React, { useEffect, useState } from 'react';

import { useFonts, Poppins_900Black } from '@expo-google-fonts/poppins'

import Loading from '../../src/components/Loading';
import { Stack } from 'expo-router';

export default function Layout() {
    let [fontsLoaded] = useFonts({
        Poppins_900Black
    });

    if (!fontsLoaded) {
        return <Loading />
    }

    return (
        <Stack />
    );
}
