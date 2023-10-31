import React from "react";
import { useNavigate } from "react-router-dom";
import SendbirdApp from "@sendbird/uikit-react/App";
import "@sendbird/uikit-react/dist/index.css";
import { auth } from "../firebase";
import "../styles/Chats.css";

import { useAuth } from "../contexts/AuthContext";

const Chats: React.FC = () => {
	const navigate = useNavigate();
	const user = useAuth();
	//const projectId = "f407ea32-1525-4c62-b59c-bf9ec90c985d";

	const handleLogout = async () => {
		await auth.signOut();
		navigate("/");
	};

	if (!user) return "Loading...";

	return (
		<div className="chats-page">
			<div className="nav-bar">
				<div className="logo-tab">Unichat</div>
				<div className="logout-tab" onClick={handleLogout}>
					Logout
				</div>
			</div>
			<div style={{ height: "100vh" }}>
				<SendbirdApp
					appId="23351325-763E-4991-846F-9361AA4687B8"
					userId={user.email!}
					theme="dark"
					nickname={user.displayName!}
					profileUrl={user.photoURL!}
				/>
			</div>
		</div>
	);
};

export default Chats;
