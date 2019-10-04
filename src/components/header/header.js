import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import logo from '../../img/logo.png';

const Header = () => (
    <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={2}
    >
        <Grid item xs={2}>
            <img src={logo} alt='logo' width='70px' />
        </Grid>
        <Grid item xs={10}>
            <Typography variant="h3" gutterBottom>4 В РЯД</Typography>
        </Grid>
    </Grid>
);

export default Header;