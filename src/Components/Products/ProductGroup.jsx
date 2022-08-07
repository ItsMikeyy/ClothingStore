import { Fragment, useEffect, useState } from "react";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";

import { useParams, Link } from "react-router-dom";

import StoreNavBar from "../Header/StoreNavBar";
import Header from "../Header/Header";

import "./ProductGroup.css";

const ProductGroup = () => {
  const { productFilter } = useParams();
  const [products, setProducts] = useState();

  const productCollectionRef = collection(db, "products");

  useEffect(() => {
    const getProducts = async () => {
      const data = await getDocs(productCollectionRef);
      let filter = productFilter.replace("-", " ");
      filter = filter.toUpperCase();
      const list = data.docs.map((product) => ({
        ...product.data(),
        id: product.id,
      }));
      const filterList = list.filter((product) => {
        return product.catagory === filter;
      });
      setProducts(filterList);
    };
    getProducts();
  }, [productFilter]);

  console.log(products);
  return (
    <Fragment>
      <Header />
      <StoreNavBar />
      <h1 className="heading">{productFilter.replace("-", " ").toUpperCase()}</h1>
      <div className="product-grid">
        {products &&
          products.map((product) => {
            return (
              <Link to={`/store/${productFilter}/${product.id}`}>
                <div className="product">
                  <h2>{product.name}</h2>
                  <div className="image-container">
                    <img className="product-img" src={product.ImgUrl} />
                  </div>
                  <h3>${product.price}</h3>
                  <p>{product.upc}</p>
                  <p>Quantity: {product.onHand}</p>
                </div>
              </Link>
            );
          })}
      </div>
    </Fragment>
  );
};

export default ProductGroup;
