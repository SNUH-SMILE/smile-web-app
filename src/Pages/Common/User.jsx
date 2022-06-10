import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import TreatmentCenterModal from "../../component/TreatmentCenterModal";
import commonCode from "../../Apis/CommonCode";
import UserApi from "../../Apis/UserApi";
import ReactTable from "../../component/ReactTable";
import UseSetPageTitle from "../../Utils/UseSetPageTitle";

const CardInDivH40 = styled.div`
  height: 40% !important;
  margin-bottom: 20px;
`

const CardInDivH60 = styled.div`
  height: calc(60% - 20px) !important;
`

const TreatmentCenterHeaderCheckBox = styled.input`
    vertical-align: middle;
`
function User() {

    UseSetPageTitle('사용자 관리');
    /**
     * 생활치료센터 모달
     */
    const [treatmentCenterModalObject,setTreatmentCenterModalObject]= useState({
        show:false,
        headerElement:'radio',
        confirmEvent:null
    })
    const handleTreatmentCenterModalClose = () =>{
        setTreatmentCenterModalObject({
            ...treatmentCenterModalObject,
            show:false
        })
    }
    const handleTreatmentCenterModalOpen = (mode) => {
        setTreatmentCenterModalObject({
            show:true,
            headerElement: mode,
            confirmEvent:null
        })
    }


    /**
     * 사용자 페이지
     */

    const userId = useRef();
    const userPw = useRef();
    const userNm = useRef();
    const remark = useRef();

    // 사용자 리스트 테이블 헤더
    const userTableColumn = [
        {Header: '사용자ID', accessor: 'userId', styleClassName:'uid'},
        {Header: '사용자명', accessor: 'userNm', styleClassName:'uname'},
        {Header: '생활치료센터', accessor: 'mainCenterNm', styleClassName:'cname'},
        {Header: '리마크', accessor: 'remark', styleClassName:'umark text-start'},
    ]
    // 사용자 리스트
    const [ userList, setUserList ] = useState([])

    // 선택 사용자 생활치료센터 리스트
    const [ userTreatmentCenterList, setUserTreatmentCenterList ] = useState([])

    // 선택 사용자 생활치료센터 메인여부 변경시 State 값 업데이트
    const changeMainYn = (centerId) => {
        setUserTreatmentCenterList(
            userTreatmentCenterList.map(value => value.centerId === centerId
                ? {...value, mainYn: 'Y'}
                : {...value, mainYn: 'N'}
            )
        )
    }
    // 선택 사용자 생활치료센터 선택 체크박스 체크 또는 체크해제시 State 값 업데이트
    const changeDelYn = (centerId) => {
        console.log('centerId',centerId);
        console.log('deleteTreatmentCenter');
        setUserTreatmentCenterList(
            userTreatmentCenterList.map((value,idx) => {

                if(value.centerId === centerId){
                    return {...value, delYn: true}
                }
                else{
                    return value;
                }
            })
        )
    }


    // 선택 사용자 생활치료센터 메인여부 변경시 State 값 업데이트
    const deleteTreatmentCenter = () => {
        setUserTreatmentCenterList(
            userTreatmentCenterList.filter(value => !value.delYn)
        )
    }

    const x = () => {
        console.log(userTreatmentCenterList);
    }
    // 선택 사용자 생활치료센터 테이블 헤더
    const userTreatmentCenterTableColumn = [
        {Header: <TreatmentCenterHeaderCheckBox className="form-check-input" type="checkbox"/>, accessor: 'delYn', styleClassName:'cid ', editElement:'checkbox', editEvent:changeDelYn},
        {Header: '센터ID', accessor: 'centerId',styleClassName:'cname'},
        {Header: '센터명', accessor: 'centerNm'},
        {Header: '메인여부', accessor: 'mainYn', styleClassName:'cname',editElement:'radio',editEvent:changeMainYn},
    ]


    const userApi = new UserApi();

    useEffect(()=>{
        selectUserList('data');
    },[])

    // 사용자 리스트 요청
    const selectUserList = () => {
        userApi.select().then(({data}) => setUserList(data.result));
    }

    // 사용자 상세 정보 요청
    const selectUserInfo = (selectUserId) => {
        userApi.detail(selectUserId).then(({data}) => {
            if(data.code === '00') {
                setUserTreatmentCenterList([]);
                const {userTreatmentCenterVOList } = data.result;
                userTreatmentCenterVOList && setUserTreatmentCenterList(
                    userTreatmentCenterVOList.map(value => {return {...value, delYn:false}})
                );
                userId.current.value = data.result.userId
                userPw.current.value = data.result.password
                userNm.current.value = data.result.userNm
                remark.current.value = data.result.remark
            }
        });
    }

    return (
        <>
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
                                                    <input className="form-control w80" type="text" defaultValue=""/>
                                                </div>
                                                <div className="me-3 d-flex">
                                                    <span className="stit">사용자명</span>
                                                    <input className="form-control w120" type="text" defaultValue=""/>
                                                </div>
                                                <div className="me-1 d-flex">
                                                    <span className="stit">생활치료센터</span>
                                                    <input className="form-control search w120" type="text"
                                                            onClick={()=> handleTreatmentCenterModalOpen('radio')}
                                                           readOnly/>
                                                </div>
                                                <div className="ms-auto btn_wrap">
                                                    <button type="button" className="btn btn-gray" onClick={x}>검색</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="table-body height100">
                                        <ReactTable tableHeader={userTableColumn} tableBody={userList} trOnclick={selectUserInfo}/>

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
                                                        <button type="button" className="btn btn-wgray" >삭제</button>
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
                                                        <input className="form-control w-100" type="text"
                                                               ref={userId} defaultValue={''} readOnly/>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>비밀번호</th>
                                                    <td>
                                                        <input className="form-control w-100" type="text"
                                                               maxLength="20" ref={userPw}
                                                               defaultValue={''}/>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>사용자명</th>
                                                    <td className="uname">
                                                        <input className="form-control w-100" type="text"
                                                               maxLength="500" ref={userNm}
                                                               defaultValue={''}/>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>리마크</th>
                                                    <td className="umark">
                                                        <textarea className="form-control h100" ref={remark} maxLength="100"/>
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
                                                        <button type="button" className="btn btn-wgray" onClick={deleteTreatmentCenter}>삭제</button>
                                                        <button type="button"
                                                                className="btn btn-ccolor"
                                                                onClick={()=> handleTreatmentCenterModalOpen('checkbox')}
                                                        >
                                                            추가
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="table-body h400 p-0">
                                            <ReactTable tableHeader={userTreatmentCenterTableColumn} tableBody={userTreatmentCenterList} />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </CardInDivH60>
                    </div>
                </div>
            </main>
            <TreatmentCenterModal treatmentCenterModalObject={treatmentCenterModalObject} handleClose={handleTreatmentCenterModalClose}/>
        </>
    );
}

export default User;