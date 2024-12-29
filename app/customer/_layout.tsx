import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{
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
                backgroundColor: '#0E3087',
                borderTopStartRadius: 12,
                borderTopEndRadius: 12,
                height: 60,
            },
            tabBarLabelStyle: {
                fontSize: 12,
                fontWeight: '600',
            },
        }} />
    );
}
