import { Button, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Stack, useRouter } from 'expo-router';

import BudgetRepository from '../../src/database/BudgetRepository';
import CardOption from '../../src/components/CardOption';
import StatusBadge from '../../src/components/StatusBadge';
import pb from '../../src/services/pocketbase';
import useAuth from '../../src/store/useAuth';

const budgetRepository = new BudgetRepository();

export default function _screen() {
    const { logout } = useAuth();
    const router = useRouter();

    const [pendingCount, setPendingCount] = useState(0);
    const [approvedCount, setApprovedCount] = useState(0);
    const [reprovedCount, setReprovedCount] = useState(0);

    const fetchPendingCount = async () => {
        try {
            const data = await budgetRepository.fetchBudgets({
                filter: "status='pending_aprove'",
            });

            setPendingCount(data.totalItems!);
        } catch (error) {
            setPendingCount(0);
        }

    }

    const fetchApprovedCount = async () => {
        try {
            const data = await budgetRepository.fetchBudgets({
                filter: "status='approved'",
            });

            setApprovedCount(data.totalItems!);
        } catch (error) {
            setPendingCount(0);
        }

    }

    const fetchReprovedCount = async () => {
        try {
            const data = await budgetRepository.fetchBudgets({
                filter: "status='reproved'",
            });

            setReprovedCount(data.totalItems!);
        } catch (error) {
            setPendingCount(0);
        }

    }

    useEffect(() => {
        fetchPendingCount();
        fetchApprovedCount();
        fetchReprovedCount();
    }, []);

    const handleLogout = () => {
        pb.authStore.clear();
        logout();
        router.push("/");
    };

    return (
        <ScrollView>
            <View className='flex flex-row mt-2 justify-evenly'>
                <StatusBadge label='Pendentes' text={pendingCount} color='yellow' bgColor='yellow' />
                <StatusBadge label='Aprovadas' text={approvedCount} color='green' bgColor='green' />
                <StatusBadge label='Reprovadas' text={reprovedCount} color='red' bgColor='red' />
            </View>

            <View>
                <Text className='mb-2 text-lg text-center text-gray-500 underline font-nunito_xligth'>Serviços</Text>
                <ScrollView horizontal contentContainerStyle={{ paddingBottom: 20, gap: 12, marginHorizontal: 12 }} showsHorizontalScrollIndicator={false}
                    snapToInterval={200} decelerationRate={'fast'} >
                    <CardOption link='/admin/budget/create' title='Criar Orçamento' icon='plus' iconColor='black' iconSize={48} />
                </ScrollView>
            </View>

            <View>
                <Text className='mb-2 text-lg text-center text-gray-500 underline font-nunito_xligth'>Gerenciar Cadastros</Text>
                <ScrollView horizontal contentContainerStyle={{ paddingBottom: 20, gap: 12, marginHorizontal: 12 }} showsHorizontalScrollIndicator={false}
                    snapToInterval={200} decelerationRate={'fast'} >
                    <CardOption link='/admin/product/products' title='Produtos' icon='product-hunt' iconColor='black' iconSize={48} />
                    <CardOption link='/admin/customer/customers' title='Clientes' icon='people-group' iconColor='black' iconSize={48} />
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
