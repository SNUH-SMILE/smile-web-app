import React, {useContext, useEffect, useState} from 'react';
import PropTypes from "prop-types";
import {TitleContext} from "../Providers/TitleContext";
import AuthenticationApi from "../Apis/AuthenticationApi";
import {useNavigate} from "react-router-dom";
import useAlert from "../Utils/UseAlert";
import {getLonginUserInfo} from "../Apis/CommonCode";
import styled from "styled-components";

const BlackOption = styled.option`
  color: #333;
`

const CommonHeader = ({handledSideBar, title, handledLogOut}) => {
    return (
        <nav className="page-head">
            <button type="button" id="menu-toggle" onClick={handledSideBar}/>
            <h2 className="page-title" role={'pageTitle'}>{title}</h2>
            <button className="logout" onClick={handledLogOut}>
                <span>로그아웃</span>
                <i/>
            </button>
        </nav>
    )
}

const DashboardHeader = ({handledSideBar, title, handledLogOut, mode, data, dashBoardFunc}) => {
    const [centers,setCenters] = useState([]);
    // const [scrollPosition, setScrollPosition] = useState(0);
    // const updateScroll = () => {
    //     setScrollPosition(document.querySelector('#page-content-wrapper').scrollTop);
    // }

    useEffect(()=>{
        // document.querySelector('#page-content-wrapper').addEventListener('scroll', updateScroll);
        if(mode==='Center'){
            getLonginUserInfo().then(({data}) => setCenters(data.result.userTreatmentCenterVOList));
        }
    },[])
    return (
        // <nav className="page-head dashboard_head" style={scrollPosition>0?{height:'171px',zIndex:1, position:'sticky',top:'0'}:{}}>
        <nav className="page-head dashboard_head" >
            <button type="button" id="menu-toggle" onClick={handledSideBar}/>
            <h2 className="page-title">{title}</h2>
            <button className="logout" onClick={handledLogOut}>
                <span>로그아웃</span>
                <i/>
            </button>
            <div className="current">
                <div className="d-flex mb-2">
                    <span className="today me-3">{data.searchDateInfo}</span>
                    {mode==='Center' &&
                        <>
                            <span className="dash"/>
                            <select className="form-select w-auto d-inline bg-none" onChange={(e)=>dashBoardFunc(e)}>
                                {centers.map(value => {
                                    return (<BlackOption key={value.centerId} value={value.centerId}>{value.centerNm}</BlackOption>)
                                })}
                            </select>
                        </>
                    }
                </div>
                <div className="d-flex justify-content-between align-items-end">
                    <div className="d-flex align-items-end">
                        <h2 className="me-4">{mode==='Center'?data.dashboardTitle:'자택격리자 현황판'}</h2>
                        <div className="d-flex mb-1 inwon">
                            <div>
                                <span>전체</span> {data.totalCount} 명
                            </div>
                            <div><span>{mode==='Center'? '입소' : '격리'}</span> {data.todayAdmissionCount} 명</div>
                            <div><span>{mode==='Center'? '퇴소' : '해제'}</span> {data.todayDischargeCount} 명</div>
                        </div>
                        <div className="d-flex mb-1 bts">
                            <span className="basic"><i/> 기본</span>
                            <span className="taste"><i/> 미각</span>
                            <span className="smell"><i/> 후각</span>
                        </div>
                    </div>
                    <div className="dashboard_head-text">
                        <ul>
                            <li><strong>혈압</strong>mmHg</li>
                            <li><strong>심박수</strong>BPM</li>
                            <li><strong>호흡수</strong>회/분</li>
                            <li><strong>체온</strong>℃</li>
                            <li><strong>산소포화도</strong>%</li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}

function Header({wrapper, interval, setHide}) {
    const {confirm} = useAlert();

    // 로그아웃시 로그인 페이지로 이동하기 위해 선언
    const navigate = useNavigate()

    // 로그아웃
    const handledLogOut = async () => {
        let confirmState = await confirm('로그아웃 하시겠습니까?');
        if (confirmState) {
            AuthenticationApi.logOut().then(() => {
                localStorage.setItem('Authorization', null);
                clearInterval(interval);
                setHide(false);
                navigate('/');
            });
        }
    }

    // 사이드바 Collapse 토글
    const context = useContext(TitleContext);
    const {title,mode, dashBoardData, dashBoardFunc} = context;
    const handledSideBar = () => {
        wrapper.current.classList.toggle('toggled');
    }
    return (
        mode !== 'Center' && mode !== 'Quarantine' ?
            // 공통
            <CommonHeader handledSideBar={handledSideBar} title={title} handledLogOut={handledLogOut}/>
            :
            // 대쉬보드
            <DashboardHeader handledSideBar={handledSideBar} title={title} handledLogOut={handledLogOut}
                             mode={mode} data={dashBoardData} dashBoardFunc={dashBoardFunc}/>
    );
}

Header.propTypes = {
    wrapper: PropTypes.object.isRequired,
    interval: PropTypes.number,
    setHide: PropTypes.func.isRequired
}
export default React.memo(Header);
