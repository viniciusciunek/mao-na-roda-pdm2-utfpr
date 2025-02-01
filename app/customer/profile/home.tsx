import React, { useEffect } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

import AuthService from '../../../src/services/authService';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useRouter } from 'expo-router';

export default function home() {
    const router = useRouter();

    const user = AuthService.getCurrentUser()
    const role = AuthService.getRole();

    const handleLogout = () => {
        AuthService.clearAuth();
        router.replace("/");
    };

    return (
        <View className='flex flex-col items-center justify-between h-full'>
            <View className='flex flex-col items-center self-center justify-center w-2/5 gap-2 mt-8 bg-gray-300 rounded-md'>
                <View className='flex items-center justify-center w-24 h-24 mt-2 rounded-full bg-primaryBlue'>
                    <FontAwesome6 size={48} name="user" color={'white'} />
                </View>

                <Text className='font-poppins_bold'>{user?.record.username || user?.record.name || 'Usuário'}</Text>
            </View>


            {role == 'admin' && (
                <View className='flex items-center self-center justify-center w-full gap-2'>
                    <TouchableOpacity className='flex flex-row items-center justify-start w-11/12 p-2 shadow rounded-xl bg-primaryBlue' onPress={() => router.push('/admin/customer/customers')}>
                        <FontAwesome6 size={12} name="plus" color={'white'} />

                        <Text className='ml-2 text-white font-poppins_bold'>CLIENTES</Text>
                    </TouchableOpacity>

                    <TouchableOpacity className='flex flex-row items-center justify-start w-11/12 p-2 shadow rounded-xl bg-primaryBlue' onPress={() => router.push('/admin/product/products')}>
                        <FontAwesome6 size={12} name="plus" color={'white'} />

                        <Text className='ml-2 text-white font-poppins_bold'>PRODUTOS</Text>
                    </TouchableOpacity>

                    <TouchableOpacity className='flex flex-row items-center justify-start w-11/12 p-2 shadow rounded-xl bg-primaryBlue' >
                        <FontAwesome6 size={12} name="plus" color={'white'} />

                        <Text className='ml-2 text-white font-poppins_bold'>ORÇAMENTOS</Text>
                    </TouchableOpacity>

                </View>
            )}

            {role == 'customer' && (
                <View className='flex items-center self-center justify-center w-full gap-2'>
                    <TouchableOpacity className='flex flex-row items-center justify-start w-11/12 p-2 shadow rounded-xl bg-primaryBlue' onPress={() => router.push('/customer/budget/budgets')}>
                        <FontAwesome6 size={12} name="layer-group" color={'white'} />

                        <Text className='ml-2 text-white font-poppins_bold'>ORÇAMENTOS</Text>
                    </TouchableOpacity>
                </View>
            )}

            <View className='self-center mb-4'>
                <TouchableOpacity onPress={handleLogout} className='flex items-center justify-center w-48 p-2 shadow hover:bg-darkBlue bg-primaryBlue rounded-xl'>
                    <Text className='font-bold text-white'>LOGOUT</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
