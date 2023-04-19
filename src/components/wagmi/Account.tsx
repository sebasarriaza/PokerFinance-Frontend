import { useAccount, useEnsName } from 'wagmi'
import style from '../../styles/wagmi/Account.module.css'

export function Account() {
  const { address } = useAccount()

  return (
    <div className={style.address}>
      {`${address?.slice(0,6,)}...${address?.slice(-4,)}`}
    </div>
  )
}
