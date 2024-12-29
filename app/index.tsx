import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

import LoginButton from '../src/components/LoginButton';
import Mechanic from '../src/components/Mechanic';

export default function _screen() {
    const router = useRouter();

    return (
        <View className='flex flex-col items-center flex-1 justify-evenly'>
            <Stack.Screen options={{ headerShown: false }} />

            <View className='flex flex-col items-center justify-center p-2'>
                <Text className='font-nunito_black'>Mão na Roda</Text>
                <Text className='font-nunito_regular'>O assistente que você precisa para sua oficina!</Text>
            </View>

            <Mechanic />

            <View className='m-2 text-center truncate'>
                <Text className='text-base font-poppins_bold'>Faça da sua oficina, o melhor lugar para o seu cliente.</Text>
                <Text className='text-sm font-poppins_bold'>Gerencie de maneira eficiente e facilite seus fluxos diários.</Text>
            </View>

            <View className='flex flex-col items-center justify-center w-11/12 gap-2'>
                <LoginButton text='Entre' textColor='#FFFFFF' icon='arrow-right' iconSize={24} iconColor="white" backgroundColor='#0E3087' borderColor='#ff0000' onPress={() => router.replace('/login')} />

                <Text className=''>Ou</Text>

                <LoginButton text='Cadastre-se' textColor='#0E3087' icon='arrow-right' iconSize={24} iconColor='#0E3087' backgroundColor='transparent' border borderColor='#0E3087' onPress={() => router.replace('/register')} />
            </View>
        </View>
    );
}
