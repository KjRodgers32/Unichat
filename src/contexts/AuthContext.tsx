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

const AuthContext = createContext<null | User>(null);

//eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({
	children,
}: {
	children: ReactElement | JSX.Element | ReactNode;
}) => {
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState<null | User>(null);
	const navigate = useNavigate();

	useEffect(() => {
		const unsub = auth.onAuthStateChanged((user) => {
			if (user) {
				setUser(user);
				setLoading(false);
				navigate("/chats");
			} else {
				setUser(null);
				setLoading(false);
				navigate("/");
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
