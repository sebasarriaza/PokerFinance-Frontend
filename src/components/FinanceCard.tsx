import FinanceButton from "./FinanceButton";
import { useContractReads } from 'wagmi'
import ABI from "../constants/abi.json";

const pokerFinanceContract = {
  address: '0x3C1C3a30851Ae4e231128e2f56fB1B1204a7225F',
  abi: ABI,
}

export default function FinanceCard() {

  const { data, isError, isLoading } = useContractReads({
    contracts: [
      {
        pokerFinanceContract,
        functionName: 'amountTotal',
      },
      {
        pokerFinanceContract,
        functionName: 'amountTournamentTotal',
      },
      {
        pokerFinanceContract,
        functionName: 'amountFinancedTotal',
      },
    ],
  })

  return (
    <div>
      {/* <p>Ticket: `${amountTotal}`</p>
      <p>Prize: `${amountTournamentTotal}`</p>
      <p>Amount financed: `${amountFinancedTotal}`</p>
      <p>Fee: `${fee}`</p>
      <p>Date limitr: `${datetimeLimit}`</p>
      <p>Player: `${owner}`</p> */}
      <FinanceButton />
    </div>
  );
}
