import { Text, TouchableOpacity, View } from 'react-native'

import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import React from 'react'

interface FlashItemProps {
    name: any;
    description?: any;
    brand?: any;
    price?: any;

    onEdit?: () => void;
    onDelete?: () => void;
}

export default function FlashItem({ name, description, brand, price, onEdit, onDelete }: FlashItemProps) {
    return (
        <View className='border border-[#0E3087] rounded bg-transparent m-2'>
            <View className='flex flex-row items-center justify-between p-2 border-b bg-blue-950'>
                <Text className='font-bold text-white'>{name} {brand && (
                    `| ${brand}`
                )}</Text>

                <View className='flex flex-row items-center justify-around w-1/4 gap-2'>
                    <TouchableOpacity onPress={onEdit}>
                        <FontAwesome6 name='pencil' color='white' size={18} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={onDelete}>
                        <FontAwesome6 name='trash' color='white' size={18} />
                    </TouchableOpacity>
                </View>
            </View>

            <View className='p-2 border-b min-h-16'>
                <Text>{description || ''}</Text>
            </View>

            {price && (
                <View className='flex flex-row items-center justify-end p-2 text-end bg-blue-950'>
                    <Text className='font-bold text-white uppercase'>Valor: R$ {price.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
                </View>
            )}
        </View>
    )
}
