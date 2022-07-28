import { Link } from "react-router-dom";

import "./ProductList.css";

const ProductList = (props) => {

  const productElement = props.products.map((product) => {
    return (
      <Link key={product.id} to={`/inventory/${product.id}`}>
        <div >
          <p>{product.name}</p>
          <p>{product.price}</p>
          <p>{product.cost}</p>
          <p>{product.upc}</p>
          <p>{product.onHand}</p>
          <p>{product.catagory}</p>
        </div>
      </Link>
    );
  });

  return (
    <div className="products">
      <div className="product-info">
        <h3>Article Name</h3>
        <h3>Article Price</h3>
        <h3>Article Cost</h3>
        <h3>Article UPC</h3>
        <h3>Article OnHand</h3>
        <h3>Article Catagory</h3>
      </div>
      {productElement}
    </div>
  );
};

export default ProductList;
