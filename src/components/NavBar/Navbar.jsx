import React from 'react'
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core'
import { ShoppingCart } from '@material-ui/icons'
import storeLogo from '../../assets/ndcabigtingstore.PNG'
import useStyles from './styles'

const Navbar = () => {
    const styles = useStyles();
    return (
        <>
            <AppBar position="fixed" className={styles.appBar} color="inherit">
                <Toolbar>
                    <Typography variant="h6" className={styles.title} color="inherit">
                        <img src={storeLogo} alt="ndcabigting store" height="85px" className={styles.image}/>
                    </Typography>
                    <div className={ styles.grow }>

                    </div>
                    <div className={ styles.button}>
                        <IconButton aria-label="Show cart" color="inherit">
                            <Badge badgeContent={2} color="secondary">
                                <ShoppingCart/>
                            </Badge>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar
