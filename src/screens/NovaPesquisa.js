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
} from 'react-native';

import BarraSuperior from '../components/barraSuperior';

const NovaPesquisa = (props) => {
  const [date, setDate] = useState(null);
  const [show, setShow] = useState(false);
  const [nome, setNome] = useState('');
  const [erroNome, setErroNome] = useState(false);
  const [erroData, setErroData] = useState(false);

  const formatDate = selectedDate => {
    return selectedDate
      ? `${selectedDate.getDate().toString().padStart(2, '0')}/${(selectedDate.getMonth() + 1)
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
      console.log('tudo certo');
      props.navigation.navigate('Home');
    }
  };

  const goBack = () => {
    props.navigation.goBack();
  };

  return (
    <View>
      <BarraSuperior nomeTela="Nova Pesquisa" onPress={goBack} />
      <View style={styles.view}>
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
        <TouchableOpacity activeOpacity={0.7}>
          <TextInput
            style={styles.inputGaleria}
            editable={false}
            pointerEvents="none"
            placeholder="Câmera/Galeria de Imagens"
          />
        </TouchableOpacity>
        <View style={styles.botao}>
          <Button color="#37BD6D" title="CADASTRAR" onPress={goToHome} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    padding: 20,
    display: 'flex',
    height: '100%',
    backgroundColor: '#372775',
  },
  botao: {
    marginTop: 20,
  },
  calendarioImg: {
    width: 20,
    height: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 15,
    paddingHorizontal: 8,
  },
  inputGaleria: {
    alignContent: 'center',
    flexDirection: 'row',
    height: 100,
    textAlign: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 15,
    paddingHorizontal: 8,
  },
  input: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    fontSize: 16,
    marginBottom: 15,
    color: '#3F92C5',
  },
  inputData: {
    flex: 1,
    color: '#3F92C5',
  },
  iconeCalendario: {
    fontSize: 22,
    marginLeft: 8,
  },
  label: {
    fontSize: 16,
    color: 'white',
  },
  erroTexto: {
    color: 'red',
    fontSize: 14,
    marginBottom: 8,
    marginTop: -10,
  },
});

export default NovaPesquisa;
