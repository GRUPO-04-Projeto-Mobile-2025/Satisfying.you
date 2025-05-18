import { StyleSheet, View } from 'react-native';
import Input from '../components/inputs';
import Error from '../components/errors';
import Button from '../components/buttons';
import BarraSuperior from '../components/barraSuperior';

const RecuperarSenha = () => {
  return (
    <View style={styles.container}>
      <BarraSuperior nomeTela="Recuperação de senha" style_text={styles.barraSuperior}/>
      <Input
        label="E-mail" value="jurandir.pereira@hotmail.com"
        style_field={styles.input_field} style_input={styles.input}
      />
      <Error style_container={styles.error_container} text="E-mail parece ser inválido."/>
      <Button text="RECUPERAR" style_button={styles.button_rec}/>
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
  },

});

