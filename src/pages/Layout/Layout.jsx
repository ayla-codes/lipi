import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Home/Home";
import DrawTutorial from "../DrawTutorial/DrawTutorial";
import Canvas from "../../components/Canvas/Canvas";
import { ReactSketchCanvas } from "react-sketch-canvas";
import "./Layout.css";

const styles = {
  border: "0.0625rem solid #9c9c9c",
  borderRadius: "0.25rem",
};

const Layout = () => {
  return (
    <BrowserRouter>
      <div className="layout">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/letter/:letter_id" element={<DrawTutorial />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default Layout;
