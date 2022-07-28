import { Fragment } from "react";

import primImg from "../IMGS/primary1.jpg"
import img1 from "../IMGS/home1.jpg"
import img2 from "../IMGS/home2.jpg"
import img3 from "../IMGS/home3.jpg"

import PrimaryImg from "../Components/Images/PrimaryImg";
import Header from "../Components/Header/Header";
import StoreNavBar from "../Components/Header/StoreNavBar";


import "./Store.css"

const Store = () => {
 
  return (
    <Fragment>
      <Header />
      <StoreNavBar />
      <PrimaryImg src={primImg} />
      <h2 className="heading">Summer Collection 2022</h2>
      <div className="home-grid">
        <img className="grid-img vertical-img" src={img1} alt="Girl in sunglasses with red hair"/>
        <img className="grid-img" src={img2} alt="Girl with camera"/>
        <img className="grid-img" src={img3} alt="Man looking down"/>
      </div>
    </Fragment>
  );
};

export default Store;