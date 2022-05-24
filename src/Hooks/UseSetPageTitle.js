import {useContext, useEffect} from "react";
import {TitleContext} from "../Providers/TitleContext";

/**
 * 헤더에 현재 페이지 타이틀 Mount 될때 표시
 * @param pageTitle 표시할 타이틀명
 */
function UseSetPageTitle(pageTitle) {
    const context = useContext(TitleContext);
    const {setTitle} = context;
    useEffect(()=>{
        setTitle(pageTitle);
    },[setTitle, pageTitle]);
}

export default UseSetPageTitle;