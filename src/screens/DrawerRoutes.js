import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView,DrawerItemList } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';

const CustomDrawerContent = (props) => {
  const gotToLogin = () => {
    props.navigation.navigate('Login');
  };
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props} contentContainerStyle={styles.scrollContainer}>
        <View style={styles.userInfoSection}>
          <Text style={styles.userEmail}>usuario@dominio.com</Text>
          <View style={styles.divider} />
        </View>

        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <View style={styles.logoutSection}>
        <TouchableOpacity onPress={gotToLogin} style={styles.logoutButton}>
          <Icon name="exit-outline" size={24} color="#FFFFFF" />
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: '#372775',
  },
  userInfoSection: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 10,
  },
  userEmail: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'AveriaLibre-Regular',
  },
  divider: {
    borderBottomColor: '#FFFFFF',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginTop: 15,
  },
  logoutSection: {
    padding: 20,
    backgroundColor: '#372775',
    borderTopWidth: 1,
    borderTopColor: '#4A3A8A',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutText: {
    color: '#FFFFFF',
    marginLeft: 15,
    fontSize: 16,
    fontFamily: 'AveriaLibre-Regular',
  },
});

export default CustomDrawerContent;
