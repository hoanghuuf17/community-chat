import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyD0j5WygXN4AgdKpBnwyRHa3TE_nyTxZQ8",
    authDomain: "slack-clone-93313.firebaseapp.com",
    projectId: "slack-clone-93313",
    storageBucket: "slack-clone-93313.appspot.com",
    messagingSenderId: "194233717003",
    appId: "1:194233717003:web:b8ae00890ca4d40eb7120e"
  };

  const firebaseeApp = firebase.initializeApp(firebaseConfig);
  const db =  firebaseeApp.firestore();
  const auth = firebase.auth();
  const provider =new firebase.auth.GoogleAuthProvider();

  export { auth,provider ,db}



