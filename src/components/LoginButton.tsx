import { TouchableOpacity, Text } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

interface PrimaryButtonProps {
    text?: string;
    textColor?: string;
    backgroundColor?: string;
    border?: boolean;
    borderColor?: string;
    icon?: string;
    iconSize?: number;
    iconColor?: string;
    onPress?: () => void;
}

export default function LoginButton({ text, textColor, backgroundColor, border, borderColor, icon, iconSize = 24, iconColor, onPress, }: PrimaryButtonProps) {

    return (
        <TouchableOpacity className={`p-4 flex-row justify-center items-center gap-2 self-stretch rounded-3xl w-full min-w-[400px] h-14 ${border ? 'border' : ''}`}
            style={{
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                borderWidth: border ? 2 : 0,
            }} onPress={onPress} >

            {text && (<Text className="text-base font-bold text-center font-poppins_bold" style={{ color: textColor }}>{text}</Text>)}

            <FontAwesome6 name={icon || ''} color={iconColor} size={iconSize} />
        </TouchableOpacity>
    );
}
