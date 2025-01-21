import React, { useEffect, useState } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from 'react-native'

import { Customer } from '../../../src/types/Customer';
import CustomerRepository from '../../../src/database/CustomerRepository';
import FlashItem from '../../../src/components/FlashItem';
import { FlashList } from '@shopify/flash-list';
import Loading from '../../../src/components/Loading';
import PlusButton from '../../../src/components/PlusButton';
import Toast from 'react-native-toast-message';
import { useRouter } from 'expo-router';

const customerRepository = new CustomerRepository();

export default function _screen() {
    const router = useRouter();

    const [loading, setLoading] = useState(true);

    const [customers, setCustomers] = useState<Customer[]>([]);

    const fetchAllCustomers = async () => {
        try {
            const data = await customerRepository.getAllCustomers();

            setCustomers(data);
        } catch (error) {
            setTimeout(async () => {
                Toast.show({
                    type: 'error',
                    text1: 'Erro',
                    text2: 'Erro ao carregar os clientes.',
                    visibilityTime: 3000
                });
            }, 100);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchAllCustomers();
    }, [customers]);

    const handleDelete = async (id: string) => {
        Toast.hide();

        try {
            setTimeout(async () => {
                await customerRepository.deleteCustomer(id);

                Toast.show({
                    type: 'error',
                    text1: 'Cliente Deletado! 🗑️',
                    visibilityTime: 4000,
                });
            }, 100);
        } catch (error) {
            setTimeout(async () => {
                Toast.show({
                    type: 'error',
                    text1: 'Erro',
                    text2: 'Não foi possível deletar o cliente.',
                    visibilityTime: 3000
                });
            }, 100);

        }
    }

    if (loading) return <Loading />;

    return (
        <SafeAreaProvider>
            <SafeAreaView className='flex-1'>
                {customers.length === 0 ? (
                    <View className='flex items-center justify-center flex-1'>
                        <Text className='text-lg text-gray-500'>Nenhum cliente encontrado.</Text>
                    </View>
                ) : (
                    <FlashList
                        data={customers}
                        renderItem={({ item }) => (
                            <FlashItem
                                name={item.name}
                                description={item.cpf}
                                onEdit={() => router.push(`/admin/customer/view?id=${item.id}`)}
                                onDelete={() => item.id && handleDelete(item.id)}
                            />
                        )}
                        estimatedItemSize={200}
                    />
                )}

                <PlusButton icon='plus' iconColor='white' onPress={() => router.push('/admin/customer/create')} />
            </SafeAreaView>
        </SafeAreaProvider>
    )
}
