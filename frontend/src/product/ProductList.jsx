import { useEffect, useState } from "react";
import Product from "./Product";

export default function ProductList() {
    const [products, setProduct] = useState([])
    const [load, setLoad] = useState(false)

    function handleClick() {
        setLoad(true)
    }

    useEffect(() => {
        console.info("use effect with []")
    }, [])

    useEffect(() => {
        console.info("Call use effect")

        async function fetchProducts() {
            const response = await fetch("/public/products.json")
            const data = await response.json()
            setProduct(data)
        }

        if (load) {
            fetchProducts()
        }

        return () => {
            console.log("Product list component unmounted");
        }
    }, [load])

    return (
        <>
            <h1>Product List</h1>
            <button onClick={handleClick}>Load Products</button>
            {products.map((product) => (
                <Product product={product} key={product.id} />
            ))}
        </>
    )
}