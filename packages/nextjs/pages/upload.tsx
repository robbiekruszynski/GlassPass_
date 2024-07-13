import type { NextPage } from "next";
import { useState } from "react";

const Upload: NextPage = () => {
  const [text, setText] = useState<string>("");

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleButtonClick = () => {
    // Add the action you want to trigger here
    console.log("Button clicked with text:", text);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex items-center">
        <input
          type="text"
          value={text}
          onChange={handleTextChange}
          placeholder="Paste URL here"
          className="border rounded p-2"
        />
        <button
          onClick={handleButtonClick}
          className="ml-2 bg-blue-500 text-white rounded p-2"
        >
          Enter
        </button>
      </div>
      {text && <p className="mt-4">Text entered: {text}</p>}
    </div>
  );
};

export default Upload;




