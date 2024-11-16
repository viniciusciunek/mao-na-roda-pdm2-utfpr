import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Stack, useRouter } from 'expo-router';
import useAuth from '../../../src/store/useAuth';

import pb from '../../../src/services/pocketbase';
import LoginButton from '../../../src/components/LoginButton';

export default function _screen() {
    const router = useRouter();
    const { setData } = useAuth();

    const [email, setEmail] = useState('dev@dev.com');
    const [password, setPassword] = useState('developing@123');

    const handleLogin = async () => {
        try {
            let authData = await pb.admins.authWithPassword(email, password);
            setData({ user: authData.admin, token: authData.token, role: 'admin' });
            router.replace('/(admin)/');
        } catch (error) {
            try {
                let authData = await pb.collection('customers').authWithPassword(email, password);
                setData({ user: authData.record, token: authData.token, role: 'customer' });
                router.replace('/(customer)/');
            } catch (error) {
                console.log('Erro de Login', 'Usuário ou senha incorretos.');
            }
        }
    };

    return (
        <View>
            <Stack.Screen options={{ headerShown: false }} />

            <TextInput placeholder='email' value={email} onChangeText={setEmail} />
            <TextInput placeholder='password' value={password} onChangeText={setPassword} secureTextEntry />
        </View>
    )
}
