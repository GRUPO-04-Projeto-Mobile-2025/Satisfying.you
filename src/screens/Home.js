import {View, StyleSheet} from 'react-native';

import Button from '../components/Button';
import CardHome from '../components/cardHome';
import BarraSuperior from '../components/barraSuperior';


const Home = props => {
  const goToNovaPesquisa = () => {
    props.navigation.navigate('Nova Pesquisa');
  };
  const goToAçoesPesquisa = () => {
    props.navigation.navigate('AcoesPesquisa');
  };

  const gotToDrawer = () => {
    props.navigation.toggleDrawer();
  };

  return (
    <View style={styles.viewPrincipal}>
      <BarraSuperior img={require('../../assets/icons/hamburgerIcon.png')} nomeTela="" onPress={gotToDrawer} />
      <View
        style={styles.cards}>
        <CardHome
          onPress={goToAçoesPesquisa}
          titulo="SECOMP 2023"
          img={require('../../assets/icons/secomp2023.png')}
          data="10/10/2023"
        />
        <CardHome
          onPress={goToAçoesPesquisa}
          titulo="UBUNTU 2022"
          img={require('../../assets/icons/ubuntu2022.png')}
          data="05/06/2022"
        />
        <CardHome
          onPress={goToAçoesPesquisa}
          titulo="MENINAS CPU"
          img={require('../../assets/icons/meninascpu.png')}
          data="01/04/2022"
        />
        <CardHome
          onPress={goToAçoesPesquisa}
          titulo="COTB"
          img={require('../../assets/icons/cotb.png')}
          data="01/04/2022"
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
  cards: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 16,
    marginTop: 20,
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
