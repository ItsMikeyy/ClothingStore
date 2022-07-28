import { Link } from "react-router-dom";

import "./MobileProductList.css";

const MobileProductList = (props) => {
  const productElement = props.products.map((product) => {
    return (
      <Link key={product.id} to={`/inventory/${product.id}`}>
        <div className="mobile-content">
          <div>
            <h3>{product.name}</h3>
            <p>{product.upc}</p>
          </div>
          <p>{product.price}</p>
        </div>
      </Link>
    );
  });

  return <div className="mobile-container">{productElement}</div>;
};

export default MobileProductList;
