import FinanceButton from "./FinanceButton";
import styles from "../styles/FinanceCard.module.css";
import ABI from "../constants/pokerFinanceContractABI.json";
import { useContractReads, useProvider } from "wagmi";
import { IWagmiContract } from "../constants/helperTypes";
import { ethers } from "ethers";
import { pokerFactoryContract } from "../constants/contracts";
import { useEffect, useState } from "react";

export default function FinanceCard() {
  
  const provider = useProvider()

  const [addressPlayer, setAddressPlayer] = useState<string[]>();
  const [amountTotal, setAmountTotal] = useState<number[]>();
  const [fee, setFee] = useState<number[]>();
  const [datetimeLimit, setDatetimeLimit] = useState<number[]>();
  const addressPlayerArray:string[] = [];
  const amountTotalArray:number[] = [];
  const feeArray:number[] = [];
  const datetimeLimitArray:number[] = [];

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

    async function main(){
      const connectedPokerFactoryContract =  new ethers.Contract(
        pokerFactoryContract.address,
        pokerFactoryContract.abi,
        provider
        );
        const pokerFactoryContractEvents = await connectedPokerFactoryContract.queryFilter(
        "PokerFinanceCreated"
        );
        console.log(pokerFactoryContractEvents, "past events");
        for (let i = 0; i < pokerFactoryContractEvents.length; i++) {
          addressPlayerArray.push(pokerFactoryContractEvents && pokerFactoryContractEvents[i].args ? pokerFactoryContractEvents[i].args[0] : '')
          amountTotalArray.push(pokerFactoryContractEvents && pokerFactoryContractEvents[i].args ? pokerFactoryContractEvents[i].args[2] : 0)
          feeArray.push(pokerFactoryContractEvents && pokerFactoryContractEvents[i].args ? pokerFactoryContractEvents[i].args[3] : 0)
          datetimeLimitArray.push(pokerFactoryContractEvents && pokerFactoryContractEvents[i].args ? Number(pokerFactoryContractEvents[i].args[4]) : 0)
        }
        setAddressPlayer(addressPlayerArray);
        setAmountTotal(amountTotalArray);
        setFee(feeArray);
        setDatetimeLimit(datetimeLimitArray);
        setAddressPlayer(addressPlayerArray);
    }
    main()
  }, [])
  

  return (
    <>
    {addressPlayer?.map((item, index) => (
    <div className={styles.container}  key={index}>
      <p>Player: {addressPlayer ? addressPlayer[index] : null}</p>
      <p>Ticket: {amountTotal ? Number(amountTotal[index]) : null}</p>
      <p>Fee: {fee ? Number(fee[index]/100) : null}%</p>
      <p>Date limit: {datetimeLimit ? getDate(Number(datetimeLimit[index])) : null}
      </p>
      <p>{index}</p>
      <FinanceButton />
    </div>
    ))}
    </>
  );
}
