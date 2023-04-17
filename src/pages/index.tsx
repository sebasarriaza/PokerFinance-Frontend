import { useAccount } from 'wagmi'
import { Account, Connect, NetworkSwitcher } from '../components'
import Navbar from '../components/Navbar'
import { useContractRead } from 'wagmi'
import { pokerFinanceContract } from '../constants/contracts'



function Page() {
  const { isConnected } = useAccount()
  const { address, isConnecting, isDisconnected } = useAccount()
  // const contractRead = useContractRead(
  //   {
  //     addressOrName: "0x3C1C3a30851Ae4e231128e2f56fB1B1204a7225F",
  //     contractInterface: pokerFinanceContract.abi,
  //   },
  // )



  return (
    <>
    <Navbar />
      
    </>
  )
}

export default Page
