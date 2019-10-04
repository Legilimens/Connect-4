import React from 'react';
import Button from '@material-ui/core/Button';
import './resetGame.scss';

const resetGame = (props) => <div className={'resetGame '+props.hide}><Button variant="contained" color="primary" onClick={() => props.handlerResetGame()}>Начать снова</Button></div>;

export default resetGame;