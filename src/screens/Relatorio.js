import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BarraSuperior from '../components/barraSuperior';
import PieChart from 'react-native-pie-chart';

const series = [
  { value: 25, color: '#F1CE7E' },
  { value: 20, color: '#6994FE' },
  { value: 15, color: '#5FCDA4' },
  { value: 30, color: '#EA7288' },
  { value: 10, color: '#53D8D8' },
];

const legenda = ['Excelente', 'Bom', 'Neutro', 'Ruim', 'Péssimo'];

const Relatorio = () => {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <BarraSuperior nomeTela="Relatório" onPress={goBack} />

      <View style={styles.conteudo}>
        <PieChart widthAndHeight={180} series={series} />

        <View style={styles.legendaContainer}>
          {legenda.map((label, index) => (
            <View key={index} style={styles.legendaItem}>
              <View style={[styles.corLegenda, { backgroundColor: series[index].color }]} />
              <Text style={styles.legendaLabel}>{label}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default Relatorio;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#372775',
  },
  conteudo: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  legendaContainer: {
    width: '45%',
    justifyContent: 'center',
    marginLeft: 20,
    marginTop: 20,
  },
  legendaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  corLegenda: {
    width: 18,
    height: 18,
    borderRadius: 3,
    marginRight: 10,
  },
  legendaLabel: {
    color: '#fff',
    fontSize: 16,
  },
});
