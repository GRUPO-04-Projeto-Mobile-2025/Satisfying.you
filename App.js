import React from 'react';
import {View, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ModificarPesquisa from './src/components/modificarPesquisa';
import NovaPesquisa from './src/components/novaPesquisa';
import Relatorio from './src/screens/Relatorio';
import Login from './src/screens/Login';
import NovaConta from './src/screens/NovaConta';
import RecuperarSenha from './src/screens/RecuperarSenha';

const Stack = createStackNavigator();

const App = () => {
  return (
    <View style={styles.view}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={Login}/>
          <Stack.Screen name="Nova Conta" component={NovaConta}/>
          <Stack.Screen name="Recuperar Senha" component={RecuperarSenha}/>
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#372775',
  },
  texto: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default App;
