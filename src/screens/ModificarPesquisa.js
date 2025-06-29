import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState, useEffect } from 'react';
import {
  View,
  Button,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';

import BarraSuperior from '../components/barraSuperior';
import PopUp from '../components/popUp';
import { updatePesquisa, deletePesquisa, getPesquisaById } from '../firebase/pesquisaService';

const ModificarPesquisa = props => {
  const { pesquisaId, pesquisaData } = props.route?.params || {};
  
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [nome, setNome] = useState('');
  const [erroNome, setErroNome] = useState(false);
  const [erroData, setErroData] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [imagem, setImagem] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    carregarDadosPesquisa();
  }, []);

  const carregarDadosPesquisa = async () => {
    try {
      if (pesquisaData) {
        setNome(pesquisaData.nome || '');
        setDate(pesquisaData.data?.toDate ? pesquisaData.data.toDate() : new Date());
        setImagem(pesquisaData.imagem || null);
      } else if (pesquisaId) {
        const dados = await getPesquisaById(pesquisaId);
        setNome(dados.nome || '');
        setDate(dados.data?.toDate ? dados.data.toDate() : new Date());
        setImagem(dados.imagem || null);
      }
    } catch (error) {
      console.error('Erro ao carregar dados da pesquisa:', error);
      Alert.alert('Erro', 'Não foi possível carregar os dados da pesquisa');
    }
  };

  const formatDate = inputDate => {
    return inputDate
      ? `${inputDate.getDate().toString().padStart(2, '0')}/${(
          inputDate.getMonth() + 1
        )
          .toString()
          .padStart(2, '0')}/${inputDate.getFullYear()}`
      : '';
  };

  const onChange = (event, selectedDate) => {
    setShow(false);
    if (selectedDate) {
      setDate(selectedDate);
      setErroData(false);
    }
  };

  const salvarAlteracoes = async () => {
    let erro = false;
    
    if (!nome.trim()) {
      setErroNome(true);
      erro = true;
    } else {
      setErroNome(false);
    }
    
    if (!date) {
      setErroData(true);
      erro = true;
    } else {
      setErroData(false);
    }
    
    if (!erro && pesquisaId) {
      try {
        setLoading(true);
        
        const dadosAtualizados = {
          nome: nome.trim(),
          data: date,
          imagem: imagem,
        };
        
        await updatePesquisa(pesquisaId, dadosAtualizados);
        
        Alert.alert(
          'Sucesso', 
          'Pesquisa atualizada com sucesso!',
          [{ text: 'OK', onPress: () => props.navigation.goBack() }]
        );
        
      } catch (error) {
        console.error('Erro ao salvar alterações:', error);
        Alert.alert('Erro', 'Não foi possível salvar as alterações');
      } finally {
        setLoading(false);
      }
    }
  };

  const confirmarExclusao = async () => {
    try {
      setLoading(true);
      await deletePesquisa(pesquisaId);
      
      Alert.alert(
        'Sucesso', 
        'Pesquisa excluída com sucesso!',
        [{ text: 'OK', onPress: () => props.navigation.navigate('Home') }]
      );
      
    } catch (error) {
      console.error('Erro ao excluir pesquisa:', error);
      Alert.alert('Erro', 'Não foi possível excluir a pesquisa');
    } finally {
      setLoading(false);
      setPopupVisible(false);
    }
  };

  const goBack = () => {
    props.navigation.goBack();
  };

  const convertUriToBase64 = async uri => {
    try {
      const resizedImage = await ImageResizer.createResizedImage(
        uri,
        700,
        700,
        'JPEG',
        100,
      );

      const imageUri = await fetch(resizedImage.uri);
      const imagemBlob = await imageUri.blob();

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagem(reader.result);
      };
      reader.readAsDataURL(imagemBlob);
    } catch (error) {
      console.error('Erro ao processar imagem:', error);
      Alert.alert('Erro', 'Não foi possível processar a imagem');
    }
  };

  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, result => {
      if (result.assets && result.assets[0]) {
        convertUriToBase64(result.assets[0].uri);
      }
    });
  };

  return (
    <View style={styles.viewPrincipal}>
      <BarraSuperior nomeTela="Modificar Pesquisa" onPress={goBack} />
      <ScrollView
        contentContainerStyle={styles.view}
        keyboardShouldPersistTaps="handled">
        
        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={text => {
            setNome(text);
            if (text.trim()) {
              setErroNome(false);
            }
          }}
        />
        {erroNome && (
          <Text style={styles.erroTexto}>Preencha o nome da Pesquisa</Text>
        )}
        
        <Text style={styles.label}>Data</Text>
        <TouchableOpacity
          style={styles.inputContainer}
          onPress={() => setShow(true)}
          activeOpacity={0.7}>
          <TextInput
            style={styles.inputData}
            value={formatDate(date)}
            editable={false}
            pointerEvents="none"
          />
          <Image
            source={require('../../assets/icons/calendario.png')}
            style={styles.calendarioImg}
            resizeMode="contain"
          />
        </TouchableOpacity>
        {erroData && <Text style={styles.erroTexto}>Preencha a data</Text>}
        
        {show && (
          <DateTimePicker
            value={date || new Date()}
            mode="date"
            display="default"
            onChange={onChange}
          />
        )}
        
        <Text style={styles.label}>Imagem</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.inputGaleria}
          onPress={pickImage}>
          <Image
            source={
              imagem 
                ? (typeof imagem === 'string' ? { uri: imagem } : imagem)
                : require('../../assets/icons/padrao.png')
            }
            style={styles.imagemPreview}
            resizeMode="cover"
          />
        </TouchableOpacity>
        
        <View style={styles.divBotao}>
          <View style={styles.botao}>
            <Button 
              color="#37BD6D" 
              title={loading ? "SALVANDO..." : "SALVAR"} 
              onPress={salvarAlteracoes}
              disabled={loading}
            />
          </View>
        </View>
        
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.lixeira}
          onPress={() => setPopupVisible(true)}
          disabled={loading}>
          <Image
            source={require('../../assets/icons/lixeira.png')}
            style={styles.lixeiraImg}
            resizeMode="contain"
          />
          <Text style={styles.label}>Apagar</Text>
        </TouchableOpacity>
      </ScrollView>
      
      <PopUp
        visible={popupVisible}
        navigation={props.navigation}
        onConfirm={confirmarExclusao}
        onCancel={() => setPopupVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  viewPrincipal: {
    flex: 1,
    backgroundColor: '#372775',
  },
  view: {
    paddingHorizontal: '3%',
    paddingVertical: '2%',
    backgroundColor: '#372775',
  },
  divBotao: {
    marginTop: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 16,
  },
  botao: {
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 8,
    paddingHorizontal: 6,
    width: '100%',
    borderRadius: 6,
  },
  inputGaleria: {
    alignContent: 'center',
    flexDirection: 'row',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 8,
    paddingHorizontal: 6,
    borderWidth: 1,
    borderColor: '#3F92C5',
    borderRadius: 6,
    width: '100%',
  },
  imagemPreview: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  input: {
    backgroundColor: '#fff',
    paddingVertical: 6,
    fontSize: 14,
    marginBottom: 8,
    color: '#3F92C5',
    width: '100%',
    borderRadius: 6,
    paddingHorizontal: 10,
  },
  inputData: {
    flex: 1,
    color: '#3F92C5',
    fontSize: 14,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  calendarioImg: {
    width: 16,
    height: 16,
    marginRight: 10,
  },
  label: {
    fontSize: 14,
    color: 'white',
    marginBottom: 2,
  },
  erroTexto: {
    color: 'red',
    fontSize: 12,
    marginBottom: 6,
    marginTop: -8,
  },
  lixeira: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 10,
    alignSelf: 'center',
  },
  lixeiraImg: {
    width: 32,
    height: 32,
  },
});

export default ModificarPesquisa;