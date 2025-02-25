import React, { useEffect, useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'

import BudgetItemRepository from '../../../src/database/BudgetItemRepository';
import BudgetRepository from '../../../src/database/BudgetRepository';
import CustomCurrencyInput from '../../../src/components/CustomCurrencyInput';
import CustomPicker from '../../../src/components/CustomPicker';
import CustomTextInput from '../../../src/components/CustomTextInput';
import { Customer } from '../../../src/types/Customer';
import CustomerRepository from '../../../src/database/CustomerRepository';
import DangerButton from '../../../src/components/DangerButton';
import { Product } from '../../../src/types/Product';
import ProductRepository from '../../../src/database/ProductRepository';
import SuccessButton from '../../../src/components/SuccessButton';
import Toast from 'react-native-toast-message';
import { useRouter } from 'expo-router';

const customerRepository = new CustomerRepository();
const productRepository = new ProductRepository();
const budgetRepository = new BudgetRepository();
const budgetItemRepository = new BudgetItemRepository();

export default function _screen() {
    const router = useRouter();

    const [customers, setCustomers] = useState<Customer[]>([]);
    const [customer, setCustomer] = useState<Customer | null>(null);

    const [products, setProducts] = useState<Product[]>([]);
    const [product, setProduct] = useState<Product | null>(null);

    const [quantity, setQuantity] = useState<number>(0);
    const [price, setPrice] = useState<number>(0);

    const [budgetItems, setBudgetItems] = useState<{ product: Product, quantity: number, price: number }[]>([]);

    const [total, setTotal] = useState<number>(0);

    const [obs, setObs] = useState<string>('');

    const resetFields = () => {
        setCustomer(null);
        setProduct(null);
        setQuantity(0);
        setPrice(0);
        setObs('');
        setBudgetItems([]);
        setTotal(0);
    }

    const fetchAllCustomers = async () => {
        try {
            const result = await customerRepository.getAllCustomers()

            return result;
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Erro',
                text2: 'Erro ao carregar os clientes.',
                visibilityTime: 3000
            });
        }
    }

    const fetchAllProducts = async () => {
        try {
            const result = await productRepository.getAllProducts()

            return result;
        } catch (error) {
            console.log(error)

            Toast.show({
                type: 'error',
                text1: 'Erro',
                text2: 'Erro ao carregar os produtos.',
                visibilityTime: 3000
            });
        }
    }

    const addProduct = () => {
        if (!product || !customer) {
            Toast.show({
                type: 'error',
                text1: 'Erro',
                text2: 'Selecione um cliente e um produto.',
                visibilityTime: 3000
            });

            return;
        }

        if (quantity <= 0 || price <= 0) {
            Toast.show({
                type: 'error',
                text1: 'Erro',
                text2: 'Informe a quantidade e o preço do produto.',
                visibilityTime: 3000
            });

            return;
        }

        const newBudgetItem = { product, quantity, price }

        setBudgetItems([...budgetItems, newBudgetItem]);

        setTotal(total + (quantity * price));

        resetFields()
    }

    const cancelBudget = () => {
        resetFields();

        router.canGoBack() && router.back();
    }

    const saveBudget = async () => {
        const budgetNumber = await (await budgetRepository.getAllBudgets()).length + 1;

        if (!customer || !budgetItems.length || total <= 0) {
            Toast.show({
                type: 'error',
                text1: 'Erro',
                text2: 'Verifique os campos do formulário antes de salvar.',
                visibilityTime: 3000
            });
            return;
        }

        try {
            const newBudget = await budgetRepository.createBudget({
                number: budgetNumber,
                customer_id: customer.id!,
                status: 'pending_aprove',
                is_cancelled: false,
                is_paid: false,
                due_date: new Date(new Date().setDate(new Date().getDate() + 30)), // hoje + 30 dias
                total,
                obs,
            });

            for (const item of budgetItems) {
                try {
                    if (!item.product.id) {
                        throw new Error('Produto inválido: ID não encontrado');
                    }

                    await budgetItemRepository.createBudgetItem({
                        budget_id: newBudget.id!,
                        product_id: item.product.id,
                        quantity: item.quantity,
                        unit_price: item.price / item.quantity,
                        total_price: item.price,
                    });
                } catch (error) {
                    Toast.show({
                        type: 'error',
                        text1: 'Erro',
                        text2: 'Erro ao salvar o orçamento. Tente novamente.',
                        visibilityTime: 3000
                    });
                }
            }

            Toast.show({
                type: 'success',
                text1: 'Sucesso',
                text2: 'Orçamento salvo com sucesso!',
                visibilityTime: 3000
            });

            router.push({
                pathname: '/admin/budget/show',
                params: {
                    budgetId: newBudget.id,
                    customerId: customer.id,
                },
            });

            resetFields();
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Erro',
                text2: 'Erro ao salvar o orçamento. Tente novamente.',
                visibilityTime: 3000
            });
        }
    };

    useEffect(() => {
        resetFields();

        const fetchData = async () => {
            const customersList = await fetchAllCustomers();
            const productsList = await fetchAllProducts();

            if (customersList) setCustomers(customersList);
            if (productsList) setProducts(productsList);
        };

        fetchData();
    }, [])

    const customerItems = customers.map(customer => ({
        label: customer.name,
        value: customer
    }));

    const productsItems = products.map(product => ({
        label: product.name,
        value: product
    }))

    return (
        <ScrollView className="flex-1 w-full p-4">
            <View>
                <CustomPicker
                    label="Selecione um cliente:"
                    items={customerItems}
                    selectedValue={customer}
                    onValueChange={(value) => setCustomer(value)}
                />

                {customer && (
                    <View>
                        <View>
                            <CustomPicker
                                label="Selecione um produto:"
                                items={productsItems}
                                selectedValue={product}
                                onValueChange={(value) => setProduct(value)}
                            />

                            <View className="flex flex-row items-end w-full gap-2">
                                <View className="flex-1">
                                    <CustomTextInput
                                        label="Quantidade"
                                        placeholder="0"
                                        isNumeric={true}
                                        value={quantity.toString()}
                                        onChangeText={(value) => setQuantity(Number(value))}
                                    />
                                </View>

                                <View className="flex-1">
                                    <CustomCurrencyInput
                                        label="Valor:"
                                        prefix="R$"
                                        value={price}
                                        onChangeText={(value) => setPrice(value)}
                                    />
                                </View>

                                <TouchableOpacity className='w-1/4 h-10 p-1 rounded-md bg-darkBlue' onPress={() => addProduct()}>
                                    <Text className='text-2xl font-bold text-center text-white uppercase'>+</Text>
                                </TouchableOpacity>
                            </View>

                            <View className='mt-2'>
                                <View className='flex flex-row items-center justify-between w-full'>
                                    <Text className="w-1/3 p-2 text-center border font-nunito_xligth">DESCRIÇÃO</Text>
                                    <Text className="w-1/3 p-2 text-center border font-nunito_xligth">QTD.</Text>
                                    <Text className="w-1/3 p-2 text-center border font-nunito_xligth">VALOR</Text>
                                </View>
                                {budgetItems.map((item, index) => (
                                    <View key={index} className="flex flex-row items-center justify-between w-full">
                                        <Text className="w-1/3 p-2 text-center border font-nunito_xligth">{item.product.name}</Text>
                                        <Text className="w-1/3 p-2 text-center border font-nunito_xligth">{item.quantity}un</Text>
                                        <Text className="w-1/3 p-2 text-center border font-nunito_xligth">{`R$ ${item.price.toFixed(2)}`}</Text>
                                    </View>
                                ))}

                                <View className='flex flex-row items-center justify-between w-full'>
                                    <Text className="w-full p-2 text-center border font-nunito_xligth"></Text>
                                </View>

                                <View className='flex flex-row items-center justify-between w-full'>
                                    <Text className="w-1/2 p-2 text-center border font-nunito_xligth">VALOR TOTAL</Text>
                                    <Text className="w-1/2 p-2 text-center border font-nunito_xligth">R$ {total.toFixed(2)}</Text>
                                </View>
                            </View>
                        </View>

                        <View>
                            <CustomTextInput
                                label="Observações:"
                                multiline
                                numberOfLines={4}
                                textAlignVertical='top'
                                placeholder="Digite aqui as observações do orçamento."
                                value={obs}
                                onChangeText={setObs}
                            />
                        </View>
                    </View>)}

                <View className='flex flex-row w-full gap-2 mt-2 mb-6'>
                    <View className="flex-1">
                        <DangerButton label='cancelar' onPress={cancelBudget} />
                    </View>
                    {customer && (
                        <View className="flex-1">
                            <SuccessButton label='concluir' onPress={saveBudget} />
                        </View>
                    )}
                </View>
            </View>
        </ScrollView>
    )
}
