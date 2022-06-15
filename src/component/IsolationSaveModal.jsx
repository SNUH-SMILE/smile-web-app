import React from 'react';
import {Modal} from "react-bootstrap";

function IsolationSaveModal(props) {
    return (
        <Modal show={true}
            // onHide={() => handledClose()}
               className={'selfIsolationInsertModal'}
               dialogClassName={'modal-dialog modal-dialog-centered modal-dialog-scrollable'}
        >
            <Modal.Header closeButton>
                <h5 className="modal-title" id="selfIsolationInsertModal">자택격리자 등록</h5>
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
                                        <input className="form-control w-100" type="text" value="" readOnly/>
                                    </td>
                                </tr>
                                <tr>
                                    <th>환자ID</th>
                                    <td>
                                        <input className="form-control w-100" type="text" value="" readOnly/>
                                    </td>
                                </tr>
                                <tr>
                                    <th>이름</th>
                                    <td>
                                        <input className="form-control w-100" type="text" required/>
                                    </td>
                                </tr>
                                <tr>
                                    <th>생년월일</th>
                                    <td>
                                        <input className="form-control w-100 date" type="date" required/>
                                    </td>
                                </tr>
                                <tr>
                                    <th>성별</th>
                                    <td>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="gender" id="gender1"
                                                   value="남자"/>
                                                <label className="form-check-label" htmlFor="gender1">남자</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="gender" id="gender2"
                                                   value="여자"/>
                                                <label className="form-check-label" htmlFor="gender2">여자</label>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>연락처</th>
                                    <td>
                                        <input className="form-control w-100" type="text" required/>
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
                                        <input className="form-control w-100" type="text" required/>
                                    </td>
                                </tr>
                                <tr>
                                    <th>시작일</th>
                                    <td>
                                        <input className="form-control w-100 date" type="date" required/>
                                    </td>
                                </tr>
                                <tr>
                                    <th>종료예정일</th>
                                    <td>
                                        <input className="form-control w-100 date" type="date" required/>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button type="button" className="btn btn-pr4">등록</button>
            </Modal.Footer>
        </Modal>
    );
}

export default IsolationSaveModal;