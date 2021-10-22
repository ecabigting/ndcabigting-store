import React, { useState, useEffect} from 'react';
import { commerce } from './lib/commerce'
import { Navbar, Products, Cart } from './components'

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
        const item = await commerce.cart.add(productId,quantity);
        setCart(item.cart);
    }

    useEffect(()=>{
        fetchProducts();
        fecthCart();
    },[])

    console.log(cart);
    return (
        <div>
            <Navbar cartCount={cart ? cart.total_items : '0'}/>
            {/* <Products productList={products} onAddToCart={handleAddToCart}/> */}
            {cart.total_items > 0 ? <Cart cart={cart}/> : 'nada' } 
        </div>
    )
}

export default App
