import { Fragment, useState } from "react";

import NavDropDown from "./StoreNavDropdown";

import "./StoreNavBar.css";

const StoreNavBar = () => {
  const [type, setType] = useState("");

  const mouseOverHandler = (entry) => {
    setType(entry);
  };

  const mouseLeaveHandler = () => {
    setType("");
  };

  return (
    <Fragment>
      <div className="nav-bar">
        <button
          onMouseEnter={() => {
            mouseOverHandler("MALE");
          }}
          className="nav-button"
        >
          MALE v
        </button>
        <button
          onMouseEnter={() => {
            mouseOverHandler("FEMALE");
          }}
          className="nav-button"
        >
          FEMALE v
        </button>
        <button
          onMouseEnter={() => {
            mouseOverHandler("KID / BABY");
          }}
          className="nav-button"
        >
          KID / BABY v
        </button>
        <button
          onMouseEnter={() => {
            mouseOverHandler("NEW");
          }}
          className="nav-button"
        >
          NEW v
        </button>
      </div>
      {type !== "" && <NavDropDown type={type} onLeave={mouseLeaveHandler} />}
    </Fragment>
  );
};

export default StoreNavBar;
