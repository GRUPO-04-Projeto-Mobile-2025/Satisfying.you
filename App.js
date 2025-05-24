import React from 'react';
import {View, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import ModificarPesquisa from './src/screens/ModificarPesquisa';
import NovaPesquisa from './src/screens/NovaPesquisa';
import Login from './src/screens/Login';
import NovaConta from './src/screens/NovaConta';
import RecuperarSenha from './src/screens/RecuperarSenha';
//import Relatorio from './src/screens/Relatorio';
//import AcoesPesquisa from './screens/AcoesPesquisa';
//import Agradecimento from './screens/Agradecimento';

const Stack = createStackNavigator();

const App = () => {
  return (
    <View style={styles.view}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Modificar Pesquisa"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Nova Conta" component={NovaConta} />
          <Stack.Screen name="Recuperar Senha" component={RecuperarSenha} />
          <Stack.Screen
            name="Modificar Pesquisa"
            component={ModificarPesquisa}
          />
          <Stack.Screen name="Nova Pesquisa" component={NovaPesquisa} />
          {/*
          <Stack.Screen
            name="AcoesPesquisa"
            component={AcoesPesquisa}
            options={{
              title: 'Ações da Pesquisa',
              header: ({ navigation }) => (
                <Header
                  title="Ações da Pesquisa"
                  showBackButton
                  navigation={navigation}
                />
              )
            }}
          />
          <Stack.Screen
            name="Agradecimento"
            component={Agradecimento}
            options={{
              headerShown: false,
              gestureEnabled: false
            }}
          />
          */}
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
