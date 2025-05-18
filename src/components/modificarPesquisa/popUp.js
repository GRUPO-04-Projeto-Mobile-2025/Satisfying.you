import React from 'react';
import {View, Text, Modal, TouchableOpacity, StyleSheet} from 'react-native';

const PopUp = ({visible, onConfirm, onCancel}) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.texto}>Tem certeza de apagar essa pesquisa?</Text>
          <View style={styles.botoes}>
            <TouchableOpacity style={styles.btnSim} onPress={onConfirm}>
              <Text style={styles.txtBtnSim}>SIM</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnCancelar} onPress={onCancel}>
              <Text style={styles.txtBtnCancelar}>CANCELAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#2B1F5C',
    padding: 28,
    alignItems: 'center',
    width: 300,
  },
  texto: {
    color: 'white',
    fontSize: 18,
    marginBottom: 24,
    textAlign: 'center',
  },
  botoes: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  btnSim: {
    backgroundColor: '#FF8383',
    paddingVertical: 10,
    alignItems: 'center',
    width: '45%',
    marginRight: 0,
  },
  btnCancelar: {
    backgroundColor: '#3F92C5',
    paddingVertical: 10,
    width: '45%',
    alignItems: 'center',
    marginLeft: 0,
  },
  txtBtnSim: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  txtBtnCancelar: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default PopUp;
