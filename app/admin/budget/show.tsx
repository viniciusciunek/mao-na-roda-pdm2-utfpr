import { Button, ScrollView, Share, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import { Budget } from '../../../src/types/Budget';
import { BudgetItem } from '../../../src/types/BudgetItem';
import BudgetItemRepository from '../../../src/database/BudgetItemRepository';
import BudgetRepository from '../../../src/database/BudgetRepository';
import CustomTextInput from '../../../src/components/CustomTextInput';
import { Customer } from '../../../src/types/Customer';
import CustomerRepository from '../../../src/database/CustomerRepository';
import SuccessButton from '../../../src/components/SuccessButton';
import { impersonateCustomer } from '../../../src/services/pocketbase';
import { useLocalSearchParams } from 'expo-router';

const customerRepository = new CustomerRepository();
const budgetRepository = new BudgetRepository();
const budgetItemRepository = new BudgetItemRepository();

export default function Show() {
    const { budgetId, customerId } = useLocalSearchParams();

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const [budget, setBudget] = useState<Budget | null>(null);
    const [customer, setCustomer] = useState<Customer | null>(null);
    const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([]);

    const handleShare = async () => {
        setLoading(true);

        try {
            const token = await impersonateCustomer(customer?.id.toString()!);

            const link = `http://192.168.2.209:8081/customer/budget/show?token=${token}&budgetId=${budgetId}`;
            // const link = `http://192.168.1.110:8081/customer/budget/show?token=${token}&budgetId=${budget}`;

            console.log(link)

            await Share.share({
                message: `Confira o orçamento do cliente ${customer?.name}: ${link}`,
            });
        } catch (error) {
            alert("Erro ao compartilhar orçamento. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchBudget = async () => {
            try {
                const budgetRecord = await budgetRepository.getBudgetById(budgetId.toString());

                const customerRecord = await customerRepository.getCustomerById(customerId.toString());

                const budgetItemRecords = await budgetItemRepository.getAllBudgetItemsByBudgetId(budgetId.toString());

                if (!customerRecord || !budgetRecord || !budgetItemRecords) {
                    throw new Error("Dados não encontrados!");
                }

                setCustomer({
                    name: customerRecord.name,
                    email: customerRecord.email,
                    phone: customerRecord.phone,
                    id: customerRecord.id,
                    cpf: customerRecord.cpf,
                    cnpj: customerRecord.cnpj,
                })

                setBudget({
                    number: budgetRecord.number,
                    customer_id: budgetRecord.customer_id,
                    status: budgetRecord.status,
                    is_cancelled: budgetRecord.is_cancelled,
                    is_paid: budgetRecord.is_paid,
                    total: budgetRecord.total,
                    obs: budgetRecord.obs,
                    due_date: budgetRecord.due_date,
                });

                setBudgetItems(budgetItemRecords);
            } catch (err: any) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchBudget();
    }, [budgetId, customerId])

    return (
        <ScrollView className='m-2' showsVerticalScrollIndicator={false}>
            <View className='gap-2'>
                <View className='p-2 bg-gray-200 rounded-md shadow'>
                    <Text className='underline font-nunito_regular'>Orçamento Nº{budget?.number}</Text>
                    <Text className='text-sm text-gray-400'>Cliente: {customer?.name}</Text>
                </View>

                <View className='flex flex-row items-center justify-center w-full'>
                    <View className='w-3/4 p-2 text-center bg-blue-300 rounded-md shadow'>
                        <Text className='text-center text-blue-500'>
                            {(() => {
                                switch (budget?.status) {
                                    case 'pending_aprove':
                                        return 'PENDENTE APROVAÇÃO';
                                    case 'approved':
                                        return 'APROVADO';
                                    case 'cancelled':
                                        return 'CANCELADO';
                                    case 'finished':
                                        return 'PAGO & FINALIZADO';
                                    default:
                                        return 'Desconhecido';
                                }
                            })()}
                        </Text>
                    </View>
                </View>

                <View className='mt-2'>
                    <View className='flex flex-row items-center justify-between w-full'>
                        <Text className="w-1/3 p-2 text-center border font-nunito_xligth">DESCRIÇÃO</Text>
                        <Text className="w-1/3 p-2 text-center border font-nunito_xligth">QTD.</Text>
                        <Text className="w-1/3 p-2 text-center border font-nunito_xligth">VALOR</Text>
                    </View>
                    {budgetItems.map((item, index) => (
                        <View key={index} className="flex flex-row items-center justify-between w-full">
                            <Text className="w-1/3 p-2 text-center border font-nunito_xligth">{item.expand.product_id.description}</Text>
                            <Text className="w-1/3 p-2 text-center border font-nunito_xligth">{item.quantity}un</Text>
                            <Text className="w-1/3 p-2 text-center border font-nunito_xligth">{`R$ ${item.total_price.toFixed(2)}`}</Text>
                        </View>
                    ))}

                    <View className='flex flex-row items-center justify-between w-full'>
                        <Text className="w-full p-2 text-center border font-nunito_xligth"></Text>
                    </View>

                    <View className='flex flex-row items-center justify-between w-full'>
                        <Text className="w-1/2 p-2 text-center border font-nunito_xligth">VALOR TOTAL</Text>
                        <Text className="w-1/2 p-2 text-center border font-nunito_xligth">R$ {Number(budget?.total).toFixed(2)}</Text>
                    </View>
                </View>

                <View>
                    <CustomTextInput
                        label="Observações:"
                        multiline
                        numberOfLines={4}
                        textAlignVertical='top'
                        placeholder="Digite aqui as observações do orçamento."
                        value={budget?.obs}
                        editable={false}
                    />
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
            </View>
        </ScrollView>
    );
}
