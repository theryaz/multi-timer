// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/database";


const firebaseConfig = {
	apiKey: "AIzaSyDoLfX5_7kQ1C7wUb6Q7fOkIV5j3ykapZw",
	authDomain: "shared-multi-timer.firebaseapp.com",
	databaseURL: "https://shared-multi-timer-default-rtdb.firebaseio.com",
	projectId: "shared-multi-timer",
	storageBucket: "shared-multi-timer.appspot.com",
	messagingSenderId: "769474426582",
	appId: "1:769474426582:web:33ffe4b81fe7a4e64ffb77"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.analytics();
export const database = firebase.database();