import React from "react";
import { Link } from "react-router-dom";

import "./LetterBox.css";

const LetterBox = ({ letter }) => {
  return (
    <div className="letterBox">
      <Link to={`letter/${letter.id}`}>
      <img src={`../../${letter.filename}`} />
        <button>
          {letter.english} ({letter.nepali})
        </button>
      </Link>
    </div>
  );
};

export default LetterBox;
