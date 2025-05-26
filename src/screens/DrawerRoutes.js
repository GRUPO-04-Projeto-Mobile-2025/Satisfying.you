// src/screens/DrawerRoutes.js
import React from 'react';
import { StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from './Home';
import CustomDrawer from '../components/CustomDrawer';

const Drawer = createDrawerNavigator();

const DrawerRoutes = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props}/>}
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#372775',
          width: 200,
          borderRadius: 0,
        },
        drawerActiveTintColor: '#4A3A8A',
        drawerLabelStyle: {
          fontFamily: 'AveriaLibre-Regular',
          fontSize: 16,
          color: 'white',
        },
        headerShown: false,
      }}>
      <Drawer.Screen name="Pesquisas" component={Home} />
    </Drawer.Navigator>
  );
};

export default DrawerRoutes;
