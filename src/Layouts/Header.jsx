import React, {useCallback, useContext} from 'react';
import PropTypes from "prop-types";
import {TitleContext} from "../Providers/TitleContext";
import AuthenticationApi from "../Apis/AuthenticationApi";
import {useNavigate} from "react-router-dom";
import useAlert from "../Utils/UseAlert";
import Dashboard from "./Headers/Dashboard";
import Common from "../Utils/common";
import Detail from "./Headers/Detail";


function Header({wrapper, interval, setHide}) {
    const {confirm} = useAlert();

    // 로그아웃시 로그인 페이지로 이동하기 위해 선언
    const navigate = useNavigate()

    // 로그아웃
    const handledLogOut = useCallback(async () => {
        let confirmState = await confirm('로그아웃 하시겠습니까?');
        if (confirmState) {
            AuthenticationApi.logOut().then(() => {
                localStorage.setItem('Authorization', null);
                localStorage.setItem('lvl', null);
                localStorage.setItem('admissionId', null);
                clearInterval(interval);
                setHide(false);
                navigate('/');
            });
        }
    },[])



    // 사이드바 Collapse 토글
    const context = useContext(TitleContext);
    const {title,mode, dashBoardData, dashBoardFunc} = context;

    const handledSideBar = useCallback(() => {
        wrapper.current.classList.toggle('toggled');
    },[])
    return (
        <nav className={mode === 'Common' ? 'page-head' : mode === 'Detail' ? 'page-head dashboard_head dashboard_head-detail' : 'page-head dashboard_head'}>
            <button type="button" id="menu-toggle" onClick={handledSideBar}/>
            <h2 className="page-title" role={'pageTitle'}>{title}</h2>
            <button className="logout" onClick={handledLogOut}>
                <span>로그아웃</span>
                <i/>
            </button>
            {mode === 'Common' ? null : mode === 'Detail' ? <Detail dashBoardData={dashBoardData}/> : <Dashboard mode={mode} data={dashBoardData} dashBoardFunc={dashBoardFunc}/> }
        </nav>


    );
}

Header.propTypes = {
    wrapper: PropTypes.object.isRequired,
    interval: PropTypes.number,
    setHide: PropTypes.func.isRequired,
}


export default React.memo(Header);
