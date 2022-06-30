import React, {useContext, useEffect, useRef, useState} from 'react';
import PropTypes from "prop-types";
import {TitleContext} from "../Providers/TitleContext";
import AuthenticationApi from "../Apis/AuthenticationApi";
import {useNavigate} from "react-router-dom";
import useAlert from "../Utils/UseAlert";
import {getLonginUserInfo} from "../Apis/CommonCode";
import styled from "styled-components";
import {Badge} from "react-bootstrap";
import VitalsignModal from "../component/VitalsignModal";

const BlackOption = styled.option`
  color: #333;
`

const ButtonH34 = styled.button`
  height: 34px;
`

const RedSpan = styled.span`
  color:#ff2020 !important;
`

const BlueSpan = styled.span`
  color:#2094ff !important;
`

const MH83Li = styled.li`
  min-height: 83px;
`

const HealthSignal = styled.span`
  display: inline-block;
  margin: 0 2px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  overflow: hidden;
  background: ${props => props.value === 'Y' ? props.color : '#999'}!important;
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
    const [selectValue,setSelectValue] = useState('')
    const [centers,setCenters] = useState([]);
    // const [scrollPosition, setScrollPosition] = useState(0);
    // const updateScroll = () => {
    //     setScrollPosition(document.querySelector('#page-content-wrapper').scrollTop);
    // }
    useEffect(()=>{
        // document.querySelector('#page-content-wrapper').addEventListener('scroll', updateScroll);
        if(mode==='Center'){
            getLonginUserInfo().then(({data}) => {
                setCenters(data.result.userTreatmentCenterVOList)
            })
        }
    },[])
    useEffect(()=>{
        centers&&centers.length>0 && setSelectValue(centers[0].centerId)
    },[centers])
    const handledSelect = (e)=>{
        setSelectValue(e.target.value)
    }
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
                    <span className="today me-3" style={{minWidth:'90px'}}>{data.searchDateInfo}</span>
                    {mode==='Center' &&
                        <>
                            <span className="dash"/>
                            {centers&&centers.length>0?
                            <select className="form-select w-auto d-inline bg-none"
                                    style={{minWidth:'112px'}}
                                    value={selectValue}
                                    onChange={(e)=> {
                                        handledSelect(e);
                                        dashBoardFunc(e);
                                    }}
                            >
                                <BlackOption value={''}>선택</BlackOption>
                                {centers.map(value => {
                                    return (<BlackOption key={value.centerId} value={value.centerId}>{value.centerNm}</BlackOption>)
                                })}
                            </select>
                                :<select className="form-select w-auto d-inline bg-none"
                                         style={{minWidth:'112px'}}
                                         onChange={(e)=>dashBoardFunc(e)}
                                >
                                    <BlackOption value={''}>선택</BlackOption>
                                </select>
                            }
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

const DetailHeader = ({title,handledSideBar,handledLogOut,dashBoardData, dashBoardFunc})=>{
    const [show, setShow] = useState(false);
    const showVitalsignModal = ()=>{
        setShow(true)
    }
    const hideVitalsignModal = ()=>{
        setShow(false)
    }
    const {recentResultInfo} = dashBoardData;
    return(
        <>
        <nav className="page-head dashboard_head dashboard_head-detail">
            <button type="button" id="menu-toggle" onClick={handledSideBar}/>
            <h2 className="page-title">{title}</h2>
            <button className="logout" onClick={handledLogOut}>
                <span>로그아웃</span>
                <i/>
            </button>
            <div className="dashboard-info">
                <div className="row">
                    <div className="col col-4 d-flex flex-column justify-content-start">
                        <div className="current-head">
                            <div className="bts2 is-tooltip d-flex">
                                {/*<HealthSignal value={dashBoardData ?'N':dashBoardData.healthSignalVO.signal1Yn} color={'#3ed06f'}/>*/}
                                <HealthSignal value={dashBoardData.healthSignalVO?.signal1Yn} color={'#3ed06f'}/>
                                {/*<HealthSignal value={dashBoardData ?'N':dashBoardData.healthSignalVO.signal2Yn} color={'#d03e3e'}/>*/}
                                <HealthSignal value={dashBoardData.healthSignalVO?.signal2Yn} color={'#d03e3e'}/>
                            </div>
                            <h2 className="me-3">{dashBoardData.patientNm}</h2>
                            <span>{dashBoardData.dispNameDetailInfo}</span>
                        </div>
                        <div className="current-info" style={{marginTop:'5px'}}>
                            <table>
                                <tbody>
                                <tr>
                                    <th>생년월일</th>
                                    <td>{dashBoardData.dispBirthDateInfo}</td>
                                </tr>
                                <tr>
                                    <th>환자번호</th>
                                    <td>{dashBoardData.patientId}</td>
                                </tr>
                                <tr>
                                    <th>연락처</th>
                                    <td>{dashBoardData.dispCellPhoneInfo}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="current-btn" style={{marginTop:'5px'}}>
                            {
                                dashBoardData.qantnDiv === '2' ?
                                <ButtonH34 type="button" className="btn btn-primary">
                                    <strong>{dashBoardData.dispLocationInfo }</strong>
                                </ButtonH34> :null
                            }
                            <ButtonH34 type="button" className="btn btn-exit">
                                <strong>{dashBoardData.qantnDiv === '2' ? '퇴소 / 전원관리' : '격리해제'}</strong>
                            </ButtonH34>
                        </div>
                        <div className={'current-info'}style={{marginTop:'5px'}}>

                            <table>
                                <tbody>
                                <tr>
                                    <th style={{margin:'3px'}}>
                                        <Badge className={'d-flex justify-content-center align-items-center'} bg="success"
                                               style={{width:'60px', height:'24px', fontSize:'14px', fontWeight:'normal'}}>
                                            {dashBoardData.dispDschgeInfo}
                                        </Badge>
                                    </th>
                                    <td>{dashBoardData.dispAdmissionPeriodInfo }</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col col-8">
                        <div className="row">
                            <div className="col col-lg-12 mt05">
                                <div className="card indiv">
                                    <ul className="board_list">
                                        <MH83Li className="bl_1" onClick={showVitalsignModal}>
                                            <h2>혈압</h2>
                                            <p>{recentResultInfo&&recentResultInfo.bpResultDt}</p>
                                            <div>
                                                {recentResultInfo&&recentResultInfo.sbpRiskGb  === 'H'
                                                    ? <RedSpan>{recentResultInfo.sbpResult }</RedSpan>

                                                    :recentResultInfo&&recentResultInfo.sbpRiskGb  === 'L'?
                                                        <BlueSpan>{ recentResultInfo.sbpResult }</BlueSpan>
                                                        :<span >{ recentResultInfo&&recentResultInfo.sbpResult }</span>
                                                }
                                                <span> / </span>
                                                {recentResultInfo&&recentResultInfo.dbpRiskGb  === 'H'
                                                    ? <RedSpan>{ recentResultInfo.dbpResult }</RedSpan>

                                                    :recentResultInfo&&recentResultInfo.dbpRiskGb  === 'L'?
                                                        <BlueSpan>{ recentResultInfo.dbpResult }</BlueSpan>
                                                        :<span >{ recentResultInfo&&recentResultInfo.dbpResult }</span>
                                                }
                                                <em> {recentResultInfo&&recentResultInfo.bpUnit}</em>
                                            </div>
                                        </MH83Li>
                                        <MH83Li className="bl_2" onClick={showVitalsignModal}>
                                            <h2>심박수</h2>
                                            <p>{recentResultInfo&&recentResultInfo.prResultDt}</p>
                                            <div>
                                                {recentResultInfo&&recentResultInfo.prRiskGb  === 'H'
                                                    ? <RedSpan>{ recentResultInfo.prResult }</RedSpan>

                                                    :recentResultInfo&&recentResultInfo.prRiskGb  === 'L'?
                                                        <BlueSpan>{ recentResultInfo.prResult }</BlueSpan>
                                                        :<span >{ recentResultInfo&&recentResultInfo.prResult }</span>
                                                }
                                                <em> {recentResultInfo&&recentResultInfo.prUnit}</em>
                                            </div>
                                        </MH83Li>
                                        <MH83Li className="bl_3" onClick={showVitalsignModal}>
                                            <h2>호흡수</h2>
                                            <p>{recentResultInfo&&recentResultInfo.rrResultDt}</p>
                                            <div>
                                            {recentResultInfo&&recentResultInfo.rrRiskGb  === 'H'
                                                ? <RedSpan>{ recentResultInfo.rrResult }</RedSpan>

                                                :recentResultInfo&&recentResultInfo.rrRiskGb  === 'L'?
                                                    <BlueSpan>{ recentResultInfo.rrResult }</BlueSpan>
                                                    :<span >{ recentResultInfo&&recentResultInfo.rrResult }</span>
                                            }
                                            <em> {recentResultInfo&&recentResultInfo.rrUnit}</em>
                                            </div>
                                        </MH83Li>
                                        <MH83Li className="bl_4" onClick={showVitalsignModal}>
                                            <h2>체온</h2>
                                            <p>{recentResultInfo&&recentResultInfo.btResultDt}</p>
                                            <div>
                                                {recentResultInfo&&recentResultInfo.btRiskGb  === 'H'
                                                    ? <RedSpan>{ recentResultInfo.btResult }</RedSpan>

                                                    :recentResultInfo&&recentResultInfo.btRiskGb  === 'L'?
                                                        <BlueSpan>{ recentResultInfo.btResult }</BlueSpan>
                                                        :<span >{ recentResultInfo&&recentResultInfo.btResult }</span>
                                                }
                                                <em> {recentResultInfo&&recentResultInfo.btUnit}</em>
                                            </div>
                                        </MH83Li>
                                        <MH83Li className="bl_5" onClick={showVitalsignModal}>
                                            <h2>산소포화도</h2>
                                            <p>{recentResultInfo&&recentResultInfo.spResultDt}</p>
                                            <div>
                                                {recentResultInfo&&recentResultInfo.spRiskGb  === 'H'
                                                    ? <RedSpan>{ recentResultInfo.spResult }</RedSpan>

                                                    :recentResultInfo&&recentResultInfo.spRiskGb  === 'L'?
                                                        <BlueSpan>{ recentResultInfo.spResult }</BlueSpan>
                                                        :<span >{ recentResultInfo&&recentResultInfo.spResult }</span>
                                                }
                                                <em> {recentResultInfo&&recentResultInfo.spUnit}</em>
                                            </div>
                                        </MH83Li>
                                    </ul>
                                    <ul className="board_list">
                                        <li className="bg-none"/>
                                        <MH83Li className="bl_6 bg-none">
                                            <h2>걸음수</h2>
                                            <p>{recentResultInfo&&recentResultInfo.stResultDt}</p>
                                            <div>
                                                {recentResultInfo&&recentResultInfo.st1RiskGb  === 'H'
                                                    ? <RedSpan>{recentResultInfo.st1Result }</RedSpan>

                                                    :recentResultInfo&&recentResultInfo.st1RiskGb  === 'L'?
                                                        <BlueSpan>{ recentResultInfo.st1Result }</BlueSpan>
                                                        :<span >{ recentResultInfo&&recentResultInfo.st1Result }</span>
                                                }
                                                <span> / </span>
                                                {recentResultInfo&&recentResultInfo.st2RiskGb  === 'H'
                                                    ? <RedSpan>{ recentResultInfo.st2Result }</RedSpan>

                                                    :recentResultInfo&&recentResultInfo.st2RiskGb  === 'L'?
                                                        <BlueSpan>{ recentResultInfo.st2Result }</BlueSpan>
                                                        :<span >{ recentResultInfo&&recentResultInfo.st2Result }</span>
                                                }
                                                <em> {recentResultInfo&&recentResultInfo.stUnit}</em>
                                            </div>
                                        </MH83Li>
                                        <MH83Li className="bl_7" onClick={showVitalsignModal}>
                                            <h2>수면</h2>
                                            <p>{recentResultInfo&&recentResultInfo.sleepResultDt}</p>
                                            <div>
                                                {recentResultInfo&&recentResultInfo.sleepRiskGb  === 'H'
                                                    ? <RedSpan>{ recentResultInfo.sleepResult }</RedSpan>

                                                    :recentResultInfo&&recentResultInfo.sleepRiskGb  === 'L'?
                                                        <BlueSpan>{ recentResultInfo.sleepResult }</BlueSpan>
                                                        :<span >{ recentResultInfo&&recentResultInfo.sleepResult }</span>
                                                }
                                                <em> {recentResultInfo&&recentResultInfo.sleepUnit}</em>
                                            </div>
                                        </MH83Li>
                                        <MH83Li className="bl_8" onClick={showVitalsignModal}>
                                            <h2>호흡기계 위험도</h2>
                                            <p>{recentResultInfo&&recentResultInfo.respiratoryRiskResultDt}</p>
                                            <div>
                                                <span >{ recentResultInfo&&recentResultInfo.respiratoryRiskResult }</span>
                                                <em> {recentResultInfo&&recentResultInfo.respiratoryRiskUnit}</em>
                                            </div>
                                        </MH83Li>
                                        <MH83Li className="bl_9" onClick={showVitalsignModal}>
                                            <h2>정신건강 위험도</h2>
                                            <p>{recentResultInfo&&recentResultInfo.mentalRiskResultDt}</p>
                                            <div>
                                                <span >{ recentResultInfo&&recentResultInfo.mentalRiskResult }</span>
                                                <em> {recentResultInfo&&recentResultInfo.mentalRiskUnit}</em>
                                            </div>
                                        </MH83Li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
            <VitalsignModal show={show} handledClose={hideVitalsignModal} />
        </>
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
                localStorage.setItem('admissionId', null);
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
        mode === 'Detail' ?
            <DetailHeader handledSideBar={handledSideBar} title={title} handledLogOut={handledLogOut}
                          dashBoardData={dashBoardData} />
            :
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
    setHide: PropTypes.func.isRequired,
}

DetailHeader.prototype ={
  dashBoardData:PropTypes.object
}
DetailHeader.defaultProps  ={
    dashBoardData:{
        recentResultInfo:{
            admissionId: '',
            sbpResult: '',
            dbpResult: '',
            sbpRiskGb: '',
            dbpRiskGb: '',
            bpResultDt: '123123',
            bpUnit: '',
            prResult: '',
            prRiskGb: '',
            prResultDt: '',
            prUnit: '',
            btResult: '',
            btRiskGb: '',
            btResultDt: '',
            btUnit: '',
            st1Result: '',
            st2Result: '',
            st1RiskGb: '',
            st2RiskGb: '',
            stResultDt: '',
            stUnit: '',
            rrResult: '',
            rrRiskGb: '',
            rrResultDt: '',
            rrUnit: '',
            spResult: '',
            spRiskGb: '',
            spResultDt: '',
            spUnit: '',
            sleepResult: '',
            sleepDt: '',
            sleepUnit: '',
            respiratoryRiskResult: '',
            respiratoryRiskResultDt: '',
            respiratoryRiskUnit: '',
            mentalRiskResult: '',
            mentalRiskResultDt: '',
            mentalRiskUnit: ''
        },
        patientId: '',
        patientNm: '',
        age:0,
        birthDate :'',
        sex:'M',
        sexNm:'',
        cellPhone:'',
        qantnDiv:' ',
        centerId:'',
        centerNm:'',
        room:'',
        roomNm:'',
        admissionDate:'',
        dschgeSchdldDate:'',
        dschgeDate:'',
        dschgeYn:' ',
        dispCellPhoneInfo:'',
        dispNameDetailInfo:'',
        dispBirthDateInfo:'',
        dispLocationInfo:'',
        dispAdmissionPeriodInfo:' ',
        dispDschgeInfo:' ',
    }
}
export default React.memo(Header);
