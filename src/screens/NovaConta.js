import { StyleSheet, View } from 'react-native';
import Input from '../components/Input';
import Error from '../components/Error';
import Button from '../components/Button';
import BarraSuperior from '../components/barraSuperior';
import { useState } from 'react';

const NovaConta = (props) => {
  const [email, setEmail] = useState('jurandir.pereira@hotmail.com'),
        [senha1, setSenha1] = useState('sua_senha'),
        [senha2, setSenha2] = useState('sua_senha'),
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
  const validaSenha1 = (value) => {
    setSenha1(value);
    if (value.trim() === ''){
      setErroTexto('O campo senha não deve está vazio.');
    }
    else {
      setErroTexto(false);
    }
  };
  const validaSenha2 = (value) => {
    setSenha2(value);
    if (senha1 !== value) {
      setErroTexto('O campo repetir senha difere da senha.');
    }
    else {
      setErroTexto(false);
    }
  };

  const gotToLogin = () => {
    if (!erroTexto) {
      props.navigation.navigate('Login');
    }
  };
  const goBack = () => {
    props.navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <BarraSuperior nomeTela="Nova Conta" style_text={styles.barraSuperior} onPress={goBack}/>
      <Input
        label="E-mail" value={email} onChangeText={validaEmail}
        style_field={styles.input_field} style_input={styles.input}
      />
      <Input
        label="Senha" value={senha1} onChangeText={validaSenha1}
        secure_text={true} style_field={styles.input_field} style_input={styles.input}
      />
      <Input
        label="Repetir senha" value={senha2} onChangeText={validaSenha2}
        secure_text={true} style_field={styles.input_field} style_input={styles.input}
      />
      {erroTexto && <Error style_container={styles.error_container} text={erroTexto}/>}
      <Button text="CADASTRAR" style_button={styles.button_reg} onPress={gotToLogin}/>
    </View>
  );
};
export default NovaConta;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#372775',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  barraSuperior: {
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
  button_reg: {
    width: 400,
    height: 32,
    backgroundColor: '#37BD6D',
    marginTop: 6,
  },
});

