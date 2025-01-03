import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';

interface CustomCurrencyInputProps {
    label: string;
    placeholder: string;
    prefix?: string;
    value: string;
    onChangeText: (formattedValue: string) => void;
}

export default function CustomCurrencyInput({
    label,
    placeholder,
    prefix = '',
    value,
    onChangeText,
}: CustomCurrencyInputProps) {
    const [inputValue, setInputValue] = useState<string>(value);

    const handleTextChange = (text: string) => {
        const numericValue = text.replace(/[^0-9]/g, '');

        const formattedValue = new Intl.NumberFormat('pt-BR', {
            style: 'decimal',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(Number(numericValue) / 100);

        setInputValue(formattedValue);
        onChangeText(formattedValue);
    };

    return (
        <View className="gap-1">
            {label && <Text>{label}</Text>}

            <View className="flex flex-row items-center border border-[#0E3087] rounded-md h-10 px-4">
                {prefix && <Text style={{ marginRight: 8 }}>{prefix}</Text>}

                <TextInput
                    placeholder={placeholder}
                    style={{ flex: 1 }}
                    keyboardType="numeric"
                    value={inputValue}
                    onChangeText={handleTextChange}
                />
            </View>
        </View>
    );
}
