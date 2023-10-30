import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Chats from "./components/Chats";
import { AuthProvider } from "./contexts/AuthContext";

const App = () => {
	return (
		<div className="App">
			<AuthProvider>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/chats" element={<Chats />} />
				</Routes>
			</AuthProvider>
		</div>
	);
};

export default App;
