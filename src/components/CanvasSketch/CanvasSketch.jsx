import React, { useRef, useState, useEffect } from "react";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import storage from "../../helpers/Firebase";

const CanvasSketch = ({ cmping }) => {
  const canvasRef = useRef(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [paths, setPaths] = useState([]);
  const [drawPNG, setDrawPNG] = useState(null);
  const [accuracy, setAccuracy] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = 162;
    canvas.height = 220;

    context.lineCap = "round";
    context.lineJoin = "round";
    context.lineWidth = 6;
    context.strokeStyle = "#fff";
  }, []);

  const startDrawing = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    const newPath = `M ${offsetX} ${offsetY}`;
    setPaths((prevPaths) => [...prevPaths, newPath]);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const { offsetX, offsetY } = e.nativeEvent;

    context.lineTo(offsetX, offsetY);
    context.stroke();

    setPaths((prevPaths) => {
      const updatedPaths = [...prevPaths];
      updatedPaths[updatedPaths.length - 1] += ` L ${offsetX} ${offsetY}`;
      return updatedPaths;
    });
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.beginPath();
  };

  const handleSubmit = async () => {
    console.log("fuc",  cmping);
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL("image/png");
    setDrawPNG(dataURL);

    const fileName = `drawing_${Date.now()}.png`;
    const storageRef = ref(storage, `drawings/${fileName}`);

    try {
      await uploadString(storageRef, dataURL, "data_url");

      const downloadURL = await getDownloadURL(storageRef);
      console.log("File available at:", downloadURL);

      const response = await fetch(
        `https://incubate-lipi.onrender.com/compare?img_url=${encodeURIComponent(downloadURL)}&img2_url=${encodeURIComponent(cmping)}`
      );
      const data = await response.json();

      if (response.ok) {
        setAccuracy(data.accuracy);
      } else {
        console.error("Error from Flask API:", data.error);
      }

    } catch (error) {
      console.error("Error uploading the image or comparing:", error);
    }
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        style={{ border: "1px solid #fff" }}
      />

      <button onClick={handleSubmit}>Submit</button>

      {accuracy !== null && (
        <div>
          <p>Accuracy: {accuracy.toFixed(2)}%</p>
        </div>
      )}
    </div>
  );
};

export default CanvasSketch;
