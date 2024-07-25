import { useNavigate  } from "react-router-dom";

// *네비게이션 커스텀 훅.


// type UseNavigatesReturn = {
//     goMain: () => void;
//     goStructure: () => void;
//     goRapp: () => void;
//     goFramework: () => void;
//     goXapp: () => void;
//     goPlatform: () => void;
//     goE2Node: () => void;
// }

const useNavigates = (): Record<string, ()=> void>  => {

    const navigate = useNavigate();


    //메인 페이지(Dashboard)
    const goMain = ():void => {
        navigate("/");
    }

    // 구조 페이지(structure)
    const goStructure = ():void =>{
        navigate("/structure");
    }

    // SMO/ OAM 페이지 
    const goSmoOam = ():void =>{
        navigate("/smo-oam");
    }

    // Non-RT rapp 페이지
    const goRapp = ():void => {
        navigate("/rapp");
    }

    // Non=RT framework 페이지
    const goFramework = ():void =>{
        navigate("/framework");
    }

    //Near-RT xapp 페이지
    const goXapp = ():void => {
        navigate("/xapp")
    }

    //Near-RT platform 페이지
    const goPlatform = ():void => {
        navigate("/platform")
    }

    const goE2Node = ():void => {
        navigate("/e2-node");
    }

    // 환경설정
    const goSetting = ():void => {
        navigate("/setting");
    }


    return {
            //메인 페이지(Dashboard)
        goMain,
        goStructure,
        goRapp,
        goFramework,
        goXapp,
        goPlatform,
        goE2Node,
        goSmoOam,
        goSetting,
    }

}


export default useNavigates;


/* // * 사용하는법 ! 
import React from "react";
import useNavigates from "./navigates";

const SomeComponent = () => {
    const { goAddPet } = useNavigates();

    return (
        <button onClick={goAddPet}>Add Pet</button>
    );
};

export default SomeComponent;


*/