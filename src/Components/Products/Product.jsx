import { Fragment, useEffect, useState } from "react";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";

import { useParams } from "react-router-dom";

import Header from "../Header/Header";
import StoreNavBar from "../Header/StoreNavBar";


import "./Product.css";

const Product = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});

  const productCollectionRef = collection(db, "products");

  //Load data for product by productID 
  useEffect(() => {
    const getProduct = async () => {
      const data = await getDocs(productCollectionRef);
      const list = data.docs.map((product) => ({
        ...product.data(),
        id: product.id,
      }));
      const filteredList = list.filter((product) => {
        return product.id === productId;
      });
      setProduct(filteredList[0]);
    };
    getProduct();
  }, []);

  return (
    <Fragment>
      <Header />
      <StoreNavBar />
      <div className="product-container">
        <div className="text-container">
          <h2 className="product-title">{product.name}</h2>
          <h4>${product.price}</h4>
          <h4>Quantity Left: {product.onHand}</h4>
          <div className="sizes">
            <label className="size-text-container">
              <input type="radio" className="size-input" name="size" />
              <span className="size-text single-letter">S</span>
            </label>

            <label className="size-text-container">
              <input type="radio" className="size-input" name="size" />
              <span className="size-text single-letter">M</span>
            </label>

            <label className="size-text-container">
              <input type="radio" className="size-input" name="size" />
              <span className="size-text single-letter">L</span>
            </label>

            <label className="size-text-container">
              <input type="radio" className="size-input" name="size" />
              <span className="size-text">XL</span>
            </label>
          </div>
          <p className="description">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia
            eligendi sequi officia animi, blanditiis tenetur. Voluptates, rem
            consectetur harum repudiandae ut modi dolorem architecto nam vero.
            Cum expedita error magnam, doloremque esse soluta hic laboriosam.
            Necessitatibus quo enim aut cum accusamus eos officiis laborum
            aspernatur, sit nam hic culpa, obcaecati nihil dolorem. Illo,
            quisquam quia ipsum totam, ullam nihil aliquam distinctio incidunt
            ratione est placeat. Culpa beatae dolor eveniet molestiae error
            numquam deleniti id assumenda exercitationem, natus, qui,
            repellendus asperiores temporibus voluptates quod necessitatibus
            quos. Atque odit incidunt adipisci, eius tempore iure deleniti quasi
            magnam harum praesentium dolores facere laboriosam!
          </p>
          <button className="add-to-cart">ADD TO CART</button>
        </div>
        <div className="product-img-container">
          <img className="product-img_solo" src={product.ImgUrl} />
        </div>
      </div>
    </Fragment>
  );
};

export default Product;
