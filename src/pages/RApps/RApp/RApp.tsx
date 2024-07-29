
import rapp from "../../../assets/imgs/rapp.svg";
import styles from "./RApp.module.scss";
// RAPP의 패널을 나타낸다.

const RApp : React.FC = () => {
    return (
        <div className={styles.container}>
            <section className={styles.header_container}>
                <div className={styles.header_content}>
                    <h2>Energy Saving</h2>
                    <p>Network Energy Saving Service</p>
                </div>
                <div className={styles.header_img}>
                    <img src={rapp} alt="rapp" />
                </div>
            </section>

            <section className={styles.body_container}>
                <p>Turn off cells if the loading is low</p>
            </section>

            <section className={styles.footer_container}>
                <p className={styles.rapp_id}> rAppID: 1</p>
                <button className={styles.btn_submit}>open</button>
            </section>
        </div>
    );
}


export default RApp;