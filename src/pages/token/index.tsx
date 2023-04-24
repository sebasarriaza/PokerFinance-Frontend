import Mint from "../../components/Mint";
import Burn from "../../components/Burn";
import Navbar from "../../components/Navbar";
import styles from "../../styles/Token.module.css";

function index() {
  return (
    <>
      <div className={styles.navbar}>
        <Navbar />
      </div>
      <div className={styles.sections}>
        <Mint />
        <Burn />
      </div>
    </>
  );
}

export default index;
