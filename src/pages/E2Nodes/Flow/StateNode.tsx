// ! 상태를 나타내는 노드. (Energy Saving 등.)
import { Handle, Position, type Node, type NodeProps } from '@xyflow/react';
import { useCallback } from "react";
import styles from "./StateNode.module.scss";
import '@xyflow/react/dist/style.css';

export type StateNodeData = {state: string, label: string}; // 노드에 전달할 데이터
export type StateNodeType = Node<StateNodeData, 'stateNodeType'>; // Node<노드 데이터타입, 노드 type명

export default function StateNode({ data }: NodeProps<StateNodeType>) {
    return(
        <div className={styles.container}> {/* 기본 노드 스타일 적용 */}
            {/* 출발, 도착점 */}
            {/* <Handle // * 출발 
                type="source"
                position={Position.Left}
                id="a"
            /> */}

            <section className={styles.contents_container}>
                <div className={styles.description}>{data.label}</div>
                <span className={`${styles.state}
                    ${data.state === "ON" ? styles.on 
                    : data.state === "OFF" ? styles.off
                    : data.state === "WARNING" ? styles.warning
                    : data.state === "ERROR" ? styles.error 
                    : styles.off }`}></span>
            </section>

            

            <Handle // 도착점 
                className={styles.handle}
                type="target"
                position={Position.Left}
            /> 
        </div>
    )

}