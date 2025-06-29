import React, {useState} from 'react';
import {View, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import Button from '../components/Button';
import CardHome from '../components/cardHome';
import BarraSuperior from '../components/barraSuperior';
import {getAllPesquisas} from '../firebase/pesquisaService';

const Home = props => {
  const [pesquisas, setPesquisas] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      carregarPesquisas();
    }, []),
  );

  const carregarPesquisas = async () => {
    try {
      setLoading(true);
      const pesquisasData = await getAllPesquisas();
      setPesquisas(pesquisasData);
    } catch (error) {
      console.error('Erro ao carregar pesquisas:', error);
    } finally {
      setLoading(false);
    }
  };

  const goToNovaPesquisa = () => {
    props.navigation.navigate('Nova Pesquisa');
  };

  const goToAcoesPesquisa = pesquisa => {
    props.navigation.navigate('AcoesPesquisa', {
      pesquisa: pesquisa,
    });
  };

  const gotToDrawer = () => {
    props.navigation.toggleDrawer();
  };

  const formatarData = data => {
    if (data && data.toDate) {
      return data.toDate().toLocaleDateString('pt-BR');
    } else if (data instanceof Date) {
      return data.toLocaleDateString('pt-BR');
    }
    return 'Data não disponível';
  };

  const renderPesquisa = ({item}) => (
    <View style={styles.cardContainer}>
      <CardHome
        onPress={() => goToAcoesPesquisa(item)}
        titulo={item.nome}
        img={
          item.imagem
            ? {uri: item.imagem}
            : require('../../assets/icons/padrao.png')
        }
        data={formatarData(item.data)}
      />
    </View>
  );

  if (loading) {
    return (
      <View style={[styles.viewPrincipal, styles.loadingContainer]}>
        <BarraSuperior
          img={require('../../assets/icons/hamburgerIcon.png')}
          nomeTela=""
          onPress={gotToDrawer}
        />
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <View style={styles.viewPrincipal}>
      <BarraSuperior
        img={require('../../assets/icons/hamburgerIcon.png')}
        nomeTela=""
        onPress={gotToDrawer}
      />

      <View style={styles.carouselContainer}>
        <FlatList
          data={pesquisas}
          renderItem={renderPesquisa}
          keyExtractor={item => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[
            styles.listContainer,
            pesquisas.length <= 2 && styles.centeredContent,
          ]}
          snapToInterval={300}
          decelerationRate="fast"
          snapToAlignment="center"
          bounces={false}
          pagingEnabled={false}
        />
      </View>

      <Button
        text="NOVA PESQUISA"
        onPress={goToNovaPesquisa}
        style_button={styles.search}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  viewPrincipal: {
    flex: 1,
    backgroundColor: '#372775',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 20,
  },
  listContainer: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  centeredContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  cardContainer: {
    marginHorizontal: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  search: {
    backgroundColor: '#37BD6D',
    height: 30,
    marginHorizontal: 20,
    marginBottom: 10,
  },
});

export default Home;
