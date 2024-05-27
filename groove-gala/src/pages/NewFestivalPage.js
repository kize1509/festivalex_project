import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import NewFestCard from "../components/NewFestCard";
import Foot from "../components/Foot";
import "../styles/NewFestivalPage.css";
import { useState } from "react";

function NewFestPage() {
  const location = useLocation();
  const data = location.state;

  return (
    <div className='festgPage'>
      <Navbar />
      <div className='nf-page-conatiner'>
        <NewFestCard data={data} />
      </div>
      <Foot />
    </div>
  );
}

export default NewFestPage;
