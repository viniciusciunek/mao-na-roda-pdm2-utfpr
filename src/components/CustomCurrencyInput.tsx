import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';

interface CustomCurrencyInputProps {
    label: string;
    placeholder: string;
    prefix?: string; // Ex: "R$"
    value: string;
    onChangeText: (formattedValue: string) => void;
}

export default function CustomCurrencyInput({
    label,
    placeholder,
    prefix = '',
    value,
    onChangeText
}: CustomCurrencyInputProps) {
    const [inputValue, setInputValue] = useState<string>(value);

    const handleTextChange = (text: string) => {
        // Remove tudo que não for número
        const numericValue = text.replace(/[^0-9]/g, '');

        // Converte para número e formata com separadores de milhar e vírgula como separador decimal
        const formattedValue = new Intl.NumberFormat('pt-BR', {
            style: 'decimal',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(Number(numericValue) / 100); // Divide por 100 para considerar as casas decimais

        setInputValue(formattedValue);
        onChangeText(formattedValue); // Retorna o valor formatado para o callback
    };

    return (
        <View>
            {label && <Text>{label}</Text>}

            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: '#0E3087',
                    borderRadius: 10,
                    height: 50,
                    paddingHorizontal: 10,
                }}
            >
                {prefix && <Text style={{ marginRight: 5 }}>{prefix}</Text>}

                <TextInput
                    placeholder={placeholder}
                    style={{ flex: 1 }}
                    keyboardType="numeric" // Teclado numérico
                    value={inputValue}
                    onChangeText={handleTextChange}
                />
            </View>
        </View>
    );
}
