import { View, Text } from 'react-native'
import React from 'react'

interface StatusBadgeProps {
    text: string;
    label: string;
    color: string
    bgColor: string;
}

export default function StatusBadge({ text, label, color, bgColor }: StatusBadgeProps) {
    return (
        <View className='flex flex-col justify-center items-center gap-2'>
            <View className={`rounded-full shadow bg-${bgColor}-500 w-24 h-24 flex justify-center items-center`}>
                {/* <View className={`rounded-full shadow bg-${bgColor}-500 w-24 h-24 flex justify-center items-center`}> */}
                <Text className={`font-bold text-4xl text-${color}-700`}>{text}</Text>
            </View>

            <Text className={`font-nunito_xligth text-${color}-700`}>{label}</Text>
        </View>
    )
}
