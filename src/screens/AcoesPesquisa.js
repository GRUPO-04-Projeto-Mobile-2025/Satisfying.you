import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import PrimaryButton from '../components/PrimaryButton';
import BarraSuperior from '../components/barraSuperior';
import Error from '../components/Error';
import ModificarIcon from '../../assets/icons/modificarIcon.png';
import ColetarIcon from '../../assets/icons/coletarDados.png';
import RelatorioIcon from '../../assets/icons/relatorio.png';

export default function AcoesPesquisa({route}) {
  const navigation = useNavigation();

  const {pesquisa} = route.params || {};

  const goBack = () => {
    navigation.goBack();
  };

  if (!pesquisa) {
    return (
      <View style={styles.containerPrincipal}>
        <BarraSuperior nomeTela="Ações de Pesquisa" onPress={goBack} />
        <View style={styles.errorContainer}>
          <Error
            text="Erro: Dados da pesquisa não foram encontrados."
            style_container={styles.errorMessageContainer}
            style_text={styles.errorText}
          />
          <Text style={styles.errorSubtext}>
            Por favor, volte e tente novamente.
          </Text>
        </View>
      </View>
    );
  }

  const goToModificar = () => {
    navigation.navigate('Modificar Pesquisa', {pesquisa});
  };

  const goToColeta = () => {
    navigation.navigate('ColetaSatisfacao', {pesquisa});
  };

  const goToRelatorio = () => {
    navigation.navigate('Relatorio', {pesquisa});
  };

  return (
    <View style={styles.containerPrincipal}>
      <BarraSuperior nomeTela="Ações de Pesquisa" onPress={goBack} />
      <View style={styles.container}>
        <View style={styles.actionsContainer}>
          <PrimaryButton
            title="Modificar"
            imageSource={ModificarIcon}
            onPress={goToModificar}
          />
          <PrimaryButton
            title="Coletar dados"
            imageSource={ColetarIcon}
            onPress={goToColeta}
          />
          <PrimaryButton
            title="Relatório"
            imageSource={RelatorioIcon}
            onPress={goToRelatorio}
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
    paddingHorizontal: 10,
  },
  button: {
    width: '30%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 10,
    backgroundColor: '#2B1D62',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorMessageContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
  },
  errorSubtext: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    fontFamily: 'AveriaLibre-Regular',
  },
});
