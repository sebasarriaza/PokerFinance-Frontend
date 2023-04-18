import { useAccount, useEnsName } from 'wagmi'
import style from '../../styles/Account.module.css'

export function Account() {
  const { address } = useAccount()
  const { data: ensName } = useEnsName({ address })

  return (
    <div className={style.address}>
      {ensName ?? `${address?.slice(0,6,)}...${address?.slice(-4,)}`}
      {ensName ? ` (${address})` : null}
    </div>
  )
}
