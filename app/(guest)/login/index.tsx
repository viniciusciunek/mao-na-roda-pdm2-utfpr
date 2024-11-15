import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import pb from '../../../src/services/pocketbase';
import useAuth from '../../../src/store/useAuth';
import PrimaryButton from '../../../src/components/PrimaryButton';


/**
 * Tela de login para usuários.
 */
export default function LoginScreen() {
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
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <TextInput placeholder='email' value={email} onChangeText={setEmail} />
            <TextInput placeholder='password' value={password} onChangeText={setPassword} secureTextEntry />

            <PrimaryButton text='Entre' textColor='white' icon='arrowright' iconSize={24} iconColor="white" backgroundColor='#0E3087' onPress={handleLogin} />

            <Text>ou</Text>

            <PrimaryButton text='Cadastre-se' textColor='#0E3087' icon='arrowright' iconColor='#0E3087' iconSize={24} backgroundColor='transparent' border borderColor='#0E3087' onPress={handleLogin} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        alignSelf: 'stretch',
    },
});
