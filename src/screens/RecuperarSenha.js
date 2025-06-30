import {StyleSheet, View} from 'react-native';
import Input from '../components/Input';
import Error from '../components/Error';
import Button from '../components/Button';
import BarraSuperior from '../components/barraSuperior';
import {useState} from 'react';

import {auth} from '../firebase/config';
import {sendPasswordResetEmail}  from '@react-native-firebase/auth';

const RecuperarSenha = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [erroTexto, setErroTexto] = useState(false);

  const recuperarSenha = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      navigation.navigate('Login');
    } catch (error) {
      setErroTexto('Erro ao enviar e-mail. Verifique o endereço.');
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <BarraSuperior
        nomeTela="Recuperação de senha"
        style_text={styles.barraSuperior}
        onPress={() => navigation.goBack()}
      />
      <Input
        label="E-mail"
        value={email}
        onChangeText={setEmail}
        style_field={styles.input_field}
        style_input={styles.input}
        keyboardType="email-address"
      />
      {erroTexto && (
        <Error style_container={styles.error_container} text={erroTexto} />
      )}
      <Button
        text="RECUPERAR"
        style_button={styles.button_rec}
        onPress={recuperarSenha}
      />
    </View>
  );
};

export default RecuperarSenha;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#372775',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  barraSuperior: {
    color: 'white',
    fontSize: 30,
    fontFamily: 'AveriaLibre-Regular',
  },
  input_field: {
    width: 400,
    marginTop: 50,
  },
  input: {
    height: 32,
    paddingBottom: 7,
    paddingLeft: 10,
  },
  error_container: {
    width: 400,
  },
  button_rec: {
    width: 400,
    height: 32,
    backgroundColor: '#37BD6D',
    marginBottom: 40,
    marginTop: 10,
  },
});
