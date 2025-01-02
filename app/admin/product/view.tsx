import { View, Text, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import TextInput from '../../../src/components/CustomTextInput'
import SuccessButton from '../../../src/components/SuccessButton'
import { Product } from '../../../src/types/Product'
import Loading from '../../../src/components/Loading'
import ProductRepository from '../../../src/database/ProductRepository';
import Toast from 'react-native-toast-message'

const productRepository = new ProductRepository();

export default function _screen() {
    const local = useLocalSearchParams();
    const id = local.id.toString();
    const router = useRouter();

    const [data, setData] = useState<Product | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const product = await productRepository.getProductById(id);
                setData(product);
            } catch (error) {
                setTimeout(async () => {
                    Toast.show({
                        type: 'error',
                        text1: 'Erro',
                        text2: 'Erro ao encontrar produto!',
                        visibilityTime: 3000
                    });
                }, 100);

            }
        }

        fetchProduct();
    }, [id]);

    const handleSubmit = async () => {
        if (Number.isNaN(data?.price)) {
            Toast.show({
                type: 'error',
                text1: 'Erro',
                text2: 'Preço inválido.',
                visibilityTime: 3000
            });

            return
        } else if (!data?.name || !data?.description || !data?.brand || !data?.price) {
            Toast.show({
                type: 'error',
                text1: 'Erro',
                text2: 'Preencha todos os campos para cadastrar um produto.',
                visibilityTime: 3000
            });

            return
        }

        try {
            await productRepository.updateProduct(id, data);

            Toast.show({
                type: 'success',
                text1: 'Sucesso!',
                text2: 'Produto atualizado com sucesso!',
                visibilityTime: 3000
            });

            router.push('/admin/product/products');
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Erro',
                text2: 'Ocorreu um erro ao atualizar produto.',
                visibilityTime: 3000
            });
        }
    }

    if (!data) return <Loading />;

    return (
        <ScrollView className='gap-2 p-2'>
            <TextInput label='Nome:' placeholder='Nome do Produto...' icon='pencil' iconSize={18} iconColor='black' value={data.name} onChangeText={(value) => setData({ ...data, name: value })} />

            <TextInput label='Descrição:' placeholder='Descrição do Produto...' icon='pencil' iconSize={18} iconColor='black' value={data.description} onChangeText={(value) => setData({ ...data, description: value })} />

            <TextInput label='Marca:' placeholder='Marca do Produto...' icon='layer-group' iconSize={18} iconColor='black' value={data.brand} onChangeText={(value) => setData({ ...data, brand: value })} />

            <TextInput label='Preço:' placeholder='Preço do Produto...' icon='money-bill' iconSize={18} iconColor='black' value={data.price.toString() || ''} onChangeText={(value) => setData({ ...data, price: Number(value) })} keyboardType='numeric' />

            <SuccessButton label='ATUALIZAR' icon='check' iconColor='white' iconSize={18} onPress={handleSubmit} right />
        </ScrollView>
    )
}
