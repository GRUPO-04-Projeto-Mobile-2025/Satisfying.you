import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import BarraSuperior from '../components/barraSuperior';
import PieChart from 'react-native-pie-chart';
import {getVotosPorPesquisa} from '../firebase/pesquisaService';

// Array base com as cores padrão para cada opção
const seriesBase = [
  {key: 'excelente', label: 'Excelente', color: '#F1CE7E'},
  {key: 'bom', label: 'Bom', color: '#6994FE'},
  {key: 'neutro', label: 'Neutro', color: '#5FCDA4'},
  {key: 'ruim', label: 'Ruim', color: '#EA7288'},
  {key: 'pessimo', label: 'Péssimo', color: '#53D8D8'},
];

const Relatorio = ({route}) => {
  const navigation = useNavigation();
  const {pesquisa} = route.params || {};

  const [series, setSeries] = useState([
    {value: 25, color: '#F1CE7E'},
    {value: 20, color: '#6994FE'},
    {value: 15, color: '#5FCDA4'},
    {value: 30, color: '#EA7288'},
    {value: 10, color: '#53D8D8'},
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        if (!pesquisa?.id) {
          setLoading(false);
          return;
        }

        const votosFirebase = await getVotosPorPesquisa(pesquisa.id);
        console.log('Votos do Firebase:', votosFirebase);

        // Transformar dados do Firebase no formato series
        const novoSeries = seriesBase.map(item => ({
          value: votosFirebase[item.key] || 0,
          color: item.color,
        }));

        console.log('Novo series para PieChart:', novoSeries);
        setSeries(novoSeries);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        setLoading(false);
      }
    };

    carregarDados();
  }, [pesquisa]);

  const legenda = seriesBase.map(item => item.label);

  const goBack = () => {
    navigation.goBack();
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <BarraSuperior nomeTela="Relatório" onPress={goBack} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#ffffff" />
          <Text style={styles.loadingText}>Carregando relatório...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BarraSuperior nomeTela="Relatório" onPress={goBack} />

      <View style={styles.conteudo}>
        <PieChart widthAndHeight={180} series={series} />

        <View style={styles.legendaContainer}>
          {legenda.map((label, index) => (
            <View key={index} style={styles.legendaItem}>
              <View
                style={[
                  styles.corLegenda,
                  {backgroundColor: series[index].color},
                ]}
              />
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 10,
  },
  conteudo: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  legendaContainer: {
    justifyContent: 'center',
    marginLeft: 30,
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
