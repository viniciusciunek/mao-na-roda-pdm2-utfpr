import { Stack } from 'expo-router';

import Loading from '../../src/components/Loading';

import { useFonts, Poppins_900Black, Poppins_700Bold } from '@expo-google-fonts/poppins'
import { Nunito_900Black, Nunito_400Regular, Nunito_200ExtraLight } from '@expo-google-fonts/nunito'

export default function _layoutGuest() {
    let [fontsLoaded] = useFonts({
        Poppins_900Black,
        Nunito_900Black,
        Nunito_400Regular,
        Nunito_200ExtraLight,
        Poppins_700Bold
    });

    if (!fontsLoaded) {
        return <Loading />
    }

    return (
        <Stack screenOptions={{ headerShown: false }} />
    );
}
