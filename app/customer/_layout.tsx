import React, { useEffect } from 'react';

import AuthService from '../../src/services/authService';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: '#7089CB',
                headerTitle: "Mão na Roda - Cliente",
                headerTitleStyle: {
                    color: 'white',
                    fontFamily: 'Nunito_900Black',
                },
                headerStyle: {
                    backgroundColor: '#0E3087',
                },
                tabBarStyle: {
                    display: AuthService.isAuthenticated() ? 'flex' : 'none',
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
            <Tabs.Screen name="home" options={{ href: AuthService.isAuthenticated() ? '' : null, title: 'Home', tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} /> }} />
            <Tabs.Screen name="budget/approved" options={{ href: null }} />
            <Tabs.Screen name="budget/reproved" />
            <Tabs.Screen name="budget/show" options={{ href: null }} />
        </Tabs>
    );
}
