import DateTimePicker from '@react-native-community/datetimepicker';
import React, {useState, useEffect} from 'react';
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
import {launchImageLibrary} from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';

import BarraSuperior from '../components/barraSuperior';
import PopUp from '../components/popUp';
import {updatePesquisa, deletePesquisa} from '../firebase/pesquisaService';

const ModificarPesquisa = props => {
  const {pesquisa} = props.route?.params || {};

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [nome, setNome] = useState('');
  const [erroNome, setErroNome] = useState(false);
  const [erroData, setErroData] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [imagem, setImagem] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const carregarDadosPesquisa = async () => {
      try {
        if (pesquisa) {
          setNome(pesquisa.nome || '');
          setDate(pesquisa.data?.toDate ? pesquisa.data.toDate() : new Date());
          setImagem(pesquisa.imagem || null);
        } else {
          console.error(
            'Dados da pesquisa não foram passados para ModificarPesquisa',
          );
          Alert.alert('Erro', 'Dados da pesquisa não encontrados');
        }
      } catch (error) {
        console.error('Erro ao carregar dados da pesquisa:', error);
        Alert.alert('Erro', 'Não foi possível carregar os dados da pesquisa');
      }
    };

    carregarDadosPesquisa();
  }, [pesquisa]);

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

    if (!erro && pesquisa?.id) {
      try {
        setLoading(true);

        const dadosAtualizados = {
          nome: nome.trim(),
          data: date,
          imagem: imagem,
        };

        await updatePesquisa(pesquisa.id, dadosAtualizados);

        // Redireciona para Home após sucesso
        props.navigation.navigate('Home');
      } catch (error) {
        console.error('Erro ao salvar alterações:', error);
        Alert.alert('Erro', 'Não foi possível salvar as alterações');
      } finally {
        setLoading(false);
      }
    } else if (!pesquisa?.id) {
      Alert.alert('Erro', 'ID da pesquisa não encontrado');
    }
  };

  const confirmarExclusao = async () => {
    try {
      if (!pesquisa?.id) {
        Alert.alert('Erro', 'ID da pesquisa não encontrado');
        return;
      }

      setLoading(true);
      await deletePesquisa(pesquisa.id);

      // Redireciona para Home após sucesso
      props.navigation.navigate('Home');
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
    launchImageLibrary({mediaType: 'photo'}, result => {
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
                ? typeof imagem === 'string'
                  ? {uri: imagem}
                  : imagem
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
              title={loading ? 'SALVANDO...' : 'SALVAR'}
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
