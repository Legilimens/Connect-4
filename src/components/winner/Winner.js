import React, { useEffect } from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


function Winner(props) {
    const { winner, resetGame, readOnly } = props;
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        if(winner !== null)
            setOpen(true) 
    }, [winner])

    const handleClose = () => {
        setOpen(false);
    };

    const handleNewGame = () => {
        resetGame();
        setOpen(false);
    }

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Игра окончена</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Поздравляем <span className={'curentPlayer ' + (winner === 1 ? "firstPlayer" : "secondPlayer")}>игрока {winner}</span> с победой! Вы можете начать новую игру.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Закрыть
                    </Button>
                    <Button onClick={handleNewGame} color="primary" autoFocus style={readOnly ? {display: 'none'} : null}>
                        Новая игра
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

//const Winner = (props) => <p>Победил {props.winner} игрок</p>;

export default Winner;