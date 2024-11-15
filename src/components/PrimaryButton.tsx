import { useTheme } from '@rneui/themed';
import { Button } from '@rneui/base';
import AntDesign from '@expo/vector-icons/AntDesign';
import { View, Text } from 'react-native';

interface PrimaryButtonProps {
    text?: string;
    textColor?: string;
    backgroundColor?: string;
    border?: boolean;
    borderColor?: string;
    icon: string;
    iconSize?: number;
    iconColor?: string;
    onPress?: () => void;
}

export default function PrimaryButton({ text, textColor, backgroundColor, border, borderColor, icon, iconSize, iconColor, onPress }: PrimaryButtonProps) {
    const { theme } = useTheme();

    return (
        <View >
            <Button buttonStyle={{
                padding: 16,
                justifyContent: 'center',
                alignItems: 'center',
                gap: 8,
                alignSelf: 'stretch',
                borderRadius: 32,
                width: '100%',
                minWidth: 400,
                height: 56,
                backgroundColor: backgroundColor || theme.colors.secondary,
                borderWidth: border ? 2 : 0,
                borderColor: borderColor || theme.colors.greyOutline,
            }} onPress={onPress} >
                <Text style={{
                    color: textColor || theme.colors.primary,
                    fontSize: 16,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    fontFamily: 'Poppins_700Bold',
                }} >{text}</Text>
                <AntDesign name={icon} size={iconSize} color={iconColor} />
            </Button>
        </View>
    )
}
