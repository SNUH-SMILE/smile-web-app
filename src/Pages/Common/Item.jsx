import React, {useContext, useEffect, useRef, useState} from 'react';
import UseSetPageTitle from "../../Utils/UseSetPageTitle";
import ItemApi from "../../Apis/ItemApi";
import {AlertContext} from "../../Providers/AlertContext";
import ReactTable from "../../component/ReactTable";

function Item() {
    // 헤더에 페이지 타이틀 설정
    UseSetPageTitle('측정항목 관리');

    const alertContext = useContext(AlertContext);
    const itemId = useRef();
    const itemNm = useRef();
    const unit = useRef();
    const refFrom = useRef();
    const refTo = useRef();

    const searchItemId = useRef();
    const searchItemNm = useRef();

    // 측정항목 관리 API
    const itemApi = new ItemApi(itemId, itemNm, unit, refFrom, refTo, searchItemId, searchItemNm);

    const itemTableColumns = [
        {
            Header:'측정항목ID',
            accessor:'itemId',
            styleClassName:'mid'
        },
        {
            Header:'측정항목명',
            accessor:'itemNm',
            styleClassName:'mname'
        },
        {
            Header:'단위',
            accessor:'unit',
            styleClassName:'munit'
        },
        {
            Header:'참고치-From',
            accessor:'refFrom',
            styleClassName:'mfrom'
        },
        {
            Header:'참고치-To',
            accessor:'refTo',
            styleClassName:'mto'
        },
    ]

    // 측정항목 리스트 데이터
    const [itemList, setItemList] = useState([]);

    // Mount 시 생활치료센터 리스트 요청
    useEffect(() => {
        getItemList();
    }, []);

    // 검색 Input Enter 이벤트
    const handledOnSearch = (e) =>{
        if(e.keyCode === 13){
            console.log('getItemList :: ');
            console.log(e);
            getItemList();
        }
    }

    // 측정항목 리스트 요청
    const getItemList = () => {
        itemApi.getItemList().then(({data}) => {
            console.log('Call getItemList :: ');
            console.log(data);

            setItemList(data.result);
        });
    }


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
                                                <input className="form-control w120"
                                                       type="text"
                                                       defaultValue={''}
                                                       maxLength="5"
                                                       ref={searchItemId}
                                                       onKeyUp={ (e) => handledOnSearch(e) }
                                                />
                                            </div>
                                            <div className="me-1 d-flex">
                                                <span className="stit">측정항목명</span>
                                                <input className="form-control w120"
                                                       type="text"
                                                       defaultValue={''}
                                                       maxLength="50"
                                                       ref={searchItemNm}
                                                       onKeyUp={ (e) => handledOnSearch(e) }
                                                />
                                            </div>
                                            <div className="ms-auto btn_wrap">
                                                <button type="button" className="btn btn-gray" onClick={getItemList}>검색</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="table-body">
                                    <ReactTable tableHeader={itemTableColumns} tableBody={itemList} />
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
                                                    <input className="form-control w-100" type="text" defaultValue={''} readOnly />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>측정항목 명칭</th>
                                                <td className="mname">
                                                    <input className="form-control w-100" type="text" defaultValue={''} maxLength="50" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>측정항목 단위</th>
                                                <td className="munit">
                                                    <input className="form-control w-100" type="text" defaultValue={''} maxLength="20" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>참고치-From</th>
                                                <td className="mfrom">
                                                    <input className="form-control w-100" type="number" defaultValue={''} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>참고치-To</th>
                                                <td className="mto">
                                                    <input className="form-control w-100" type="number" defaultValue={''} />
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