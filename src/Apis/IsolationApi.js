import AuthorizationAxios from "../Utils/AuthorizationAxios";

class IsolationApi {
    constructor(searchPatientId, searchPatientNm, paginationObj, sortedOrder) {
        this.searchPatientId = searchPatientId;
        this.searchPatientNm = searchPatientNm;
        this.currentPageNo = paginationObj.currentPageNo;
        this.recordCountPerPage = paginationObj.recordCountPerPage;
        this.pageSize = paginationObj.pageSize;
        this.sortedOrderBy = sortedOrder.By;
        this.sortedOrderDir = sortedOrder.Dir;
    }

    //자가격리자 리스트 조회
    async select() {
        try {
            const response = await AuthorizationAxios.post(
                process.env.REACT_APP_BASE_URL + '/api/admission/quarantine/list',
                JSON.stringify({
                    patientId: this.searchPatientId.current.value,
                    patientNm: this.searchPatientNm.current.value,
                    currentPageNo: this.currentPageNo,
                    recordCountPerPage: this.recordCountPerPage,
                    pageSize: this.pageSize,
                    orderBy: this.sortedOrderBy,
                    orderDir: this.sortedOrderDir,
                }),
                {headers: {'Content-Type': "application/json"}}
            );
            return response;
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    //자가격리자 상세정보 조회
    async detail (admissionId) {
        try{
            const response = await AuthorizationAxios.get(
                process.env.REACT_APP_BASE_URL + '/api/admission/info',
                {params:{admissionId:admissionId}}
            );
            return response;
        }catch (e) {
            console.log(e);
            return false;
        }
    }

    //자가격리자 신규생성
    async create (saveData){
        try{
            const response = await AuthorizationAxios.put(process.env.REACT_APP_BASE_URL + '/api/admission/quarantine/save',
                JSON.stringify({
                    admissionListSearchByQuarantineVO:{
                        patientId: this.searchPatientId.current.value,
                        patientNm: this.searchPatientNm.current.value,
                        currentPageNo: this.currentPageNo,
                        recordCountPerPage: this.recordCountPerPage,
                        pageSize: this.pageSize,
                        orderBy: this.sortedOrderBy,
                        orderDir: this.sortedOrderDir,
                    },
                    patientNm:saveData.patientNm.current.value,
                    birthDate:saveData.birthDate.current.value.replaceAll('-',''),
                    sex:saveData.sex,
                    cellPhone:saveData.cellPhone.current.value,
                    admissionDate:saveData.admissionDate.current.value.replaceAll('-',''),
                    dschgeSchdldDate:saveData.dschgeSchdldDate.current.value.replaceAll('-',''),
                    personCharge:saveData.personCharge.current.value,
                }),
                {headers: {'Content-Type': "application/json"}});
            return response;
        }catch (e) {
            console.log(`Isolation Create`);
            return false;
        }
    }

    //자가격리자 상세정보 업데이트
    async update (saveData){
        try{
            const response = await AuthorizationAxios.patch(process.env.REACT_APP_BASE_URL + '/api/admission/quarantine/save',
                JSON.stringify({
                    admissionListSearchByQuarantineVO:{
                        patientId: this.searchPatientId.current.value,
                        patientNm: this.searchPatientNm.current.value,
                        currentPageNo: this.currentPageNo,
                        recordCountPerPage: this.recordCountPerPage,
                        pageSize: this.pageSize,
                        orderBy: this.sortedOrderBy,
                        orderDir: this.sortedOrderDir,
                    },
                    admissionId:saveData.admissionId.current.value,
                    patientId:saveData.patientId.current.value,
                    patientNm:saveData.patientNm.current.value,
                    birthDate:saveData.birthDate.current.value.replaceAll('-',''),
                    sex:saveData.sex,
                    cellPhone:saveData.cellPhone.current.value,
                    admissionDate:saveData.admissionDate.current.value.replaceAll('-',''),
                    dschgeSchdldDate:saveData.dschgeSchdldDate.current.value.replaceAll('-',''),
                    personCharge:saveData.personCharge.current.value,
                }),
                {headers: {'Content-Type': "application/json"}});
            return response;
        }catch (e) {
            console.log(`Isolation Update`);
            return false;
        }
    }


    //자가격리자 격리해제 처리
    async discharge (admissionId,dischargeDate){
        try{
            const response = await AuthorizationAxios.patch(process.env.REACT_APP_BASE_URL + '/api/admission/quarantine/discharge',
                JSON.stringify({
                    admissionListSearchByQuarantineVO:{
                        patientId: this.searchPatientId.current.value,
                        patientNm: this.searchPatientNm.current.value,
                        currentPageNo: this.currentPageNo,
                        recordCountPerPage: this.recordCountPerPage,
                        pageSize: this.pageSize,
                        orderBy: this.sortedOrderBy,
                        orderDir: this.sortedOrderDir,
                    },
                    admissionId:admissionId,
                    dschgeDate:dischargeDate.replaceAll('-',''),
                }),
                {headers: {'Content-Type': "application/json"}});
            return response;
        }catch (e) {
            console.log(`AdmissionApi discharge`);
            return false;
        }
    }
}

export default IsolationApi;