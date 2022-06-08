import React from 'react';
import styled from "styled-components";

const CardInDivH40 = styled.div`
  height: 40% !important;
  margin-bottom: 20px;
`

const CardInDivH60 = styled.div`
  height: calc(60% - 20px) !important;
`

function User(props) {
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
                                            <div className="tbl_title">사용자 리스트</div>
                                            <div className="me-3 d-flex">
                                                <span className="stit">사용자ID</span>
                                                <input className="form-control w80" type="text" value=""/>
                                            </div>
                                            <div className="me-3 d-flex">
                                                <span className="stit">사용자명</span>
                                                <input className="form-control w120" type="text" value=""/>
                                            </div>
                                            <div className="me-1 d-flex">
                                                <span className="stit">생활치료센터</span>
                                                <input className="form-control search w120" type="text"
                                                       data-bs-toggle="modal" data-bs-target="#lifecenterModal"
                                                       readOnly/>
                                            </div>
                                            <div className="ms-auto btn_wrap">
                                                <button type="button" className="btn btn-gray">검색</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="table-body height100">
                                    <table id="table-b"
                                           className="table table-striped table-hover text-expert table-fixed">
                                        <thead>
                                        <tr>
                                            <th className="uid">사용자ID</th>
                                            <th className="uname">사용자명</th>
                                            <th className="umark text-start">리마크</th>
                                            <th className="cname">생활치료센터</th>
                                        </tr>
                                        </thead>
                                        <tbody >

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col col-lg-4 wd100-mt20">
                    <CardInDivH40 className="card indiv">
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
                                                <th>사용자ID</th>
                                                <td className="uid">
                                                    <input className="form-control w-100" type="text" value="" readOnly/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>비밀번호</th>
                                                <td>
                                                    <input className="form-control w-100" type="text" maxLength="20"/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>사용자명</th>
                                                <td className="uname">
                                                    <input className="form-control w-100" type="text" maxLength="500"/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>생활치료센터</th>
                                                <td className="cname">
                                                    <input className="form-control search w-100" type="text"
                                                           data-bs-toggle="modal" data-bs-target="#lifecenterModal"
                                                           readOnly/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>리마크</th>
                                                <td className="umark">
                                                    <textarea className="form-control h100" maxLength="100"/>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </CardInDivH40>
                    <CardInDivH60 className="card indiv">
                        <form>
                            <div className="card-content">
                                <div className="table-responsive">
                                    <div className="table-header">
                                        <div className="d-flex">
                                            <div className="tbl_title nobar">생활치료센터 리스트</div>
                                            <div className="ms-auto">
                                                <div className="btn_wrap d-flex">
                                                    <button type="button" className="btn btn-wgray">삭제</button>
                                                    <button type="button" className="btn btn-ccolor">추가</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="table-body">
                                        <table>
                                            <thead>
                                            <tr>
                                                <th>
                                                    <div className="checkbox checkbox-primary stand-alone">
                                                        <input type="checkbox" name=""
                                                               id="checkbox-applicableUserList-all"/>
                                                            <label htmlFor="checkbox-applicableUserList-all"
                                                                   className="cr"></label>
                                                    </div>
                                                </th>
                                                <th>사용자ID</th>
                                                <th>사용자명</th>
                                                <th>생성자</th>
                                                <th>생성일시</th>
                                            </tr>
                                            </thead>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </CardInDivH60>
                </div>
            </div>
        </main>
    );
}

export default User;