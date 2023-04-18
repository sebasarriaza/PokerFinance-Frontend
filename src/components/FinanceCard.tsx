import FinanceButton from "./FinanceButton";
import { useContractRead } from 'wagmi'
import ABI from "../../constants/abi.json";
import { ethers } from "ethers";


export default function FinanceCard() {

  const { data, isError, isLoading } = useContractRead({
    address: '0x3C1C3a30851Ae4e231128e2f56fB1B1204a7225F',
    abi: ABI,
    functionName: 'amountTotal',
  })

  console.log(Number(data), "read data")
  
  return (
    <div>
      <p>amountTotal: {Number(data)}</p>
      {/* <p>Prize: {amountTournamentTotal}</p>
      <p>Amount financed: {amountFinancedTotal}</p>
      <p>Fee: {fee}</p>
      <p>Date limitr: {datetimeLimit}</p>
      <p>Player: {owner}</p> */}
      <FinanceButton />
    </div>
  );
}