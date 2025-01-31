import { Link, Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Text, View } from 'react-native';

import AuthService from '../src/services/authService';
import LoginButton from '../src/components/LoginButton';
import Mechanic from '../src/components/Mechanic';
import TextInput from '../src/components/CustomTextInput';
import Toast from 'react-native-toast-message';

export default function LoginScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // const [email, setEmail] = useState('vini@vini.com');
    // const [password, setPassword] = useState('123456789');

    const handleLogin = async () => {
        try {
            await AuthService.loginWithRole('_superusers', email, password, 'admin');

            router.replace('/admin/home');
        } catch (adminError) {
            try {
                await AuthService.loginWithRole('customers', email, password, 'customer');

                router.replace('/customer/home');
            } catch (customerError) {
                Toast.show({
                    type: 'error',
                    text1: 'Erro',
                    text2: 'E-mail ou senha incorretos!',
                    visibilityTime: 3000,
                });
            }
        }
    };

    return (
        <View className="flex flex-col justify-between w-full gap-2 m-auto h-5/6">
            <Stack.Screen options={{ headerShown: false }} />
            <View className="flex flex-col items-center justify-center">
                <Mechanic />
            </View>

            <View className="gap-2 mx-2">
                <Text className="text-center truncate font-poppins_bold">Faça seu login :)</Text>

                <TextInput value={email} onChangeText={setEmail} label="Email:" placeholder="Digite seu email." icon="user" iconSize={18} iconColor="grey" />

                <TextInput value={password} onChangeText={setPassword} label="Senha:" placeholder="Digite sua senha." icon="lock" iconSize={18} iconColor="grey" />
            </View>

            <View className="gap-2 mx-2">
                <LoginButton text="Entrar" textColor="#FFFFFF" backgroundColor="#0E3087" borderColor="#ff0000" onPress={handleLogin} />

                <Link href="/" asChild>
                    <Text className="text-center text-gray-600 underline">Esqueceu sua senha?</Text>
                </Link>
            </View>
        </View>
    );
}
