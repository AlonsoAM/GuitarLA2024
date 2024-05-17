import {useEffect, useMemo, useState} from "react";
import {db} from "../data/db.js";

export const useCart = () => {
    // Para App
    const initialCartState = () => {
        const localCartState = localStorage.getItem("cart");
        return localCartState ? JSON.parse(localCartState) : [];
    }

    const [data] = useState(db)
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

    // Para el Header
    const isEmpty = useMemo(() => cart.length === 0, [cart]);
    const total = useMemo(() => cart.reduce((acc, guitar) => acc + (guitar.price * guitar.quantity), 0), [cart])

    return{
        data,
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decrementQuantity,
        clearCart,
        isEmpty,
        total
    }


}