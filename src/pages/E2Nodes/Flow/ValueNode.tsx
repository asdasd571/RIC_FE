// ! 값를 나타내는 노드. (ExPower 등.)
import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import { useCallback } from "react";
import styles from "./ValueNode.module.scss";

export type ValueNodeData = { label: string; value: number }; // 노드에 전달할 데이터
export type ValueNodeType = Node<ValueNodeData, "valueNodeType">; // Node<노드 데이터타입, 노드 type명

export default function ValueNode({ data }: NodeProps<ValueNodeType>) {
  return (
    <div className={styles.container}>
      {" "}
      {/* 기본 노드 스타일 적용 */}
      {/* 출발, 도착점 */}
      {/* <Handle // * 출발 
                type="source"
                position={Position.Left}
                id="a"
            /> */}
      <section className={styles.contents_container}>
        <div className={styles.description}>{data.label}</div>
        <div className={styles.value}>{data.value}</div>
      </section>
      <Handle // 도착점
        className={styles.handle}
        type="target"
        position={Position.Left}
      />
    </div>
  );
}
