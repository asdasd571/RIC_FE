
import { Handle, Position, type Node, type NodeProps } from '@xyflow/react';
import { useCallback } from "react";
import styles from "./CustomNode.module.scss";
import '@xyflow/react/dist/style.css';

export type CustomNodeData = {
    label: string,  // 데이터 
    type?: string // 'input' : source만 , 'output' : target만 있다. 중에 있음. 없으면 둘다.
}; // 노드에 전달할 데이터
export type CustomNodeType = Node<CustomNodeData, 'CustomNodeType'>; // Node<노드 데이터타입, 노드 type명

//! 기본으로 사용할 노드 디자인 
export default function CustomNode({ data }: NodeProps<CustomNodeType>) {

    // 핸들을 조건부로 렌더링하는 함수
    const renderHandles = () => {
        if (data.type === 'input') {
        return (
            <Handle
                className={styles.handle}
                type="source"
                position={Position.Right}
            />
        );
        }

        if (data.type === 'output') {
        return (
            <Handle
                className={styles.handle}
                type="target"
                position={Position.Left}
            />
        );
        }

        return (
        <>
            <Handle
                className={styles.handle}
                type="source"
                position={Position.Right}
            />
            <Handle
                className={styles.handle}
                type="target"
                position={Position.Left}
                
            />
        </>
        );
    };
    return(
        <div className={styles.container}> {/* 기본 노드 스타일 적용 */}
            {/* 출발, 도착점 */}
            {/* 핸들 렌더링 */}
            {renderHandles()}


            <section className={styles.contents_container}>
                <div className={styles.description}>{data.label}</div>
            </section>

            


        </div>
    )

}