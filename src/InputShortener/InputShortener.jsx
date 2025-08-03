import React, { useState } from "react";

const InputShortener = ({ setInput }) => {
  const [value, setValue] = useState("");

  const handleClick = () => {
    setInput(value);
    setValue("");
  };

  return (
    <div className="inputContainer">
      <h1>
        URL <span>Shortener</span>
      </h1>
      <div>
        <input
          type="text"
          placeholder="Paste your link here..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button onClick={handleClick}>Shorten</button>
      </div>
    </div>
  );
};

export default InputShortener;
