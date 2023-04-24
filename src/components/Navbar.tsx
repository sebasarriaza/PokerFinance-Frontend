import Image from "next/image";
import Link from "next/link";
import { useAccount } from "wagmi";
import { Account, Connect, NetworkSwitcher } from "./wagmi";
import styles from "../styles/Navbar.module.css";
import logo from "../public/logo.png";

const Navbar = () => {
  const { isConnected } = useAccount();
  const { address, isConnecting, isDisconnected } = useAccount();

  return (
    <nav className={styles.nav}>
      <Link className={styles.logoLink} href="/">
      <div className={styles.logoContainer}>
        <Image className={styles.logoImage} src={logo} alt="logo"/>
        <h1 className={styles.logoText}>Poker Finance</h1>
      </div>
      </Link>

      <div className={styles.walletContainer}>
        {!isConnected &&
        <Connect />
      }

        {isConnected && (
          <>
          <Account />
          <Connect />
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
