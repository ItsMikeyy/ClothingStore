import { Link } from "react-router-dom";

import "./StoreNavDropdown.css";

const StoreNavDropdown = (props) => {
  let content = <p>HELLO</p>;
  if (props.type === "MALE") {
    content = (
      <div>
        <Link to="/store/male-shirts" className="link">
          MALE SHIRTS
        </Link>
        <Link to="/store/male-pants" className="link">
          MALE PANTS
        </Link>
        <Link to="/store/male-socks" className="link">
          MALE SOCKS
        </Link>
      </div>
    );
  } else if (props.type === "FEMALE") {
    content = (
      <div>
        <Link to="/store/female-shirts" className="link">
          <p>FEMALE SHIRTS</p>
        </Link>
        <Link to="/store/female-pants" className="link">
          <p>FEMALE PANTS</p>
        </Link>
        <Link to="/store/female-socks" className="link">
          <p>FEMALE SOCKS</p>
        </Link>
      </div>
    );
  } else if (props.type === "KID / BABY") {
    content = (
      <div>
        <Link to="/store/baby-shirts" className="link">
          <p>BABY SHIRTS</p>
        </Link>
        <Link to="/store/baby-pants" className="link">
          <p>BABY PANTS</p>
        </Link>
        <Link to="/store/baby-socks" className="link">
          <p>BABY SOCKS</p>
        </Link>
        <Link to="/store/kid-shirts" className="link">
          <p>KID SHIRTS</p>
        </Link>
        <Link to="/store/kid-pants" className="link">
          <p>KID PANTS</p>
        </Link>
        <Link to="/store/kid-socks" className="link">
          <p>KID SOCKS</p>
        </Link>
      </div>
    );
  } else if (props.type === "NEW") {
    content = (
      <div>
        <Link to="/store/new-arrivals" className="link">
          <p>NEW ARRIVALS</p>
        </Link>
        <Link to="/store/new-clothes" className="link">
          <p>NEW CLOTHES</p>
        </Link>
        <Link to="/store/new-accessories" className="link">
          <p>NEW ACCESSORIES</p>
        </Link>
      </div>
    );
  }
  return (
    <div className="nav-container" onMouseLeave={props.onLeave}>
      {content}
    </div>
  );
};

export default StoreNavDropdown;
