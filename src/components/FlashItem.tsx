import { Link, useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native'

import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import React from 'react'

interface FlashItemProps {
    name: any;
    description?: any;
    brand?: any;
    price?: any;

    href?: string;

    onEdit?: () => void;
    onDelete?: () => void;
}

export default function FlashItem({ name, description, brand, price, onEdit, onDelete, href }: FlashItemProps) {
    const router = useRouter();

    return (
        <View className='m-2 bg-transparent border rounded-lg border-primaryBlue'>
            <View className='flex flex-row items-center justify-between p-2 border-b rounded-t-md bg-primaryBlue'>
                <Text className='font-bold text-white'>{name} {brand && (
                    `| ${brand}`
                )}</Text>

                <View className='flex flex-row items-center justify-around w-1/4 gap-2'>
                    <Link href={'href'} className='p-2'>
                        <TouchableOpacity onPress={onEdit}>
                            <FontAwesome6 name='pencil' color='white' size={18} />
                        </TouchableOpacity>
                    </Link>

                    <TouchableOpacity onPress={onDelete}>
                        <FontAwesome6 name='trash' color='white' size={18} />
                    </TouchableOpacity>
                </View>
            </View>

            <View className='p-2 border-b min-h-16'>
                <Text>{description || ''}</Text>
            </View>

            {price && (
                <View className='flex flex-row items-center justify-end p-2 text-end bg-primaryBlue rounded-b-md'>
                    <Text className='font-bold text-white uppercase'>Valor: R$ {price.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
                </View>
            )}
        </View>
    )
}
