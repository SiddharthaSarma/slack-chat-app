import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

var config = {
  apiKey: 'AIzaSyAPFbt_C-5XXPXgWRR1VIsSUSmeCl0cUCY',
  authDomain: 'react-slack-clone-35fbc.firebaseapp.com',
  databaseURL: 'https://react-slack-clone-35fbc.firebaseio.com',
  projectId: 'react-slack-clone-35fbc',
  storageBucket: 'react-slack-clone-35fbc.appspot.com',
  messagingSenderId: '267153038274'
};
firebase.initializeApp(config);

export default firebase;
