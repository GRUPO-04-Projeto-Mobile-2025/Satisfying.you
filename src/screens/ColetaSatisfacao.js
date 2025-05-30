import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const opcoes = [
  {label: 'Péssimo', image: require('../../assets/icons/Pessimo.png')},
  {label: 'Ruim', image: require('../../assets/icons/Ruim.png')},
  {label: 'Neutro', image: require('../../assets/icons/Neutro.png')},
  {label: 'Bom', image: require('../../assets/icons/Bom.png')},
  {label: 'Excelente', image: require('../../assets/icons/Excelente.png')},
];

const ColetaSatisfacao = () => {
  const [selecionado, setSelecionado] = useState(null);
  const navigation = useNavigation();

  const handleSelecionar = index => {
    setSelecionado(index);
    setTimeout(() => {
      navigation.navigate('Agradecimento');
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pergunta}>O que você achou do Carnaval 2024?</Text>

      <View style={styles.opcoesContainer}>
        {opcoes.map((opcao, index) => (
          <TouchableOpacity
            key={index}
            style={styles.opcao}
            onPress={() => handleSelecionar(index)}>
            <Image
              source={opcao.image}
              style={[
                styles.imagem,
                selecionado === index && styles.selecionado,
              ]}
              resizeMode="contain"
            />
            <Text style={styles.label}>{opcao.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default ColetaSatisfacao;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#372775',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  pergunta: {
    color: '#fff',
    fontSize: 22,
    fontFamily: 'Averia Libre',
    marginBottom: 20,
    textAlign: 'center',
  },
  opcoesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  opcao: {
    alignItems: 'center',
    marginHorizontal: 5,
    width: '18%',
  },
  imagem: {
    width: 40,
    height: 60,
  },
  label: {
    color: '#fff',
    marginTop: 6,
    fontSize: 12,
    fontFamily: 'Averia Libre',
    textAlign: 'center',
  },
  selecionado: {
    opacity: 0.5,
  },
});
