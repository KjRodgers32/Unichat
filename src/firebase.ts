import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import "firebase/auth";

const authorize = initializeApp({
	apiKey: "AIzaSyCQIVhARRDiDwDpVOAWK49G2Gt7TEWGV_w",
	authDomain: "unichat-eb90d.firebaseapp.com",
	projectId: "unichat-eb90d",
	storageBucket: "unichat-eb90d.appspot.com",
	messagingSenderId: "548992335319",
	appId: "1:548992335319:web:26d03da92128eb338f1f92",
});

export const auth = getAuth(authorize);
