import React from 'react'
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core'
import { AddShoppingCart } from '@material-ui/icons'

import useStyles from './styles'

export const Product = ({product}) => {
    const style = useStyles();
    return (
        <Card className={style.root}>
            <CardMedia className={style.media} image={product.image} title={product.name}/>
            <CardContent>
                <div className={style.cardContent}>
                    <Typography variant="h5" gutterBottom>
                        {product.name}
                    </Typography>
                    <Typography variant="h5">
                        {product.price}
                    </Typography>
                </div>
                <Typography variant="body2" color="textSecondary">
                    {product.description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing className={style.cardActions}>
                <IconButton aria-label="Add to Cart">
                    <AddShoppingCart/>
                </IconButton>
            </CardActions>
        </Card>
    )
}
