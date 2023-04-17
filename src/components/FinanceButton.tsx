import { useContractWrite } from "wagmi";
import { usePrepareContractWrite } from "wagmi";
import ABI from "../constants/abi.json";

function FinanceButton() {
  
  const { config, error } = usePrepareContractWrite({
    address: "0x3C1C3a30851Ae4e231128e2f56fB1B1204a7225F",
    abi: ABI,
    functionName: "finance",
    args: [10],
  });
  
  const { write } = useContractWrite(config);

  // function callContract
  
  return (
    <div>
      <button onClick={()=>write?.()}>Finance</button>
    </div>
  );
}

export default FinanceButton;
