import React from 'react';
import { Picker } from '@react-native-picker/picker';
import { View, Text } from 'react-native';

import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

type CustomPickerProps = {
    items: { label: string, value: any }[];
    selectedValue: any;
    onValueChange: (value: any) => void;
    label?: string;
    icon?: string;
    iconSize?: number;
    iconColor?: string;
    style?: string;
};

export default function CustomPicker({ items, selectedValue, onValueChange, label, icon, iconSize = 24, iconColor, style }: CustomPickerProps) {
    return (
        <View className={`gap-1`}>
            {label && <Text className="ml-2 font-nunito_regular">{label}</Text>}

            <View className={`flex flex-row items-center justify-start bg-transparent border border-[#0E3087] rounded-md h-10 ${style}`}>
                {icon && (
                    <FontAwesome6
                        className="p-4"
                        name={icon}
                        color={iconColor}
                        size={iconSize}
                    />
                )}

                <Picker style={{ flex: 1, color: '#000', backgroundColor: 'transparent' }} selectedValue={selectedValue} onValueChange={onValueChange}>
                    <Picker.Item key={0} label="Selecione..." value={null} />
                    {items.map((item, index) => (
                        <Picker.Item key={index} label={item.label} value={item.value} />
                    ))}
                </Picker>
            </View>
        </View>
    );
}
