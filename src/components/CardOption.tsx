import { Link, useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import React from 'react';

interface CardOptionProps {
    title: string;
    icon: string;
    iconColor: string;
    iconSize: number;
    link: string;
    style?: string
}

export default function CardOption({ title, icon, iconColor, iconSize, link, style }: CardOptionProps) {
    const router = useRouter();

    return (
        // <Link href={link} asChild push>
        //     <TouchableOpacity className='flex flex-col items-center justify-center w-48 gap-2 bg-gray-300 rounded-lg shadow h-36'>
        //         <FontAwesome6 name={icon || ''} color={iconColor} size={iconSize} />

        //         <Text className='text-center text-gray-900 uppercase font-nunito_regular'>{title}</Text>
        //     </TouchableOpacity>
        // </Link>

        <Link href={link}>
            <View className={`flex flex-col items-center gap-2 ${style}`}>
                <TouchableOpacity onPress={() => router.push(link)} className='flex items-center justify-center w-24 h-24 p-4 text-white rounded-full shadow bg-primaryBlue'>
                    <FontAwesome6 name={icon || ''} color={iconColor} size={iconSize} />
                </TouchableOpacity>

                <Text className='truncate text-darkBlue font-poppins_bold'>{title}</Text>
            </View>
        </Link>
    )
}
