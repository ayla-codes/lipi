import React, { useEffect, useState } from "react";
import SvgAnimate from "../../components/SvgAnimate/SvgAnimate";
import { extractAndReversePaths } from "../../helpers/helpers";
import { useParams } from "react-router-dom";
import letters from "../../assets/letters.json";
import CanvasSketch from "../../components/CanvasSketch/CanvasSketch";

import './DrawTut.css'

const DrawTutorial = ({ letter }) => {
  const [mySvg, setMySvg] = useState(null);
  const [myPaths, setMyPaths] = useState([]);
  const [loading, setLoading] = useState(true);
  const [myletter, setmyletter] = useState(null);
  const [replay, setReplay] = useState(false); // New state for replay
  const letterId = useParams().letter_id;

  useEffect(() => {
    console.log(letterId);
    let x = letters.filter((letter) => letter.id == letterId)[0];
    setmyletter(x);
    fetch(`../${x.filename}`)
      .then((res) => res.text())
      .then((res) => {
        setMySvg(res);
        console.log(res);
        setMyPaths(extractAndReversePaths(res));
        setLoading(false);
      });
  }, []);

  const handleReplay = () => {

    setReplay((prev) => !prev); 
  };

  return (
    <div className="drawTutorial">
      <div className="title">
        <h1>Test yourself</h1>
      </div>
      {loading ? (
        <p>loading...</p>
      ) : (
        <div className="content">
          <div className="wtf">
            <SvgAnimate pathList={myPaths} reset={replay} />
            <div>
              <p>English: {myletter.english}</p>
              <p>Nepali: {myletter.nepali}</p>
            </div>
          </div>
          <div className="drawLetter">
            <CanvasSketch cmping={myletter.link}/>
          </div>
        </div>
      )}
    </div>
  );
};

export default DrawTutorial;
