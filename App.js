import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ColetaSatisfacao from './src/screens/ColetaSatisfacao';
import Relatorio from './src/screens/Relatorio';
import { View, Text, StyleSheet } from 'react-native';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ColetaSatisfacao">
        <Stack.Screen
          name="ColetaSatisfacao"
          component={ColetaSatisfacao}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Relatorio"
          component={Relatorio}
          options={{ headerShown: false }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  texto: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
