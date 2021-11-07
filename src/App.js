import React, { useState, useEffect} from 'react';
import { commerce } from './lib/commerce'
import { Navbar, Products, Cart, Checkout } from './components'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

const App = () => {
    const [ products, setProducts ] = useState([]);
    const [cart, setCart ] = useState({});

    const fetchProducts = async () => {
        const { data } = await commerce.products.list();
        setProducts(data);
    }

    const fecthCart = async () => {
        const data = await commerce.cart.retrieve();
        setCart(data);
    }

    const handleAddToCart = async (productId, quantity) => {
        const { cart } = await commerce.cart.add(productId,quantity);
        setCart(cart);
    }

    const handdleUpdateCartQuantity = async(productId,quantity) => {
        const {cart} = await commerce.cart.update(productId,{quantity});
        setCart(cart)
    }

    const handleRemoveFromCart = async(productId) => {
        const {cart} = await commerce.cart.remove(productId);
        setCart(cart);
    }

    const handleClearCart = async() => {
        const { cart } = await commerce.cart.empty();
        setCart(cart);
    }

    useEffect(()=>{
        fetchProducts();
        fecthCart();
    },[])

    return (
        <Router>
        <div>
            <Navbar cartCount={cart ? cart.total_items : '0'}/>
            <Switch>
                <Route exact path="/">
                    <Products productList={products} onAddToCart={handleAddToCart}/>
                </Route>
                <Route exact path="/cart">
                    <Cart 
                        cart={cart} 
                        UpdateCartQuantity={handdleUpdateCartQuantity}
                        RemoveFromCart={handleRemoveFromCart}
                        ClearCart={handleClearCart}
                    />
                </Route>
                <Route exact path="/checkout">
                    <Checkout cart={cart}/>
                </Route>
            </Switch>
        </div>
        </Router>
    )
}

export default App
