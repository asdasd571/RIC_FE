
import { useEffect, useRef, useState } from "react";
import Panel from "../../components/Panel/Panel";
import Sidebar from "../../components/Sidebar/Sidebar";
import SequenceDiagram from "./SequenceDiagram";
import styles from "./TS.module.scss";
import { saveAs } from "file-saver";
import html2canvas from "html2canvas";



const TS:React.FC = () => {
    const [chartData, setChartData] = useState<string>(`sequenceDiagram\n`); // chartData 상태를 TS에서 관리
    const chartRef = useRef<HTMLDivElement>(null); // SequenceDiagram 저장을 위한 ref 

    // *refresh 버튼 클릭 시 chartData 초기화
    const handleRefresh = () => {
        setChartData(`sequenceDiagram\n`);
            
    };


    //* save 버튼 클릭시, 현재 사진 저장
    const handleSave = async () => {
        if (!chartRef.current) return;

        try{
            const panel = chartRef.current;
            const canvas = await html2canvas(panel, {
                scale: 2, // 캡처 해상도를 2배로 높임 (선택 사항)
                height: panel.scrollHeight, // 전체 스크롤 길이만큼 캡처
                width: panel.scrollWidth, // 전체 너비 설정
                useCORS: true, // CORS 문제 방지 (이미지 외부 로딩 시)
            });

            // 이미지 저장
            canvas.toBlob((blob) => {
                if (blob !== null) {
                    saveAs(blob, "Time Sequence Diagram.png");
                }
            });
        } catch(error){
            console.error("Error converting panel to image:", error);
        }
    };

    return(
        <div className="container">        
            <Sidebar/>
            <div className="main_header_container">
                
                {/* <Header titleText="Dashboard"/> */}
                <main className="main_container">
                <h1 className="main_title">Time Sequence Diagram</h1>
                
                <article className={styles.TS_container}>
                    <div className={styles.btn_container}>
                        <button className={styles.btn_save} onClick={handleSave} >save</button>
                        <button onClick={handleRefresh} className={styles.btn_refresh}>refresh</button>
                    </div>

                    <section className={styles.panel_container} >
                        <div className={styles.panel_title_container}>
                            <h3 className={styles.panel_title}>Time Sequence Diagram</h3>
                            <div className={styles.des_updated}>Update <strong>1</strong>s</div>
                        </div>
                        
                        <hr />
                        <div className={styles.panel_contents}>
                            <SequenceDiagram 
                                ref={chartRef}
                                chartData={chartData}
                                setChartData={setChartData}
                                />
                        </div>
                    </section>

                </article>

                </main>
            </div>
        </div>
    )
}


export default TS;