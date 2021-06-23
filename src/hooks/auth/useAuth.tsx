import { useSelector } from 'react-redux';
import { RootState } from '../../configuration/store-configuration';
import { KeycloakInstance } from 'keycloak-js';
import { useEffect, useState } from 'react';

const useAuth = () => {
	const auth = useSelector(
		(state: RootState) => state.user.auth,
	) as KeycloakInstance;

	const [authenticated, setAuthenticated] = useState(false);
	const [userInfo, setUserInfo] = useState<any>();

	useEffect(() => {
		setAuthenticated(auth?.authenticated || false);
		setUserInfo({
			id: (auth?.tokenParsed as any)?.preferred_username,
			name: (auth?.tokenParsed as any)?.name,
			email: (auth?.tokenParsed as any)?.email,
		});
	}, [auth]);

	return {
		authenticated,
		userInfo,
		login: auth?.login,
		logout: auth?.logout,
	};
};

export default useAuth;
