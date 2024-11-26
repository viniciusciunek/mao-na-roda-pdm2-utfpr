import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: '#7089CB',
                headerTitle: "Mão na Roda",
                headerTitleStyle: {
                    color: 'white',
                    fontFamily: 'Nunito_900Black',
                },
                headerStyle: {
                    backgroundColor: '#0E3087',
                    // height: 60,
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
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
                }}
            />

            <Tabs.Screen
                name="test"
                options={{
                    title: 'Teste Porrona',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,
                }}
            />
        </Tabs>
    );
}
