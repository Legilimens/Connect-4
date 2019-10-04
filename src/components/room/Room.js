import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import SportsEsportsRoundedIcon from '@material-ui/icons/SportsEsportsRounded';
import Close from '@material-ui/icons/Close';

import Players from '../players/Players';

const useStyles = makeStyles(theme => ({
    paper: {
        minHeight: 140,
        width: 400,
    },
    img: {
        width: 128,
        height: 128,
        margin: 'auto',
        display: 'block',
    },
    colorFirst: {
        color: '#f77171'
    },
    colorSecond: {
        color: '#5b5bec'
    },
    close: {
        cursor: 'pointer',
        color: '#afafaf',
        marginRight: 10,
    },
}));

function Room(props) {
    const { el, gameList, setGameList } = props;
    const classes = useStyles();

    const removeGame = async (roomId) => {
        const res = await axios.post('/game/remove', {
            roomId
        });
        setGameList(res.data);
    }

    return (
        <Grid container justify="center" spacing={8}>
            <Grid item>
                <Paper className={classes.paper}>
                    <Grid container spacing={2}>
                        <Grid className={el % 2 === 0 ? classes.colorFirst : classes.colorSecond} item>
                            <SportsEsportsRoundedIcon className={classes.img} />
                        </Grid>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="subtitle1"><b>Комната: {el}</b></Typography>
                                    <Players
                                        fs={16}
                                        players={gameList[el].players}
                                    />
                                    <Typography variant="body2" color="textSecondary">
                                        Игроков: { gameList[el].players[2].id === null ? 1 : 2 } из 2
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Link
                                        className={'router-link'}
                                        to={{
                                            pathname: '/game/join',
                                            state: {
                                                roomId: el,
                                                field: gameList[el].field,
                                                currentPlayer: gameList[el].currentPlayer,
                                                winner: gameList[el].winner,
                                                players: gameList[el].players
                                            }
                                        }}
                                    >
                                        <Button variant="outlined" color="primary" className={classes.button}>
                                            Присоединиться
                                        </Button>
                                    </Link>
                                </Grid>
                            </Grid>
                            <Grid
                                item
                                className={gameList[el].players[1].id !== localStorage.getItem('playerId') ? 'hide' : null}
                            >
                                <Typography variant="subtitle1">
                                    <Close
                                        className={classes.close}
                                        onClick={() => removeGame(el)}
                                    />
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Room;