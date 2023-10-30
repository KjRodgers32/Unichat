import {
	useContext,
	useState,
	useEffect,
	createContext,
	ReactElement,
	ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { User } from "firebase/auth";

type AuthContextType = null | User;

const AuthContext = createContext<AuthContextType>(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({
	children,
}: {
	children: ReactElement | JSX.Element | ReactNode;
}) => {
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState<AuthContextType>(null);
	const navigate = useNavigate();

	useEffect(() => {
		const unsub = auth.onAuthStateChanged((user) => {
			if (user) {
				console.log(user.email);
				setUser(user);
				setLoading(false);
				navigate("/chats");
			} else {
				setUser(null);
				setLoading(false);
				navigate("/login");
				console.log("error");
			}
		});

		return () => unsub();
	}, [user, navigate]);

	return (
		<AuthContext.Provider value={user}>
			{!loading && children}
		</AuthContext.Provider>
	);
};