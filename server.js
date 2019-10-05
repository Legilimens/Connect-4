const Path = require('path');
const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const { checkWinner } = require('./modules/checkWinner');

const gameList = {}

let roomCounter = 0;

const PORT = parseInt(process.env.PORT) || 80;

const getInitialGameState = (creatorId) => {
	return {
		players: {
			1: {
				name: 'Игрок 1',
				color: '#5b5bec',
				id: creatorId
			},
			2: {
				name: 'Игрок 2',
				color: '#f77171',
				id: null
			}
		},
		currentPlayer: 1,
		field: Array(7).fill(Array(6).fill(0)),
		winner: null
	}
};

const server = Hapi.server({
		port: PORT,
		routes: {
			files: {
				relativeTo: Path.join(__dirname, 'build')
			},
			cors: true
		}
	});

const init = async () => {
	
	await server.register(Inert);

	server.route({
		method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: '.',
                redirectToSlash: true,
                index: true,
            }
        }
	});

	server.route({
		method: 'GET',
		path: '/game/list',
		handler: (request, h) => {
			return gameList;
		}
	});

	server.route({
		method: 'POST',
		path: '/game/create',
		handler: (request, h) => {
			roomCounter++;
			const { creatorId } = request.payload;
			gameList[roomCounter] = JSON.parse(JSON.stringify(getInitialGameState(creatorId)));
			return gameList[roomCounter];
		}
	});

	server.route({
		method: 'POST',
		path: '/game/join',
		handler: (request, h) => {
			const { roomId, playerId } = request.payload;
			gameList[roomId].players[2].id = playerId;
			return gameList[roomId];
		}
	});

	server.route({
		method: 'POST',
		path: '/game/remove',
		handler: (request, h) => {
			const { roomId } = request.payload;
			delete gameList[roomId];
			return gameList;
		}
	});

	server.route({
		method: 'POST',
		path: '/game/info',
		handler: (request, h) => {
			const { roomId } = request.payload;
			const game = gameList[roomId];
			return game;
		}
	});

	server.route({
		method: 'POST',
		path: '/game/move',
		handler: (request, h) => {

			const { roomId, сolumnId, currentPlayer } = request.payload;
			const game = gameList[roomId];

			if(currentPlayer !== game.currentPlayer)
				return game;

			game.field[сolumnId].some((element, index) => {
				if (element === 0 && game.winner === null) {
					return game.field[сolumnId][index] = currentPlayer
				}
				return null;
			});

			if( checkWinner(game.field) )
				game.winner = currentPlayer;
			else game.currentPlayer = game.currentPlayer === 1 ? 2 : 1;
			
			return game;
		}
	});

	server.route({
		method: 'POST',
		path: '/game/reset',
		handler: (request, h) => {
			const { roomId } = request.payload;

			gameList[roomId].currentPlayer = 1;
			gameList[roomId].field = JSON.parse(JSON.stringify(Array(7).fill(Array(6).fill(0))));
			gameList[roomId].winner = null;

			return gameList[roomId];

		}
	});

	server.route({
		method: 'POST',
		path: '/game/state',
		handler: (request, h) => {
			const { roomId } = request.payload;
			return gameList[roomId];

		}
	});

	await server.start();
	console.log(`Server running on port ${PORT}`);
};

init();