import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import PlusButton from '../../../src/components/PlusButton'
import { useRouter } from 'expo-router'

import { Product } from '../../../src/types/Product'
import { FlashList } from '@shopify/flash-list'
import FlashItem from '../../../src/components/FlashItem'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'
import Loading from '../../../src/components/Loading'
import ProductRepository from '../../../src/database/ProductRepository'

const productRepository = new ProductRepository();

export default function _screen() {
    const router = useRouter();

    const [loading, setLoading] = useState(true);

    const [products, setProducts] = useState<Product[]>([]);

    const fetchAllProducts = async () => {
        try {
            const data = await productRepository.getAllProducts()

            setProducts(data);
        } catch (error) {
            setTimeout(async () => {
                Toast.show({
                    type: 'error',
                    text1: 'Erro',
                    text2: 'Preencha todos os campos para cadastrar um produto.',
                    visibilityTime: 3000
                });
            }, 100);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchAllProducts();
    }, [products]);

    const handleDelete = async (id: string) => {
        Toast.hide();

        try {
            setTimeout(async () => {
                await productRepository.deleteProduct(id);

                Toast.show({
                    type: 'error',
                    text1: 'Produto Deletado! 🗑️',
                    visibilityTime: 4000,
                });
            }, 100);
        } catch (error) {
            setTimeout(async () => {
                Toast.show({
                    type: 'error',
                    text1: 'Erro',
                    text2: 'Não foi possível deletar o produto.',
                    visibilityTime: 3000
                });
            }, 100);

        }
    }

    if (loading) return <Loading />;

    return (
        <SafeAreaProvider>
            <SafeAreaView className='flex-1'>
                {products.length === 0 ? (
                    <View className='flex items-center justify-center flex-1'>
                        <Text className='text-lg text-gray-500'>Nenhum produto encontrado.</Text>
                    </View>
                ) : (
                    <FlashList
                        data={products}
                        renderItem={({ item }) => (
                            <FlashItem
                                name={item.name}
                                description={item.description}
                                brand={item.brand}
                                price={item.price}
                                onEdit={() => router.push(`/admin/product/view?id=${item.id}`)}
                                onDelete={() => item.id && handleDelete(item.id)}
                            />
                        )}
                        estimatedItemSize={200}
                    />
                )}

                <PlusButton icon='plus' iconColor='white' onPress={() => router.push('/admin/product/create')} />
            </SafeAreaView>
        </SafeAreaProvider>
    )
}
