import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { auth } from "../firebase";
import "../styles/Chats.css";

import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

const Chats: React.FC = () => {
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();
	const user = useAuth();
	const projectId = "f407ea32-1525-4c62-b59c-bf9ec90c985d";

	const handleLogout = async () => {
		await auth.signOut();
		navigate("/");
	};

	const getFile = async (url: string) => {
		const response = await fetch(url);
		const data = await response.blob();

		return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
	};

	useEffect(() => {
		if (!user) {
			navigate("/");
			return;
		}

		axios
			.get("https://api.chatengine.io/users/me/", {
				headers: {
					"Project-ID": projectId,
					"User-Name": user.email,
					"User-Secret": user.uid,
				},
			})
			.then(() => setLoading(false))
			.catch(() => {
				const formdata = new FormData();
				formdata.append("email", user.email!);
				formdata.append("username", user.email!);
				formdata.append("secret", user.uid);

				getFile(user.photoURL as string).then((avatar) => {
					formdata.append("avatar", avatar, avatar.name);

					axios
						.post("https://api.chatengine.io/users/", formdata, {
							headers: {
								"private-key": "7f6f4c76-e2f3-4d2f-af34-c67147ae74a0",
							},
						})
						.then(() => setLoading(false))
						.catch((error) => console.log(error));
				});
			});
	}, [user, navigate]);

	if (!user || loading) return "Loading...";

	return (
		<div className="chats-page">
			<div className="nav-bar">
				<div className="logo-tab">Unichat</div>
				<div className="logout-tab" onClick={handleLogout}>
					Logout
				</div>
			</div>

			<ChatEngine
				height="calc(100vh - 66px)"
				projectID={projectId}
				userName={user.email}
				userSecret={user.uid}
			/>
		</div>
	);
};

export default Chats;
