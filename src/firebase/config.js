import { getApp } from '@react-native-firebase/app';
import { getAuth } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const app = getApp();
const auth = getAuth(app);
const db = firestore(app);

export { app, auth, db };
