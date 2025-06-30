// React Native Firebase - Lê configuração do google-services.json automaticamente
import {firebase} from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// Forçar inicialização se necessário
let firebaseApp;
try {
  // Tentar pegar a instância padrão
  firebaseApp = firebase.app();
  console.log('Firebase já estava inicializado');
} catch (error) {
  console.log('Inicializando Firebase app...', error.message);
  // Se não existir, inicializar
  firebaseApp = firebase.initializeApp();
}

const auth_mod = auth();
const db = firestore();

console.log('Firebase configurado com sucesso');

export {firebaseApp as app, auth_mod, db};
export default firebaseApp;
