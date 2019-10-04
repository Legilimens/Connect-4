import React from 'react';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    text: {
        fontSize: props => props.fs,
        fontWeight: 'bold',
    },
})

const Players = (props) => {
    const { players } = props;
    const classes = useStyles(props);

    return (
        <Typography variant="body2" gutterBottom className={classes.text}>
            <span style={{ color: players[1].color }}>
                {players[1].name}
            </span>
            &nbsp;vs&nbsp;
            <span style={{ color: players[2].color }}>
                {players[2].name}
            </span>
        </Typography>
    )
};

export default Players;