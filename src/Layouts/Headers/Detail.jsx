import React, {useState} from "react";
import {Badge} from "react-bootstrap";
import VitalsignModal from "../../component/VitalsignModal";
import styled from "styled-components";
import PropTypes from "prop-types";

const HealthSignal = styled.span`
  display: inline-block;
  margin: 0 2px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  overflow: hidden;
  background: ${props => props.value === 'Y' ? props.color : '#999'} !important;
`

const ButtonH34 = styled.button`
  height: 34px;
`

const RedSpan = styled.span`
  color: #ff2020 !important;
`

const BlueSpan = styled.span`
  color: #2094ff !important;
`

const MH83Li = styled.li`
  min-height: 83px;
`


const Detail = ({dashBoardData}) => {
    const [show, setShow] = useState(false);
    const showVitalsignModal = () => {
        setShow(true)
    }
    const hideVitalsignModal = () => {
        setShow(false)
    }
    const {recentResultInfo} = dashBoardData;
    return (
        <>
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
                        <div className="current-info" style={{marginTop: '5px'}}>
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
                        <div className="current-btn" style={{marginTop: '5px'}}>
                            {
                                dashBoardData.qantnDiv === '2' ?
                                    <ButtonH34 type="button" className="btn btn-primary">
                                        <strong>{dashBoardData.dispLocationInfo}</strong>
                                    </ButtonH34> : null
                            }
                            <ButtonH34 type="button" className="btn btn-exit">
                                <strong>{dashBoardData.qantnDiv === '2' ? '퇴소 / 전원관리' : '격리해제'}</strong>
                            </ButtonH34>
                        </div>
                        <div className={'current-info'} style={{marginTop: '5px'}}>

                            <table>
                                <tbody>
                                <tr>
                                    <th style={{margin: '3px'}}>
                                        <Badge className={'d-flex justify-content-center align-items-center'}
                                               bg="success"
                                               style={{
                                                   width: '60px',
                                                   height: '24px',
                                                   fontSize: '14px',
                                                   fontWeight: 'normal'
                                               }}>
                                            {dashBoardData.dispDschgeInfo}
                                        </Badge>
                                    </th>
                                    <td>{dashBoardData.dispAdmissionPeriodInfo}</td>
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
                                            <p>{recentResultInfo && recentResultInfo.bpResultDt}</p>
                                            <div>
                                                {recentResultInfo && recentResultInfo.sbpRiskGb === 'H'
                                                    ? <RedSpan>{recentResultInfo.sbpResult}</RedSpan>

                                                    : recentResultInfo && recentResultInfo.sbpRiskGb === 'L' ?
                                                        <BlueSpan>{recentResultInfo.sbpResult}</BlueSpan>
                                                        : <span>{recentResultInfo && recentResultInfo.sbpResult}</span>
                                                }
                                                <span> / </span>
                                                {recentResultInfo && recentResultInfo.dbpRiskGb === 'H'
                                                    ? <RedSpan>{recentResultInfo.dbpResult}</RedSpan>

                                                    : recentResultInfo && recentResultInfo.dbpRiskGb === 'L' ?
                                                        <BlueSpan>{recentResultInfo.dbpResult}</BlueSpan>
                                                        : <span>{recentResultInfo && recentResultInfo.dbpResult}</span>
                                                }
                                                <em> {recentResultInfo && recentResultInfo.bpUnit}</em>
                                            </div>
                                        </MH83Li>
                                        <MH83Li className="bl_2" onClick={showVitalsignModal}>
                                            <h2>심박수</h2>
                                            <p>{recentResultInfo && recentResultInfo.prResultDt}</p>
                                            <div>
                                                {recentResultInfo && recentResultInfo.prRiskGb === 'H'
                                                    ? <RedSpan>{recentResultInfo.prResult}</RedSpan>

                                                    : recentResultInfo && recentResultInfo.prRiskGb === 'L' ?
                                                        <BlueSpan>{recentResultInfo.prResult}</BlueSpan>
                                                        : <span>{recentResultInfo && recentResultInfo.prResult}</span>
                                                }
                                                <em> {recentResultInfo && recentResultInfo.prUnit}</em>
                                            </div>
                                        </MH83Li>
                                        <MH83Li className="bl_3" onClick={showVitalsignModal}>
                                            <h2>호흡수</h2>
                                            <p>{recentResultInfo && recentResultInfo.rrResultDt}</p>
                                            <div>
                                                {recentResultInfo && recentResultInfo.rrRiskGb === 'H'
                                                    ? <RedSpan>{recentResultInfo.rrResult}</RedSpan>

                                                    : recentResultInfo && recentResultInfo.rrRiskGb === 'L' ?
                                                        <BlueSpan>{recentResultInfo.rrResult}</BlueSpan>
                                                        : <span>{recentResultInfo && recentResultInfo.rrResult}</span>
                                                }
                                                <em> {recentResultInfo && recentResultInfo.rrUnit}</em>
                                            </div>
                                        </MH83Li>
                                        <MH83Li className="bl_4" onClick={showVitalsignModal}>
                                            <h2>체온</h2>
                                            <p>{recentResultInfo && recentResultInfo.btResultDt}</p>
                                            <div>
                                                {recentResultInfo && recentResultInfo.btRiskGb === 'H'
                                                    ? <RedSpan>{recentResultInfo.btResult}</RedSpan>

                                                    : recentResultInfo && recentResultInfo.btRiskGb === 'L' ?
                                                        <BlueSpan>{recentResultInfo.btResult}</BlueSpan>
                                                        : <span>{recentResultInfo && recentResultInfo.btResult}</span>
                                                }
                                                <em> {recentResultInfo && recentResultInfo.btUnit}</em>
                                            </div>
                                        </MH83Li>
                                        <MH83Li className="bl_5" onClick={showVitalsignModal}>
                                            <h2>산소포화도</h2>
                                            <p>{recentResultInfo && recentResultInfo.spResultDt}</p>
                                            <div>
                                                {recentResultInfo && recentResultInfo.spRiskGb === 'H'
                                                    ? <RedSpan>{recentResultInfo.spResult}</RedSpan>

                                                    : recentResultInfo && recentResultInfo.spRiskGb === 'L' ?
                                                        <BlueSpan>{recentResultInfo.spResult}</BlueSpan>
                                                        : <span>{recentResultInfo && recentResultInfo.spResult}</span>
                                                }
                                                <em> {recentResultInfo && recentResultInfo.spUnit}</em>
                                            </div>
                                        </MH83Li>
                                    </ul>
                                    <ul className="board_list">
                                        <li className="bg-none"/>
                                        <MH83Li className="bl_6 bg-none">
                                            <h2>걸음수</h2>
                                            <p>{recentResultInfo && recentResultInfo.stResultDt}</p>
                                            <div>
                                                {recentResultInfo && recentResultInfo.st1RiskGb === 'H'
                                                    ? <RedSpan>{recentResultInfo.st1Result}</RedSpan>

                                                    : recentResultInfo && recentResultInfo.st1RiskGb === 'L' ?
                                                        <BlueSpan>{recentResultInfo.st1Result}</BlueSpan>
                                                        : <span>{recentResultInfo && recentResultInfo.st1Result}</span>
                                                }
                                                <span> / </span>
                                                {recentResultInfo && recentResultInfo.st2RiskGb === 'H'
                                                    ? <RedSpan>{recentResultInfo.st2Result}</RedSpan>

                                                    : recentResultInfo && recentResultInfo.st2RiskGb === 'L' ?
                                                        <BlueSpan>{recentResultInfo.st2Result}</BlueSpan>
                                                        : <span>{recentResultInfo && recentResultInfo.st2Result}</span>
                                                }
                                                <em> {recentResultInfo && recentResultInfo.stUnit}</em>
                                            </div>
                                        </MH83Li>
                                        <MH83Li className="bl_7" onClick={showVitalsignModal}>
                                            <h2>수면</h2>
                                            <p>{recentResultInfo && recentResultInfo.sleepResultDt}</p>
                                            <div>
                                                {recentResultInfo && recentResultInfo.sleepRiskGb === 'H'
                                                    ? <RedSpan>{recentResultInfo.sleepResult}</RedSpan>

                                                    : recentResultInfo && recentResultInfo.sleepRiskGb === 'L' ?
                                                        <BlueSpan>{recentResultInfo.sleepResult}</BlueSpan>
                                                        :
                                                        <span>{recentResultInfo && recentResultInfo.sleepResult}</span>
                                                }
                                                <em> {recentResultInfo && recentResultInfo.sleepUnit}</em>
                                            </div>
                                        </MH83Li>
                                        <MH83Li className="bl_8" onClick={showVitalsignModal}>
                                            <h2>호흡기계 위험도</h2>
                                            <p>{recentResultInfo && recentResultInfo.respiratoryRiskResultDt}</p>
                                            <div>
                                                <span>{recentResultInfo && recentResultInfo.respiratoryRiskResult}</span>
                                                <em> {recentResultInfo && recentResultInfo.respiratoryRiskUnit}</em>
                                            </div>
                                        </MH83Li>
                                        <MH83Li className="bl_9" onClick={showVitalsignModal}>
                                            <h2>정신건강 위험도</h2>
                                            <p>{recentResultInfo && recentResultInfo.mentalRiskResultDt}</p>
                                            <div>
                                                <span>{recentResultInfo && recentResultInfo.mentalRiskResult}</span>
                                                <em> {recentResultInfo && recentResultInfo.mentalRiskUnit}</em>
                                            </div>
                                        </MH83Li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <VitalsignModal show={show} handledClose={hideVitalsignModal}/>
        </>
    )
}


Detail.prototype = {
    dashBoardData: PropTypes.object
}

export default Detail;