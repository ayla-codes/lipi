import React, { useState } from "react";
import SvgAnimate from "../../components/SvgAnimate/SvgAnimate";
import DrawTutorial from "../DrawTutorial/DrawTutorial";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LetterBox from "../../components/LetterBox/LetterBox";
import letters from "../../assets/letters.json";

import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <div className="title">
      <h1>लिपि by Team Aylā</h1>
      </div>
      <div className="box-grid">

      {letters.map((letter) => {
        return (
          <>
            <LetterBox letter={letter} />
          </>
        );
      })}
      </div>
    </div>
  );
};

export default Home;
