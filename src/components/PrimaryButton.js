import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Image } from 'react-native';

const PrimaryButton = ({
  title,
  imageSource,  // Nova prop para a imagem
  onPress,
  style,
  imageSize = 30,  // Tamanho da imagem
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, style]}
    >
      <View style={styles.buttonContent}>
        {imageSource && (
          <Image
            source={imageSource}
            style={[styles.image, { width: imageSize, height: imageSize }]}
            resizeMode="contain"
          />
        )}
        <Text style={styles.buttonText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#3D1A78',
    borderRadius: 10,
    width: '30%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    elevation: 3,
  },
  buttonContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    marginBottom: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 4,
  },
});

export default PrimaryButton;