import { useAccount } from 'wagmi'

import { Account, Connect, NetworkSwitcher } from '../components'

function Page() {
  const { isConnected } = useAccount()
  const { address, isConnecting, isDisconnected } = useAccount()

  return (
    <>
      <h1>wagmi + Next.js</h1>

      {!isConnected && (
        <>
          <h3>Connect your wallet here:</h3>
        </>
      )}
      
      <Connect />

      {isConnected && (
        <>
          <Account />
          <NetworkSwitcher />
          <h3>Testing useAccount</h3>
          <div><h4>Your address is:</h4>{address}</div>
        </>
      )}
    </>
  )
}

export default Page
