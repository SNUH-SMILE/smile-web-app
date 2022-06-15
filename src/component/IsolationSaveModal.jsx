import React, {useEffect, useRef, useState} from 'react';
import {Modal} from "react-bootstrap";
import {convertDate} from "../Utils/common";

function IsolationSaveModal({isolationSaveModalObj, handledClose}) {
    const admissionId = useRef();
    const patientId = useRef();
    const patientNm = useRef();
    const birthDate = useRef();
    const [sex, setSex] = useState(isolationSaveModalObj.data.sex);
    const cellPhone = useRef();
    const admissionDate = useRef();
    const dschgeSchdldDate = useRef();
    const personCharge = useRef();

    const saveData = {
        admissionId: admissionId,
        patientId: patientId,
        patientNm: patientNm,
        birthDate: birthDate,
        sex: sex,
        cellPhone: cellPhone,
        admissionDate: admissionDate,
        dschgeSchdldDate: dschgeSchdldDate,
        personCharge: personCharge,
    }

    useEffect(()=>{
        setSex(isolationSaveModalObj.data.sex);
    },[isolationSaveModalObj])
    return (
        <Modal show={isolationSaveModalObj.show}
               onHide={() => handledClose()}
               className={'selfIsolationInsertModal'}
               dialogClassName={'modal-dialog modal-dialog-centered modal-dialog-scrollable'}
        >
            <Modal.Header closeButton>
                <h5 className="modal-title"
                    id="selfIsolationInsertModal">{isolationSaveModalObj.admissionId === '' ? '자택격리자 등록' : '자택격리자 수정'}</h5>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col col-lg-6">
                        <div className="table-responsive">
                            <table className="table table-borderless mt-3">
                                <tbody>
                                <tr>
                                    <th>입소내역ID</th>
                                    <td>
                                        <input className="form-control w-100"
                                               type="text"
                                               ref={admissionId}
                                               defaultValue={isolationSaveModalObj.data.admissionId}
                                               readOnly/>
                                    </td>
                                </tr>
                                <tr>
                                    <th>환자ID</th>
                                    <td>
                                        <input className="form-control w-100"
                                               type="text"
                                               ref={patientId}
                                               defaultValue={isolationSaveModalObj.data.patientId}
                                               readOnly/>
                                    </td>
                                </tr>
                                <tr>
                                    <th>이름</th>
                                    <td>
                                        <input className="form-control w-100"
                                               type="text"
                                               ref={patientNm}
                                               defaultValue={isolationSaveModalObj.data.patientNm}
                                               required/>
                                    </td>
                                </tr>
                                <tr>
                                    <th>생년월일</th>
                                    <td>
                                        <input className="form-control w-100 date" type="date"
                                               ref={birthDate}
                                               defaultValue={isolationSaveModalObj.data.birthDate && convertDate(isolationSaveModalObj.data.birthDate)}
                                               required/>
                                    </td>
                                </tr>
                                <tr>
                                    <th>성별</th>
                                    <td>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="gender" id="gender1"
                                                   defaultChecked={isolationSaveModalObj.data.sex === 'M'}
                                                   onClick={() => setSex('M')}

                                            />
                                            <label className="form-check-label" htmlFor="gender1">남자</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="gender" id="gender2"
                                                   onClick={() => setSex('F')}
                                                   defaultChecked={isolationSaveModalObj.data.sex === 'F'}/>
                                            <label className="form-check-label" htmlFor="gender2">여자</label>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>연락처</th>
                                    <td>
                                        <input className="form-control w-100" type="text" ref={cellPhone}
                                               defaultValue={isolationSaveModalObj.data.cellPhone} required/>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col col-lg-6">
                        <div className="table-responsive">
                            <table className="table table-borderless mt-3">
                                <tbody>
                                <tr>
                                    <th>담당자</th>
                                    <td>
                                        <input className="form-control w-100" type="text" ref={personCharge}
                                               defaultValue={isolationSaveModalObj.data.personCharge} required/>
                                    </td>
                                </tr>
                                <tr>
                                    <th>시작일</th>
                                    <td>
                                        <input className="form-control w-100 date" type="date" ref={admissionDate}
                                               defaultValue={isolationSaveModalObj.data.admissionDate && convertDate(isolationSaveModalObj.data.admissionDate)}
                                               required/>
                                    </td>
                                </tr>
                                <tr>
                                    <th>종료예정일</th>
                                    <td>
                                        <input className="form-control w-100 date" type="date" ref={dschgeSchdldDate}
                                               defaultValue={
                                                   isolationSaveModalObj.data.dschgeSchdldDate &&
                                                   convertDate(isolationSaveModalObj.data.dschgeSchdldDate)}
                                               required/>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button type="button" className="btn btn-pr4" onClick={()=>isolationSaveModalObj.confirmFunc(saveData)}>등록</button>
            </Modal.Footer>
        </Modal>
    );
}

export default React.memo(IsolationSaveModal);