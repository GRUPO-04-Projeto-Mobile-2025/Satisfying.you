import {Text, TouchableOpacity, Image, StyleSheet} from 'react-native';

const CardHome = ({titulo, img, data, onPress}) => {
  return (
    <TouchableOpacity style={styles.viewPrincipal} onPress={onPress}>
      <Image style={styles.imagem} source={img} resizeMode="contain" />
      <Text style={styles.titulo} numberOfLines={1} ellipsizeMode="tail">
        {titulo}
      </Text>
      <Text style={styles.data}>{data}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  viewPrincipal: {
    backgroundColor: '#fff',
    width: 180,
    height: 150,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 6,
  },
  imagem: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'normal',
    color: '#3F92C5',
    fontFamily: 'AveriaLibre-Regular',
    textAlign: 'center',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  data: {
    fontSize: 14,
    color: '#8B8B8B',
    fontFamily: 'AveriaLibre-Regular',
    textAlign: 'center',
  },
});

export default CardHome;
