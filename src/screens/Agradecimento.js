import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
//import { useTheme } from '../contexts/ThemeContext';
import {agradecimentoPropTypes} from '../utils/propTypes';

export default function Agradecimento() {
  const navigation = useNavigation();
  //const { colors } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Main');
    }, 3000);

    return () => clearTimeout(timer);
  },);

  return (
    <View style={[styles.container /*{ backgroundColor: colors.background }*/]}>
      <Text style={[styles.message /*{ color: colors.text }*/]}>
        Obrigado por participar da pesquisa!
      </Text>
      <Text style={[styles.message /*{ color: colors.text }*/]}>
        Aguardamos você no próximo ano!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#372775',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  message: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 8,
    fontFamily: 'Poppins_500Medium',
    color: '#fff',
  },
});

Agradecimento.propTypes = agradecimentoPropTypes;
