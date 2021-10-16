import React from "react";
import { Grid } from '@material-ui/core'
import { Product } from "./Product/Product";

const products = [
    {id:2, name: "Mang Thomas sauce", description: "Lechon sauce by Mang thomas", price:5 ,image: 'https://www.kuyastindahan.co.uk/images/mang-tomas-all-purpose-sauce-p346-2392_image.jpg'},
    {id:3, name: "sugo nuts", description: "peanuts by sugo", price:1.2 ,image: 'https://kabayanfoodmart.ca/1902-large_default/sugo-peanuts-hot-spicy-120g.jpg'},
    {id:4, name: "datu puti suka", description: "vinegar datu puti", price:6.6 ,image: 'https://i5.walmartimages.com/asr/dd10dfc5-f39b-4898-9b4e-8221e593994b_1.18c2ac8e0bb28f2cfdbb1cb5dff5b997.jpeg'}
];

const Products = () => {
    return (<main>
        <Grid container justify="center" spacing={4}>
            {products.map((product)=>(
                <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                    <Product product={product}/>
                </Grid>
            ))}
        </Grid>
    </main>)
}

export default Products;