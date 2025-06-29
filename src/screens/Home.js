import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import Button from '../components/Button';
import CardHome from '../components/cardHome';
import BarraSuperior from '../components/barraSuperior';
import { getAllPesquisas } from '../firebase/pesquisaService';

const Home = props => {
  const [pesquisas, setPesquisas] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      carregarPesquisas();
    }, [])
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

  const goToAcoesPesquisa = (pesquisa) => {
    props.navigation.navigate('AcoesPesquisa', { 
      pesquisaId: pesquisa.id,
      pesquisaData: pesquisa 
    });
  };

  const gotToDrawer = () => {
    props.navigation.toggleDrawer();
  };

  const formatarData = (data) => {
    if (data && data.toDate) {
      return data.toDate().toLocaleDateString('pt-BR');
    } else if (data instanceof Date) {
      return data.toLocaleDateString('pt-BR');
    }
    return 'Data não disponível';
  };

  const renderPesquisa = ({ item }) => (
    <CardHome
      onPress={() => goToAcoesPesquisa(item)}
      titulo={item.nome}
      img={item.imagem ? { uri: item.imagem } : require('../../assets/icons/padrao.png')}
      data={formatarData(item.data)}
    />
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
      
      <FlatList
        data={pesquisas}
        renderItem={renderPesquisa}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
      />
      
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
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  search: {
    backgroundColor: '#37BD6D',
    height: 30,
    width: 620,
    margin: 'auto',
    marginBottom: 10,
  },
});

export default Home;