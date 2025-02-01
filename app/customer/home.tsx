import { Link, Tabs, usePathname, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import AuthService from '../../src/services/authService';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import pb from '../../src/services/pocketbase';
import useAuth from '../../src/store/useAuth';

/**
 * Tela principal do cliente.
 */
export default function CustomerScreen() {
    const { logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await pb.collection('customers').authRefresh()
            } catch (error) {
                AuthService.clearAuth()
                router.replace('/')
            }
        }

        checkAuth();
    }, [usePathname])

    return (
        <View className='flex flex-col items-center h-full justify-evenly'>
            <View className='flex items-center justify-center'>
                <Text className='text-4xl text-center font-poppins_bold text-primaryBlue'>Bem vindo Cliente!</Text>
                <Text>Em breve, terá o acompanhamento do seu conserto em tempo real!</Text>
            </View>

            <View className='flex flex-row justify-around w-full'>
                <Link href={'customer/budget/budgets'}>
                    <View className='flex flex-col items-center gap-2'>
                        <TouchableOpacity onPress={() => router.push('customer/budget/budgets')} className='flex items-center justify-center w-24 h-24 p-4 text-white bg-black rounded-full shadow'>
                            <FontAwesome6 size={28} name='layer-group' color='white' />
                        </TouchableOpacity>

                        <Text className='text-darkBlue font-poppins_bold'>Orçamentos</Text>
                    </View>
                </Link>

                <Link href={'customer/profile/home'}>
                    <View className='flex flex-col items-center gap-2'>
                        <TouchableOpacity onPress={() => router.push('customer/profile/home')} className='flex items-center justify-center w-24 h-24 p-4 text-white bg-black rounded-full shadow'>
                            <FontAwesome6 size={28} name='user' color='white' />
                        </TouchableOpacity>

                        <Text className='text-darkBlue font-poppins_bold'>Meu Perfil</Text>
                    </View>
                </Link>
            </View>
        </View >
    );
}
