import React, { useEffect, useState } from 'react'
import { ScrollView, Text, Touchable, TouchableOpacity, View } from 'react-native'
import CustomPicker from '../../../src/components/CustomPicker';
import { Customer } from '../../../src/types/Customer';
import CustomerRepository from '../../../src/database/CustomerRepository';
import Toast from 'react-native-toast-message';
import ProductRepository from '../../../src/database/ProductRepository';
import { Product } from '../../../src/types/Product';
import CustomCurrencyInput from '../../../src/components/CustomCurrencyInput';
import CustomTextInput from '../../../src/components/CustomTextInput';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const customerRepository = new CustomerRepository();
const productRepository = new ProductRepository();


export default function _screen() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [customer, setCustomer] = useState<Customer | null>(null);

    const [products, setProducts] = useState<Product[]>([]);
    const [product, setProduct] = useState<Product | null>(null);

    const [quantity, setQuantity] = useState<number>(0);
    const [price, setPrice] = useState<number>(0);

    const [budgetItems, setBudgetItems] = useState<{ product: Product, quantity: number, price: number }[]>([]);

    const [total, setTotal] = useState<number>(0);

    const resetFields = () => {
        setCustomer(null);
        setProduct(null);
        setQuantity(0);
        setPrice(0);
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

        setProduct(null);
        setQuantity(0);
        setPrice(0);
    }

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
        <ScrollView className='w-full gap-2 p-4'>
            <View>
                <CustomPicker
                    label="Selecione um cliente:"
                    items={customerItems}
                    selectedValue={customer}
                    onValueChange={(value) => setCustomer(value)}
                />

                {/* {customer &&  */}
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
                                placeholder="0,00"
                                prefix="R$"
                                value={price.toString()}
                                onChangeText={(formattedValue) => setPrice(Number(formattedValue.replace(/[^0-9]/g, '')) / 100)}
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
                {/* } */}
            </View>
        </ScrollView>
    )
}
