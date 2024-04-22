import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import FestProfile from "../components/FestProfile";
import Foot from "../components/Foot";
import "../styles/FestPage.css";

function FestPage() {
  const location = useLocation();
  const data = location.state;

  return (
    <div className='festgPage'>
      <Navbar />
      <div className='fest-container'>
        <FestProfile data={data} />
      </div>
      <Foot />
    </div>
  );
}

export default FestPage;
