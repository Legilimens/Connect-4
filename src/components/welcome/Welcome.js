import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import './welcome.scss';
import Header from '../header/header';
import Room from '../room/Room';

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		marginTop: 15,
		marginBottom: 15,
	},
	fab: {
		position: 'fixed',
		bottom: theme.spacing(2),
		right: theme.spacing(2),
	},
}));

function Welcome() {
	const [gameList, setGameList] = useState({});
	const prevGameListRef = useRef();
	const classes = useStyles();

	useEffect(() => {
		const fetchGameList = async () => {
			prevGameListRef.current = gameList;
			const res = await axios.get('/game/list');
			if (Object.keys(prevGameListRef.current).length !== Object.keys(res.data).length) {
				setGameList(res.data);
			}
		}

		const checkGameList = setInterval(() => {
			fetchGameList();
		}, 1000);

		return () => {
			clearInterval(checkGameList);
		}
	}, [gameList]);

	const newGame = async () => {
		await axios.post('/game/create', {
			creatorId: localStorage.getItem('playerId')
		});
	}

	return (
		<div>
			<Grid container className={classes.root}>
				<Grid item xs={12}>
					<Header />
				</Grid>
			</Grid>
			<Grid
				container
				direction="column"
				justify="center"
				alignItems="center"
				className={classes.root}
				spacing={2}
			>
				<Grid item xs={4}>
					{
						Object.keys(gameList).map((el) => (
							<Room 
								key={el}
								el={el}
								gameList={gameList}
								setGameList={setGameList}
							/>
						))
					}
				</Grid>
				<Tooltip title="Создать игру" aria-label="add">
					<Fab 
						aria-label='Новая игра' 
						className={classes.fab} 
						color='primary'
						onClick={() => newGame()}
					>
						<AddIcon />
					</Fab>
				</Tooltip>
			</Grid>
		</div>
	)
}

export default Welcome;