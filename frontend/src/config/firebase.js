import firebase from 'firebase/compat/app'
import 'firebase/compat/database'
import 'firebase/compat/storage'
const firebaseConfig = {
  apiKey: "AIzaSyAHPqzv_02ItZuI_2dE520XLqfjZbNO8eY",
  authDomain: "auction-46173.firebaseapp.com",
  projectId: "auction-46173",
  storageBucket: "auction-46173.appspot.com",
  messagingSenderId: "807089791251",
  appId: "1:807089791251:web:b30a394e69b2cfe9667ae6"
};

firebase.initializeApp(firebaseConfig);
export const dataRef = firebase.database();
export const storage = firebase.storage();
export default firebase
