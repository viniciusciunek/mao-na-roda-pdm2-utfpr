import React, { useEffect, useState } from 'react';
import { ScrollView, Share, Text, View } from 'react-native';
import { useGlobalSearchParams, useLocalSearchParams } from 'expo-router';

import SuccessButton from '../../../src/components/SuccessButton';
import pb from '../../../src/services/pocketbase';

export default function ShowCustomer() {
    const { budget, customer, items } = useLocalSearchParams();

    const data = useGlobalSearchParams();

    const url = new URLSearchParams();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log(budget)
        console.log(customer)
        console.log(items)
        console.log(data)
        console.log(url)
    }, [])

    const parsedItems = JSON.parse(Array.isArray(items) ? items[0] : items || '[]');

    return (
        <ScrollView className='m-2' showsVerticalScrollIndicator={false}>
            <View>

            </View>
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
