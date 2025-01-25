import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import BudgetRepository from '../../src/database/BudgetRepository';
import CardOption from '../../src/components/CardOption';
import StatusBadge from '../../src/components/StatusBadge';
import Toast from 'react-native-toast-message';

const budgetRepository = new BudgetRepository();

export default function _screen() {
    const [pendingCount, setPendingCount] = useState(0);
    const [approvedCount, setApprovedCount] = useState(0);
    const [reprovedCount, setReprovedCount] = useState(0);

    const fetchCount = async (status: string, setter: Function) => {
        try {
            const count = await budgetRepository.getCountByStatus(status);
            setter(count);
        } catch (error) {
            setTimeout(async () => {
                Toast.show({
                    type: 'error',
                    text1: 'Erro',
                    text2: 'Erro ao carregar orçamentos.',
                    visibilityTime: 3000
                });
            }, 100);
        }
    };

    useEffect(() => {
        fetchCount('pending_aprove', setPendingCount);
        fetchCount('approved', setApprovedCount);
        fetchCount('reproved', setReprovedCount);
    }, []);



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
                    <CardOption link='/admin/budget/budgets' title='Orçamentos Criados' icon='layer-group' iconColor='black' iconSize={48} />
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
        </ScrollView>
    );
}
