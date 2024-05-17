import {useEffect, useState} from "react";
import {db} from "./data/db.js";
import Header from "./components/Header.jsx";
import {Guitar} from "./components/Guitar.jsx";


const App = () => {

    const initialCartState = () => {
        const localCartState = localStorage.getItem("cart");
        return localCartState ? JSON.parse(localCartState) : [];
    }

    const [data, setData] = useState(db)
    const [cart, setCart] = useState(initialCartState)
    const MAX_ITEMS = 5
    const MIN_ITEMS = 1

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (item) => {
        const itemExist = cart.findIndex((guitar) => guitar.id === item.id)

        if (itemExist >= 0) {
            if (cart[itemExist].quantity >= MAX_ITEMS) return
            const updatedCart = [...cart];
            updatedCart[itemExist].quantity++
            setCart(updatedCart)
        } else {
            item.quantity = 1
            setCart([...cart, item])
        }
    }

    const removeFromCart = (id) => {
        const updatedCart = cart.filter((guitar) => guitar.id !== id);
        setCart(updatedCart);
    }

    const increaseQuantity = (id) => {
        const updatedCart = cart.map((guitar) => {
            if (guitar.id === id && guitar.quantity < MAX_ITEMS) {
                return {
                    ...guitar,
                    quantity: guitar.quantity + 1
                }
            }
            return guitar;
        });
        setCart(updatedCart);
    }

    const decrementQuantity = (id) => {
        const updatedCart = cart.map((guitar) => {
            if (guitar.id === id && guitar.quantity > MIN_ITEMS) {
                return {
                    ...guitar,
                    quantity: guitar.quantity - 1
                }
            }
            return guitar;
        });
        setCart(updatedCart);
    }

    const clearCart = () => {
        setCart([]);
    }


    return (
        <>
            <Header cart={cart} removeFromCart={removeFromCart} increaseQuantity={increaseQuantity}
                    decrementQuantity={decrementQuantity} clearCart={clearCart}/>
            <main className="container-xl mt-5">
                <h2 className="text-center">Nuestra Colección</h2>

                <div className="row mt-5">
                    {data.map((item, index) => (
                        <Guitar key={index} guitar={item} addToCart={addToCart}/>))}
                </div>
            </main>
            <footer className="bg-dark mt-5 py-5">
                <div className="container-xl">
                    <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
                </div>
            </footer>
        </>
    )
};

export default App
