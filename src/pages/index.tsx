import Image from "next/image";
import Link from "next/link";
import { useAccount } from "wagmi";
import logo from "../public/logo.png";
import clubs from "../public/clubs.png";
import diamonds from "../public/diamonds.png";
import token from "../public/token.png";
import style from "../styles/Home.module.css";

function Page() {

  return (
    <div className={style.wapper}>
      <div className={style.logoContainer}>
        <Image className={style.logoImage} src={logo} alt="logo" />
        <h1 className={style.logoText}>Poker Finance</h1>
      </div>
      <div className={style.sectionContainer}>
        <Link className={style.clubLink} href="/tournaments">
          <section className={style.clubSection}>
            <Image className={style.clubImageTop} src={clubs} alt="club" />
            <h1 className={style.clubTitle}>I am a player</h1>
            <h2 className={style.clubExplore}>Explore tournaments</h2>
            <Image className={style.clubImageBottom} src={clubs} alt="club" />
          </section>
        </Link>
        <Link className={style.diamondLink} href="/financing">
          <section className={style.diamondSection}>
            <Image className={style.diamondImageTop} src={diamonds} alt="diamond" />
            <h1 className={style.diamondTitle}>I am a patron</h1>
            <h2 className={style.diamondExplore}>Explore financing</h2>
            <Image className={style.diamondImageBottom} src={diamonds} alt="diamond" />
          </section>
        </Link>
      </div> 
      <div>
        <Link className={style.tokenLink} href="/token">
        <section className={style.tokenSection}>
        <Image className={style.tokenImage} src={token} alt="token" />
        <h4 className={style.tokenText}>Tokens</h4>
        </section>
        </Link>
      </div>
    </div>
  );
}

export default Page;
