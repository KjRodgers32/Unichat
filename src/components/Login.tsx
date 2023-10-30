import React from "react";
import { GoogleOutlined, FacebookOutlined } from "@ant-design/icons";

import { signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";

import "firebase/app";
import "../styles/Login.css";

const Login: React.FC = () => {
	return (
		<div id="login-page">
			<div id="login-card">
				<h2>Welcome to Unichat!</h2>
				<div
					className="login-button google"
					onClick={() => {
						signInWithPopup(auth, new GoogleAuthProvider());
					}}
				>
					<GoogleOutlined /> Sign in with Google
				</div>
				<br />
				<br />
				<div
					className="login-button facebook"
					onClick={() => signInWithPopup(auth, new FacebookAuthProvider())}
				>
					<FacebookOutlined /> Sign in with Facebook
				</div>
			</div>
		</div>
	);
};

export default Login;
