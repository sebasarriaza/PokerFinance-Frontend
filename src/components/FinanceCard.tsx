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
    connectPokerFactoryContract()
  
  }, [])

  const { data: signer, isError, isLoading } = useSigner()
  
  // async function connectPokerFinanceContract(index:number){
  //   const connectedPokerFinanceContract =  new ethers.Contract(
  //     addressPlayer[index],
  //     pokerFinanceContract.abi,
  //     provider
  //     );
  //     await connectedPokerFinanceContract.finance(amount)
  // }
  
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
    selectedContract = addressPlayer[index];
    write?.()
    console.log(selectedContract, "selectedContract")
    console.log(error)
  }


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
      <button onClick={
        () => viewButton ? setViewButton(false) : setViewButton(true)
      }>Finance</button>
      <div>
      {viewButton && (
        <div>
          <input type="number" value={amount} onChange={handleInputChange} />
          <button onClick={() => write?.()}>Submit</button>
        </div>
        )}
        
      </div>
    </div>
    ))}
    </>
  );
}
