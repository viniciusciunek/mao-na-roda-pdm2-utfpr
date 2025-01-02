import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import React, { useEffect } from 'react';
import useAuth from '../../src/store/useAuth';
import pb from '../../src/services/pocketbase';

export default function TabLayout() {
    const { user, role } = useAuth();

    useEffect(() => {
    }, [])

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: '#7089CB',
                headerTitle: "Mão na Roda - Administrador",
                headerTitleStyle: {
                    color: 'white',
                    fontFamily: 'Nunito_900Black',
                },
                headerStyle: {
                    backgroundColor: '#0E3087',
                },
                tabBarStyle: {
                    backgroundColor: '#0E3087',
                    borderTopStartRadius: 12,
                    borderTopEndRadius: 12,
                    height: 60,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '600',
                },
            }}
        >
            <Tabs.Screen name="home" options={{ title: 'Home', tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} /> }} />

            <Tabs.Screen name="budget/create" options={{ href: null, headerTitle: 'Criar Orçamento' }} />

            <Tabs.Screen name="product/products" options={{ href: null, headerTitle: 'Lista dos Produtos', tabBarStyle: { display: 'none' } }} />

            <Tabs.Screen name="product/create" options={{ href: null, headerTitle: 'Criar Produto', tabBarStyle: { display: 'none' } }} />

            <Tabs.Screen name="product/view" initialParams={{ id: '' }} options={{ href: null, headerTitle: 'Editando Produto', tabBarStyle: { display: 'none' } }} />
        </Tabs>
    );
}
