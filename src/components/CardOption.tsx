import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Link, useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

interface CardOptionProps {
    title: string;
    icon: string;
    iconColor: string;
    iconSize: number;
    link: string;
}

export default function CardOption({ title, icon, iconColor, iconSize, link }: CardOptionProps) {
    const router = useRouter();

    return (
        <Link href={link} asChild push>
            <TouchableOpacity className='flex flex-col items-center justify-center w-48 gap-2 bg-gray-300 rounded-lg shadow h-36'>
                <FontAwesome6 name={icon || ''} color={iconColor} size={iconSize} />

                <Text className='text-center text-gray-900 uppercase font-nunito_regular'>{title}</Text>
            </TouchableOpacity>
        </Link>
    )
}
