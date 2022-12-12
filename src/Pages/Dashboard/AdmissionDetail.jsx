import React, { useContext, useEffect, useRef, useState} from 'react';
import UseSetPageTitle from "../../Utils/UseSetPageTitle";
import AdmissionDetailApi from "../../Apis/AdmissionDetailApi";
import {TitleContext} from "../../Providers/TitleContext";
import NoticeCard from "../../component/NoticeCard";
import RecordCard from "../../component/RecordCard";
import useAlert from "../../Utils/UseAlert";

function AdmissionDetail() {
    UseSetPageTitle('환자상세','Detail')

    const{alert,confirm} = useAlert();
    const {setDashBoardData} = useContext(TitleContext);
    const admissionDetailApi=new AdmissionDetailApi(localStorage.getItem('admissionId'));
    const [noticeList,setNoticeList] = useState([])
    const [recordList,setRecordList] = useState([])
    useEffect(()=>{
        collapseNoticeArea();
        admissionDetailApi.select().then(({data}) => {
            setDashBoardData(data.result.headerVO);
            setNoticeList(data.result.noticeVOList);
            setRecordList(data.result.recordVOList);
            console.log(data);
        });
    },[])

    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth();
    const day = today.getDate();
    const date = useState();

    const [noticeText,setNoticeText] = useState('');

    const maxLen = value => value.length <= 500;
    const maxLength = (e,validator,type)=>{
        const {value} = e.target;
        let willUpdate = true;
        if (typeof validator === "function") {
            willUpdate = validator(value);
        }
        if (willUpdate) {
            if(type =='record'){
                setRecord(value);
            }else{
                setNoticeText(value);
            }
        }
    };
    const addNotice = async () => {
        if(!noticeText){
            alert('알림 내용이 공백입니다.')
        }
        else{
            const confirmStatus = await confirm('알림을 생성하시겠습니까?');
            if(confirmStatus){
                admissionDetailApi.addNotice(noticeText,date).then(({data}) => {
                    if(data.code==='00'){
                        alert(data.message);
                        setNoticeList(data.result);
                        setNoticeText('');
                    }
                    else {
                        alert(data.message);
                    }
                });
            }
        }
    }

    const [record, setRecord] = useState('');
    const recordSave = async () => {
        let date = year + '-' + (("00"+month.toString()).slice(-2)) + '-' +(("00"+day.toString()).slice(-2));

        if (!record) {
            alert('작성 내용이 공백입니다.')
        } else {
            const confirmStatus = await confirm('기록을 생성하시겠습니까?');
            if (confirmStatus) {
                admissionDetailApi.addRecord(record,date).then(({data}) => {
                    if (data.code === '00') {
                        alert(data.message);
                        setRecordList(data.result);
                        setRecord('');
                    } else {
                        alert(data.message);
                    }
                });
            }
        }

    }
    const noticeArea = useRef();
    const collapseNoticeArea = ()=>{
        noticeArea.current.classList.toggle('toggled')

    }
    return (
        <main className="flex_layout_dashboard" style={{padding:"8px"}}>
            <div className="row history-alarm" ref={noticeArea}>
                <div className="col">
                    <div className="card indiv tab3">
                        <div className="header d-flex">
                            <ul className="nav nav-pills" id="pills-tab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link active" id="pills-tab1" data-bs-toggle="pill"
                                            data-bs-target="#pills-cont1" type="button" role="tab"
                                            aria-controls="pills-cont1" aria-selected="true">자가보고 증상
                                    </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="pills-tab2" data-bs-toggle="pill"
                                            data-bs-target="#pills-cont2" type="button" role="tab"
                                            aria-controls="pills-cont2" aria-selected="false">정신건강 설문
                                    </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="pills-tab3" data-bs-toggle="pill"
                                            data-bs-target="#pills-cont3" type="button" role="tab"
                                            aria-controls="pills-cont3" aria-selected="false">투약내역
                                    </button>
                                </li>
                            </ul>
                            <input type="date" className="form-control w130 ms-auto"/>
                        </div>
                        <div className="body">
                            <div className="tab-content" id="pills-tabContent">
                                <div className="tab-pane fade show active" id="pills-cont1" role="tabpanel"
                                     aria-labelledby="pills-tab1">문진...
                                </div>
                                <div className="tab-pane fade" id="pills-cont2" role="tabpanel"
                                     aria-labelledby="pills-tab2">증상...
                                </div>
                                <div className="tab-pane fade" id="pills-cont3" role="tabpanel"
                                     aria-labelledby="pills-tab3">정신...
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card indiv history">
                        <div className="header d-flex">
                            <h5 className="title">기록</h5>
                        </div>
                        <div className="body">
                            <ul className="scrollbar" role={'noticeList'}>
                                {recordList && recordList.map(value => {
                                    return(
                                        <RecordCard data={value} key={value.noticeSeq}/>
                                    )
                                })}
                            </ul>
                            <div className="footer">
                                <form>
                                <textarea className="form-control w-100"
                                          placeholder="텍스트를 입력해 주세요"
                                          value={record}
                                          onChange={(e)=>maxLength(e,maxLen,'record')}
                                />
                                    <div className="btn_wrap d-flex">
                                        <span className="byte"><strong>{record.length}</strong> / 500</span>
                                    </div>
                                </form>
                            </div>
                            <div className="btn-wrap">
                                <button type="button" className="btn btn-gr3">신규</button>
                                <button type="button" className="btn btn-pr3" onClick={recordSave}>저장</button>
                            </div>
                        </div>
                    </div>
                    <div className="card indiv alarm">
                        <div className="header d-flex">
                            <h5 className="title">알림 <span>발송</span></h5>
                            <button type="button" className="ms-auto btn-close" onClick={collapseNoticeArea}/>
                        </div>
                        <ul className="scrollbar" role={'noticeList'}>
                            {noticeList && noticeList.map(value => {
                                return(
                                    <NoticeCard data={value} key={value.noticeSeq}/>
                                )
                            })}
                        </ul>
                        <div className="footer">
                            <form>
                                <textarea className="form-control w-100"
                                          placeholder="텍스트를 입력해 주세요"
                                          value={noticeText}
                                          role={'noticeText'}
                                          onChange={(e)=>maxLength(e,maxLen,'notice')}
                                />
                                <div className="btn_wrap d-flex">
                                    <span className="byte"><strong>{noticeText.length}</strong> / 500</span>
                                    <button type="button" className="ms-auto btn btn-pr3" onClick={addNotice}>알림 전송</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default AdmissionDetail;