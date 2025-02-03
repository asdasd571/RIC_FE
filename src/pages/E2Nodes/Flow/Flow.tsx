import { useState, useCallback, useMemo, useEffect } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  EdgeChange,
  NodeChange,
  type Node,
  type Edge,
  type Connection,
  addEdge,
  Position,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import StateNode from "./StateNode";
import ValueNode from "./ValueNode";
import { useQuery } from "@tanstack/react-query";
import { fetchRicInfoData } from "../../../apis/dashboardApi";
import { CSSProperties } from "styled-components";
import CustomNode from "./CustomNode";
import { FlowTestData } from "./FlowTestData";
import defaultAxios from "../../../apis/defaultAxios";

// ! flow 차트 그리는 컴포넌트입니다.

// 공통 스타일 정의
const commonNodeStyle: CSSProperties = {
  width: "150px",
  height: "38px",
  padding: "2px",
  fontSize: "12px",
  backgroundColor: "#ffffff",
  border: "1px solid transparent",
  borderRadius: "3px",
  textAlign: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  boxShadow: "0px 4px 10px 2px rgba(0, 0, 0, 0.15)",

  backgroundImage:
    "linear-gradient(#fff, #fff), linear-gradient(0deg, #FFDEE9 0%, #B5FFFC 100%)",
  backgroundOrigin: "border-box",
  backgroundClip: "content-box, border-box",
};

// * 임시 노드 데이터
const initialNodes: Node[] = [
  {
    id: "ManagedElement",
    data: { label: "ManagedElement", type: "input" },
    position: { x: 0, y: 100 },
    type: "customNodeType",
    sourcePosition: Position.Right, // 소스 연결점은 오른쪽 (출발점)
    // targetPosition: Position.Left,   // 타겟 연결점은 왼쪽 (도착점)
  },
  {
    id: "GnbDuFunction",
    data: { label: "GnbDuFunction" },
    position: { x: 200, y: 0 },
    sourcePosition: Position.Right, // 소스 연결점은 오른쪽 (출발점)
    targetPosition: Position.Left, // 타겟 연결점은 왼쪽 (도착점)
    type: "customNodeType",
  },
  {
    id: "GnbCuCpFunction1",
    data: { label: "GnbCuCpFunction1" },
    position: { x: 200, y: 100 },
    sourcePosition: Position.Right, // 소스 연결점은 오른쪽 (출발점)
    targetPosition: Position.Left, // 타겟 연결점은 왼쪽 (도착점)
    type: "customNodeType",
  },
  {
    id: "GnbCuUpFunction2",
    data: { label: "GnbCuUpFunction2", type: "output" },
    position: { x: 200, y: 200 },
    sourcePosition: Position.Right, // 소스 연결점은 오른쪽 (출발점)
    targetPosition: Position.Left, // 타겟 연결점은 왼쪽 (도착점)
    type: "customNodeType",
  },

  // * 레벨3
  {
    id: "NrCellDu1",
    data: { label: "NrCellDu1" },
    position: { x: 400, y: 0 },
    sourcePosition: Position.Right, // 소스 연결점은 오른쪽 (출발점)
    targetPosition: Position.Left, // 타겟 연결점은 왼쪽 (도착점)
    type: "customNodeType",
  },
  {
    id: "NrCellDu2",
    data: { label: "NrCellDu2", type: "output" },
    position: { x: 400, y: 50 },
    sourcePosition: Position.Right, // 소스 연결점은 오른쪽 (출발점)
    targetPosition: Position.Left, // 타겟 연결점은 왼쪽 (도착점)
    type: "customNodeType",
  },

  {
    id: "NrCellCu1",
    data: { label: "NrCellCu1" },
    position: { x: 400, y: 100 },
    sourcePosition: Position.Right, // 소스 연결점은 오른쪽 (출발점)
    targetPosition: Position.Left, // 타겟 연결점은 왼쪽 (도착점)
    type: "customNodeType",
  },
  {
    id: "NrCellCu2",
    data: { label: "NrCellCu2", type: "output" },
    position: { x: 400, y: 150 },
    sourcePosition: Position.Right, // 소스 연결점은 오른쪽 (출발점)
    targetPosition: Position.Left, // 타겟 연결점은 왼쪽 (도착점)
    type: "customNodeType",
  },

  {
    id: "EnergySaving",
    type: "stateNodeType", // * 사용자 지정 상태 표시 타입
    data: { label: "EnergySaving", state: true }, // false 값을 넘겨준다. (사용자 지정 데이터)
    position: { x: 600, y: 0 },
    targetPosition: Position.Left,
  },
  // {
  //     id: 'EnergySaving',
  //     data: { label: 'EnergySaving' },
  //     position: { x: 600, y: 0 },
  //     // sourcePosition: Position.Right,  // 소스 연결점은 오른쪽 (출발점)
  //     targetPosition: Position.Left,   // 타겟 연결점은 왼쪽 (도착점)
  //     type: 'output'
  // },
  {
    id: "TxPower",
    data: { label: "TxPower", value: 123 },
    position: { x: 600, y: 100 },
    // sourcePosition: Position.Right,  // 소스 연결점은 오른쪽 (출발점)
    targetPosition: Position.Left, // 타겟 연결점은 왼쪽 (도착점)
    type: "valueNodeType", // '받는' 노드 타입
  },
];

//* 임시  edge 데이터
const initialEdges: Edge[] = [
  {
    id: "1-1",
    source: "ManagedElement",
    target: "GnbDuFunction",
    type: "step",
    animated: true, // 선 애니메이션 효과
  },
  {
    id: "1-2",
    source: "ManagedElement",
    target: "GnbCuCpFunction1",
    type: "step",
    animated: true, // 선 애니메이션 효과
  },
  {
    id: "1-3",
    source: "ManagedElement",
    target: "GnbCuUpFunction2",
    type: "step",
    animated: true, // 선 애니메이션 효과
  },

  {
    id: "2-1",
    source: "GnbDuFunction",
    target: "NrCellDu1",
    type: "step",
    animated: true, // 선 애니메이션 효과
  },
  {
    id: "2-2",
    source: "GnbDuFunction",
    target: "NrCellDu2",
    type: "step",
    animated: true, // 선 애니메이션 효과
  },

  {
    id: "2-3",
    source: "GnbCuCpFunction1",
    target: "NrCellCu1",
    type: "step",
    animated: true, // 선 애니메이션 효과
  },
  {
    id: "2-4",
    source: "GnbCuCpFunction1",
    target: "NrCellCu2",
    type: "step",
    animated: true, // 선 애니메이션 효과
  },

  {
    id: "3-1",
    source: "NrCellDu1",
    target: "EnergySaving",
    type: "step",
    animated: true, // 선 애니메이션 효과
  },

  {
    id: "3-2",
    source: "NrCellCu1",
    target: "TxPower",
    type: "step",
    animated: true, // 선 애니메이션 효과
  },
];

function Flow() {
  const nodeTypes = useMemo(
    () => ({
      stateNodeType: StateNode,
      valueNodeType: ValueNode,
      customNodeType: CustomNode,
    }),
    []
  );

  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  // * 노드 드래그 이동, edge 추가 가능하게 하는 부분 ---//
  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    []
  );
  // * 노드 드래그 이동, edge 추가 가능하게 하는 부분 ---//

  // todo : 추후 실제 API로 연동.
  //* API 요청 --------------------------------------------//
  interface RicInfoType {
    value: string;
    name: string;
    state: "OFF" | "ON" | "ERROR" | "WARNING"; // 상태는 고정된 문자열이므로 Union 타입으로 정의
    description: string; // value에 대한 설명
  }

  // * API 데이터 관련 =================================== //
  const getE2NodesDatas = async () => {
    try {
      const response = await defaultAxios.get(`http://localhost:8080/e2node`);
      return response.data;
    } catch (error) {
      console.error("오류 발생!", error);
    }
  };

  useEffect(() => {
    getE2NodesDatas();
  });

  // * useQuery로 실시간 데이터 패칭
  // ( 동일한 queryKey를 사용하면, 다른 페이지나 컴포넌트에서 useQuery를 호출해도 새로운 요청을 보내지 않고, React-query가 캐시된 데이터를 반환함.)
  const { data: e2NodesDatas } = useQuery({
    queryKey: ["e2NodesDatas"], // 쿼리 키
    queryFn: getE2NodesDatas,
    refetchInterval: 1000,
    // enabled : false // 현재 페이지에서 다시 요청하지 않고, 캐시된 데이터만 사용학 싶다면 해당 옵션.
  });
  //* ==================================================== //

  return (
    <div style={{ height: "100%" }}>
      {/* <ReactFlow
                nodeTypes={nodeTypes}
                nodes={nodes}
                // onNodesChange={onNodesChange} // 노드 드래그시 이동 
                edges={edges}
                // onEdgesChange={onEdgesChange} // edge 드래그시 생성 
                // onConnect={onConnect} // 노드를 edge 드래그로 연결할 수 있게 함
                minZoom={0.2} // 최소 줌
                maxZoom={4} // 최대 줌
                fitView // 반응형? 꽉차게 보여줌.
                
            > */}
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={(e2NodesDatas?.Node as Node[]) || nodes}
        // onNodesChange={onNodesChange} // 노드 드래그시 이동
        edges={(e2NodesDatas?.Edge as Edge[]) || edges}
        // onEdgesChange={onEdgesChange} // edge 드래그시 생성
        // onConnect={onConnect} // 노드를 edge 드래그로 연결할 수 있게 함
        minZoom={0.2} // 최소 줌
        maxZoom={4} // 최대 줌
        fitView // 반응형? 꽉차게 보여줌.
      >
        {/* 배경 */}
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default Flow;
