import { useState } from "react";
import "./App.css";
import Home from "./pages/Home/Home";
import Layout from "./pages/Layout/Layout";
import Canvas from "./components/Canvas/Canvas";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Layout />
    </div>
  );
}

export default App;
