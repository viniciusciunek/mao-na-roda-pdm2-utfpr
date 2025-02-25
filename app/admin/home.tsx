import { FlatList, ScrollView, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import BudgetRepository from '../../src/database/BudgetRepository';
import CardOption from '../../src/components/CardOption';
import Loading from '../../src/components/Loading';
import StatusBadge from '../../src/components/StatusBadge';
import Toast from 'react-native-toast-message';

const budgetRepository = new BudgetRepository();

export default function _screen() {
    const [pendingCount, setPendingCount] = useState(0);
    const [approvedCount, setApprovedCount] = useState(0);
    const [reprovedCount, setReprovedCount] = useState(0);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchCount = async (status: string, setter: Function) => {
        try {
            const count = await budgetRepository.getCountByStatus(status);

            setter(count);

            setLoading(false);
        } catch (error) {
            setError(true);

            setTimeout(async () => {
                Toast.show({
                    type: 'error',
                    text1: 'Erro',
                    text2: 'Erro ao carregar orçamentos.',
                    visibilityTime: 3000
                });
            }, 100);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCount('pending_aprove', setPendingCount);
        fetchCount('approved', setApprovedCount);
        fetchCount('reproved', setReprovedCount);
    }, [pendingCount, approvedCount, reprovedCount]);

    if (loading) return <Loading />

    return (
        <ScrollView>
            <View className='flex flex-row mt-2 justify-evenly'>
                <StatusBadge label='Pendentes' text={pendingCount} color='yellow' bgColor='yellow' />
                <StatusBadge label='Aprovadas' text={approvedCount} color='green' bgColor='green' />
                <StatusBadge label='Reprovadas' text={reprovedCount} color='red' bgColor='red' />
            </View>

            <View className="flex flex-col mt-4">
                <View>
                    <Text className='text-center text-gray-700 underline font-poppins_bold'>Orçamentos</Text>

                    <View className='flex flex-row items-center justify-around'>
                        <CardOption link="/admin/budget/create" title="Novo" icon="plus" iconColor="white" iconSize={36} />
                        <CardOption link="/admin/budget/budgets" title="Orçamentos" icon="layer-group" iconColor="white" iconSize={36} />
                    </View>
                </View>

                <View className='self-center w-3/4 my-4 border-b border-gray-300'></View>

                <View>
                    <Text className='text-center text-gray-700 underline font-poppins_bold'>Cadastros</Text>

                    <View className='flex flex-row items-center justify-around'>
                        <CardOption link="/admin/product/products" title="Produtos" icon="product-hunt" iconColor="white" iconSize={36} />
                        <CardOption link="/admin/customer/customers" title="Clientes" icon="people-group" iconColor="white" iconSize={36} />
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}
