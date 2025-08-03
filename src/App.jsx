import { useState } from "react";
import "./App.css";
import BackGroundAnimation from "./BackGroundAnimation/BackGroundAnimation";
import InputShortener from "./InputShortener/InputShortener";
import LinkResult from "./LinkResult/LinkResult";

function App() {
  const [input, setInput] = useState("");

  return (
    <div className="app">
      <InputShortener setInput={setInput} />
      <BackGroundAnimation />
      <LinkResult input={input} />
    </div>
  );
}

export default App;
