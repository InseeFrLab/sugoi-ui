import Keycloak from 'keycloak-js';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Loader } from '../components/commons/loader/loader';
import { RootState } from '../configuration/store-configuration';
import useAuth from '../hooks/auth/useAuth';
import { initAuth } from '../redux/actions/app';

interface AuthenticationProviderProps {
	children: JSX.Element;
	config: any;
}

export const AuthenticationProvider = ({
	children,
	config,
}: AuthenticationProviderProps) => {
	var keycloak = useSelector((state: RootState) => state.user.auth);
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();

	if (!keycloak) {
		const k = Keycloak({ ...config });
		k.init({ onLoad: 'check-sso', enableLogging: true })
			.then((authenticated: any) => {
				console.log(keycloak);
				console.log(authenticated);
				if (authenticated) {
					console.log(keycloak);
					dispatch(initAuth(keycloak));
				}
			})
			.catch((err: any) => console.log(err))
			.finally(() => setLoading(false));
	}

	if (loading) {
		return <Loader />;
	} else {
		return children;
	}
};

export const PrivateRoute = ({ Component, ...props }: any) => {
	const { otherProps } = props;
	const { authenticated, login } = useAuth();
	const returnedComponent = <Component {...otherProps} />;
	if (!authenticated) {
		login();
	}
	return returnedComponent;
};

export const withPrivateRoute = (WrappedComponent: React.ComponentType) => (
	props: React.PropsWithChildren<any>,
) => (
	<PrivateRoute>
		<WrappedComponent {...props} />
	</PrivateRoute>
);
