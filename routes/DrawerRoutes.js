import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from '../screens/Home';
import NovaPesquisa from '../screens/NovaPesquisa';
import AcoesPesquisa from '../screens/AcoesPesquisa';

const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Nova Pesquisa" component={NovaPesquisa} />
      <Drawer.Screen name="Ações de Pesquisa" component={AcoesPesquisa} />
    </Drawer.Navigator>
  );
}
