import React, {useEffect, useRef, useState} from 'react';
import { Modal } from "react-bootstrap";
import InterviewList from "./InterviewList";

function LocationModal({ locationModal, handledClose }) {
    const test =
        [{
        'admissionId' : "0000000079",
        'cdata': null,
        'infDiv' :null,
        'infDivNm' : "체온상승",
        'message': "체온상승 예측 알고리름 id=0000000079 & 일자=2023-01-10 & 생체데이터=  호흡   데이터가 없습니다."
          }
        ]
    const [inference , setInference] = useState([]);
    useEffect(() =>{
        setInference(locationModal.data);

    })
    return(
        <Modal show={locationModal.show}
               onHide={() => handledClose()}
               className={'locationModal'}
               dialogClassName={'modal-dialog modal-dialog-centered modal-dialog-scrollable'}
        >
            <Modal.Header closeButton>
                <Modal.Title>이*민/자택격리자</Modal.Title>
                <span className="divideLine">|</span>
                <span className="modalSubTitle">생년월일</span>
                <span className='headerText'>1988-08-17 (35/F)</span>
                <span className="modalSubTitle">환자번호</span>
                <span className='headerText'>P000000155</span>
                <span className="modalSubTitle">연락처</span>
                <span className='headerText'>010****7393</span>
            </Modal.Header>
            <Modal.Body>
                <div className="dateContainer">
                    <span className="inputLabel">측정일</span>
                    <input className="form-control date inputWidth" type="date" />     
                </div>
                <div className="table-responsive" style={{height:'600px',overflow :"scroll"}}>
                    <table className="table table-borderless mt-3 alignCenter tHeader">
                        <thead>
                            <tr>
                                <th>측정 시간</th>
                                <th>위도</th>
                                <th>경도</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inference.length >0 && inference.map((value,idx)=>(
                                <tr>
                                    <td>{value.cdate}</td>
                                    <td>{value.infDivNm}</td>
                                    <td>{value.message.substring(value.message.lastIndexOf('=')+1)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Modal.Body>

        </Modal>
    )
}
export default React.memo(LocationModal);