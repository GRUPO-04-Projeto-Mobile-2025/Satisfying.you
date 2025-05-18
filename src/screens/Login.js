import { StyleSheet, Text, View } from 'react-native';
import Input from '../components/inputs';
import Error from '../components/errors';
import Button from '../components/buttons';

const Title = () => {
  return (
    <Text style={styles.title}>Satisfying.you</Text>
  );
};

const Login = () => {
  return (
    <View style={styles.container}>
      <Title />
      <Input
        label="E-mail" value="jurandir.pereira@hotmail.com"
        style_field={styles.input_field} style_input={styles.input}
      />
      <Input
        label="Senha" value="sua_senha"
        secure_text={true} style_field={styles.input_field} style_input={styles.input}
      />
      <Error style_container={styles.error_container} text="E-mail e/ou senha inválidos."/>
      <Button text="Entrar" style_button={styles.button_enter}/>
      <Button text="Criar minha conta" style_button={styles.button_signup}/>
      <Button text="Esqueci minha senha" style_button={styles.button_res_key}/>
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

