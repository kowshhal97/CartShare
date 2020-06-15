import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyDJ84FrH0rgIdL-B1dsBUx_-kNogFadqfc",
    authDomain: "cartpool-firebase.firebaseapp.com",
    databaseURL: "https://cartpool-firebase.firebaseio.com",
    projectId: "cartpool-firebase",
    storageBucket: "cartpool-firebase.appspot.com",
    messagingSenderId: "692604659614",
    appId: "1:692604659614:web:0826088ef0f0162b4a588f"
};

firebase.initializeApp(firebaseConfig);


export default firebase;