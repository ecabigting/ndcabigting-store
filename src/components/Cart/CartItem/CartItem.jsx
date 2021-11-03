import React from 'react'
import { Typography,Button, Card, CartActions, CardContent,CardMedia, CardActions } from '@material-ui/core'
import useStyles from './styles'

const CartItem = ({ item,onUpdateCartQty,onRemoveFromCart}) => {
    const styles = useStyles();
    return (
        <Card>
            <CardMedia image={item.image.url} alt={item.name} className={styles.media} />
            <CardContent className={styles.cardContent}>
                <Typography variant="h5">{item.name}</Typography>
                <Typography variant="h6">{item.line_total.formatted_with_symbol}</Typography>
            </CardContent>
            <CardActions className={styles.actions}>
                <div className={styles.buttons}>
                    <Button type="button" size="small" onClick={()=>onUpdateCartQty(item.id,item.quantity-1)}>-</Button>
                    <Typography>{item.quantity}</Typography>
                    <Button type="button" size="small" onClick={()=>onUpdateCartQty(item.id,item.quantity+1)}>+</Button>
                </div>
                <Button variant="contained" type="button" size="small" color="secondary" onClick={()=>onRemoveFromCart(item.id)}>Delete</Button>
            </CardActions>
        </Card>
    )
}

export default CartItem
