import type { NextPage } from "next";
import { useState } from "react";

const Upload: NextPage = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {file && <p>File selected: {file.name}</p>}
    </div>
  );
};

export default Upload;
