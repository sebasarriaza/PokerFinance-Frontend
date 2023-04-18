import { useAccount } from "wagmi";
import { Account, Connect, NetworkSwitcher } from "../components";
import Navbar from "../components/Navbar";
import { useContractRead } from "wagmi";
import { pokerFinanceContract } from "../constants/contracts";
import FinanceButton from "../components/FinanceButton";
import FinanceCardReads from "../components/FinanceCardReads";

function Page() {
  const { isConnected } = useAccount();
  const { address, isConnecting, isDisconnected } = useAccount();

  return (
    <>
      <Navbar />
      <FinanceCardReads />
    </>
  );
}

export default Page;
