import React from 'react';
import {View, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from './src/screens/Home';
import ModificarPesquisa from './src/screens/ModificarPesquisa';
import NovaPesquisa from './src/screens/NovaPesquisa';
import Login from './src/screens/Login';
import NovaConta from './src/screens/NovaConta';
import RecuperarSenha from './src/screens/RecuperarSenha';
import AcoesPesquisa from './src/screens/AcoesPesquisa';
import Agradecimento from './src/screens/Agradecimento';
import ColetaSatisfacao from './src/screens/ColetaSatisfacao';
import Relatorio from './src/screens/Relatorio';
import DrawerRoutes from './src/screens/DrawerRoutes';

const Stack = createStackNavigator();

const App = () => {
  return (
    <View style={styles.view}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{headerShown: false, gestureEnabled: false}}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Nova Conta" component={NovaConta} />
          <Stack.Screen name="Recuperar Senha" component={RecuperarSenha} />
          <Stack.Screen name="DrawerRoutes"component={DrawerRoutes}/>
          <Stack.Screen name="ColetaSatisfacao" component={ColetaSatisfacao} />
          <Stack.Screen name="Relatorio" component={Relatorio} />
          <Stack.Screen name="Modificar Pesquisa" component={ModificarPesquisa}/>
          <Stack.Screen name="Nova Pesquisa" component={NovaPesquisa} />
          <Stack.Screen name="AcoesPesquisa" component={AcoesPesquisa}/>
          <Stack.Screen name="Agradecimento" component={Agradecimento}/>
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
