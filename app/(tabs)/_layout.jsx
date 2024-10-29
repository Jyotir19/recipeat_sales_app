import { Tabs } from 'expo-router';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Login',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome
              name={focused ? 'sign-in' : 'user'}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="signup"
        options={{
          title: 'Signup',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome
              name={focused ? 'user-plus' : 'user-circle'}
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
