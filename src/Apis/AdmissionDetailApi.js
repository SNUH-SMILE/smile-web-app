import AuthorizationAxios from "../Utils/AuthorizationAxios";

class AdmissionDetailApi {
    constructor(admissionId) {
        this.admissionId = admissionId
    }
    //생활치료센터 입소자 리스트 조회
    async select () {
        try{
            const response = await AuthorizationAxios.get(
                process.env.REACT_APP_BASE_URL + '/api/patientDashboard/detail',
                {params: {'admissionId': this.admissionId,}}
            );
            return response;
        }catch (e) {
            console.log(e);
            return false;
        }
    }

    async addNotice (notice) {
        try{
            const response = await AuthorizationAxios.put(
                process.env.REACT_APP_BASE_URL + '/api/patientDashboard/detail/notice',
                {
                    admissionId: this.admissionId,
                    notice : notice
                }
            )
            return response;
        }catch (e) {
            console.log(e);
            return false;
        }
    }

    async getVitalData (searchDt) {
        try{
            const response = await AuthorizationAxios.post(
                process.env.REACT_APP_BASE_URL + '/api/patientDashboard/detail/chart',
                JSON.stringify({
                    admissionId: this.admissionId,
                    searchDt : searchDt
                }),
                {headers: {'Content-Type': "application/json"}}
            )
            return response;
        }catch (e) {
            console.log(e);
            return false;
        }
    }
    async getVitalChartHeader () {
        try{
            const response = await AuthorizationAxios.get(
                process.env.REACT_APP_BASE_URL + '/api/patientDashboard/detail/chart/header',
                {params: {admissionId: this.admissionId}}
            )
            return response;
        }catch (e) {
            console.log(e);
            return false;
        }
    }

}
export default AdmissionDetailApi;