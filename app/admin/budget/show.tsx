import { Button, ScrollView, Share, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import pb, { impersonateCustomer } from '../../../src/services/pocketbase';

import SuccessButton from '../../../src/components/SuccessButton';
import { useLocalSearchParams } from 'expo-router';

export default function Show() {
    const { budget, customer, items } = useLocalSearchParams();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // ok
        // console.log(budget, customer, items, pb.baseUrl)
    }, [])

    const parsedItems = JSON.parse(Array.isArray(items) ? items[0] : items || '[]');

    const handleShare = async () => {
        setLoading(true);

        try {
            const token = impersonateCustomer(customer);

            const penis = await fetch(pb.baseUrl + "/api/collections/customers/impersonate/" + customer, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: pb.authStore.token,
                },
            });

            console.log(token, penis)

            const link = `http://192.168.1.110:8081/customers/budget/show/${budget}?token=${token}`;

            console.log(token, link)

            await Share.share({
                message: `Confira o orçamento do cliente ${customer}: ${link}`,
            });
        } catch (error) {
            console.error("Erro ao compartilhar orçamento:", error);
            alert("Erro ao compartilhar orçamento. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView className='m-2' showsVerticalScrollIndicator={false}>
            <Button title='teste' onPress={handleShare} />
            {/* <View className='gap-2'>
                <View className='p-2 bg-gray-200 rounded-md shadow'>
                    <Text className='underline font-nunito_regular'>Orçamento Nº{budgetNumber}</Text>
                    <Text className='text-sm text-gray-400'>Cliente: {customer}</Text>
                </View>

                <View className='flex flex-row items-center justify-center w-full'>
                    <View className='w-3/4 p-2 text-center bg-blue-300 rounded-md shadow'>
                        <Text className='text-center text-blue-500'>AGUARDANDO APROVAÇÃO</Text>
                    </View>
                </View>

                <View className='mt-2'>
                    <View className='flex flex-row items-center justify-between w-full'>
                        <Text className="w-1/3 p-2 text-center border font-nunito_xligth">DESCRIÇÃO</Text>
                        <Text className="w-1/3 p-2 text-center border font-nunito_xligth">QTD.</Text>
                        <Text className="w-1/3 p-2 text-center border font-nunito_xligth">VALOR</Text>
                    </View>
                    {parsedItems.map((item, index) => (
                        <View key={index} className="flex flex-row items-center justify-between w-full">
                            <Text className="w-1/3 p-2 text-center border font-nunito_xligth">{item.product_name}</Text>
                            <Text className="w-1/3 p-2 text-center border font-nunito_xligth">{item.quantity}un</Text>
                            <Text className="w-1/3 p-2 text-center border font-nunito_xligth">{`R$ ${item.total_price.toFixed(2)}`}</Text>
                        </View>
                    ))}

                    <View className='flex flex-row items-center justify-between w-full'>
                        <Text className="w-full p-2 text-center border font-nunito_xligth"></Text>
                    </View>

                    <View className='flex flex-row items-center justify-between w-full'>
                        <Text className="w-1/2 p-2 text-center border font-nunito_xligth">VALOR TOTAL</Text>
                        <Text className="w-1/2 p-2 text-center border font-nunito_xligth">R$ {Number(total).toFixed(2)}</Text>
                    </View>
                </View>

                <View className='mt-4'>
                    <SuccessButton
                        label={loading ? 'Carregando...' : 'ENVIAR ORÇAMENTO PARA CLIENTE'}
                        icon='share-nodes'
                        iconColor='white'
                        iconSize={24}
                        onPress={handleShare}
                    />
                </View>
            </View> */}
        </ScrollView>
    );
}
