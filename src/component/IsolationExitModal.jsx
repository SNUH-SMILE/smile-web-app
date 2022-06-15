import React, {useEffect, useRef} from 'react';
import {Modal} from "react-bootstrap";
import getToday from "../Utils/common";

function IsolationExitModal({isolationExitModalObj, handledClose}) {
    const todayInput = useRef()
    useEffect(()=>{
        if(isolationExitModalObj.show){
            todayInput.current.value= getToday();
        }
    },[isolationExitModalObj.show])
    return (
        <Modal show={isolationExitModalObj.show}
            onHide={() => handledClose()}
               className={'selfIsolationExitModal'}
               dialogClassName={'modal-dialog modal-dialog-centered modal-dialog-scrollable'}
        >
            <Modal.Header closeButton>
                <h5 className="modal-title" id="selfIsolationExitModal">자택격리자 퇴소</h5>
            </Modal.Header>
            <Modal.Body>
                <div className="table-responsive">
                    <table className="table table-borderless mt-3">
                        <tbody>
                        <tr>
                            <th>입소내역ID</th>
                            <td>
                                <input className="form-control w-100" type="text"
                                       defaultValue={isolationExitModalObj.data.admissionId} readOnly
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>환자ID</th>
                            <td>
                                <input className="form-control w-100" type="text"
                                       defaultValue={isolationExitModalObj.data.patientId} readOnly/>
                            </td>
                        </tr>
                        <tr>
                            <th>이름</th>
                            <td>
                                <input className="form-control w-100" type="text"
                                       defaultValue={isolationExitModalObj.data.patientNm} readOnly/>
                            </td>
                        </tr>
                        <tr>
                            <th>퇴소일자</th>
                            <td>
                                {/*오늘날짜 기본 셋팅*/}
                                <input className="form-control w-100 date" type="date" defaultValue="" ref={todayInput} required/>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button type="button" className="btn btn-pr4">격리해제</button>
            </Modal.Footer>
        </Modal>
    );
}

export default React.memo(IsolationExitModal);