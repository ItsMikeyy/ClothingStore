import { Fragment, useState, useEffect } from "react"

import {db} from "../firebase-config"
import {collection, getDocs} from "firebase/firestore"

import { Link } from "react-router-dom"

import Header from "../Components/Header/Header"
import MobileProductList from "../Components/Products/MobileProductList"
import ProductList from "../Components/Products/ProductList"

import "./Inventory.css"


const Inventory = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [products, setProducts ] = useState([])

  const productCollectionRef = collection(db, "products")

  useEffect(() => {
    const getProducts = async () => {
      const data = await getDocs(productCollectionRef)
      setProducts(data.docs.map((product) => ({...product.data(), id: product.id})))
    }
    getProducts()
  }, [productCollectionRef])

  const updateMedia = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  return (
    <Fragment>
      <Header />
      <div className="inventory-container">
        <h1>Store Inventory</h1>
        {windowWidth > 800 && <ProductList products={products}/>}
        {windowWidth <= 800 && <MobileProductList products={products}/>}
        <Link to="/inventory/add">
          <button className="new-product-button">Add New Product</button>
        </Link>

      </div>
    </Fragment>
  )
}

export default Inventory