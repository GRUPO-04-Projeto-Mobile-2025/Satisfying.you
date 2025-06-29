import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BarraSuperior from '../components/barraSuperior';
import PieChart from 'react-native-pie-chart';
import { getVotosPorPesquisa } from '../firebase/pesquisaService';

const Relatorio = ({ route }) => {
  const navigation = useNavigation();
  const { pesquisa } = route.params || {};
  
  const [dadosGrafico, setDadosGrafico] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalVotos, setTotalVotos] = useState(0);

  const coresOpções = {
    'Excelente': '#F1CE7E',
    'Bom': '#6994FE', 
    'Neutro': '#5FCDA4',
    'Ruim': '#EA7288',
    'Péssimo': '#53D8D8'
  };

  const opções = ['Excelente', 'Bom', 'Neutro', 'Ruim', 'Péssimo'];

  useEffect(() => {
    carregarDadosRelatorio();
  }, []);

  const carregarDadosRelatorio = async () => {
    try {
      setLoading(true);
      
      if (!pesquisa?.id) {
        console.error('ID da pesquisa não fornecido');
        return;
      }

      const votos = await getVotosPorPesquisa(pesquisa.id);
      
      const contagemVotos = {
        'Péssimo': 0,
        'Ruim': 0,
        'Neutro': 0,
        'Bom': 0,
        'Excelente': 0
      };

      let total = 0;
      votos.forEach(voto => {
        if (contagemVotos.hasOwnProperty(voto.opcao)) {
          contagemVotos[voto.opcao]++;
          total++;
        }
      });

      setTotalVotos(total);

      if (total === 0) {
        setDadosGrafico([]);
        setLoading(false);
        return;
      }

      const dadosParaGrafico = opções
        .filter(opcao => contagemVotos[opcao] > 0)
        .map(opcao => ({
          value: contagemVotos[opcao],
          color: coresOpções[opcao],
          label: opcao,
          percentual: ((contagemVotos[opcao] / total) * 100).toFixed(1)
        }));

      setDadosGrafico(dadosParaGrafico);
      
    } catch (error) {
      console.error('Erro ao carregar dados do relatório:', error);
    } finally {
      setLoading(false);
    }
  };

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
        {dadosGrafico.length > 0 ? (
          <>
            {/* Gráfico de Pizza */}
            <View style={styles.graficoContainer}>
              <PieChart 
                widthAndHeight={180} 
                series={dadosGrafico.map(item => item.value)}
                sliceColor={dadosGrafico.map(item => item.color)}
              />
              <Text style={styles.totalVotosText}>
                Total de votos: {totalVotos}
              </Text>
            </View>

            {/* Legenda */}
            <View style={styles.legendaContainer}>
              {dadosGrafico.map((item, index) => (
                <View key={index} style={styles.legendaItem}>
                  <View style={[styles.corLegenda, { backgroundColor: item.color }]} />
                  <Text style={styles.legendaLabel}>
                    {item.label}: {item.value} ({item.percentual}%)
                  </Text>
                </View>
              ))}
            </View>
          </>
        ) : (
          <View style={styles.semDadosContainer}>
            <Text style={styles.semDadosText}>
              Ainda não há votos registrados para esta pesquisa.
            </Text>
            <Text style={styles.semDadosSubtext}>
              Comece a coletar dados para ver o relatório!
            </Text>
          </View>
        )}
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
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  graficoContainer: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  totalVotosText: {
    color: '#fff',
    fontSize: 14,
    marginTop: 15,
    textAlign: 'center',
    fontWeight: 'bold',
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
    fontSize: 14,
    flex: 1,
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
  semDadosContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  semDadosText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  semDadosSubtext: {
    color: '#ccc',
    fontSize: 14,
    textAlign: 'center',
  },
});