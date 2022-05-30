import AuthorizationAxios from "../Utils/AuthorizationAxios";

class TreatmentCenterApi {
    /**
     * 생활치료센터
     * @param centerId                                 생활치료센터 ID
     * @param centerNm                                 생활치료센터명
     * @param centerLocation                           생활치료센터위치
     * @param hospitalCd                               생활치료센터 병원코드
     * @param hospitalNm                               생활치료센터 병원이름
     * @param TreatmentCenterSearchId
     * @param TreatmentCenterSearchNm
     * @param TreatmentCenterSearchHospitalNm
     * @param useYn                                    사용여부
     */
    constructor(
        centerId,
        centerNm,
        centerLocation,
        // hospitalCd,
        // hospitalNm,
        // TreatmentCenterSearchId,
        // TreatmentCenterSearchNm,
        // TreatmentCenterSearchHospitalNm,
        useYn='Y',
    ) {
        //공통

        // 상세조회, 신규, 수정, 삭제
        this.centerId = centerId.value;
        this.centerNm = centerNm.value;
        this.centerLocation = centerLocation.value;
        // this.hospitalCd = hospitalCd.value;
        // this.hospitalNm = hospitalNm.value;


        // 검색

    }

    //생활치료센터 리스트 조회
    async select () {
        console.log('TEST');
        try{
            const response = await AuthorizationAxios.post(
                                                  process.env.REACT_APP_BASE_URL + '/api/treatmentCenter/list',
                                                      JSON.stringify({
                                                          centerId:'',
                                                          centerNm:'',
                                                          centerLocation:'',
                                                          hospitalCd: '',
                                                          hospitalNm: '',
                                                          useYn:'Y'
                                                      }),
                                               {headers: {'Content-Type': "application/json"}}
            );
            return response;
        }catch (e) {
            console.error(`TreatmentCenterApi Select ${e}`);
            return false;
        }
    }

    //생활치료센터 리스트 검색
    async search () {
        try{
            const response = await AuthorizationAxios.get(process.env.REACT_APP_BASE_URL + `/api/treatmentCenter/list/${this.centerId}`);
            return response;
        }catch (e) {
            console.log(`TreatmentCenterApi Select`);
            return false;
        }
    }

    //생활치료센터 상세조회
    async detail (){
        try{
            const response = await AuthorizationAxios.get(process.env.REACT_APP_BASE_URL + '/api/treatmentCenter/list');
            return response;
        }catch (e) {
            console.log(`TreatmentCenterApi Detail`);
            return false;
        }
    }

    //생활치료센터 신규 생성
    async insert (){
        try{
            const response = await AuthorizationAxios.post(process.env.REACT_APP_BASE_URL + '/api/treatmentCenter/list');
            return response;
        }catch (e) {
            console.log(`TreatmentCenterApi Insert`);
            return false;
        }
    }

    //생활치료센터 업데이트
    async update (){
        try{
            const response = await AuthorizationAxios.put(process.env.REACT_APP_BASE_URL + '/api/treatmentCenter/list');
            return response;
        }catch (e) {
            console.log(`TreatmentCenterApi Update`);
            return false;
        }
    }

    //생활치료센터 삭제
    async delete (){
        try{
            const response = await AuthorizationAxios.delete(process.env.REACT_APP_BASE_URL + '/api/treatmentCenter/list');
            return response;
        }catch (e) {
            console.log(`TreatmentCenterApi Delete`);
            return false;
        }
    }
}

export default TreatmentCenterApi;