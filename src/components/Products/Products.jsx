import React from "react";
import { Grid } from '@material-ui/core'
import { Product } from "./Product/Product";
import useStyles from './styles'

const Products = ({ productList, onAddToCart }) => {
    const styles = useStyles();
    return (
        <main className={styles.content}>
            <div className={styles.toolbar}/>
            <Grid container justifyContent="center" spacing={4}>
                {productList.map((product)=>(
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                        <Product product={product} onAddToCart={onAddToCart}/>
                    </Grid>
                ))}
            </Grid>
    </main>
    )
}

export default Products;