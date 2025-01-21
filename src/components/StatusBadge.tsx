import { Text, View } from 'react-native'

import React from 'react'

interface StatusBadgeProps {
    text: any;
    label: any;
    color: string;
    bgColor: string;
}

export default function StatusBadge({ text, label, color, bgColor }: StatusBadgeProps) {
    return (
        <View className='flex flex-col items-center justify-center gap-2'>
            <View className={`rounded-full shadow bg-${bgColor}-500 w-24 h-24 flex justify-center items-center`}>
                <Text className={`font-bold text-4xl text-${bgColor}-700`}>{text}</Text>
            </View>

            <Text className={`font-nunito_xligth text-${color}-700`}>{label}</Text>
        </View>
    )
}
