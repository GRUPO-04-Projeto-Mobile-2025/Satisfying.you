import {Text, TouchableOpacity, Image, StyleSheet} from 'react-native';

const CardHome = ({titulo, img, data, onPress}) => {
  return (
    <TouchableOpacity style={styles.viewPrincipal} onPress={onPress}>
      <Image style={styles.imagem} source={img} resizeMode="cover" />
      <Text style={styles.titulo}>{titulo}</Text>
      <Text style={styles.data}>{data}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  viewPrincipal: {
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    width: '30%',
    height: 300,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  data: {
    fontSize: 16,
    color: '#666',
  },
  imagem: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
});

export default CardHome;
