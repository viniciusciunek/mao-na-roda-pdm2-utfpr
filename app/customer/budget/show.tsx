import { ActivityIndicator, Alert, ScrollView, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, usePathname, useRouter } from "expo-router";

import { Budget } from "../../../src/types/Budget";
import { BudgetItem } from "../../../src/types/BudgetItem";
import BudgetItemRepository from "../../../src/database/BudgetItemRepository";
import BudgetRepository from "../../../src/database/BudgetRepository";
import CustomTextInput from '../../../src/components/CustomTextInput';
import { Customer } from '../../../src/types/Customer';
import CustomerRepository from "../../../src/database/CustomerRepository";
import DangerButton from "../../../src/components/DangerButton";
import Loading from "../../../src/components/Loading";
import ProductRepository from "../../../src/database/ProductRepository";
import SuccessButton from '../../../src/components/SuccessButton';
import Toast from "react-native-toast-message";
import WarningButton from '../../../src/components/WarningButton';
import pb from "../../../src/services/pocketbase";

const customerRepository = new CustomerRepository();
const budgetRepository = new BudgetRepository();
const budgetItemRepository = new BudgetItemRepository();

export default function Show() {
    const router = useRouter();

    const { budgetId, token } = useLocalSearchParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const [budget, setBudget] = useState<Budget | null>(null);
    const [customer, setCustomer] = useState<Customer | null>(null);
    const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([]);

    const [badgeStatusColor, setBadgeStatusColor] = useState('bg-blue-300');
    const [textStatusColor, setTextStatusColor] = useState('text-blue-500');

    const fetchBudget = async () => {
        try {
            const budgetRecord = await budgetRepository.getBudgetById(budgetId.toString());

            const customerRecord = await customerRepository.getCustomerById(budgetRecord.customer_id);

            const budgetItemRecords = await budgetItemRepository.getAllBudgetItemsByBudgetId(budgetId.toString());

            if (budgetRecord.status === 'reproved' || budgetRecord.status === 'cancelled') {
                setBadgeStatusColor('bg-red-300');
                setTextStatusColor('text-red-500')
            } else if (budgetRecord.status === 'approved') {
                setBadgeStatusColor('bg-green-500');
                setTextStatusColor('text-white')
            } else {
                setBadgeStatusColor('bg-blue-300');
                setTextStatusColor('text-blue-500')
            }

            if (!customerRecord) {
                throw new Error("Cliente não encontrado!");
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
            Alert.alert("Erro", err.message || "Erro ao autenticar o orçamento.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!token || !budgetId) {
            throw new Error("Token ou ID do orçamento não fornecido!");
        }
        fetchBudget();
    }, [token, budgetId]);

    if (loading) {
        return <Loading />;
    }

    if (error || !budget) {
        return (
            <View className="items-center justify-center flex-1 m-2">
                <View className="w-full">
                    <View className="w-full p-4 rounded-md rounded-b-none bg-primaryBlue">
                        <Text className="font-bold text-white uppercase">Não foi possível encontrar o orçamento!</Text>
                    </View>
                    <View className="w-full p-4 rounded-md rounded-t-none shadow">
                        <Text>Solicite ao mecânico um novo link para aprovação.</Text>
                    </View>
                </View>
            </View>
        );
    }

    const handleApprove = async () => {
        try {
            await budgetRepository.updateBudget(budgetId.toString(), { ...budget, status: 'approved' });

            await fetchBudget();

            return router.push('/customer/budget/approved')
        } catch (error) {
            return Toast.show({
                type: 'error',
                text1: 'Erro ao aprovar orçamento!',
                text2: 'Ocorreu um erro ao aprovar o orçamento, tente novamente mais tarde.',
            })
        }
    }

    const handleReprove = async () => {
        try {
            await budgetRepository.updateBudget(budgetId.toString(), { ...budget, status: 'reproved' });

            await fetchBudget();

            router.push({
                pathname: 'customer/budget/reproved',
            })
        } catch (error) {
            return Toast.show({
                type: 'error',
                text1: 'Erro ao reprovar orçamento!',
                text2: 'Ocorreu um erro ao reprovar o orçamento, tente novamente mais tarde.',
            })
        }
    }

    return (
        <ScrollView className='m-2' showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
            <View className='gap-2'>
                <View className='p-2 bg-gray-200 rounded-md shadow'>
                    <Text className='underline font-nunito_regular'>Orçamento Nº{"000" + budget.number}</Text>
                    <Text className='text-sm text-gray-400'>Cliente: {customer?.name}</Text>
                </View>

                <View className='flex flex-row items-center justify-center w-full'>
                    <View className={`w-3/4 p-2 text-center ${badgeStatusColor} rounded-md shadow`}>
                        <Text className={`text-center ${textStatusColor} font-bold`}>
                            {(() => {
                                switch (budget?.status) {
                                    case 'pending_aprove':
                                        return 'PENDENTE APROVAÇÃO';
                                    case 'approved':
                                        return 'APROVADO';
                                    case 'cancelled':
                                        return 'CANCELADO';
                                    case 'reproved':
                                        return 'REPROVADO';
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
                        <Text className="w-1/2 p-2 text-center border font-nunito_xligth">R$ {Number(budget.total).toFixed(2)}</Text>
                    </View>
                </View>

                <View>
                    <CustomTextInput
                        label="Observações:"
                        multiline
                        numberOfLines={4}
                        textAlignVertical='top'
                        placeholder="Digite aqui as observações do orçamento."
                        value={budget?.obs || 'Não há observações sobre o pedido.'}
                        editable={false}
                    />
                </View>
            </View>

            <View className="gap-1 mt-2">
                <View className="flex flex-row items-center justify-between gap-1 ">
                    <View className="flex-1">
                        <DangerButton label="REPROVAR" onPress={handleReprove} />
                    </View>
                    <View className="flex-1">
                        <SuccessButton label="APROVAR" onPress={handleApprove} />
                    </View>
                </View>
                {/* <WarningButton label="SOLICITAR AJUSTE" /> */}
            </View>
        </ScrollView>
    );
}
