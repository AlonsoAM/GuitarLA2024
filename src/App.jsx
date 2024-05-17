import {useState} from "react";
import {db} from "./data/db.js";
import Header from "./components/Header.jsx";
import {Guitar} from "./components/Guitar.jsx";


const App = () => {

    const [data, setData] = useState(db)
    const [cart, setCart] = useState([])

    const addToCart = (item) => {
        const itemExist = cart.findIndex((guitar) => guitar.id === item.id)

        if (itemExist >= 0) {
            console.log("Ya existe")
        } else {
            item.quantity = 1
            setCart([...cart, item])
        }
    }

    return (
        <>
            <Header/>
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
