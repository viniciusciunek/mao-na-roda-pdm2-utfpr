import { Text, TouchableOpacity } from 'react-native'

import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import React from 'react'

interface SuccessButtonProps {
    label: string;
    icon?: string;
    iconSize?: number;
    iconColor?: string;
    onPress?: () => void;
    right?: boolean;
    style?: string;
}

export default function DangerButton({ label, icon, iconSize = 24, iconColor, onPress, right = false, style }: SuccessButtonProps) {
    return (
        <TouchableOpacity className={`flex ${right ? 'flex-row' : 'flex-row-reverse'} items-center justify-evenly p-2 w-full text-center bg-red-500 rounded-md ${style}`} onPress={onPress}>
            <Text className='font-bold text-white uppercase'>{label}</Text>

            {icon && <FontAwesome6 name={icon || ''} color={iconColor} size={iconSize} />}
        </TouchableOpacity>
    )
}
