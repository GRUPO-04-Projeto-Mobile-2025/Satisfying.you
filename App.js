import React from 'react';

import {View, StyleSheet} from 'react-native';

import ModificarPesquisa from './src/components/modificarPesquisa';
import NovaPesquisa from './src/components/novaPesquisa';


const App = () => {
  return (
    <View style={styles.view}>
      
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
