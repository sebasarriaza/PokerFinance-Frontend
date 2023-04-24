import styles from "../styles/Burn.module.css";
import { usePrepareContractWrite, useContractWrite } from 'wagmi'
import ABI from "../constants/pokerFinanceTokenContractABI.json";
import { useState } from "react";

function Burn() {
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");

  const { config, error } = usePrepareContractWrite({
    address: "0x4cC6e708Fde294a2711f8ea98a638E471B20D542",
    abi: ABI,
    functionName: "burn",
    args: [address, amount],
  });

  const { write } = useContractWrite(config);

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Burn</h2>
      <label className={styles.addressLabel}>
        Address:
        <input type="text" value={address} onChange={handleAddressChange} className={styles.addressInput} />
      </label>
      <label className={styles.amountLabel}>
        Amount:
        <input type="text" value={amount} onChange={handleAmountChange} className={styles.amountInput} />
      </label>
      <button onClick={() => write?.()} className={styles.mintButton}>Burn</button>
    </div>
  );
}


export default Burn
