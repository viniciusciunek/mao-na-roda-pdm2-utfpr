import { TouchableOpacity } from 'react-native'
import React from 'react'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

interface PlusButton {
    icon: string;
    iconSize?: number;
    iconColor?: string;
    onPress?: () => void;
}

export default function PlusButton({ icon, iconSize = 24, iconColor, onPress }: PlusButton) {
    return (
        <TouchableOpacity className='absolute flex flex-row items-center justify-center w-16 h-16 bg-[#0E3087] rounded-full right-5 bottom-5' onPress={onPress}>
            <FontAwesome6 name={icon || ''} color={iconColor} size={iconSize} />
        </TouchableOpacity>
    )
}
