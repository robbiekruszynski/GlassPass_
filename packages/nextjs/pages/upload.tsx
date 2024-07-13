import type { NextPage } from "next";
import { useState } from "react";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { extractDataFromUrl } from "../../nextjs/utils";
import { parseEther } from "ethers";

const Upload: NextPage = () => {
  const [text, setText] = useState<string>("");
  const [args, setArgs] = useState<any[]>([]);

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleButtonClick = () => {
    const extractedData = extractDataFromUrl(text);
  
    if (!extractedData) {
      console.error("extractDataFromUrl returned null");
      // Handle the error, e.g., show a message to the user
      return;
    }
  
    const { eventId, privateKey } = extractedData;
    const { latitude, longitude } = extractGeoAddressInfo(text);
  
    setArgs([eventId, privateKey]);
    writeAsync();
  };

  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "GlassPass",
    functionName: "uploadTicket",
    args: args,
    value: parseEther("0"),
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

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
          disabled={isLoading}
        >
          Enter
        </button>
      </div>
      {text && <p className="mt-4">Text entered: {text}</p>}
    </div>
  );
};

export default Upload;

function extractGeoAddressInfo(text: string): { latitude: any; longitude: any; } {
  throw new Error("Function not implemented.");
}


