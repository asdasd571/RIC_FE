
import styles from "./Header.module.scss";

import bellOFF from"../../assets/imgs/bellOFF.svg";
import bellON from"../../assets/imgs/bellON.svg";
import profile from"../../assets/imgs/profile.svg";


// const Test: React.FC = () => {
const Header : React.FC = () => {
    return(
        <header className={styles.container}> 
            <div className={styles.header_left}>
                <span className={styles.title}>DashBoard</span>
            </div>

            
            <div className={styles.header_right}>
                <img className={styles.bell} src={bellON} alt="벨"/>

                <div className={styles.profile}>
                    <span>홍길동</span>
                    <img src={profile} alt="프로필 아이콘"/>
                </div>

            </div>
        </header>
    )
}


export default Header;