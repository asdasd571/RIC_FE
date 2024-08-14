import React from "react";
import useTestStore from "../../store/useTestStore";
import Header from "../../components/Header/Header";
import Alarm from "../../components/Header/Alarm/Alarm";
import ProfileModal from "../../components/Header/ProfileModal/ProfileModal";
import RApp from "../RApps/RAppCard/RAppCard";
import SimpleCellChart from "../../components/Charts/SimpleCellChart";
import Charts from "../../components/Charts/Charts";

const Test: React.FC = () => {

    const {count, increment, decrement } = useTestStore();

    return(
        <div>
            <h2>Count : {count} </h2>
            <button onClick={increment}> Increment </button>
            <button onClick={decrement}> decrement </button>
            <ProfileModal/>
            {/* <SimpleCellChart/> */}
            {/* <Charts chartType="cell"/> */}
            {/* <Alarm/> */}
            {/* <RApp/> */}
            
        </div>
    )
}
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