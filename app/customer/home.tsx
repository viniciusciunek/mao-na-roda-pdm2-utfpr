import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs, useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

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
        <View className='flex items-center justify-center'>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
                }}
            />

            <Text className='text-4xl text-center font-poppins_bold text-primaryBlue p-44'>index cliente</Text>

            <TouchableOpacity onPress={handleLogout} className='flex items-center justify-center w-48 p-4 shadow hover:bg-darkBlue bg-primaryBlue rounded-xl'>
                <Text className='font-bold text-white'>LOGOUT</Text>
            </TouchableOpacity>
        </View>
    );
}
