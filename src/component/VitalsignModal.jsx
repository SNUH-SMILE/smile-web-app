import React, {useEffect, useState} from 'react';
import {Modal} from "react-bootstrap";
import Chart from "react-apexcharts"
import ApexCharts from 'apexcharts';
import styled from "styled-components";
const VitalButton = styled.button`
  height: 35px;
  background: ${props => props.show ?'#005580' : 'gray'};
  color: white;
  margin-right: 5px;
`
const VitalSpan = styled.span`
  font-size: 12px;
`
const vitalChart = {

    series: [
        {
            name: "수축기",
            type: "line",
            data: [118, 119, 121, 117, 118, 119, 122, 118, 119, 121, 117],
        },
        {
            name: "이완기",
            type: "line",
            data: [75, 76, 80, 77, 77, 75, 71, 75, 76, 80, 77]
        },
        {
            name: "심박수",
            type: "line",
            data: [34, 44, 54, 21, 12, 43, 33, 23, 66, 66, 58]
        },
        {
            name: "호흡수",
            type: "line",
            data: [44, 24, 34, 81, 22, 63, 31, 13, 16, 56, 38]
        },
        {
            name: "체온",
            type: "line",
            data: [74, 84, 94, 71, 82, 93, 73, 83, 96, 76, 88]
        },
        {
            name: "산소포화도",
            type: "line",
            data: [44, 55, 41, 67, 22, 43, 44, 55, 41, 67, 22],
        },
    ],
    options : {
        chart: {
            id:'vitalChart',
            height: 550,
            type: "line",
            toolbar: {
                show: false
            },
            animations: {
                enabled: false
            }
        },
        colors: ["#9CBAE3", "#646464", "#E73323", "#F4C243", "#A1CE63", "#67359A",],
        dataLabels: {
            enabled: false,
            //     enabledOnSeries: [0, 1, 2, 3, 4],
            //     style:{
            //         colors: ["#9CBAE3", "#646464", "#E73323", "#F4C243", "#A1CE63", "#67359A",],
            //     },
            //     background: {
            //         enabled: true,
            //         foreColor: '#fff',
            //         borderRadius: 2,
            //         padding: 4,
            //         opacity: 0.9,
            //         borderWidth: 1,
            //         borderColor: '#fff'
            //     },
        },
        stroke: {
            width: 3,
            curve: "straight",
        },
        title: {
            text: '',
            align: 'left'
        },
        plotOptions: {
            bar: {
                horizontal: false,
                borderRadius: 10
            },
        },
        fill: {
            //opacity: [0.85, 0.25, 1],
            gradient: {
                inverseColors: false,
                shade: "light",
                type: "vertical",
                opacityFrom: 0.85,
                opacityTo: 0.55,
                stops: [0, 100, 100, 100],
            },
        },
        xaxis: {
            categories: ["3/25", "3/26", "3/27", "3/28", "3/29", "3/30", "4/1", "4/2", "4/3", "4/4", "4/5"],
            title: {
                text: "",
            },
            //type: 'datetime'
        },
        yaxis: {
            title: {
                text: "",
            },
            min: 0,
            max: 150,
        },
        legend: {
            show: false,
            position: "top",
            // horizontalAlign: "middle",
            // floating: true,
            offsetY: -0,
            offsetX: -5,
            markers: {
                width: 5,
                height: 0,
            },
            formatter: function(seriesName, opts, idx) {
                var a = () => {
                    console.log('aaa')
                }
                console.log(seriesName)
                console.log(opts)
                console.log(idx)
                if(opts.seriesIndex === 0){
                    return (
                        "<div class='d-flex'>"
                        +"<div class='d-flex'>"
                        +"<button class='btn btn-sm p-0' style='height: 30px; background-color:#005580; color:white'>"
                        +'전체선택'
                        +"</button>"
                        + "</div>"
                        +"<div class='d-flex ms-3'>"
                        +"<button class='btn btn-sm p-0' style='height: 30px; background-color:#005580; color:white'>"
                        +"혈압"
                        +"</button>"
                        + "<div class='d-flex flex-column ms-1' style='height: 32px;'>"
                        +"<span><span style=' min-width: 5px; min-height: 5px; color:" +opts.w.config.colors[0]+"'>■</span>이완기</span>"
                        +"<span class='mt-1'><span style=' min-width: 5px; min-height: 5px; color:" +opts.w.config.colors[1]+"'>■</span>수축기</span>"
                        + "</div>"
                        + "</div>"
                        + "</div>"
                    )
                }
                else if( opts.seriesIndex === 1 ){
                    return null;

                }
                else if (opts.seriesIndex !== 1){
                    return (
                        `
                            <div class='d-flex'>
                                <button class='btn btn-sm p-0' style='height: 30px; background-color:#005580; color:white'
                                onclick="${a}">
                                    ${seriesName}
                                </button>
                                <div class='d-flex align-items-center ms-1'  style='height: 32px;'>
                                    <span style=' min-width: 5px; min-height: 5px; color:${opts.w.config.colors[opts.seriesIndex]}'>■</span>
                                </div>
                            </div>
                            `
                        // " <div class='d-flex'>"
                        // +"<button class='btn btn-sm p-0' style='height: 30px; background-color:#005580; color:white' ">"
                        // + seriesName
                        // +"</button>"
                        // + "<div class='d-flex align-items-center ms-1'  style='height: 32px;'>"
                        // +"<span style=' min-width: 5px; min-height: 5px; color:" +opts.w.config.colors[opts.seriesIndex]+"'>■</span>"
                        // + "</div>"
                        // + "</div>"
                    )
                }
                // +"<i class='bi bi-square-fill'></i>"

            },
            onItemClick:{
                // toggleDataSeries:false,
            },
            onItemHover:{
                highlightDataSeries:false
            }
        }
    }
}
function VitalsignModal({show, handledClose}) {


    const [vitalAllButton,setVitalAllButton] = useState(true)
    const [vitalButton,setVitalButton] = useState({
        bp:true,  //혈압
        pr:true,  // 심박수
        rr:true,  // 호흡
        bt:true,  // 체온
        sp:true,  // 산소포화도
    });
    useEffect(()=>{
        if(show){
            if(vitalAllButton){
                ApexCharts.exec('vitalChart', 'showSeries', '이완기')
                ApexCharts.exec('vitalChart', 'showSeries', '수축기')
                ApexCharts.exec('vitalChart', 'showSeries', '심박수')
                ApexCharts.exec('vitalChart', 'showSeries', '호흡수')
                ApexCharts.exec('vitalChart', 'showSeries', '산소포화도')
                ApexCharts.exec('vitalChart', 'showSeries', '체온')
            }
        }
        else{
            setVitalAllButton(true);
            setVitalButton({
                bp:true,  //혈압
                pr:true,  // 심박수
                rr:true,  // 호흡
                bt:true,  // 체온
                sp:true,  // 산소포화도
            })
        }

    },[show])

    useEffect(()=>{
        if(Object.keys(vitalButton).every(value => vitalButton[value])){
            setVitalAllButton(true);
        }
        else{
            setVitalAllButton(false);
        }
    },[vitalButton])
    function allSeries() {
        setVitalAllButton((prevState)=>{
            if(!prevState){
                ApexCharts.exec('vitalChart', 'showSeries', '이완기')
                ApexCharts.exec('vitalChart', 'showSeries', '수축기')
                ApexCharts.exec('vitalChart', 'showSeries', '심박수')
                ApexCharts.exec('vitalChart', 'showSeries', '호흡수')
                ApexCharts.exec('vitalChart', 'showSeries', '산소포화도')
                ApexCharts.exec('vitalChart', 'showSeries', '체온')
            }
            else{
                ApexCharts.exec('vitalChart', 'hideSeries', '이완기')
                ApexCharts.exec('vitalChart', 'hideSeries', '수축기')
                ApexCharts.exec('vitalChart', 'hideSeries', '심박수')
                ApexCharts.exec('vitalChart', 'hideSeries', '호흡수')
                ApexCharts.exec('vitalChart', 'hideSeries', '산소포화도')
                ApexCharts.exec('vitalChart', 'hideSeries', '체온')
            }
            return !prevState
        })
        setVitalButton(()=>({
            bp:!vitalAllButton,  //혈압
            pr:!vitalAllButton,  // 심박수
            rr:!vitalAllButton,  // 호흡
            bt:!vitalAllButton,  // 체온
            sp:!vitalAllButton,  // 산소포화도
        }))
    }
    function toggleSeries(e,seriesName) {
        const {name} = e.currentTarget
        setVitalButton((prevValue)=>({
            ...prevValue,
            [name]:!prevValue[name]
        }))
        if(seriesName==='혈압'){
            ApexCharts.exec('vitalChart', 'toggleSeries', '이완기')
            ApexCharts.exec('vitalChart', 'toggleSeries', '수축기')
        }
        else{
            ApexCharts.exec('vitalChart', 'toggleSeries', seriesName)
        }

    }
    return (
        <Modal show={show}
            onHide={handledClose}
               className={'VSdetailViewModal'}
               dialogClassName={'modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg'}
        >
            <Modal.Header closeButton>
                <div className="d-flex">
                    <div className="bts2 d-flex">
                        <span className="taste" title="미각"></span>
                        <span className="smell" title="후각"></span>
                    </div>
                    <h5 className="modal-title is-bar" id="VSdetailViewModal">홍길동/1호실</h5>
                </div>
                <div className="me-4 d-flex">
                    <span className="dtit">생년월일</span>
                    <strong className="dcon">1988-12-05 (33M)</strong>
                </div>
                <div className="me-4 d-flex">
                    <span className="dtit">환자번호</span>
                    <strong className="dcon">P99999999</strong>
                </div>
                <div className="me-4 d-flex">
                    <span className="dtit">연락처</span>
                    <strong className="dcon">01055556666</strong>
                </div>
            </Modal.Header>
            <Modal.Body>
                <div className="card inchart">
                    <div className='d-flex justify-content-around'>
                        <VitalButton className='btn btn-sm p-1' name='all' show={vitalAllButton}
                                onClick={allSeries}>
                            전체
                        </VitalButton>
                        <div className={'d-flex'}>
                            <VitalButton className='btn btn-sm p-1' name='bp' show={vitalButton.bp}
                                         onClick={(e)=>toggleSeries(e,'혈압')}>
                                혈압
                            </VitalButton>
                            <div className={'d-flex flex-column'}>
                                <VitalSpan><span style={{color:"#9CBAE3"}}>■</span>수축기</VitalSpan>
                                <VitalSpan><span style={{color:"#646464"}}>■</span>이완기</VitalSpan>
                            </div>
                        </div>
                        <div>
                            <VitalButton className='btn btn-sm p-1' name='pr' show={vitalButton.pr}
                                         onClick={(e)=>toggleSeries(e,'심박수')}>
                                심박수
                            </VitalButton>
                            <VitalSpan style={{color:"#E73323" }}>■</VitalSpan>
                        </div>
                        <div>
                            <VitalButton className='btn btn-sm p-1' name='rr' show={vitalButton.rr}
                                         onClick={(e)=>toggleSeries(e,'호흡수')}>
                                호흡수
                            </VitalButton>
                            <VitalSpan style={{color:"#F4C243"}}>■</VitalSpan>
                        </div>
                        <div>
                            <VitalButton className='btn btn-sm p-1' name='bt' show={vitalButton.bt}
                                         onClick={(e)=>toggleSeries(e,'체온')}>
                                체온
                            </VitalButton>
                            <VitalSpan style={{color:"#A1CE63"}}>■</VitalSpan>
                        </div>
                        <div>
                            <VitalButton className='btn btn-sm p-1' name='sp' show={vitalButton.sp}
                                         onClick={(e)=>toggleSeries(e,'산소포화도')}>
                                산소포화도
                            </VitalButton>
                            <VitalSpan style={{color:"#67359A"}}>■</VitalSpan>
                        </div>
                    </div>
                    <Chart
                        id={'vitalChart'}
                        options={vitalChart.options}
                        series={vitalChart.series}
                        type="bar"
                        width="100%"
                    />
                </div>
            </Modal.Body>
            <Modal.Footer>

            </Modal.Footer>
        </Modal>
    );
}

export default VitalsignModal;