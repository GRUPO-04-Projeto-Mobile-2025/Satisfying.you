import DateTimePicker from '@react-native-community/datetimepicker';
import React, {useState, useEffect, useCallback} from 'react';
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
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';

import BarraSuperior from '../components/barraSuperior';
import PopUp from '../components/popUp';
import {
  updatePesquisa,
  deletePesquisa,
  getPesquisaById,
} from '../firebase/pesquisaService';

const ModificarPesquisa = props => {
  const {pesquisa, pesquisaId, pesquisaData} = props.route?.params || {};

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [nome, setNome] = useState('');
  const [erroNome, setErroNome] = useState(false);
  const [erroData, setErroData] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [imagem, setImagem] = useState(null);
  const [loading, setLoading] = useState(false);

  const currentPesquisaId = pesquisaId || pesquisa?.id;

  useEffect(() => {
    carregarDadosPesquisa();
  }, [carregarDadosPesquisa]);

  const carregarDadosPesquisa = useCallback(async () => {
    try {
      console.log('=== DEBUG MODIFICAR PESQUISA ===');
      console.log('pesquisaId:', pesquisaId);
      console.log('pesquisaData:', pesquisaData);
      console.log('pesquisa:', pesquisa);
      console.log('currentPesquisaId:', currentPesquisaId);

      if (pesquisaData) {
        console.log('Carregando dados da pesquisaData...');
        setNome(pesquisaData.nome || '');
        setDate(
          pesquisaData.data?.toDate ? pesquisaData.data.toDate() : new Date(),
        );
        setImagem(pesquisaData.imagem || null);
      } else if (pesquisa) {
        console.log('Carregando dados da pesquisa passada diretamente...');
        setNome(pesquisa.nome || '');
        setDate(pesquisa.data?.toDate ? pesquisa.data.toDate() : new Date());
        setImagem(pesquisa.imagem || null);
      } else if (currentPesquisaId) {
        console.log('Buscando dados pela currentPesquisaId...');
        const dados = await getPesquisaById(currentPesquisaId);
        console.log('Dados retornados:', dados);
        setNome(dados.nome || '');
        setDate(dados.data?.toDate ? dados.data.toDate() : new Date());
        setImagem(dados.imagem || null);
      } else {
        console.log('Nenhum ID ou dados de pesquisa encontrados');
      }
    } catch (error) {
      console.error('Erro ao carregar dados da pesquisa:', error);
    }
  }, [pesquisaData, pesquisa, currentPesquisaId, pesquisaId]);

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
    console.log('=== SALVAR ALTERAÇÕES ===');
    console.log('Nome:', nome);
    console.log('Date:', date);
    console.log('PesquisaId:', pesquisaId);
    console.log('CurrentPesquisaId:', currentPesquisaId);
    console.log('Imagem:', imagem ? 'Presente' : 'Null');

    let erro = false;

    if (!nome.trim()) {
      console.log('Erro: Nome vazio');
      setErroNome(true);
      erro = true;
    } else {
      setErroNome(false);
    }

    if (!date) {
      console.log('Erro: Data vazia');
      setErroData(true);
      erro = true;
    } else {
      setErroData(false);
    }

    if (!currentPesquisaId) {
      console.log('Erro: PesquisaId não encontrado');
      return;
    }

    if (!erro) {
      try {
        console.log('Iniciando salvamento...');
        setLoading(true);

        const dadosAtualizados = {
          nome: nome.trim(),
          data: date,
          imagem: imagem,
        };

        console.log('Dados para atualizar:', dadosAtualizados);
        await updatePesquisa(currentPesquisaId, dadosAtualizados);
        console.log('Pesquisa atualizada com sucesso!');

        props.navigation.goBack();
      } catch (error) {
        console.error('Erro ao salvar alterações:', error);
      } finally {
        setLoading(false);
      }
    } else {
      console.log('Erros de validação encontrados, não salvando');
    }
  };

  const confirmarExclusao = async () => {
    try {
      setLoading(true);
      await deletePesquisa(currentPesquisaId);

      props.navigation.navigate('Home');
    } catch (error) {
      console.error('Erro ao excluir pesquisa:', error);
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
    }
  };

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Permissão de Câmera',
            message: 'Este app precisa acessar sua câmera para tirar fotos.',
            buttonNeutral: 'Perguntar depois',
            buttonNegative: 'Cancelar',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const abrirCamera = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      Alert.alert('Erro', 'Permissão de câmera negada');
      return;
    }

    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchCamera(options, result => {
      console.log('Camera response:', result);
      if (result.didCancel) {
        console.log('User cancelled camera');
      } else if (result.errorMessage) {
        console.log('Camera Error: ', result.errorMessage);
        Alert.alert('Erro', 'Erro ao abrir a câmera: ' + result.errorMessage);
      } else if (result.assets && result.assets[0]) {
        console.log('Image captured successfully');
        convertUriToBase64(result.assets[0].uri);
      }
    });
  };

  const abrirGaleria = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, result => {
      console.log('Gallery response:', result);
      if (result.didCancel) {
        console.log('User cancelled gallery');
      } else if (result.errorMessage) {
        console.log('Gallery Error: ', result.errorMessage);
        Alert.alert('Erro', 'Erro ao abrir a galeria: ' + result.errorMessage);
      } else if (result.assets && result.assets[0]) {
        console.log('Image selected successfully');
        convertUriToBase64(result.assets[0].uri);
      }
    });
  };

  const abrirCameraOuGaleria = () => {
    Alert.alert('Selecionar imagem', 'Escolha uma opção', [
      {
        text: 'Câmera',
        onPress: abrirCamera,
      },
      {
        text: 'Galeria',
        onPress: abrirGaleria,
      },
      {text: 'Cancelar', style: 'cancel'},
    ]);
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
          onPress={abrirCameraOuGaleria}>
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
