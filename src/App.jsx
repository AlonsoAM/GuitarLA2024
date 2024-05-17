import Header from "./components/Header.jsx";
import {Guitar} from "./components/Guitar.jsx";
import {useCart} from "./hooks/useCart.js";


const App = () => {

    const {
        data,
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decrementQuantity,
        clearCart,
        isEmpty,
        total
    } = useCart()


    return (
        <>
            <Header cart={cart} removeFromCart={removeFromCart} increaseQuantity={increaseQuantity}
                    decrementQuantity={decrementQuantity} clearCart={clearCart} isEmpty={isEmpty} total={total}/>
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
