import React from 'react';
import { StyleProp, Text, View } from 'react-native';

import CurrencyInput from 'react-native-currency-input';

interface CustomCurrencyInputProps {
    label: string;
    value: number;
    prefix?: string;
    delimiter?: string;
    separator?: string;
    precision?: number;
    style?: StyleProp<any>;
    minValue?: number;
    maxValue?: number;
    onChangeText: (value: number) => void;
}

export default function CustomCurrencyInput({ label, value, onChangeText, prefix = 'R$', delimiter = '.', separator = ',', precision = 2, style, minValue, maxValue }: CustomCurrencyInputProps) {

    return (
        <View className="gap-1">
            {label && <Text>{label}</Text>}

            <View className="flex flex-row items-center border border-[#0E3087] rounded-md h-10">
                <CurrencyInput
                    value={value}
                    onChangeValue={onChangeText}
                    prefix={prefix}
                    delimiter={delimiter}
                    separator={separator}
                    precision={precision}
                    style={{ width: '100%', marginLeft: 2 }}
                    minValue={minValue}
                    maxValue={maxValue}
                />
            </View>
        </View>
    );
}
