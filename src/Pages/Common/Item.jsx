import React, {useContext, useEffect, useRef, useState} from 'react';
import UseSetPageTitle from "../../Utils/UseSetPageTitle";

function Item() {
    // 헤더에 페이지 타이틀 설정
    UseSetPageTitle('측정항목 관리');

    return (
        <main className="flex_layout_2col">
            <div className="row">
                <div className="col col-lg-8">
                    <div className="card indiv">
                        <div className="card-content">
                            <div className="table-responsive">
                                <div className="table-header">
                                    <form>
                                        <div className="d-flex clear">
                                            <div className="tbl_title">측정항목 리스트</div>
                                            <div className="me-3 d-flex">
                                                <span className="stit">측정항목ID</span>
                                                <input className="form-control w120" type="text" value="" />
                                            </div>
                                            <div className="me-1 d-flex">
                                                <span className="stit">측정항목명</span>
                                                <input className="form-control w120" type="text" maxLength="50" />
                                            </div>
                                            <div className="ms-auto btn_wrap">
                                                <button type="button" className="btn btn-gray">검색</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="table-body">
                                    <table id="table-c" className="table table-striped table-hover text-expert">
                                        <thead>
                                        <tr>
                                            <th>측정항목ID</th>
                                            <th>측정항목명</th>
                                            <th>단위</th>
                                            <th>참고치-From</th>
                                            <th>참고치-To</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td className="mid">admin</td>
                                            <td className="mname">관리자</td>
                                            <td className="munit">단위</td>
                                            <td className="mfrom">123</td>
                                            <td className="mto">123</td>
                                        </tr>
                                        <tr>
                                            <td className="mid">dev</td>
                                            <td className="mname">roqkfwk</td>
                                            <td className="munit">단위</td>
                                            <td className="mfrom">123</td>
                                            <td className="mto">123</td>
                                        </tr>
                                        <tr>
                                            <td className="mid">admin</td>
                                            <td className="mname">관리자</td>
                                            <td className="munit">단위</td>
                                            <td className="mfrom">123</td>
                                            <td className="mto">123</td>
                                        </tr>
                                        <tr>
                                            <td className="mid">dev</td>
                                            <td className="mname">roqkfwk</td>
                                            <td className="munit">단위</td>
                                            <td className="mfrom">123</td>
                                            <td className="mto">123</td>
                                        </tr>
                                        <tr>
                                            <td className="mid">admin</td>
                                            <td className="mname">관리자</td>
                                            <td className="munit">단위</td>
                                            <td className="mfrom">123</td>
                                            <td className="mto">123</td>
                                        </tr>
                                        <tr>
                                            <td className="mid">dev</td>
                                            <td className="mname">roqkfwk</td>
                                            <td className="munit">단위</td>
                                            <td className="mfrom">123</td>
                                            <td className="mto">123</td>
                                        </tr>
                                        <tr>
                                            <td className="mid">admin</td>
                                            <td className="mname">관리자</td>
                                            <td className="munit">단위</td>
                                            <td className="mfrom">123</td>
                                            <td className="mto">123</td>
                                        </tr>
                                        <tr>
                                            <td className="mid">dev</td>
                                            <td className="mname">roqkfwk</td>
                                            <td className="munit">단위</td>
                                            <td className="mfrom">123</td>
                                            <td className="mto">123</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col col-lg-4 wd100-mt20">
                    <div className="card indiv">
                        <form>
                            <div className="card-content">
                                <div className="table-responsive">
                                    <div className="table-header">
                                        <div className="d-flex">
                                            <div className="tbl_title nobar">상세정보</div>
                                            <div className="ms-auto">
                                                <div className="btn_wrap d-flex">
                                                    <button type="button" className="btn btn-wgray">삭제</button>
                                                    <button type="button" className="btn btn-white btn-new">신규</button>
                                                    <button type="button" className="btn btn-ccolor">저장</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="table-body">
                                        <table className="table table-borderless mt-3 text-import">
                                            <tbody>
                                            <tr>
                                                <th>측정항목ID</th>
                                                <td className="mid">
                                                    <input className="form-control w-100" type="text" value="" readOnly />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>측정항목 명칭</th>
                                                <td className="mname">
                                                    <input className="form-control w-100" type="text" maxLength="50" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>측정항목 단위</th>
                                                <td className="munit">
                                                    <input className="form-control w-100" type="text" maxLength="20" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>참고치-From</th>
                                                <td className="mfrom">
                                                    <input className="form-control w-100" type="number" value="" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>참고치-To</th>
                                                <td className="mto">
                                                    <input className="form-control w-100" type="number" value="" />
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Item;