import React, {useEffect, useRef, useState} from 'react';
import UseSetPageTitle from "../../Utils/UseSetPageTitle";
import TreatmentCenterApi from "../../Apis/TreatmentCenterApi";

function TreatmentCenter() {

    const centerId = useRef();
    const centerNm = useRef();
    const centerLocation = useRef();
    // const hospitalNm = useRef(hospitalNm);
    const hospitalCd = useRef();
    // 생활치료센터 Api
    const treatmentCenterApi = new TreatmentCenterApi(centerId,centerNm,centerLocation);

    // React-Table Table Header
    const treatmentCenterTableColumn = [
        {Header:'치료센터ID',accessor:'centerId', styleClassName:'cid'},
        {Header:'치료센터명',accessor:'centerNm', styleClassName:'cname'},
        {Header:'위치',accessor:'centerLocation', styleClassName:'caddr text-start'},
        {Header:'병원명',accessor:'hospitalNm', styleClassName:'hname'},
    ]

    // 헤더에 페이지 타이틀 설정
    UseSetPageTitle('생활치료센터 관리');

    // 생활치료센터 리스트 관리
    const [treatmentCenterList, setTreatmentCenterList] = useState([]);

    // Mount 시 생활치료센터 리스트 요청
    useEffect(() => {
        treatmentCenterApi.select().then(response => setTreatmentCenterList(response.data));
    }, []);

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
                                            <div className="tbl_title">생활치료센터 리스트</div>
                                            <div className="me-3 d-flex">
                                                <span className="stit">치료센터ID</span>
                                                <input className="form-control w80" type="text" maxLength="4"/>
                                            </div>
                                            <div className="me-3 d-flex">
                                                <span className="stit">치료센터명</span>
                                                <input className="form-control w120" type="text" maxLength="100"/>
                                            </div>
                                            <div className="me-1 d-flex">
                                                <span className="stit">병원명</span>
                                                <input className="form-control w120" type="text" maxLength="100"/>
                                            </div>
                                            <div className="ms-auto btn_wrap">
                                                <button type="button" className="btn btn-gray">검색</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>

                                <div className="table-body height100">
                                    {/*<ReactTable tableHeader={treatmentCenterTableColumn} tableBody={treatmentCenterList}/>*/}
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
                                                <th>생활치료센터ID</th>
                                                <td className="cid">
                                                    <input className="form-control w-100" type="text" value=""
                                                           maxLength="4"
                                                           ref={centerId}
                                                           readOnly/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>생활치료센터 명</th>
                                                <td className="cname">
                                                    <input className="form-control w-100" type="text" maxLength="100" ref={centerNm}/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>생활치료센터 위치</th>
                                                <td className="caddr">
                                                    <textarea className="form-control w-100 h60" maxLength="500" ref={centerLocation}/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>병원</th>
                                                <td className="hname">
                                                    <select className="form-select w-100" ref={hospitalCd}>
                                                        <option defaultValue={''}>선택</option>
                                                        <option value="OO 병원">OO 병원</option>
                                                        <option value="XX 병원">XX 병원</option>
                                                        <option value="EE 병원">EE 병원</option>
                                                        <option value="TT 병원">TT 병원</option>
                                                    </select>
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

export default TreatmentCenter;