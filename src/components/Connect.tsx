import { useAccount, useConnect, useDisconnect } from "wagmi";
import styles from "../styles/Connect.module.css";

export function Connect() {
  const { connector, isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();

  return (
    <div className={styles.wallet}>
      <div>
        {isConnected && (
          <button onClick={() => disconnect()}>Disconnect</button>
        )}

        {connectors
          .filter((x) => x.ready && x.id !== connector?.id)
          .map((x) => (
            <button key={x.id} onClick={() => connect({ connector: x })}>
              Connect wallet
            </button>
          ))}
      </div>
      {error && <div>{error.message}</div>}
    </div>
  );
}
