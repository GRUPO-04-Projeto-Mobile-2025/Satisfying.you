import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const Button = (props) => {
  return (
    <TouchableOpacity style={[styles.button, props?.style_button]} onPress={props?.onPress}>
      <Text style={[styles.text, props?.style_text]}>{props?.text}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'AveriaLibre-Regular',
  },
});
