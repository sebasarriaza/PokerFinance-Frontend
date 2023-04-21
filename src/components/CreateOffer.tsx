import { useContractWrite } from "wagmi";
import { usePrepareContractWrite } from "wagmi";
import ABI from "../constants/pokerFactoryContractABI.json";
import { useState } from "react";
import styles from "../styles/CreateOffer.module.css";

function CreateOffer() {
  const [factoryAmountToFinance, setFactoryAmountToFinance] = useState(0);
  const [factoryDatetimeLimit, setFactoryDatetimeLimit] = useState(0);
  const [factoryPlayerFee, setFactoryPlayerFee] = useState(0);

  const { config, error } = usePrepareContractWrite({
    address: "0x84cf6B0fe0C1e328EC24db6d3B965986d6d05A29",
    abi: ABI,
    functionName: "createPokerFinance",
    args: [factoryAmountToFinance, factoryDatetimeLimit, factoryPlayerFee, "0x4cC6e708Fde294a2711f8ea98a638E471B20D542", "0x984E8f8bc9FbE51e73e28C23b86ED6446b86476b"],
  });

  const { write } = useContractWrite(config);

  async function getFactoryAmountToFinance(event: any) {
    setFactoryAmountToFinance(event.target.value);
  }

  async function getFactoryPlayerFee(event: any) {
    setFactoryPlayerFee(event.target.value);
  }

  async function getFactoryDatetimeLimit(event: any) {
    setFactoryDatetimeLimit(event.target.value);
  }

  async function createOffer() {
    write?.();
  }

  return (
    <div className={styles.container}>
    <div className="mt-5 ml-5 mr-5 mb-5 bg-gray-900 p-2 rounded-sm border-2 border-gray-100  sm:w-[70%] lg:max-w-[30%]">
      <h2 className="text-center pb-2 text-2xl">Poker Factory</h2>

      <div className="flex items-center justify-between p-1 mt-2">
        <div className="flex items-center justify-center">
          <p>Here you can create new offers:</p>
        </div>
      </div>

      <div className="flex items-center justify-between p-1 mt-2">
        <p>Amount to finance:</p>
        <div className="flex items-center justify-center">
          <input
            type="number"
            value={factoryAmountToFinance}
            onChange={getFactoryAmountToFinance}
            style={{ color: "black" }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between p-1 mt-2">
        <p>Player fee (must be greater than 15):</p>
        <div className="flex items-center justify-center">
          <input
            type="number"
            value={factoryPlayerFee}
            onChange={getFactoryPlayerFee}
            style={{ color: "black" }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between p-1 mt-2">
        <p>DatetimeLimit:</p>
        <div className="flex items-center justify-center">
          <input
            type="number"
            value={factoryDatetimeLimit}
            onChange={getFactoryDatetimeLimit}
            style={{ color: "black" }}
          />
        </div>
      </div>

      <div className="flex items-center justify-center">
        <button
          className="text-2xl bg-red-500 pl-3 pr-3 rounded-sm"
          onClick={createOffer}
        >
          {" "}
          Create Offer{" "}
        </button>
      </div>
    </div>
    </div>
  );
}

export default CreateOffer;
