import styles from './ValueCard.module.scss';


// value 나타내는 카드들 
const ValueCard : React.FC = () => {

    return (
        <div className={styles.container}>
            <section className={styles.section_value} >
                <div className={styles.value}>20</div>
                <div className={styles.plus_minus}>+2.5</div>
            </section>
            <section className={styles.section_description}> Value3Value3Value3Value3 </section>
        </div>
    )
}


export default ValueCard;