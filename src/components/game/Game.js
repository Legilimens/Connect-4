import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import isEqual from 'lodash/isEqual';
import { Redirect } from 'react-router-dom';

import Header from '../header/header.js';
import Players from '../players/Players';
import PlayerInfo from '../playerInfo/playerInfo.js';
import Table from '../table/table.js';
import ResetGame from '../resetGame/resetGame.js';
import Winner from '../winner/Winner.js';
import './Game.scss';

function Game(props) {
	const [data, setData] = useState(props.location.state);
	const prevFieldRef = useRef();

	useEffect(() => {
		const playerId = localStorage.getItem('playerId');
		if (
			data.players[1].id !== playerId && 
			data.players[2].id === null 
		) {
			axios.post('/game/join', {
				roomId: props.location.state.roomId,
				playerId
			}).then( (res) => setData(res.data));
		}
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		const fetchGameState = async () => {
			prevFieldRef.current = data.field;
			const res = await axios.post('/game/state', {
				roomId: props.location.state.roomId
			});
			if (!isEqual(prevFieldRef.current, res.data.field)) {
				setData(res.data);
			}
		}

		const checkGameState = setInterval(() => {
			fetchGameState();
		}, 1000);

		return () => {
			clearInterval(checkGameState);
		}
		// eslint-disable-next-line
	}, [data]);

	if (!props.location.state) {
		return <Redirect to='/' />
	}

	const move = async (сolumnId) => {
		// сравниваем идентификатор инициатора событий с идентификатором того, кто должен ходить сейчас
		// если равны - ходит действительно инициатор события
		if(data.players[data.currentPlayer].id === localStorage.getItem('playerId')) {
			const res = await axios.post('/game/move', {
				roomId: props.location.state.roomId,
				сolumnId,
				currentPlayer: data.currentPlayer
			});
			setData(res.data);
		}
	}

	const handlerResetGame = async () => {
		const res = await axios.post('/game/reset', {
			roomId: props.location.state.roomId
		});
		setData(res.data);
	}

	const readOnly = data.players[1].id !== localStorage.getItem('playerId') && data.players[2].id !== localStorage.getItem('playerId');

	return (
		<div className="game">
			<Header />

			<Players 
				fs={20}
				players={data.players} 
			/>
			<PlayerInfo
				currentPlayerId={data.players[data.currentPlayer].id}
				currentPlayer={data.currentPlayer}
			/>
			<Table
				field={data.field}
				onPress={move}
			/>
			
			{readOnly ? <span className='gameInProcess'>Игра уже в процессе, вы находитесь в режиме просмотра</span> : null}
			
			<ResetGame
				hide={readOnly ? 'hide' : null}
				handlerResetGame={handlerResetGame}
			/>

			{data.winner !== null ? <Winner winner={data.winner} resetGame={handlerResetGame} readOnly={readOnly} /> : null}
		</div>
	);
}

export default Game;
