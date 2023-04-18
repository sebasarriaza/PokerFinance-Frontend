import { useNetwork, useSwitchNetwork } from 'wagmi'
import styles from '../../styles/NetworkSwitcher.module.css';

export function NetworkSwitcher() {
  const { chain } = useNetwork()
  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork()

  return (
    <div className={styles.container}>
      <div className={styles.network}>
        <span className={styles['network-name']}>Connected to</span>
        <span className={styles['network-id']}>
          {chain?.name ?? chain?.id}
          {chain?.unsupported && <span className={styles['network-unsupported']}> (unsupported)</span>}
        </span>
      </div>

      {switchNetwork && (
        <div className={styles.switcher}>
          {chains.map((x) =>
            x.id === chain?.id ? null : (
              <button key={x.id} className={styles.button} onClick={() => switchNetwork(x.id)}>
                {x.name}
                {isLoading && x.id === pendingChainId && <span className={styles.switching}> (switching)</span>}
              </button>
            ),
          )}
        </div>
      )}

      <div>{error && <span className={styles.error}>{error.message}</span>}</div>
    </div>
  )
}
