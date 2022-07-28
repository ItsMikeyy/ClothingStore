import mainVideo from "../Videos/home.mp4";
import { Link } from "react-router-dom";
import "./Home.css"
const Home = () => {
  return (
    <div className="container">
      <div className="content">

        <Link to="/store">
          <button className="home-button">VIEW STORE FRONT</button>
        </Link>

        <Link to="/inventory">
          <button className="home-button">VIEW INVENTORY</button>
        </Link>
      
      </div>
      <video src={mainVideo} muted autoPlay loop />
    </div>
  );
};

export default Home;