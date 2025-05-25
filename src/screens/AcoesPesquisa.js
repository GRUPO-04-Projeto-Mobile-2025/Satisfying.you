import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PrimaryButton from '../components/PrimaryButton';
import BarraSuperior from '../components/barraSuperior';
import ModificarIcon from '../../assets/icons/modificarIcon.png';
import ColetarIcon from '../../assets/icons/coletarDados.png';
import RelatorioIcon from '../../assets/icons/relatorio.png';

export default function AcoesPesquisa({ route }) {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.containerPrincipal}>
      <BarraSuperior nomeTela="Ações de Pesquisa" onPress={goBack} />
      <View style={styles.container}>
        <View style={styles.actionsContainer}>
          <PrimaryButton
            title="Modificar"
            imageSource={ModificarIcon}
            onPress={() => navigation.navigate('Modificar Pesquisa')}
          />
          <PrimaryButton
            title="Coletar dados"
            imageSource={ColetarIcon}
            onPress={() => navigation.navigate('ColetaSatisfacao')}
          />
          <PrimaryButton
            title="Relatório"
            imageSource={RelatorioIcon}
            onPress={() => navigation.navigate('Relatorio')}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#372775',
  },
  containerPrincipal: {
    flex: 1,
    backgroundColor: '#372775',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    paddingHorizontal: '10',
  },
  button: {
    width: '30%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 10,
    backgroundColor: '#2B1D62',
  },
});
