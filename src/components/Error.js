import { StyleSheet, Text, View } from 'react-native';

const Error = (props) => {
  return (
    <View style={[styles.container, props?.style_container]}>
      <Text style={[styles.error, props?.style_text]}>{props?.text}</Text>
    </View>
  );
};

export default Error;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  error: {
    color: '#FD7979',
  },
});
