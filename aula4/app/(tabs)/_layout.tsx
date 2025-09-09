import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: '#222' },
        headerTintColor: '#fff',
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#bbb',
        tabBarStyle: { backgroundColor: '#222' },
      }}
    >
      <Tabs.Screen
        name="orientacao"
        options={{
          title: 'Orientação',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="screen-rotation" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
