import { Button, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Stack, useRouter } from 'expo-router';

import CardOption from '../../src/components/CardOption';
import React from 'react';
import StatusBadge from '../../src/components/StatusBadge';
import pb from '../../src/services/pocketbase';
import useAuth from '../../src/store/useAuth';

export default function _screen() {
    const { logout } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        pb.authStore.clear();
        logout();
        router.push("/");
    };

    return (
        <ScrollView>
            <View className='flex flex-row mt-2 justify-evenly'>
                <StatusBadge label='Pendente' text='12' color='yellow' bgColor='yellow' />
                <StatusBadge label='Concluídas' text='7' color='green' bgColor='green' />
                <StatusBadge label='Canceladas' text='4' color='red' bgColor='red' />
                <StatusBadge label='Pendentes' text='2' color='blue' bgColor='blue' />
            </View>

            <View>
                <Text className='mb-2 text-lg text-center text-gray-500 underline font-nunito_xligth'>Serviços</Text>
                <ScrollView horizontal contentContainerStyle={{ paddingBottom: 20, gap: 12, marginHorizontal: 12 }} showsHorizontalScrollIndicator={false}
                    snapToInterval={200} decelerationRate={'fast'} >
                    <CardOption link='/admin/budget/create' title='Criar Orçamento' icon='plus' iconColor='black' iconSize={48} />

                    <Button title='teste' onPress={() => router.push({
                        pathname: '/admin/budget/show',
                        params: {
                            budget: 'k8jbbz44at9sacw',
                            customer: 'e812h1g2s6w53ns',
                            items: [],
                        },
                    })} />
                </ScrollView>
            </View>

            <View>
                <Text className='mb-2 text-lg text-center text-gray-500 underline font-nunito_xligth'>Gerenciar Cadastros</Text>
                <ScrollView horizontal contentContainerStyle={{ paddingBottom: 20, gap: 12, marginHorizontal: 12 }} showsHorizontalScrollIndicator={false}
                    snapToInterval={200} decelerationRate={'fast'} >
                    <CardOption link='/admin/product/products' title='Produtos' icon='product-hunt' iconColor='black' iconSize={48} />
                </ScrollView>
            </View>

            <View className='self-center'>
                <TouchableOpacity onPress={handleLogout} className='flex items-center justify-center w-48 p-4 shadow hover:bg-darkBlue bg-primaryBlue rounded-xl'>
                    <Text className='font-bold text-white'>LOGOUT</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
