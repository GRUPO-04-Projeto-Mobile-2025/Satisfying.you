import { StyleSheet, Text, View } from 'react-native';
import Input from '../components/Input';
import Error from '../components/Error';
import Button from '../components/Button';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';

const Title = () => <Text style={styles.title}>Satisfying.you</Text>;

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erroTexto, setErroTexto] = useState(false);

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      navigation.navigate('Home');
    } catch (error) {
      setErroTexto('E-mail e/ou senha inválidos.');
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Title />
      <Input label="E-mail" value={email} onChangeText={setEmail} style_field={styles.input_field} style_input={styles.input} />
      <Input label="Senha" value={senha} onChangeText={setSenha} secure_text={true} style_field={styles.input_field} style_input={styles.input} />
      {erroTexto && <Error style_container={styles.error_container} text={erroTexto} />}
      <Button text="Entrar" style_button={styles.button_enter} onPress={login} />
      <Button text="Criar minha conta" style_button={styles.button_signup} onPress={() => navigation.navigate('Nova Conta')} />
      <Button text="Esqueci minha senha" style_button={styles.button_res_key} onPress={() => navigation.navigate('Recuperar Senha')} />
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

