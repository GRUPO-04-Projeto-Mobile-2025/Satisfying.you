import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { addVoto } from '../firebase/pesquisaService';

const opcoes = [
  { label: 'Péssimo', image: require('../../assets/icons/Pessimo.png'), valor: 'pessimo' },
  { label: 'Ruim', image: require('../../assets/icons/Ruim.png'), valor: 'ruim' },
  { label: 'Neutro', image: require('../../assets/icons/Neutro.png'), valor: 'neutro' },
  { label: 'Bom', image: require('../../assets/icons/Bom.png'), valor: 'bom' },
  { label: 'Excelente', image: require('../../assets/icons/Excelente.png'), valor: 'excelente' },
];

const ColetaSatisfacao = ({ route }) => {
  const [selecionado, setSelecionado] = useState(null);
  const navigation = useNavigation();
  const { pesquisaId, pesquisaData } = route?.params || {};

  const handleSelecionar = async (index) => {
    try {
      setSelecionado(index);
      
      if (pesquisaId) {
        await addVoto(pesquisaId, opcoes[index].valor);
        console.log('Voto registrado:', opcoes[index].label);
      }
      
      setTimeout(() => {
        navigation.navigate('Agradecimento');
      }, 500);
      
    } catch (error) {
      console.error('Erro ao registrar voto:', error);
      Alert.alert(
        'Erro',
        'Não foi possível registrar seu voto. Tente novamente.',
        [
          { text: 'OK', onPress: () => setSelecionado(null) }
        ]
      );
    }
  };

  const nomePesquisa = pesquisaData?.nome || 'esta pesquisa';

  return (
    <View style={styles.container}>
      <Text style={styles.pergunta}>
        O que você achou de {nomePesquisa}?
      </Text>

      <View style={styles.opcoesContainer}>
        {opcoes.map((opcao, index) => (
          <TouchableOpacity
            key={index}
            style={styles.opcao}
            onPress={() => handleSelecionar(index)}
            disabled={selecionado !== null}
          >
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
      
      {selecionado !== null && (
        <Text style={styles.feedback}>
          Registrando sua avaliação...
        </Text>
      )}
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
  feedback: {
    color: '#37BD6D',
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
  },
});