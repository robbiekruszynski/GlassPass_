import type { NextPage } from "next";
import { useState } from "react";

const Upload: NextPage = () => {
  const [text, setText] = useState<string>("");

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <input
        type="text"
        value={text}
        onChange={handleTextChange}
        placeholder="Paste URL here"
        className="border rounded p-2"
      />
      {text && <p className="mt-4">Text entered: {text}</p>}
    </div>
  );
};

export default Upload;



