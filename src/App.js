// import logo from "./logo.svg";
// import "./App.css";
import FormData from "../src/components/Form";


import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBp5lzpIJV11Xzjif7_JVbwYgqN7dtKcxc",
  authDomain: "form-data-78262.firebaseapp.com",
  projectId: "form-data-78262",
  storageBucket: "form-data-78262.appspot.com",
  messagingSenderId: "877005687771",
  appId: "1:877005687771:web:b6d68e832e10b0fb5cb5fe",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const storage = getStorage(app);

function App() {
  return (
    <div className="App1">
      <FormData db={db} />
    </div>
  );
}

export default App;
