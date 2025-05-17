import React from 'react';
import {View, StyleSheet} from 'react-native';
import ModificarPesquisa from './src/components/modificarPesquisa';

function App(): React.JSX.Element {
  return (
    <View style={estilos.view}>
      <ModificarPesquisa />
    </View>
  );
}

const estilos = StyleSheet.create({
  view: {
    backgroundColor: '#372775',
    height: '100%',
  },
});

export default App;
