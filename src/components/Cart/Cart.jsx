import React from 'react'
import { Container, Typography, Button, Grid, Divider } from '@material-ui/core'
import useStyles from './styles'
import { Link } from 'react-router-dom'
import CartItem from './CartItem/CartItem';

const Cart = ({ cart }) => {
    const style = useStyles();

    const EmptyCart = () => (
        <Typography variant="subtitle1">
            You have no items in your shopping card, go back to shopping! <br/>
            <Link to="/" className={style.link}>Start shopping!</Link>
        </Typography>
    );

    const FilledCart = () => {
       return <>
            <Grid container spacing={3}>
                {   
                    cart.line_items.map((item)=>(
                        <Grid item xs={12} sm={4} key={item.id}>
                            <CartItem item={item}/>
                        </Grid>
                    ))
                }
            </Grid>
            <div className={style.cardDetails}>
                <Typography variant="h4">
                    Subtotal: { cart.subtotal.formatted_with_symbol}
                </Typography>
                <div>
                    <Button className={style.emptyButton} size="large" type="button" variant="contained" color="secondary">Empty Cart</Button>
                    <Button className={style.checkoutButton} size="large" type="button" variant="contained" color="primary">Checkout</Button>
                </div>
            </div>
            </>
    };

    if(!cart.line_items) return <Container><div className={style.toolbar} /><Typography className={style.title} variant="h3">Loading your cart.. </Typography></Container>

    return (
        <Container>
            <div className={style.toolbar} />
            <Typography className={style.title} variant="h3" gutterBottom>Your Shopping Cart</Typography>
            <Divider/>
            { !cart.line_items.length ? <EmptyCart /> : <FilledCart/> }
        </Container>
    );
}

export default Cart
