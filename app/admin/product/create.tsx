import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import TextInput from '../../../src/components/CustomTextInput'
import SuccessButton from '../../../src/components/SuccessButton';
import { router } from 'expo-router';
import Toast from 'react-native-toast-message';
import ProductRepository from '../../../src/database/ProductRepository';

const productRepository = new ProductRepository();

export default function _screen() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [brand, setBrand] = useState('');
    const [price, setPrice] = useState(0);

    const handleSubmit = async () => {
        if (!name || !description || !brand || !price) {
            setTimeout(async () => {
                Toast.show({
                    type: 'error',
                    text1: 'Erro',
                    text2: 'Preencha todos os campos para cadastrar um produto.',
                    visibilityTime: 3000
                });
            }, 100);

            return
        }

        try {
            await productRepository.createProduct({ name, description, brand, price });

            Toast.show({
                type: 'success',
                text1: 'Sucesso!',
                text2: 'Produto criado com sucesso!',
                visibilityTime: 3000
            });

            resetFields();

            router.push('/admin/product/products');
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Erro!',
                text2: 'Erro ao criar produto, verifique os campos!',
                visibilityTime: 3000
            });
        }
    }

    const resetFields = () => {
        setName('');
        setDescription('');
        setBrand('');
        setPrice(0);
    }

    return (
        <ScrollView className='gap-2 p-2'>
            <TextInput label='Nome:' placeholder='Nome do Produto...' icon='pencil' iconSize={18} iconColor='black' onChangeText={(value) => setName(value)} />
            <TextInput label='Descrição:' placeholder='Descrição do Produto...' icon='pencil' iconSize={18} iconColor='black' onChangeText={(value) => setDescription(value)} />
            <TextInput label='Marca:' placeholder='Marca do Produto...' icon='layer-group' iconSize={18} iconColor='black' onChangeText={(value) => setBrand(value)} />
            <TextInput label='Preço:' placeholder='Preço do Produto...' icon='money-bill' iconSize={18} iconColor='black' onChangeText={(value) => setPrice(Number(value))} keyboardType='decimal-pad' />

            <SuccessButton label='SALVAR' icon='check' iconColor='white' iconSize={18} onPress={handleSubmit} right />
        </ScrollView >
    )
}
