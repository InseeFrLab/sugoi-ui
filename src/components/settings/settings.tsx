import {
	Card,
	CardContent,
	Grid,
	IconButton,
	CardHeader,
	Collapse,
	CardActions,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../configuration/store-configuration';
import { Realm } from '../../model/interface';
import RealmCard from './realm-card';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ExpandButton from '../formular/expand-button';

const Settings = () => {
	const realms: Realm[] = useSelector(
		(store: RootState) => store.app.realms,
	);

	const [expand, setExpand] = useState(false);

	return (
		<Card>
			<CardHeader
				action={
					<IconButton aria-label="settings">
						<MoreVertIcon />
					</IconButton>
				}
				title="Ma configuration"
			/>
			<CardContent>
				<Grid
					container
					direction="row"
					justify="center"
					alignItems="center"
					spacing={2}
				>
					{realms.map((realm, i) =>
						i < 4 ? (
							<Grid item xs={12} sm={3}>
								<RealmCard realm={realm} />
							</Grid>
						) : (
							<Collapse in={expand}>
								<RealmCard realm={realm} />
							</Collapse>
						),
					)}
				</Grid>
			</CardContent>
			<CardActions>
				<Grid
					container
					direction="row"
					justify="flex-end"
					spacing={3}
				>
					<Grid item>
						<ExpandButton
							expand={expand}
							setExpand={setExpand}
						/>
					</Grid>
				</Grid>
			</CardActions>
		</Card>
	);
};

export default Settings;
