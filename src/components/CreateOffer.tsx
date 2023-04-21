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
      <h2>Poker Factory</h2>

      <div className="flex items-center justify-between p-1 mt-2">
        <div className={styles['input-label']}>Here you can create new offers:</div>
      </div>

      <div className="flex items-center justify-between p-1 mt-2">
        <div className={styles['input-label']}>Amount to finance:</div>
        <div className="flex items-center justify-center">
          <input
            type="number"
            value={factoryAmountToFinance}
            onChange={getFactoryAmountToFinance}
          />
        </div>
      </div>

      <div className="flex items-center justify-between p-1 mt-2">
        <div className={styles['input-label']}>Player fee (must be greater than 15):</div>
        <div className="flex items-center justify-center">
          <input
            type="number"
            value={factoryPlayerFee}
            onChange={getFactoryPlayerFee}
          />
        </div>
      </div>

      <div className="flex items-center justify-between p-1 mt-2">
        <div className={styles['input-label']}>DatetimeLimit:</div>
        <div className="flex items-center justify-center">
          <input
            type="number"
            value={factoryDatetimeLimit}
            onChange={getFactoryDatetimeLimit}
          />
        </div>
      </div>

      <div className="flex items-center justify-center">
        <button className={styles.button} onClick={createOffer}>
          Create Offer
        </button>
      </div>
    </div>
  );
}

export default CreateOffer;
