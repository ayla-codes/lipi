import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD8iy8MQjnJvA7y1acPzTmgxZZzaTR68EA",
  authDomain: "lipi-byaila.firebaseapp.com",
  projectId: "lipi-byaila",
  storageBucket: "lipi-byaila.appspot.com",
  messagingSenderId: "611738100171",
  appId: "1:611738100171:web:18f91ff254bdc1d5cdd64e",
  measurementId: "G-PL95ZTL9W2"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default storage;