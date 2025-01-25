import { Tabs, useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import React from 'react';
import pb from '../../src/services/pocketbase';
import useAuth from '../../src/store/useAuth';

/**
 * Tela principal do cliente.
 */
export default function CustomerScreen() {
    const { logout } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        pb.authStore.clear();
        await logout();

        router.replace('/');
        router.push('/');
    };

    return (
        <View className='flex flex-col items-center h-full justify-evenly'>
            <View className='flex items-center justify-center'>
                <Text className='text-4xl text-center font-poppins_bold text-primaryBlue'>Bem vindo Cliente!</Text>
            </View>

            <View>
                <Text>Em breve, terá o acompanhamento do seu conserto em tempo real!</Text>
            </View>
        </View>
    );
}
