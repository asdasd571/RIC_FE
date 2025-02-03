import React, { useState } from "react";
import useTestStore from "../../store/useTestStore";
import Header from "../../components/Header/Header";
import Alarm from "../../components/Header/Alarm/Alarm";
import ProfileModal from "../../components/Header/ProfileModal/ProfileModal";
import RApp from "../RApps/RAppCard/RAppCard";
import SimpleCellChart from "../../components/Charts/SimpleCellChart";
import Charts from "../../components/Charts/Charts";
import Sidebar from "../../components/Sidebar/Sidebar";
import defaultAxios from "../../apis/defaultAxios";
import { useQuery } from "@tanstack/react-query";
import { fetchCellSumData } from "../../apis/dashboardApi";
import DLSumPieChart from "../DashBoard/TopDLThroughput/DLSum";
import DMSettingModal from "../DM/DMModal/DMSettingModal";
import MapView from "../../components/MapView/MapView";
import SelectedViewMenu from "../../components/SelectedVeiwMenu/SelectedVeiwMenu";
import DLSumGagueChart from "../DashBoard/TopDLThroughput/DLSumGagueChart";

const Test: React.FC = () => {
  const { count, increment, decrement } = useTestStore();
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  return (
    <div style={{ width: "1000px", height: "1000px" }}>
      <DLSumGagueChart />
      {/* <MapView/> */}\ SelectedViewMenu
      {/* <SelectedViewMenu /> */}
      {/* <h2>Count : {count} </h2>
            <button onClick={increment}> Increment </button>
            <button onClick={decrement}> decrement </button> */}
      {/* <ProfileModal/> */}
      {/* <Sidebar/> */}
      {/* <DLSumPieChart/> */}
      {/* <SimpleCellChart/> */}
      {/* <Charts chartType="cell"/> */}
      {/* <Alarm/> */}
      {/* <RApp/> */}
      {/* <DMSettingModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}/> */}
    </div>
  );
};
export default Test;

//* props.를 사용하는 경우
// interface TestProps {
//     message: string;
//   }

//   const Test: React.FC<TestProps> = ({ message }) => {
//     return (
//       <div>
//         {message}
//       </div>
//     );
//   }

//* 상태를 사용하는 경우

// const Test: React.FC = () => {
//     const [count, setCount] = useState<number>(0);

//     return (
//       <div>
//         <p>Count: {count}</p>
//         <button onClick={() => setCount(count + 1)}>Increment</button>
//         <button onClick={() => setCount(count - 1)}>Decrement</button>
//       </div>
//     );
//   }
