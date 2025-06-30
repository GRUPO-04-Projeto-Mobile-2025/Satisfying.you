import {StyleSheet, Text, TextInput, View} from 'react-native';

const Input = props => {
  return (
    <View style={[styles.container, props?.style_field]}>
      <Text style={[styles.label, props?.style_lebel]}>{props?.label}</Text>
      <TextInput
        style={[styles.input, props?.style_input]}
        placeholder={props?.placeholder}
        placeholderTextColor="#3F92C5"
        value={props?.value}
        onChangeText={props?.onChangeText}
        secureTextEntry={props.secure_text || false}
        autoCorrect={false}
        autoCapitalize="none"
        keyboardType={props?.keyboardType || 'default'}
        returnKeyType="next"
        blurOnSubmit={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  input: {
    backgroundColor: 'white',
    color: '#3F92C5',
    paddingBottom: 0,
  },
  label: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'AveriaLibre-Regular',
  },
});

export default Input;
