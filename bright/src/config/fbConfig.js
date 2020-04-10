import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage';
const firebaseConfig = {
  apiKey: "AIzaSyDOVSiWJz4FtXMIyRhoEwFj3bG1LVws1dk",
  authDomain: "database-d8471.firebaseapp.com",
  databaseURL: "https://database-d8471.firebaseio.com",
  projectId: "database-d8471",
  storageBucket: "database-d8471.appspot.com",
  messagingSenderId: "46685854093",
  appId: "1:46685854093:web:33b9e8ef7dfa01e4b585c4",
  measurementId: "G-LQ1XTH844V"
  };

  firebase.initializeApp(firebaseConfig);
  //firebase.firestore().settings({ timestampsInSnapshots: true});
  const storage = firebase.storage();
  export {
    storage, firebase as default
}