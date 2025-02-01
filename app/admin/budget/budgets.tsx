import React, { useEffect, useState } from 'react'
import { SafeAreaView, Text, View } from 'react-native'

import { Budget } from '../../../src/types/Budget'
import BudgetRepository from '../../../src/database/BudgetRepository';
import FlashItem from '../../../src/components/FlashItem'
import { FlashList } from '@shopify/flash-list'
import Loading from '../../../src/components/Loading'
import PlusButton from '../../../src/components/PlusButton'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'
import { useRouter } from 'expo-router'

const budgetRepository = new BudgetRepository();

export default function budgets() {
    const router = useRouter();

    const [loading, setLoading] = useState(true);

    const [budgets, setBudgets] = useState<Budget[]>([]);

    const fetchAllBudgets = async () => {
        try {
            const data = await budgetRepository.getAllBudgets()

            setBudgets(data);
        } catch (error) {
            setTimeout(async () => {
                Toast.show({
                    type: 'error',
                    text1: 'Erro',
                    text2: 'Erro ao carregar os orçamentos.',
                    visibilityTime: 3000
                });
            }, 100);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchAllBudgets();
    }, [budgets]);

    const handleDelete = async (id: string) => {
        Toast.hide();

        try {
            setTimeout(async () => {
                await budgetRepository.deleteBudget(id);

                Toast.show({
                    type: 'error',
                    text1: 'Orçamento Deletado! 🗑️',
                    visibilityTime: 4000,
                });
            }, 100);
        } catch (error) {
            setTimeout(async () => {
                Toast.show({
                    type: 'error',
                    text1: 'Erro',
                    text2: 'Não foi possível deletar o orçamento.',
                    visibilityTime: 3000
                });
            }, 100);

        }
    }

    if (loading) return <Loading />;

    return (
        <SafeAreaProvider>
            <SafeAreaView className='flex-1'>
                {budgets.length === 0 ? (
                    <View className='flex items-center justify-center flex-1'>
                        <Text className='text-lg text-gray-500'>Nenhum produto encontrado.</Text>
                    </View>
                ) : (
                    <FlashList
                        data={budgets}
                        renderItem={({ item }) => (
                            <FlashItem
                                name={`Orçamento: N° ${item.number}`}
                                description={`Cliente: ${item.expand.customer_id.name}`}
                                brand={(() => {
                                    switch (item.status) {
                                        case 'pending_aprove':
                                            return 'Pendente';
                                        case 'approved':
                                            return 'Aprovado';
                                        case 'cancelled':
                                            return 'Cancelado';
                                        case 'reproved':
                                            return 'Reprovado';
                                        case 'finished':
                                            return 'Pago & Finalizado';
                                        default:
                                            return 'Desconhecido';
                                    }
                                })()}
                                price={item.total}
                                onEdit={() => router.push({
                                    pathname: '/admin/budget/show',
                                    params: {
                                        budgetId: item.id,
                                        customerId: item.customer_id,

                                    }
                                })}
                                onDelete={() => item.id && handleDelete(item.id)}
                            />
                        )}
                        estimatedItemSize={200}
                    />
                )}

                <PlusButton icon='plus' iconColor='white' onPress={() => router.push('/admin/budget/create')} />
            </SafeAreaView>
        </SafeAreaProvider>
    )
}
