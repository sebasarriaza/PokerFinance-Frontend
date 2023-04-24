import FinanceButton from "./FinanceButton";
import styles from "../styles/FinanceCard.module.css";
import ABI from "../constants/pokerFinanceContractABI.json";
import { useContractReads, useProvider, useSigner } from "wagmi";
import { IWagmiContract } from "../constants/helperTypes";
import { ethers } from "ethers";
import { pokerFactoryContract } from "../constants/contracts";
import { pokerFinanceContract } from "../constants/contracts";
import { useEffect, useState } from "react";
import { useContractWrite } from "wagmi";
import { usePrepareContractWrite } from "wagmi";

export default function FinanceCard() {

  
  const provider = useProvider()
  
  const [addressContract, setAddressContract] = useState<string[]>();
  const [addressPlayer, setAddressPlayer] = useState<string[]>();
  const [amountTotal, setAmountTotal] = useState<number[]>();
  const [fee, setFee] = useState<number[]>();
  const [datetimeLimit, setDatetimeLimit] = useState<number[]>();
  const [viewButton, setViewButton] = useState<boolean>(false);
  const addressPlayerArray:string[] = [];
  const amountTotalArray:number[] = [];
  const feeArray:number[] = [];
  const datetimeLimitArray:number[] = [];
  let selectedContract:string = "";

  function getDate(datestamp: number) {

    let dateFormat= new Date(datestamp*1000);

    return dateFormat.getDate()+
       "/"+(dateFormat.getMonth()+1)+ 
       "/"+dateFormat.getFullYear()+
       " "+("0" + dateFormat.getHours()).slice(-2)+
       ":"+("0" + dateFormat.getMinutes()).slice(-2)+
       ":"+("0" + dateFormat.getSeconds()).slice(-2); 
}

  useEffect (()=>{

    async function connectPokerFactoryContract(){
      const connectedPokerFactoryContract =  new ethers.Contract(
        pokerFactoryContract.address,
        pokerFactoryContract.abi,
        provider
        );
        interface iPokerFactoryContract {}
        const pokerFactoryContractEvents:any[] = await connectedPokerFactoryContract.queryFilter(
        "PokerFinanceCreated"
        );
        console.log(pokerFactoryContractEvents, "past events");
        for (let i = 0; i < pokerFactoryContractEvents.length; i++) {
          
          pokerFactoryContractEvents && (pokerFactoryContractEvents[i].args.length>=3) && (pokerFactoryContractEvents.length!=0) ? addressPlayerArray.push(pokerFactoryContractEvents[i].args[0]) : null;
          pokerFactoryContractEvents && (pokerFactoryContractEvents[i].args.length>=3) && (pokerFactoryContractEvents.length!=0) ? amountTotalArray.push(pokerFactoryContractEvents[i].args[2]) : null;
          pokerFactoryContractEvents && (pokerFactoryContractEvents[i].args.length>=3) && (pokerFactoryContractEvents.length!=0) ? feeArray.push(pokerFactoryContractEvents[i].args[3]) : null;
          pokerFactoryContractEvents && (pokerFactoryContractEvents[i].args.length>=3) && (pokerFactoryContractEvents.length!=0) ? datetimeLimitArray.push(Number(pokerFactoryContractEvents[i].args[4])) : null;
        }
        setAddressPlayer(addressPlayerArray);
        setAmountTotal(amountTotalArray);
        setFee(feeArray);
        setDatetimeLimit(datetimeLimitArray);
        setAddressPlayer(addressPlayerArray);
    }
    connectPokerFactoryContract()
  
  }, [])

  const { data: signer, isError, isLoading } = useSigner();
  
  const [amount, setAmount] = useState<number>(0);

  const handleInputChange = (event:any) => {
    setAmount(event.target.value);
  };

  const { config, error} = usePrepareContractWrite({
    address: "0x72f4fea1c8224f4baa6f3cced273b13e1c5cb21c",
    abi: ABI,
    functionName: "finance",
    args: [amount],
  });
  
  const { write, status } = useContractWrite(config);
  
  console.log(status)
  function callFinance(index:number){
    if (addressPlayer == null || addressPlayer == undefined) return;
    selectedContract =  addressPlayer[index];
    write?.()
    console.log(selectedContract, "selectedContract")
    console.log(error)
  }

  return (
    <>
    {addressPlayer?.map((item, index) => (
    
    <div className={styles.container} key={index}>
          <div className={styles.card}>
            <p className={styles.index}>{index}</p>
            <p className={styles.addressPlayer}>
              Player: {addressPlayer ? addressPlayer[index] : null}
            </p>
            <p className={styles.amountTotal}>
              Ticket: {amountTotal ? Number(amountTotal[index]) : null}
            </p>
            <p className={styles.fee}>
              Fee: {fee ? Number(fee[index] / 100) : null}%
            </p>
            <p className={styles.datetimeLimit}>
              Date limit:{" "}
              {datetimeLimit ? getDate(Number(datetimeLimit[index])) : null}
            </p>
            <button
              className={styles.button}
              onClick={() =>
                viewButton ? setViewButton(false) : setViewButton(true)
              }
            >
              Finance
            </button>
            <div className={styles.finance}>
              {viewButton && (
                <div className={styles.finance}>
                  <input
                    className={styles.input}
                    type="number"
                    value={amount}
                    onChange={handleInputChange}
                  />
                  <button className={styles.button} onClick={() => write?.()}>
                    Submit
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
    ))}
    </>
  );
}