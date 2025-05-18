import { StyleSheet, Text, View } from 'react-native';
import Input from '../components/inputs';
import Error from '../components/errors';
import Button from '../components/buttons';
import BarraSuperior from '../components/barraSuperior';

const NovaConta = () => {
  return (
    <View style={styles.container}>
      <BarraSuperior nomeTela="Nova Conta" style_text={styles.barraSuperior}/>
      <Input
        label="E-mail" value="jurandir.pereira@hotmail.com"
        style_field={styles.input_field} style_input={styles.input}
      />
      <Input
        label="Senha" value="sua_senha"
        secure_text={true} style_field={styles.input_field} style_input={styles.input}
      />
      <Input
        label="Repetir senha" value=""
        secure_text={true} style_field={styles.input_field} style_input={styles.input}
      />
      <Error style_container={styles.error_container} text="O campo repetir senha difere da senha."/>
      <Button text="CADASTRAR" style_button={styles.button_reg}/>
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
  },

});

