import Pixelmatch from "pixelmatch";

import React, { useEffect, useState } from "react";
import { convertSvgToImageData } from "../../helpers/helpers";

const ComparePixels = ({ img2, img1Svg }) => {
  const [img1, setimg1] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("from compare");

    convertSvgToImageData(img1Svg).then((imageData) => {
      console.log("ImageData:", imageData);

      const canvas = document.createElement("canvas");
      canvas.width = imageData.width;
      canvas.height = imageData.height;
      const ctx = canvas.getContext("2d");
      ctx.putImageData(imageData, 0, 0);

      const base64PNG = canvas.toDataURL("image/png");
      console.log("Base64 PNG:", base64PNG);
      setimg1(base64PNG);
      setLoading(false);
    });
  }, []);
};

export default ComparePixels;
