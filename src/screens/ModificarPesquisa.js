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
} from 'react-native';

import BarraSuperior from '../components/barraSuperior';
import PopUp from '../components/popUp';

const ModificarPesquisa = props => {
  const {
    nomeInicial = 'Carnaval 2025',
    dataInicial = new Date(),
    imagemPadrao = require('../../public/img/padrao.png'),
  } = props.route?.params || {};

  const [date, setDate] = useState(dataInicial);
  const [show, setShow] = useState(false);
  const [nome, setNome] = useState(nomeInicial);
  const [erroNome, setErroNome] = useState(false);
  const [erroData, setErroData] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [imagem, setImagem] = useState(null);

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
      console.log('tudo certo');
      props.navigation.navigate('Home');
    }
  };

  const handleDelete = () => {
    props.navigation.navigate('Home');
  };

  const goBack = () => {
    props.navigation.goBack();
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
          <Text style={styles.iconeCalendario}>
            <Image
              source={require('../../public/icons/calendario.png')}
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
        <TouchableOpacity activeOpacity={0.7} style={styles.inputGaleria}>
          <Image
            source={imagem ? imagem : imagemPadrao}
            style={styles.imagemPreview}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <View style={styles.divBotao}>
          <View style={styles.botao}>
            <Button color="#37BD6D" title="SALVAR" onPress={goToHome} />
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.lixeira}
          onPress={() => setPopupVisible(true)}>
          <Image
            source={require('../../public/icons/lixeira.png')}
            style={styles.lixeiraImg}
            resizeMode="contain"
          />
          <Text style={styles.label}>Apagar</Text>
        </TouchableOpacity>
      </ScrollView>
      <PopUp
        visible={popupVisible}
        navigation={props.navigation}
        onConfirm={handleDelete}
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
    paddingHorizontal: '3%', // Reduzido
    paddingVertical: '2%', // Reduzido
    backgroundColor: '#372775',
  },
  divBotao: {
    marginTop: 10, // Reduzido
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 16, // Reduzido
  },
  botao: {
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 8, // Reduzido
    paddingHorizontal: 6, // Reduzido
    width: '100%',
    borderRadius: 6, // Opcional
  },
  inputGaleria: {
    alignContent: 'center',
    flexDirection: 'row',
    height: 60, // Reduzido
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 8, // Reduzido
    paddingHorizontal: 6, // Reduzido
    borderWidth: 1,
    borderColor: '#3F92C5',
    borderRadius: 6, // Reduzido
    width: '100%',
  },
  imagemPreview: {
    width: 50, // Reduzido
    height: 50, // Reduzido
    borderRadius: 6,
  },
  input: {
    backgroundColor: '#fff',
    paddingVertical: 6, // Reduzido
    fontSize: 14, // Reduzido
    marginBottom: 8, // Reduzido
    color: '#3F92C5',
    width: '100%',
    borderRadius: 6,
  },
  inputData: {
    flex: 1,
    color: '#3F92C5',
    fontSize: 14, // Reduzido
  },
  calendarioImg: {
    width: 16, // Reduzido
    height: 16, // Reduzido
  },
  iconeCalendario: {
    fontSize: 18, // Reduzido
    marginLeft: 6,
  },
  label: {
    fontSize: 14, // Reduzido
    color: 'white',
    marginBottom: 2,
  },
  erroTexto: {
    color: 'red',
    fontSize: 12, // Reduzido
    marginBottom: 6,
    marginTop: -8,
  },
  lixeira: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 10, // Reduzido
    alignSelf: 'center',
  },
  lixeiraImg: {
    width: 32, // Reduzido
    height: 32, // Reduzido
  },
});

export default ModificarPesquisa;
