import styles from "./EtriRIC.module.scss";

// * ETRI RIC 목록을 모여주는 컨테이너
const EtriRIC : React.FC = ()=>{
    // todo : soft코딩으로 바꿔줘야할듯?
    return(
        <div className={styles.container}>
        <section className={styles.item}>
        영역1
        </section>
        <section className={styles.item}>
        영역2
        </section>
        <section className={styles.item}>
        영역3
        </section>
        <section className={styles.item}>
        영역4
        </section>
    </div>
    )
}

export default EtriRIC;