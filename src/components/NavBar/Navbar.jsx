import React from 'react'
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core'
import { ShoppingCart } from '@material-ui/icons'
import storeLogo from '../../assets/ndcabigtingstore.PNG'
import useStyles from './styles'
import { Link, useLocation } from 'react-router-dom'

const Navbar = ({ cartCount }) => {
    const styles = useStyles();
    const location = useLocation();

    
    return (
        <>
            <AppBar position="fixed" className={styles.appBar} color="inherit">
                <Toolbar>
                    <Typography variant="h6" className={styles.title} color="inherit" component={Link} to="/" >
                        <img src={storeLogo} alt="ndcabigting store" height="85px" className={styles.image}/>
                    </Typography>
                    <div className={ styles.grow }></div>
                    {location.pathname === '/' && (
                            <div className={ styles.button}>
                                <IconButton component={Link} to="/cart" aria-label="Show cart" color="inherit">
                                    <Badge badgeContent={cartCount} color="secondary">
                                        <ShoppingCart/>
                                    </Badge>
                                </IconButton>
                            </div>
                    )}
                    
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar
