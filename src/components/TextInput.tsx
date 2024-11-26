import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { View, Text, TextInput as Input } from 'react-native'

interface TextInputProps {
    label: string;
    placeholder: string;
    icon: string;
    iconSize?: number;
    iconColor?: string;
    value?: string;
    onChangeText: (text: string) => void;
}

export default function TextInput({ label, placeholder, icon, iconSize = 24, iconColor, value, onChangeText }: TextInputProps) {
    return (
        <View className='gap-1'>
            <Text className='font-nunito_regular ml-2'>{label}</Text>

            <View className='flex flex-row items-center justify-start bg-transparent border border-[#0E3087] rounded-xl h-14'>
                <FontAwesome6 className="p-4" name={icon || ''} color={iconColor} size={iconSize} />

                <Input placeholder={placeholder} className='w-full h-full outline-none' onChangeText={onChangeText} value={value} />
            </View>
        </View>
    )
}
