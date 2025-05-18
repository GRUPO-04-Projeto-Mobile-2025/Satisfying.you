import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import PrimaryButton from '../components/PrimaryButton';
import { useTheme } from '../contexts/ThemeContext';
import { acoesPesquisaPropTypes } from '../utils/propTypes';

export default function AcoesPesquisa({ route }) {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { surveyTitle } = route.params;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title={surveyTitle} showBackButton />

      <View style={styles.actionsContainer}>
        <PrimaryButton 
          title="Modificar"
          icon="create-outline"
          onPress={() => navigation.navigate('ModificarPesquisa')}
          style={styles.button}
        />
        <PrimaryButton 
          title="Coletar dados"
          icon="checkbox-outline"
          onPress={() => navigation.navigate('ColetaSatisfacao')}
          style={styles.button}
        />
        <PrimaryButton 
          title="Relatório"
          icon="bar-chart-outline"
          onPress={() => navigation.navigate('Relatorio')}
          style={styles.button}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  actionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
    marginTop: 32,
  },
  button: {
    width: '48%',
    height: 120,
  },
});

AcoesPesquisa.propTypes = acoesPesquisaPropTypes;