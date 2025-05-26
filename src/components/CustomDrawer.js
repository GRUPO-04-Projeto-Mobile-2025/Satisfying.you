import { View, Image, Text, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

const CustomDrawer =  (props) => {
  const goToHome = () => {
    props.navigation.push('DrawerRoutes');
  };
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
      <View>
        <View style={styles.view_text}>
          <Text style={styles.text}>usuario@dominio.com</Text>
        </View>
        <DrawerItem
          icon={()=>(<Image style={styles.icon} source={require('../../assets/icons/pesquisasdrawer.png')}/>)}
          labelStyle={styles.drawerLabel}
          label="Pesquisas" onPress={goToHome}
        />
      </View>
      <DrawerItem
        icon={()=>(<Image style={styles.icon} source={require('../../assets/icons/sair.png')}/>)}
        labelStyle={styles.drawerLabel}
        label="Sair" onPress={props.navigation.popToTop}
      />
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  view_text: {
    borderBottomColor: '#FFFFFF',
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingBottom: 10,
  },
  text: {
    color: '#FFFFFF',
  },
  icon: {
    width: 20,
    height: 20,
  },
  drawerLabel: {
    color: '#FFFFFF',
  },

});

