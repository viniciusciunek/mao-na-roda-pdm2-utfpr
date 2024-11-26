import { View, Text, Button } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

import pb from '../../src/services/pocketbase';
import useAuth from '../../src/store/useAuth';

/**
 * Tela principal do cliente.
 */
export default function CustomerScreen() {
    const { logout } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        pb.authStore.clear();
        await logout();

        router.replace('/');
        router.push('/');
    };

    return (
        <View>
            <Text>index cliente</Text>
            <Button title="Logout" onPress={handleLogout} />
        </View>
    );
}
