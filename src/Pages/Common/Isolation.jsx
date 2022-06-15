import React, {useState} from 'react';
import Pagination from "../../component/Pagination";
import IsolationExitModal from "../../component/IsolationExitModal";
import IsolationSaveModal from "../../component/IsolationSaveModal";

function Isolation(props) {
    const [paginationObj, setPaginationObj] = useState({currentPageNo: 1, pageSize: 10, recordCountPerPage: 15})
    const [totalPageCount, setTotalPageCount] = useState(null);

    return (
        <>
            <main className="flex_layout_1row">
                <div className="row">
                    <div className="col col-lg-12">
                        <div className="card indiv">
                            <div className="card-content">
                                <div className="table-responsive">
                                    <div className="table-header">
                                        <form>
                                            <div className="d-flex">
                                                <div className="tbl_title">자택격리 환자 리스트</div>
                                                <div className="me-3 d-flex">
                                                    <span className="stit">환자ID</span>
                                                    <input className="form-control w160" type="text" value=""/>
                                                </div>
                                                <div className="me-1 d-flex">
                                                    <span className="stit">환자명</span>
                                                    <input className="form-control w160" type="text" value=""/>
                                                </div>
                                                <div className="ms-auto">
                                                    <div className="btn_wrap d-flex">
                                                        <button type="button" className="btn btn-gray">검색</button>
                                                        <button type="button" className="btn btn-white"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#selfIsolationInsertModal">신규
                                                        </button>
                                                        <button type="button" className="btn btn-ccolor"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#selfIsolationInsertModal">수정
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="table-body">
                                        <table className="table table-striped table-hover">
                                            <thead>
                                            <tr>
                                                <th>환자ID<a href="" className="sort up"></a></th>
                                                <th>환자명<a href="" className="sort down"></a></th>
                                                <th>격리시작일<a href="" className="sort"></a></th>
                                                <th>격리일수<a href="" className="sort"></a></th>
                                                <th>혈압</th>
                                                <th>맥박</th>
                                                <th>체온</th>
                                                <th>호흡</th>
                                                <th>산소포화도</th>
                                                <th>격리상태</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr className="baseline-up">
                                                <td>P000000001</td>
                                                <td>홍길동</td>
                                                <td>2022-05-19</td>
                                                <td>4</td>
                                                <td className="color">120/80</td>
                                                <td className="color">85</td>
                                                <td className="color">36.5</td>
                                                <td className="color">12</td>
                                                <td className="color">90</td>
                                                <td>
                                                    <button type="button" className="btn btn-exit">격리중</button>
                                                </td>
                                            </tr>
                                            <tr className="baseline-up">
                                                <td>P000000002</td>
                                                <td>홍길동</td>
                                                <td>2022-05-19</td>
                                                <td>5</td>
                                                <td className="color">120/80</td>
                                                <td className="color">85</td>
                                                <td className="color">36.5</td>
                                                <td className="color">12</td>
                                                <td className="color">90</td>
                                                <td>
                                                    <button type="button" className="btn btn-exit">격리중</button>
                                                </td>
                                            </tr>
                                            <tr className="baseline-down">
                                                <td>P000000003</td>
                                                <td>홍길동</td>
                                                <td>2022-05-19</td>
                                                <td>6</td>
                                                <td className="color">120/80</td>
                                                <td className="color">85</td>
                                                <td className="color">36.5</td>
                                                <td className="color">12</td>
                                                <td className="color">90</td>
                                                <td>
                                                    <button type="button" className="btn btn-exit-done">격리해제</button>
                                                </td>
                                            </tr>
                                            <tr className="baseline-down">
                                                <td>P000000004</td>
                                                <td>홍길동</td>
                                                <td>2022-05-19</td>
                                                <td>7</td>
                                                <td className="color">120/80</td>
                                                <td className="color">85</td>
                                                <td className="color">36.5</td>
                                                <td className="color">12</td>
                                                <td className="color">90</td>
                                                <td>
                                                    <button type="button" className="btn btn-exit-done">격리해제</button>
                                                </td>
                                            </tr>
                                            <tr className="baseline-up">
                                                <td>P000000001</td>
                                                <td>홍길동</td>
                                                <td>2022-05-19</td>
                                                <td>4</td>
                                                <td className="color">120/80</td>
                                                <td className="color">85</td>
                                                <td className="color">36.5</td>
                                                <td className="color">12</td>
                                                <td className="color">90</td>
                                                <td>
                                                    <button type="button" className="btn btn-exit">격리중</button>
                                                </td>
                                            </tr>
                                            <tr className="baseline-up">
                                                <td>P000000002</td>
                                                <td>홍길동</td>
                                                <td>2022-05-19</td>
                                                <td>5</td>
                                                <td className="color">120/80</td>
                                                <td className="color">85</td>
                                                <td className="color">36.5</td>
                                                <td className="color">12</td>
                                                <td className="color">90</td>
                                                <td>
                                                    <button type="button" className="btn btn-exit">격리중</button>
                                                </td>
                                            </tr>
                                            <tr className="baseline-down">
                                                <td>P000000003</td>
                                                <td>홍길동</td>
                                                <td>2022-05-19</td>
                                                <td>6</td>
                                                <td className="color">120/80</td>
                                                <td className="color">85</td>
                                                <td className="color">36.5</td>
                                                <td className="color">12</td>
                                                <td className="color">90</td>
                                                <td>
                                                    <button type="button" className="btn btn-exit-done">격리해제</button>
                                                </td>
                                            </tr>
                                            <tr className="baseline-down">
                                                <td>P000000004</td>
                                                <td>홍길동</td>
                                                <td>2022-05-19</td>
                                                <td>7</td>
                                                <td className="color">120/80</td>
                                                <td className="color">85</td>
                                                <td className="color">36.5</td>
                                                <td className="color">12</td>
                                                <td className="color">90</td>
                                                <td>
                                                    <button type="button" className="btn btn-exit-done">격리해제</button>
                                                </td>
                                            </tr>
                                            <tr className="baseline-down">
                                                <td>P000000003</td>
                                                <td>홍길동</td>
                                                <td>2022-05-19</td>
                                                <td>6</td>
                                                <td className="color">120/80</td>
                                                <td className="color">85</td>
                                                <td className="color">36.5</td>
                                                <td className="color">12</td>
                                                <td className="color">90</td>
                                                <td>
                                                    <button type="button" className="btn btn-exit-done">격리해제</button>
                                                </td>
                                            </tr>
                                            <tr className="baseline-down">
                                                <td>P000000004</td>
                                                <td>홍길동</td>
                                                <td>2022-05-19</td>
                                                <td>7</td>
                                                <td className="color">120/80</td>
                                                <td className="color">85</td>
                                                <td className="color">36.5</td>
                                                <td className="color">12</td>
                                                <td className="color">90</td>
                                                <td>
                                                    <button type="button" className="btn btn-exit-done">격리해제</button>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*페이징 start*/}
                <Pagination paginationObj={paginationObj} totalPageCount={totalPageCount}
                            handledList={setPaginationObj}/>
                {/*페이징 end*/}
            </main>
            <IsolationSaveModal />
            <IsolationExitModal />
        </>
    );
}

export default Isolation;