import { initializeApp } from 'firebase/app';

const config = {
    apiKey: "AIzaSyAghJYCWxiRrMe_EkMkk0PqpYAUaKZlHtI",
    authDomain: "meister2022-a27e9.firebaseapp.com",
    databaseURL: "https://meister2022-a27e9-default-rtdb.firebaseio.com",
    projectId: "meister2022-a27e9",
    storageBucket: "meister2022-a27e9.appspot.com",
    messagingSenderId: "610369538295",
    appId: "1:610369538295:web:25be677543c398dff56bf2",
    measurementId: "G-1S3GPVS2QV"
}

const firebase = initializeApp(config);

export default firebase