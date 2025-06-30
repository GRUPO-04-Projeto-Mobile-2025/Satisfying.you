import DateTimePicker from '@react-native-community/datetimepicker';
import React, {useState} from 'react';
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
import app from '../firebase/config';
import {addDoc, collection, getFirestore} from 'firebase/firestore';

const NovaPesquisa = props => {
  const [date, setDate] = useState(null);
  const [show, setShow] = useState(false);
  const [nome, setNome] = useState('');
  const [erroNome, setErroNome] = useState(false);
  const [erroData, setErroData] = useState(false);
  const [imagem, setImage] = useState(null);

  const formatDate = selectedDate => {
    return selectedDate
      ? `${selectedDate.getDate().toString().padStart(2, '0')}/${(
          selectedDate.getMonth() + 1
        )
          .toString()
          .padStart(2, '0')}/${selectedDate.getFullYear()}`
      : '';
  };

  const onChange = (event, selectedDate) => {
    setShow(false);
    if (selectedDate) {
      setDate(selectedDate);
      setErroData(false);
    }
  };

  const goToHome = () => {
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
    if (!erro) {
      addPesquisa();
      props.navigation.navigate('Home');
    }
  };

  const goBack = () => {
    props.navigation.goBack();
  };

  const convertUriToBase64 = async uri => {
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
      setImage(reader.result);
    };
    reader.readAsDataURL(imagemBlob);
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

    launchCamera(options, response => {
      console.log('Camera response:', response);
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorMessage) {
        console.log('Camera Error: ', response.errorMessage);
        Alert.alert('Erro', 'Erro ao abrir a câmera: ' + response.errorMessage);
      } else if (response.assets && response.assets[0]) {
        console.log('Image captured successfully');
        convertUriToBase64(response.assets[0].uri);
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

    launchImageLibrary(options, response => {
      console.log('Gallery response:', response);
      if (response.didCancel) {
        console.log('User cancelled gallery');
      } else if (response.errorMessage) {
        console.log('Gallery Error: ', response.errorMessage);
        Alert.alert(
          'Erro',
          'Erro ao abrir a galeria: ' + response.errorMessage,
        );
      } else if (response.assets && response.assets[0]) {
        console.log('Image selected successfully');
        convertUriToBase64(response.assets[0].uri);
      }
    });
  };

  const selecionarImagem = () => {
    Alert.alert('Selecionar imagem', 'Escolha a origem da imagem', [
      {
        text: 'Câmera',
        onPress: abrirCamera,
      },
      {
        text: 'Galeria',
        onPress: abrirGaleria,
      },
      {
        text: 'Cancelar',
        style: 'cancel',
      },
    ]);
  };

  const addPesquisa = async () => {
    try {
      const db = getFirestore(app);
      const pesquisaCollection = collection(db, 'pesquisas');

      const pesquisa = {
        nome: nome,
        data: date,
        imagem: imagem,
        createdAt: new Date(),
      };

      const pesquisaRef = await addDoc(pesquisaCollection, pesquisa);
      console.log('Pesquisa adicionada com ID:', pesquisaRef.id);
      return pesquisaRef.id;
    } catch (error) {
      console.error('Erro ao adicionar pesquisa:', error);
      throw error;
    }
  };

  return (
    <View style={styles.viewPrincipal}>
      <BarraSuperior nomeTela="Nova Pesquisa" onPress={goBack} />
      <ScrollView
        contentContainerStyle={styles.view}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={true}>
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
          <Text style={styles.iconeCalendario}>
            <Image
              source={require('../../assets/icons/calendario.png')}
              style={styles.calendarioImg}
              resizeMode="contain"
            />
          </Text>
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
          style={[styles.inputGaleria, imagem && styles.inputGaleriaComImagem]}
          onPress={selecionarImagem}>
          {imagem ? (
            <View style={styles.imagemContainer}>
              <Image source={{uri: imagem}} style={styles.imagemNoInput} />
            </View>
          ) : (
            <TextInput
              style={styles.inputGaleriaText}
              editable={false}
              pointerEvents="none"
              placeholder="Câmera/Galeria de Imagens"
            />
          )}
        </TouchableOpacity>
        <View style={styles.divBotao}>
          <View style={styles.botao}>
            <Button color="#37BD6D" title="CADASTRAR" onPress={goToHome} />
          </View>
        </View>
      </ScrollView>
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
    flexGrow: 1,
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
    height: 60,
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
  inputGaleriaComImagem: {
    height: 100,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagemContainer: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagemNoInput: {
    width: 80,
    height: 80,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  input: {
    backgroundColor: '#fff',
    paddingVertical: 6,
    fontSize: 14,
    marginBottom: 8,
    color: '#3F92C5',
    width: '100%',
    borderRadius: 6,
  },
  inputData: {
    flex: 1,
    color: '#3F92C5',
    fontSize: 14,
  },
  calendarioImg: {
    width: 16,
    height: 16,
  },
  iconeCalendario: {
    fontSize: 18,
    marginLeft: 6,
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
  inputGaleriaText: {
    flex: 1,
    textAlign: 'center',
    color: '#3F92C5',
    fontSize: 14,
  },
});

export default NovaPesquisa;
