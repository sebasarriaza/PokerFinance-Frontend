import FinanceButton from "./FinanceButton";
import { useContractReads } from 'wagmi'
import ABI from "../constants/abi.json";
import { IWagmiContract } from "../constants/helperTypes";
import style from "../styles/FinanceCard.module.css";

const pokerFinanceContract:IWagmiContract = {
  address: '0x3C1C3a30851Ae4e231128e2f56fB1B1204a7225F',
  abi: ABI,
}

export default function FinanceCard() {
  
  const { data, isError, isLoading } = useContractReads({
    contracts: [
      {
        ...pokerFinanceContract,
        functionName: 'amountTotal',
      },
      {
        ...pokerFinanceContract,
        functionName: 'amountTournamentTotal',
      },
      {
        ...pokerFinanceContract,
        functionName: 'amountFinancedTotal',
      },
      {
        ...pokerFinanceContract,
        functionName: 'fee',
      },
      {
        ...pokerFinanceContract,
        functionName: 'datetimeLimit',
      },
      {
        ...pokerFinanceContract,
        functionName: 'owner',
      },
    ],
  })

  console.log(data, "read data")

  return (
    <div className={style.container}>
      <p>Ticket: {data?Number(data[0]):null}</p>
      <p>Prize: {data?Number(data[1]):null}</p>
      <p>Amount financed: {data?Number(data[2]):null}</p>
      <p>Fee: {data?Number(data[3]):null}</p>
      <p>Date limit: {data?Number(data[4]):null}</p>
      <p>Player: {data?data[5]:null}</p>
      <FinanceButton />
    </div>
  );
}