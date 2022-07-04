import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyDZuAtWdtUY0nObR4e3rsP72rvnb2fGhQA",
    authDomain: "my-app-53e19.firebaseapp.com",
    projectId: "my-app-53e19",
    storageBucket: "my-app-53e19.appspot.com",
    messagingSenderId: "85220393308",
    appId: "1:85220393308:web:c573310f1015e6ad6e8199"
}

const app = initializeApp(firebaseConfig)

const db = getFirestore(app)

export default db