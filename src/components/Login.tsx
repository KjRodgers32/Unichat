import React from "react";
import { GoogleOutlined, FacebookOutlined } from "@ant-design/icons";
import "firebase/app";
import {
	signInWithRedirect,
	GoogleAuthProvider,
	FacebookAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase";
import "../styles/Login.css";

const Login: React.FC = () => {
	const googleProvider = new GoogleAuthProvider();
	const facebookProvider = new FacebookAuthProvider();

	return (
		<div id="login-page">
			<div id="login-card">
				<h2>Welcomne to Unichat!</h2>
				<div
					className="login-button google"
					onClick={() => signInWithRedirect(auth, googleProvider)}
				>
					<GoogleOutlined /> Sign in with Google
				</div>
				<br />
				<br />
				<div
					className="login-button facebook"
					onClick={() => signInWithRedirect(auth, facebookProvider)}
				>
					<FacebookOutlined /> Sign in with Facebook
				</div>
			</div>
		</div>
	);
};

export default Login;
