import React, { useContext, useEffect, useRef, useState,createRef} from 'react';
import UseSetPageTitle from "../../Utils/UseSetPageTitle";
import AdmissionDetailApi from "../../Apis/AdmissionDetailApi";
import {TitleContext} from "../../Providers/TitleContext";
import NoticeCard from "../../component/NoticeCard";
import RecordCard from "../../component/RecordCard";
import useAlert from "../../Utils/UseAlert";
import admissionApi from "../../Apis/AdmissionApi";

function AdmissionDetail() {
    UseSetPageTitle('환자상세','Detail')

    const{alert,confirm} = useAlert();
    const {setDashBoardData} = useContext(TitleContext);
    const val =['val01','val02','val03','val04','val05','val06','val07','val08','val09','val10','val11','val12',];
    const admissionDetailApi=new AdmissionDetailApi(localStorage.getItem('admissionId'));
    const [noticeList,setNoticeList] = useState([])
    const [recordList,setRecordList] = useState([])
    useEffect(()=>{
        collapseNoticeArea();
        test();

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

    const [interviews, setInterviews] = useState();
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
    const test = async () =>{
        admissionDetailApi.test().then(({data}) => {
            setInterviews(data.result);
            console.log(data.result);
        })
    }
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
                                <div className="scrollbar" role={'recordList'} style={{overflow:"auto",height:"560px"}}>
                                    <div className="tab-pane fade show active" id="pills-cont1" role="tabpanel"
                                         aria-labelledby="pills-tab1">

                                    {interviews && interviews.map((it,idx)=>(
                                        <div ket={idx} className="interview">
                                            <h2>{it.interviewTitle}</h2>
                                            <table>
                                                <tbody>
                                                {Object.values(it.interviewContents).filter(i=>i.interCategori.substring(0,1)=='1').map((content, i) => (
                                                  <>
                                                      <tr style={{fontSize: "17px"}}>
                                                        <td>{content.interNo}.</td>
                                                        <td>{content.interContent}</td>
                                                     </tr>
                                                     <tr style={{fontSize: "13px"}}>{/*type에 따라 inputbox(13), radio(10), checkbox(11)로 표현 */}

                                                        { content.interType == '13'?
                                                            <td colSpan="2">
                                                                <input type="text" className="form-control" defaultValue={content.answerValue || null} readOnly></input>

                                                            </td>
                                                            : content.interType =='10' ?
                                                                <td colSpan="2">
                                                                    {val.map((name,idx) =>
                                                                      <> {content[name] &&
                                                                          <input className="form-check-input" type="radio" name={content.interseq} id={content.interseq} checked={content.answerValue == (idx)} readOnly></input>}
                                                                         {content[name] && <label className="form-check-label" htmlFor={content.interseq} readOnly>{content[name]}</label>}
                                                                      </>
                                                                    )}
                                                                </td>
                                                                :
                                                                <td colSpan="2">
                                                                    {val.map((name,idx) =>
                                                                        <>
                                                                        {content[name] &&  <input type="checkbox" id={content.interseq+idx.toString()} checked={(content.answerValue.split(',').filter(i=>i == idx)>0)} className="form-check-input" readOnly/>}
                                                                        {content[name] &&   <label className="form-check-label" > {content[name]}</label> }
                                                                        </>
                                                                    )}
                                                                </td>
                                                        }
                                                    </tr>
                                                  </>
                                                ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    ))}
                               {/*

                                <div className="tab-pane fade" id="pills-cont3" role="tabpanel"
                                     aria-labelledby="pills-tab3">정신...
                                </div>*/}
                                    </div>
                                    <div className="tab-pane fade" id="pills-cont2" role="tabpanel"
                                         aria-labelledby="pills-tab2">증상...

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="card indiv history">
                        <div className="header d-flex">
                            <h5 className="title">기록</h5>
                        </div>
                        <div className="body">
                            <ul className="scrollbar" role={'recordList'}>
                                {recordList && recordList.map((value,idx) => {
                                    return(
                                        <RecordCard data={value} key={idx}/>
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