import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

interface SuccessButtonProps {
    label: string;
    icon: string;
    iconSize?: number;
    iconColor?: string;
    onPress?: () => void;
    right?: boolean;
}

export default function SuccessButton({ label, icon, iconSize = 24, iconColor, onPress, right = false }: SuccessButtonProps) {
    return (
        <TouchableOpacity className={`flex ${right ? 'flex-row' : 'flex-row-reverse'} items-center justify-center w-full gap-2 p-2 mt-2 text-center bg-green-800 rounded-xl h-14`} onPress={onPress}>
            <Text className='font-bold text-white uppercase'>{label}</Text>

            <FontAwesome6 name={icon || ''} color={iconColor} size={iconSize} />
        </TouchableOpacity>
    )
}
