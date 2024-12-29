import { View, Text } from 'react-native'
import React, { useState, } from 'react'
import { Link, Stack, useRouter, } from 'expo-router';
import useAuth from '../src/store/useAuth';

import pb from '../src/services/pocketbase';
import LoginButton from '../src/components/LoginButton';
import TextInput from '../src/components/TextInput';

import Svg, { Path } from "react-native-svg"
import Mechanic from '../src/components/Mechanic';

export default function _screen() {
    const router = useRouter();
    const { setRole } = useAuth();

    const [email, setEmail] = useState('dev@dev.com');
    const [password, setPassword] = useState('developing@123');

    // const [email, setEmail] = useState('vini@vini.com');
    // const [password, setPassword] = useState('123456789');

    const handleLogin = async () => {
        try {
            await pb.collection('_superusers').authWithPassword(email, password);
            setRole('admin');
            router.replace('/admin/home');
        } catch (error) {
            try {
                await pb.collection('customers').authWithPassword(email, password);
                setRole('customer');
                router.replace('/customer/home');
            } catch (error) {
                console.log('Erro de Login', 'Usuário ou senha incorretos.');
            }
        }
    };

    return (
        <View className='flex flex-col justify-between w-full gap-2 m-auto h-5/6'>
            <Stack.Screen options={{ headerShown: false }} />
            <View className='flex flex-col items-center justify-center'>
                <Mechanic />
            </View>


            <View className='gap-2 mx-2'>
                <Text className='text-center truncate font-poppins_bold'>Faça seu login :)</Text>

                <TextInput value={email} onChangeText={setEmail} label="Email:" placeholder="Digite seu email." icon='user' iconSize={18} iconColor="grey" />
                <TextInput value={password} onChangeText={setPassword} label="Senha:" placeholder="Digite sua senha." icon='lock' iconSize={18} iconColor="grey" />
            </View>

            <View className='gap-2 mx-2'>
                <LoginButton text='Entrar' textColor='#FFFFFF' backgroundColor='#0E3087' borderColor='#ff0000' onPress={handleLogin} />

                <Link href="/" asChild>
                    <Text className='text-center text-gray-600 underline'>Esqueceu sua senha?</Text>
                </Link>
            </View>
        </View>
    )
}
