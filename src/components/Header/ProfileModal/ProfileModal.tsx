import profileRe from "../../../assets/imgs/profileRe.svg";
import styles from "./ProfileModal.module.scss";

// * 사용자 프로필모달

const ProfileModal :React.FC = () => {
    return(
        <div className={styles.container}>
            <section>
                <img src={profileRe} alt="프로필 이미지 편집"/>
            </section>
            <section>
                <div className={styles.info_container}>
                    <input type="text" 
                        placeholder="이름"
                        aria-label="사용자이름" // 시각적요소로 표시되지 않는 텍스트
                    /> 
                    <p>abc123@abc.com</p>
                </div>
                <button className={styles.btn_save}>저장하기</button>
            </section>
            
            
        </div>
    )
}

export default ProfileModal;
