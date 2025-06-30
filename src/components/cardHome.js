import {Text, TouchableOpacity, Image, StyleSheet} from 'react-native';

const CardHome = ({titulo, img, data, onPress}) => {
  return (
    <TouchableOpacity style={styles.viewPrincipal} onPress={onPress}>
      <Image style={styles.imagem} source={img} resizeMode="contain" />
      <Text style={styles.titulo}>{titulo}</Text>
      <Text style={styles.data}>{data}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  viewPrincipal: {
    backgroundColor: '#fff',
    width: '30%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    height: 150,
  },
  titulo: {
    fontSize: 20,
    marginVertical: 2,
    color: '#3F92C5',
    fontFamily: 'AveriaLibre-Regular',
  },
  data: {
    fontSize: 10,
    color: '#5a5a5a',
    fontFamily: 'AveriaLibre-Regular',
  },
  imagem: {
    width: 100,
    height: 100,
  },
});

export default CardHome;
