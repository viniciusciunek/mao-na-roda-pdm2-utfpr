import { View, Text, Button, ScrollView, FlatList } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

import pb from '../../src/services/pocketbase';
import useAuth from '../../src/store/useAuth';
import StatusBadge from '../../src/components/StatusBadge';
import CardOption from '../../src/components/CardOption';

/**
 * Tela principal do administrador.
 */
export default function AdminScreen() {
    const { logout } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        await pb.authStore.clear();
        await logout();
        router.push("/");
    };

    return (
        <View>
            <View className='flex flex-row justify-evenly mt-2'>
                <StatusBadge label='Pendente' text='12' color='yellow' bgColor='yellow' />
                <StatusBadge label='Concluídas' text='7' color='green' bgColor='green' />
                <StatusBadge label='Canceladas' text='4' color='red' bgColor='red' />
                <StatusBadge label='Pendentes' text='2' color='blue' bgColor='blue' />
            </View>

            <View className='flex-1 m-2'>
                <Text className='underline font-nunito_xligth text-gray-500 text-lg text-center'>Serviços</Text>
                <ScrollView horizontal contentContainerStyle={{ paddingBottom: 20, gap: 20 }} showsHorizontalScrollIndicator={false}
                    snapToInterval={200} decelerationRate="fast" >
                    <CardOption link='budget/create' title='Criar Orçamento' icon='plus' iconColor='black' iconSize={48} />
                    <CardOption link='' title='Histórico' icon='clock' iconColor='black' iconSize={48} />
                    <CardOption link='' title='Pendentes' icon='money-bills' iconColor='black' iconSize={48} />
                    <CardOption link='' title='Concluídos' icon='check' iconColor='black' iconSize={48} />
                    <CardOption link='' title='Cancelados' icon='times' iconColor='black' iconSize={48} />
                    <CardOption link='' title='Outros Serviços' icon='cogs' iconColor='black' iconSize={48} />
                    <CardOption link='' title='Configurações' icon='gear' iconColor='black' iconSize={48} />
                    <CardOption link='' title='Ajuda' icon='question-circle' iconColor='black' iconSize={48} />
                </ScrollView>
            </View>


            <Button title="Logout" onPress={handleLogout} />
        </View>
    );
}
