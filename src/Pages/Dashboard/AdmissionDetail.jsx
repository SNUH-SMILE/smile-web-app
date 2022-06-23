import React, {useContext, useEffect, useRef, useState} from 'react';
import UseSetPageTitle from "../../Utils/UseSetPageTitle";
import AdmissionDetailApi from "../../Apis/AdmissionDetailApi";
import {TitleContext} from "../../Providers/TitleContext";
import NoticeCard from "../../component/NoticeCard";
import useAlert from "../../Utils/UseAlert";

function AdmissionDetail() {
    UseSetPageTitle('환자상세','Detail')

    const{alert,confirm} = useAlert();
    const {setDashBoardData} = useContext(TitleContext);
    const admissionDetailApi=new AdmissionDetailApi(localStorage.getItem('admissionId'));
    const [noticeList,setNoticeList] = useState([])
    useEffect(()=>{
        admissionDetailApi.select().then(({data}) => {
            console.log(data);
            setDashBoardData(data.result.headerVO);
            setNoticeList(data.result.noticeVOList);
        });
    },[])

    const [noticeText,setNoticeText] = useState('');

    const maxLen = value => value.length <= 500;
    const maxLength = (e,validator)=>{
        const {value} = e.target;
        let willUpdate = true;
        if (typeof validator === "function") {
            willUpdate = validator(value);
        }
        if (willUpdate) {
            setNoticeText(value);
        }
    };
    const addNotice = async () => {
        if(!noticeText){
            alert('알림 내용이 공백입니다.')
        }
        else{
            const confirmStatus = await confirm('알림을 생성하시겠습니까?');
            if(confirmStatus){
                admissionDetailApi.addNotice(noticeText).then(({data}) => {
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

    return (
        <main className="flex_layout_dashboard" style={{padding:"8px"}}>
            <div className="row history-alarm">
                <div className="col">
                    <div className="card indiv tab3">
                        <div className="header d-flex">
                            <ul className="nav nav-pills" id="pills-tab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link active" id="pills-tab1" data-bs-toggle="pill"
                                            data-bs-target="#pills-cont1" type="button" role="tab"
                                            aria-controls="pills-cont1" aria-selected="true">문진
                                    </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="pills-tab2" data-bs-toggle="pill"
                                            data-bs-target="#pills-cont2" type="button" role="tab"
                                            aria-controls="pills-cont2" aria-selected="false">증상
                                    </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="pills-tab3" data-bs-toggle="pill"
                                            data-bs-target="#pills-cont3" type="button" role="tab"
                                            aria-controls="pills-cont3" aria-selected="false">정신
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
                            <input type="datetime-local" className="form-control w200 ms-auto"/>
                        </div>
                        <div className="body">
                                <textarea className="form-control w-100" defaultValue={
                                    '네, 오늘 아침 공기는 다소 쌀쌀하게 느껴지기도 했었는데요.\n' +
                                    '낮으로 들어서면서 포근한 봄기운이 가득합니다.\n' +
                                    '오늘도 내륙 지역을 중심으로는 일교차가 크겠습니다.\n' +
                                    '오늘 낮 최고 기온 서울은 20도까지 오르면서, 예년 이맘때 봄날씨가 이어지겠고요.\n' +
                                    '포근하겠습니다. 하지만, 해가지면 공기는 다시 금세 서늘해지겠고요.\n' +
                                    '아침과 낮의 기온 변화가 많게는 20도 가까이 차이가 나는 지역도 있겠습니다.\n' +
                                    '입고 벗기 쉬운 외투 하나 챙겨 주시고요.\n' +
                                    '건강 관리에 힘써 주시길 바랍니다.\n' +
                                    '연일 맑은 날씨가 이어지면서 대기의 건조함은 더 심해지고 있습니다.'
                                }>

                                </textarea>
                            <div className="btn-wrap">
                                <button type="button" className="btn btn-gr3">신규</button>
                                <button type="button" className="btn btn-pr3">저장</button>
                            </div>
                        </div>
                    </div>
                    <div className="card indiv alarm">
                        <div className="header d-flex">
                            <h5 className="title">알림 <span>발송</span></h5>
                            <button type="button" className="ms-auto btn-close"/>
                        </div>
                        <ul className="scrollbar">
                        {/*
                           <li>
                                <div className="msg">
                                    금일 문진작성이 진해되지 않았습니다.
                                    문진을 작성해주세요. 금일 문진작성이
                                    진해되지 않았습니다.
                                </div>
                                <div className="from d-flex">
                                    <span>관리자</span>
                                    <span className="ms-auto">2021-12-07 00:00:00</span>
                                </div>
                            </li>
                            */}
                            {noticeList.map(value => {
                                return(
                                    <NoticeCard data={value} key={value.noticeSeq}/>
                                    // <li key={value.noticeSeq} tabIndex={-1}>
                                    //     <div className="msg">
                                    //         {value.notice}
                                    //     </div>
                                    //     <div className="from d-flex">
                                    //         <span>{value.regNm}</span>
                                    //         <span className="ms-auto">{value.regDt}</span>
                                    //     </div>
                                    // </li>
                                )
                            })}
                        </ul>
                        <div className="footer">
                            <form>
                                <textarea className="form-control w-100" placeholder="텍스트를 입력해 주세요" value={noticeText} onChange={(e)=>maxLength(e,maxLen)}/>
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