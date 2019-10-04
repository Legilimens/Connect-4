import React from 'react';
import './playerInfo.scss';

const PlayerInfo = (props) => {
    const {currentPlayer, currentPlayerId} = props;
    const itsYou = currentPlayerId === localStorage.getItem('playerId') ? '(это вы)' : null;
    return (
        <h2 className={"curentPlayer "+(currentPlayer === 1 ? "firstPlayer" : "secondPlayer")}>Ход игрока {currentPlayer} {itsYou}</h2>
    )
};

export default PlayerInfo;