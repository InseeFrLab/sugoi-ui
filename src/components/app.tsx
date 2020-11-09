import { Container } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import {
	createStyles,
	makeStyles,
	MuiThemeProvider,
	Theme,
} from '@material-ui/core/styles';
import { useKeycloak } from '@react-keycloak/web';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './../configuration/store-configuration';
import { DarkTheme, LightTheme } from './../material-ui-theme';
import Footer from './footer/footer';
import Header from './header/header';
import Root from './root';
import Sider from './sider';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',
		},

		toolbar: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'flex-end',
			padding: theme.spacing(0, 1),
			// necessary for content to be below app bar
			...theme.mixins.toolbar,
		},
		content: {
			flexGrow: 1,
			padding: theme.spacing(3),
		},
		container: {
			paddingTop: theme.spacing(4),
			paddingBottom: theme.spacing(4),
			minHeight: '100%',
		},
	}),
);

const App = () => {
	const classes = useStyles();
	const {
		keycloak: { authenticated },
	} = useKeycloak();
	const appStore = useSelector((store: RootState) => store.app);
	const [drawerOpen, setDrawerOpen] = useState(false);
	const handleDrawerToggle = () => {
		setDrawerOpen(!drawerOpen);
	};
	return (
		<MuiThemeProvider
			theme={
				appStore.config.theme === 'dark'
					? DarkTheme
					: LightTheme
			}
		>
			<div className={classes.root}>
				<CssBaseline />
				<Header handleDrawerToggle={handleDrawerToggle} />
				{authenticated ? (
					<Sider
						drawerOpen={drawerOpen}
						handleDrawerToggle={handleDrawerToggle}
					/>
				) : null}
				<main className={classes.content}>
					<div className={classes.toolbar} />
					<Container
						maxWidth="xl"
						className={classes.container}
					>
						<Root />
					</Container>
					<Divider />
					<Footer />
				</main>
			</div>
		</MuiThemeProvider>
	);
};

export default App;
