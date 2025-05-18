import { StyleSheet, Text, View } from 'react-native';
import Input from '../components/inputs';
import Error from '../components/errors';
import Button from '../components/buttons';
import { useState } from 'react';

const Title = () => {
  return (
    <Text style={styles.title}>Satisfying.you</Text>
  );
};

const Login = (props) => {
  const [email, setEmail] = useState('jurandir.pereira@hotmail.com'),
        [senha, setSenha] = useState('sua_senha'),
        [erroTexto, setErroTexto] = useState(false);

  const validaEmail = (value) => {
    setEmail(value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setErroTexto('E-mail e/ou senha inválidos.');
    }
    else{
      setErroTexto(false);
    }
  };

  const validaSenha = (value) => {
    setSenha(value);
    if (value.trim() === ''){
      setErroTexto('O campo senha não deve está vazio.');
    }
    else {
      setErroTexto(false);
    }
  };

  const gotToHome = () => {
    if (!erroTexto) {
      props.navigation.navigate('Home');
    }
  };
  const gotToNovaConta = () => {
    props.navigation.navigate('Nova Conta');
  };
  const gotToRecSenha = () => {
    props.navigation.navigate('Recuperar Senha');
  };

  return (
    <View style={styles.container}>
      <Title />
      <Input
        label="E-mail" value={email} onChangeText={validaEmail}
        style_field={styles.input_field} style_input={styles.input}
      />
      <Input
        label="Senha" value={senha} onChangeText={validaSenha}
        secure_text={true} style_field={styles.input_field} style_input={styles.input}
      />
      {erroTexto && <Error style_container={styles.error_container} text={erroTexto}/>}
      <Button text="Entrar" style_button={styles.button_enter} onPress={gotToHome}/>
      <Button text="Criar minha conta" style_button={styles.button_signup} onPress={gotToNovaConta}/>
      <Button text="Esqueci minha senha" style_button={styles.button_res_key} onPress={gotToRecSenha}/>
    </View>
  );
};
export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#372775',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 30,
    fontFamily: 'AveriaLibre-Regular',
  },
  input_field: {
    width: 400,
    marginTop: 6,
  },
  input: {
    height: 32,
    paddingBottom: 7,
    paddingLeft: 10,
  },
  error_container: {
    width: 400,
  },
  button_enter: {
    width: 400,
    height: 32,
    backgroundColor: '#37BD6D',
    marginBottom: 20,
    marginTop: 8,
  },
  button_signup: {
    width: 400,
    height: 22,
    backgroundColor: '#419ED7',
    marginBottom: 8,
  },
  button_res_key: {
    width: 400,
    height: 22,
    backgroundColor: '#B0CCDE',
    marginBottom: 8,
  },
});

