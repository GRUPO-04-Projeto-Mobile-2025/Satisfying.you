import {View, Button, StyleSheet, ScrollView} from 'react-native';

import CardHome from '../components/cardHome';

const Home = props => {
  const goToNovaPesquisa = () => {
    props.navigation.navigate('Nova Pesquisa');
  };
  const goToAçoesPesquisa = () => {
    props.navigation.navigate('AcoesPesquisa');
  };
  return (
    <View style={styles.viewPrincipal}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.cards}>
        <CardHome
          onPress={goToAçoesPesquisa}
          titulo="Teste1"
          img="../../public/icons/calendario.png"
          data="25/02/2005"
        />
        <CardHome
          onPress={goToAçoesPesquisa}
          titulo="Teste1"
          img="../../public/icons/calendario.png"
          data="25/02/2005"
        />
        <CardHome
          onPress={goToAçoesPesquisa}
          titulo="Teste1"
          img="../../public/icons/calendario.png"
          data="25/02/2005"
        />
        <CardHome
          onPress={goToAçoesPesquisa}
          titulo="Teste1"
          img="../../public/icons/calendario.png"
          data="25/02/2005"
        />
      </ScrollView>
      <Button
        color="#37BD6D"
        title="NOVA PESQUISA"
        onPress={goToNovaPesquisa}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  viewPrincipal: {
    flex: 1,
    backgroundColor: '#372775',
  },
  cards: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 16, // se quiser espaçamento entre os cards (React Native >= 0.71)
  },
});

export default Home;
