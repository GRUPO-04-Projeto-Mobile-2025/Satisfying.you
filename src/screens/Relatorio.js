import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const legenda = [
  { label: 'Excelente', color: '#F1CE7E' },
  { label: 'Bom', color: '#6994FE' },
  { label: 'Neutro', color: '#5FCDA4' },
  { label: 'Ruim', color: '#EA7288' },
  { label: 'Péssimo', color: '#53D8D8' },
];

const Relatorio = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Relatório</Text>
      </View>

      <View style={styles.conteudo}>
        <Image
          source={require('../../images/GraficoRelatorio.png')}
          style={styles.grafico}
          resizeMode="contain"
        />

        <View style={styles.legendaContainer}>
          {legenda.map((item, index) => (
            <View key={index} style={styles.legendaItem}>
              <View style={[styles.corLegenda, { backgroundColor: item.color }]} />
              <Text style={styles.legendaLabel}>{item.label}</Text>
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
  header: {
  backgroundColor: '#2B1D62',
  paddingTop: 25,
  paddingBottom: 15,
  alignItems: 'flex-start',
  paddingLeft: 20,
},
titulo: {
  fontSize: 24,
  color: '#fff',
  fontWeight: 'Averia Libre',
},

  conteudo: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  grafico: {
    width: '45%',
    height: 250,
  },
  legendaContainer: {
    width: '45%',
    justifyContent: 'center',
    marginLeft: 20,
    marginTop: 40,
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
