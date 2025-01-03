import React from 'react';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { View, Text, TextInput, KeyboardTypeOptions } from 'react-native';

interface TextInputProps {
    label: string; placeholder: string; icon?: string; iconSize?: number; iconColor?: string; value?: string; onChangeText: (text: string) => void; textContentType?: 'none' | 'URL' | 'addressCity' | 'addressCityAndState' | 'addressState' | 'countryName' | 'creditCardNumber' | 'emailAddress' | 'familyName' | 'fullStreetAddress' | 'givenName' | 'jobTitle' | 'location' | 'middleName' | 'name' | 'namePrefix' | 'nameSuffix' | 'nickname' | 'organizationName' | 'password' | 'postalCode' | 'streetAddressLine1' | 'streetAddressLine2' | 'sublocality' | 'telephoneNumber' | 'username' | 'newPassword' | 'oneTimeCode'; keyboardType?: KeyboardTypeOptions; isNumeric?: boolean;
}

export default function CustomTextInput({ label, placeholder, icon, iconSize = 24, iconColor, value, onChangeText, textContentType, keyboardType = 'default', isNumeric = false }: TextInputProps) {
    return (
        <View className="gap-1">
            {label && <Text className="ml-2 font-nunito_regular">{label}</Text>}
            <View className="flex flex-row items-center bg-transparent border border-[#0E3087] rounded-md h-10 px-4">
                {icon && <FontAwesome6 name={icon} color={iconColor} size={iconSize} style={{ marginRight: 8 }} />}
                <TextInput placeholder={placeholder} style={{ flex: 1 }} onChangeText={onChangeText} value={value || ''} textContentType={textContentType} keyboardType={isNumeric ? 'numeric' : keyboardType} />
            </View>
        </View>
    );
}
