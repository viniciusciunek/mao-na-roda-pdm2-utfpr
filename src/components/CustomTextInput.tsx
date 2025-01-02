import React from 'react'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { View, Text, TextInput, KeyboardTypeOptions } from 'react-native'

interface TextInputProps {
    label: string;
    placeholder: string;
    icon: string;
    iconSize?: number;
    iconColor?: string;
    value?: string;
    onChangeText: (text: string) => void;
    textContentType?: 'none' | 'URL' | 'addressCity' | 'addressCityAndState' | 'addressState' | 'countryName' | 'creditCardNumber' | 'emailAddress' | 'familyName' | 'fullStreetAddress' | 'givenName' | 'jobTitle' | 'location' | 'middleName' | 'name' | 'namePrefix' | 'nameSuffix' | 'nickname' | 'organizationName' | 'password' | 'postalCode' | 'streetAddressLine1' | 'streetAddressLine2' | 'sublocality' | 'telephoneNumber' | 'username' | 'newPassword' | 'oneTimeCode';
    keyboardType?: KeyboardTypeOptions;
}

export default function CustomTextInput({ label, placeholder, icon, iconSize = 24, iconColor, value, onChangeText, textContentType, keyboardType }: TextInputProps) {
    const handleTextChange = (text: string) => {
        const sanitizedText = text.replace(',', '.');

        onChangeText(sanitizedText);
    };

    return (
        <View className='gap-1'>
            <Text className='ml-2 font-nunito_regular'>{label}</Text>

            <View className='flex flex-row items-center justify-start bg-transparent border border-[#0E3087] rounded-xl h-14'>
                <FontAwesome6 className="p-4" name={icon || ''} color={iconColor} size={iconSize} />

                <TextInput
                    placeholder={placeholder}
                    className='w-full h-full outline-none'
                    onChangeText={handleTextChange}
                    value={value || ''}
                    textContentType={textContentType}
                    keyboardType={keyboardType || 'default'}
                />
            </View>
        </View>
    )
}
