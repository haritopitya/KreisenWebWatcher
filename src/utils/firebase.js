import { initializeApp } from 'firebase/app';

const config = {
    apiKey: 'AIzaSyB0HGH13uo4Ikrhw36X0chpGgCGkO487YA',
    authDomain: 'test2-ec6ff.firebaseapp.com',
    databaseURL: 'https://test2-ec6ff-default-rtdb.firebaseio.com',
    projectId: 'test2-ec6ff',
    storageBucket: 'test2-ec6ff.appspot.com',
    messagingSenderId: '751798801324',
    appId: '1:751798801324:web:0a901e0304e9d8d7726009',
    measurementId: 'G-GWYD5FLNFM'
}

const firebase = initializeApp(config);

export default firebase