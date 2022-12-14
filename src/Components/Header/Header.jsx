import { Link } from "react-router-dom";

import "./Header.css";

const Header = () => {
  return (
    <header className="main-header">
      <Link to="/">
        <h1>Bryson Munoz</h1>
      </Link>
      <div className="header-links">
        <Link to="/store">STORE</Link>
        <Link to="/inventory">INVENTORY</Link>
      </div>
    </header>
  );
};

export default Header;
