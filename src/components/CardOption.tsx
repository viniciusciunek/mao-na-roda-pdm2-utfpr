import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router';

interface CardOptionProps {
    title: string;
    icon: string;
    iconColor: string;
    iconSize: number;
    link: string;
}

export default function CardOption({ title, icon, iconColor, iconSize, link }: CardOptionProps) {
    return (
        <Link href={link} className='bg-gray-300 shadow rounded-lg flex flex-col justify-center items-center p-8 gap-4 w-48 truncate'>
            <FontAwesome6 name={icon || ''} color={iconColor} size={iconSize} />

            <Text className='font-nunito_regular text-gray-900 uppercase'>{title}</Text>
        </Link>
    )
}
