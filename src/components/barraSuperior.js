import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';

const BarraSuperior = ({nomeTela, onPress, style_text}) => {
  return (
    <View style={estilos.container}>
      <TouchableOpacity style={estilos.botao} onPress={onPress}>
        <Image
          source={require('../../public/icons/seta.png')}
          style={estilos.setaImg}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <Text style={[estilos.texto, style_text]}>{nomeTela}</Text>
    </View>
  );
};

const estilos = StyleSheet.create({
  container: {
    width: '100%',
    height: 56,
    backgroundColor: '#2B1D62',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  botao: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  setaImg: {
    width: 30,
    height: 30,
  },
  texto: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 8,
  },
});

export default BarraSuperior;
