import React, {useCallback, useEffect, useRef, useState} from 'react';
import ReactTable from "../../component/ReactTable";
import UseSetPageTitle from "../../Utils/UseSetPageTitle";
import Pagination from "../../component/Pagination";
import AdmissionApi from "../../Apis/AdmissionApi";
import { getLonginUserInfo } from "../../Apis/CommonCode";
import AdmissionExitModal from "../../component/AdmissionExitModal";
import AdmissionSaveModal from "../../component/AdmissionSaveModal";
import useAlert from "../../Utils/UseAlert";

function Admission() {
    const {alert,confirm} = useAlert();
    UseSetPageTitle('생활치료센터 환자 현황')

    // 검색
    const searchAdmissionCenter = useRef();
    const searchAdmissionId = useRef();
    const searchAdmissionNm = useRef();

    // 정렬
    // By: 정렬 컬럼명
    // Div: 정렬 방식 ('' || asc || desc)
    const [sortedOrder,setSortedOrder] = useState({By:'',Dir:''})
    // 페이지 처음 로딩시 입소자 리스트 요청 및 paginationObj의 currentPageNo 가 변경되면 실행 및 정렬옵션이 변경될때 마다 재조회
    // 페이지네이션
    const [paginationObj,setPaginationObj]=useState({currentPageNo:1,pageSize:10,recordCountPerPage:15})
    useEffect(()=>{
        mountSelectAdmissionListByCenter();
    },[sortedOrder,paginationObj.currentPageNo])


    // 입소자관련 Api
    const admissionApi = new AdmissionApi(searchAdmissionCenter,searchAdmissionId,searchAdmissionNm,paginationObj,sortedOrder.By,sortedOrder.Dir);
    // 입소자 리스트
    const [admissionTableData, setAdmissionTableData] = useState([]);

    //총페이지의 갯수
    const [totalPageCount,setTotalPageCount] = useState(null);

    // 현재 로그인한 유저의 생활치료센터 리스트
    const [loginUserTreatmentCenterList, setLoginUserTreatmentCenterList] = useState([]);

    const setPaginationAndAdmissionTableDat = (data) =>{
        setPaginationObj((prevState)=>({...prevState,
            prevPaginationExists:data.result.paginationInfoVO.prevPaginationExists,
            nextPaginationExists:data.result.paginationInfoVO.nextPaginationExists,
            firstPageNoOnPageList:data.result.paginationInfoVO.firstPageNoOnPageList,
            lastPageNoOnPageList :data.result.paginationInfoVO.lastPageNoOnPageList,
        }))
        setTotalPageCount(data.result.paginationInfoVO.totalPageCount)
        setAdmissionTableData(data.result.admissionByCenterVOList)
    }

    // 센터 정보 및 입소자 리스트 요청 및 총 몇페이지인지 저장
    const mountSelectAdmissionListByCenter = () => {
        getLonginUserInfo()
            .then(({data}) => setLoginUserTreatmentCenterList(data.result.userTreatmentCenterVOList))
            .catch(()=>console.log('ERROR getLonginUserInfo'))
            .then(()=>{
                if(searchAdmissionCenter.current.value){
                    admissionApi.select().then(({data}) => {
                        setPaginationAndAdmissionTableDat(data);
                        selectedAdmissionId.current=''
                    })
                }
            })
    }
    const selectAdmissionListByCenter = () => {
        if(searchAdmissionCenter.current.value){
            admissionApi.select().then(({data}) => {
                selectedAdmissionId.current=''
                setPaginationAndAdmissionTableDat(data);
            })
        }
        else{
            setAdmissionTableData([]);
            setTotalPageCount(0);
            setPaginationObj({currentPageNo:1,pageSize:10,recordCountPerPage:15});
        }
    }
    const [selectValue,setSelectValue] = useState('')
    useEffect(()=>{
        if(loginUserTreatmentCenterList&&loginUserTreatmentCenterList.length>0){
            setSelectValue(loginUserTreatmentCenterList[0].centerId)
        }
    },[loginUserTreatmentCenterList])

    const handledSelect = (e)=>{
        setSelectValue(e.target.value)
    }

    // 정렬 검색 이벤트
    const handledSearchWithSort = (orderBy, orderDir) =>{
        setSortedOrder(()=>({By:orderBy,Dir: orderDir}));
    }

    // 검색 Input Enter 이벤트
    const handledOnSearch = (e) => {
        if (e.keyCode === 13 || e.target.tagName === 'BUTTON') {
            if(paginationObj.currentPageNo === 1){
                selectAdmissionListByCenter();
            }
            else{
                setPaginationObj({currentPageNo:1,pageSize:10,recordCountPerPage:15})
            }
        }
    }
    // 퇴소 모달
    const [admissionExitModalObj,setAdmissionExitModalObj] = useState({show:false,data: {}});
    // 퇴소 모달 열기 (admissionId 로 api 요청 하려고 인자로 받음)
    const handledAdmissionExitModal = (admissionId) =>{
        admissionApi.detail(admissionId).then(({data}) => setAdmissionExitModalObj({show: true, data: {...data.result}}))
    }
    const discharge = useCallback(async (admissionId, dischargeDate, patientNm) => {
        if(dischargeDate===''){
            alert('퇴소일이 공백입니다.')
        }
        else{
            const confirmState = await confirm(`${patientNm} 을 퇴소처리 하시겠습니까?`)
            if(confirmState) {
                admissionApi.discharge(admissionId, dischargeDate).then(({data}) => {
                    if(data.code==='00'){
                        alert(data.message)
                        handledCloseAdmissionExitModal()
                        setPaginationAndAdmissionTableDat(data);
                    }
                    else{
                        alert(data.message)
                    }
                });
            }
        }
    },[])
    // 퇴소 모달 닫기
    const handledCloseAdmissionExitModal = useCallback(() =>{
        setAdmissionExitModalObj({show: false, data: {}})
    },[])
    const selectedAdmissionId = useRef('');
    // 저장 모달
    const [admissionSaveModalObj,setAdmissionSaveModalObj] = useState({show:false,data:{},confirmFunc:Function});
    const getSelectedAdmissionId = (patientId, {admissionId}) =>{
        selectedAdmissionId.current = admissionId;
    }
    const validationModalData = async (nullList,saveData)=>{
        if(nullList.length > 0){
            nullList[0] === 'patientNm' && alert('이름이 공백입니다.')
            nullList[0] === 'birthDate' && alert('생일이 공백입니다.')
            nullList[0] === 'sex' && alert('성별을 선택해주세요.')
            nullList[0] === 'cellPhone' && alert('연락처가 공백입니다.')
            nullList[0] === 'admissionDate' && alert('시작일이 공백입니다.')
            nullList[0] === 'dschgeSchdldDate' && alert('종료예정일이 공백입니다.')
            nullList[0] === 'personCharge' && alert('담당자 공백입니다.')
            nullList[0] === 'centerId' && alert('센터가 공백입니다.')
            nullList[0] === 'room' && alert('위치가 공백입니다.')
            saveData[nullList[0]].current.focus();
            return false;
        }
        else if(saveData['admissionDate'].current.value >= saveData['dschgeSchdldDate'].current.value){
            alert('종료 예정일은 시작일 이후이어야 합니다.')
            saveData['dschgeSchdldDate'].current.focus();
            return false;
        }
        return true;
    }
    // 신규생성
    const create = async (saveData) => {
        let nullList = Object.keys(saveData)
            .filter(value => value !== 'admissionId' && value !== 'patientId')
            .filter(value => value === 'sex' ? saveData[value] === '' : saveData[value].current.value === '');
        const validation = await validationModalData(nullList, saveData)
        if (validation){
            let confirmStatus = await confirm(`${saveData['patientNm'].current.value}를 생성하시겠습니까?`)
            if (confirmStatus) {
                admissionApi.create(saveData).then(({data}) => {
                    if (data.code === '00') {
                        alert(data.message)
                        handledCloseAdmissionSaveModal()
                        setPaginationObj((prevState) => ({
                            ...prevState,
                            prevPaginationExists: data.result.admissionListResponseByCenterVO.paginationInfoVO.prevPaginationExists,
                            nextPaginationExists: data.result.admissionListResponseByCenterVO.paginationInfoVO.nextPaginationExists,
                            firstPageNoOnPageList: data.result.admissionListResponseByCenterVO.paginationInfoVO.firstPageNoOnPageList,
                            lastPageNoOnPageList: data.result.admissionListResponseByCenterVO.paginationInfoVO.lastPageNoOnPageList,
                        }))
                        setTotalPageCount(data.result.admissionListResponseByCenterVO.paginationInfoVO.totalPageCount)
                        setAdmissionTableData(data.result.admissionListResponseByCenterVO.admissionByCenterVOList);
                    } else {
                        alert(data.message)
                    }
                });
            }
        }
    }
    // 수정
    const update = async (saveData) => {
        let nullList = Object.keys(saveData).filter(value=>value === 'sex' ? saveData[value] === '' :saveData[value].current.value==='');
        const validation = await validationModalData(nullList, saveData)
        if (validation){
            let confirmStatus = await confirm(`${saveData['patientNm'].current.value}를 수정하시겠습니까?`)
            if(confirmStatus){
                admissionApi.update(saveData).then(({data}) => {
                    if(data.code === '00'){
                        alert(data.message)
                        handledCloseAdmissionSaveModal()
                        setTotalPageCount(data.result.admissionListResponseByCenterVO.paginationInfoVO.totalPageCount)
                        setAdmissionTableData(data.result.admissionListResponseByCenterVO.admissionByCenterVOList);
                    }
                    else{
                        alert(data.message)
                    }
                });
            }
        }
    }
    // 저장 모달 열기 (admissionId 로 api 요청 하려고 인자로 받음)
    const handledAdmissionSaveModal = (admissionId) =>{
        if(admissionId === '신규'){
            setAdmissionSaveModalObj({show: true, data:{},confirmFunc: create})
        }
        else{
            if(!admissionId){
                alert('입소자를 선택해주세요');
                return;
            }
            admissionApi.detail(admissionId).then(({data}) => {
                setAdmissionSaveModalObj({show: true, data: {...data.result}, confirmFunc: update})
            })
            // setAdmissionSaveModalObj({show: true, admissionId: {}})
        }
    }
    // 저장 모달 닫기
    const handledCloseAdmissionSaveModal = useCallback(() =>{
        setAdmissionSaveModalObj({show: false, data:{},confirmFunc:Function})
    },[])
    // React-Table Table Header
    const admissionTableColumn = [
        {Header: '환자ID', accessor: 'patientId', sortedYn:true, orderBy:sortedOrder.By, orderDiv:sortedOrder.Dir, sortedEvent:handledSearchWithSort},
        {Header: '환자명', accessor: 'patientNm', sortedYn:true, orderBy:sortedOrder.By, orderDiv:sortedOrder.Dir, sortedEvent:handledSearchWithSort},
        {Header: '입소일', accessor: 'admissionDate', sortedYn:true, orderBy:sortedOrder.By, orderDiv:sortedOrder.Dir, sortedEvent:handledSearchWithSort},
        {Header: '위치', accessor: 'roomNm', sortedYn:true, orderBy:sortedOrder.By, orderDiv:sortedOrder.Dir, sortedEvent:handledSearchWithSort},
        {Header: '격리일수', accessor: 'qantnDay', sortedYn:true, orderBy:sortedOrder.By, orderDiv:sortedOrder.Dir, sortedEvent:handledSearchWithSort},
        {Header: '혈압', accessor: 'bp', vital:true,},
        {Header: '맥박', accessor: 'prResult', vital:true,},
        {Header: '체온', accessor: 'btResult', vital:true},
        {Header: '호흡', accessor: 'rrResult', vital:true},
        {Header: '산소포화도', accessor: 'spResult', vital:true},
        {Header: '재원상태', accessor: 'qantnStatus', editElement:'AdmissionButton', editEvent:handledAdmissionExitModal},
    ]
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
                                            <div className="tbl_title">생활치료센터 환자 리스트</div>
                                            <div className="me-3 d-flex">
                                                <span className="stit">센터</span>
                                                <select className="form-select"
                                                        ref={searchAdmissionCenter}
                                                        value={
                                                            selectValue
                                                        }
                                                        onChange={(e)=>{
                                                            selectAdmissionListByCenter();
                                                            handledSelect(e)
                                                        }}
                                                >
                                                    <option value={''}>선택</option>
                                                    {
                                                        loginUserTreatmentCenterList&&
                                                        loginUserTreatmentCenterList.map(value =>
                                                            <option key={value.centerId} value={value.centerId}>
                                                                {value.centerNm}
                                                            </option>
                                                        )
                                                    }
                                                </select>
                                            </div>
                                            <div className="me-3 d-flex">
                                                <span className="stit">환자ID</span>
                                                <input className="form-control w160"
                                                       type="text"
                                                       defaultValue=""
                                                       ref={searchAdmissionId}
                                                       onKeyUp={handledOnSearch}
                                                />
                                            </div>
                                            <div className="me-1 d-flex">
                                                <span className="stit">환자명</span>
                                                <input className="form-control w160"
                                                       type="text"
                                                       defaultValue=""
                                                       ref={searchAdmissionNm}
                                                       onKeyUp={handledOnSearch}
                                                />
                                            </div>
                                            <div className="ms-auto">
                                                <div className="btn_wrap d-flex">
                                                    <button type="button" className="btn btn-gray" onClick={(e)=>handledOnSearch(e)}>검색</button>
                                                    <button type="button" className="btn btn-white"
                                                            // hidden={!selectValue}
                                                            onClick={()=>handledAdmissionSaveModal('신규')}>신규
                                                    </button>
                                                    <button type="button" className="btn btn-ccolor"
                                                            onClick={()=>handledAdmissionSaveModal(selectedAdmissionId.current)}>수정
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="table-body">
                                    <ReactTable tableHeader={admissionTableColumn} tableBody={admissionTableData}
                                                sorted={true} customTableStyle={'table table-striped table-hover text-expert'}
                                                trOnclick={getSelectedAdmissionId}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/*페이징 start*/}
            <Pagination paginationObj={paginationObj} totalPageCount={totalPageCount} handledList={setPaginationObj}/>
            {/*페이징 end*/}
        </main>
            <>
                {/* 신규 수정 모달*/}
                <AdmissionSaveModal admissionSaveModalObj={admissionSaveModalObj} handledClose={handledCloseAdmissionSaveModal} centerList={loginUserTreatmentCenterList} />
            </>
            <>
                {/* 퇴소 모달*/}
                <AdmissionExitModal admissionExitModalObj={admissionExitModalObj} handledClose={handledCloseAdmissionExitModal} discharge={discharge}/>
            </>
        </>
    );
}

export default React.memo(Admission);