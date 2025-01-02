import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import CustomPicker from '../../../src/components/CustomPicker';
import { Customer } from '../../../src/types/Customer';
import CustomerRepository from '../../../src/database/CustomerRepository';
import Toast from 'react-native-toast-message';
import ProductRepository from '../../../src/database/ProductRepository';
import { Product } from '../../../src/types/Product';
import CustomCurrencyInput from '../../../src/components/CustomCurrencyInput';

const customerRepository = new CustomerRepository();
const productRepository = new ProductRepository();


export default function _screen() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [customer, setCustomer] = useState<Customer | null>(null);

    const [products, setProducts] = useState<Product[]>([]);
    const [product, setProduct] = useState<Product | null>(null);

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

    useEffect(() => {
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
        <View>
            <View className='gap-2 p-2'>
                <CustomPicker
                    label="Selecione um cliente:"
                    items={customerItems}
                    selectedValue={customer}
                    onValueChange={(value) => setCustomer(value)}
                />

                <CustomPicker
                    label="Selecione um produto:"
                    items={productsItems}
                    selectedValue={product}
                    onValueChange={(value) => setProduct(value)}
                />

                <CustomCurrencyInput
                    label="Valor:"
                    placeholder="0,00"
                    prefix="R$"
                    value=""
                    onChangeText={(formattedValue) => console.log('Valor formatado:', formattedValue)}
                />

                <Text>{customer ? customer.name : ''}</Text>
                <Text>{product ? product.name : ''}</Text>
            </View>
        </View>
    )
}
