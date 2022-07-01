import React, {useEffect, useState} from "react";
import {getLonginUserInfo} from "../../Apis/CommonCode";
import styled from "styled-components";

const BlackOption = styled.option`
  color: #333;
`

const Dashboard = ({mode, data, dashBoardFunc}) => {
    const [selectValue, setSelectValue] = useState('')
    const [centers, setCenters] = useState([]);
    useEffect(() => {
        if (mode === 'Center') {
            getLonginUserInfo().then(({data}) => {
                setCenters(data.result.userTreatmentCenterVOList)
            })
        }
    }, [])
    useEffect(() => {
        centers && centers.length > 0 && setSelectValue(centers[0].centerId)
    }, [centers])
    const handledSelect = (e) => {
        setSelectValue(e.target.value)
    }
    return (

        <div className="current">
            <div className="d-flex mb-2">
                <span className="today me-3" style={{minWidth: '90px'}}>{data.searchDateInfo}</span>
                {mode === 'Center' &&
                    <>
                        <span className="dash"/>
                        {centers && centers.length > 0 ?
                            <select className="form-select w-auto d-inline bg-none"
                                    style={{minWidth: '112px'}}
                                    value={selectValue}
                                    onChange={(e) => {
                                        handledSelect(e);
                                        dashBoardFunc(e);
                                    }}
                            >
                                <BlackOption value={''}>선택</BlackOption>
                                {centers.map(value => {
                                    return (<BlackOption key={value.centerId}
                                                         value={value.centerId}>{value.centerNm}</BlackOption>)
                                })}
                            </select>
                            : <select className="form-select w-auto d-inline bg-none"
                                      style={{minWidth: '112px'}}
                                      onChange={(e) => dashBoardFunc(e)}
                            >
                                <BlackOption value={''}>선택</BlackOption>
                            </select>
                        }
                    </>
                }
            </div>
            <div className="d-flex justify-content-between align-items-end">
                <div className="d-flex align-items-end">
                    <h2 className="me-4">{mode === 'Center' ? data.dashboardTitle : '자택격리자 현황판'}</h2>
                    <div className="d-flex mb-1 inwon">
                        <div>
                            <span>전체</span> {data.totalCount} 명
                        </div>
                        <div><span>{mode === 'Center' ? '입소' : '격리'}</span> {data.todayAdmissionCount} 명</div>
                        <div><span>{mode === 'Center' ? '퇴소' : '해제'}</span> {data.todayDischargeCount} 명</div>
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
    )
}

export default Dashboard;