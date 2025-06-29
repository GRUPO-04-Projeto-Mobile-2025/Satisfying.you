import { StyleSheet, View } from 'react-native';
import Input from '../components/Input';
import Error from '../components/Error';
import Button from '../components/Button';
import BarraSuperior from '../components/barraSuperior';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';

const NovaConta = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [senha1, setSenha1] = useState('');
  const [senha2, setSenha2] = useState('');
  const [erroTexto, setErroTexto] = useState(false);

  const cadastrar = async () => {
    if (senha1 !== senha2) {
      setErroTexto('As senhas não coincidem.');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, senha1);
      navigation.navigate('Login');
    } catch (error) {
      setErroTexto('Erro ao criar conta. Verifique os dados.');
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <BarraSuperior nomeTela="Nova Conta" style_text={styles.barraSuperior} onPress={() => navigation.goBack()} />
      <Input label="E-mail" value={email} onChangeText={setEmail} style_field={styles.input_field} style_input={styles.input} />
      <Input label="Senha" value={senha1} onChangeText={setSenha1} secure_text={true} style_field={styles.input_field} style_input={styles.input} />
      <Input label="Repetir senha" value={senha2} onChangeText={setSenha2} secure_text={true} style_field={styles.input_field} style_input={styles.input} />
      {erroTexto && <Error style_container={styles.error_container} text={erroTexto} />}
      <Button text="CADASTRAR" style_button={styles.button_reg} onPress={cadastrar} />
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

