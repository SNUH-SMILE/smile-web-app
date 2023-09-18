import AuthorizationAxios from "../Utils/AuthorizationAxios";
import getToday from "../Utils/common";

class PatientLocationsApi {
  // 위치 정보 조회
  async detail(admissionId) {
    try {
      const response = await AuthorizationAxios.get(
        process.env.REACT_APP_BASE_URL + "/api/patient-locations",
        { params: { admissionId: admissionId, resultDate: getToday() } }
      );
      console.log(response.data);
      console.log("로케이션");
      return response;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  // 위치 정보 다시 조회
  async update(admissionId, resultDate) {
    try {
      const response = await AuthorizationAxios.get(
        process.env.REACT_APP_BASE_URL + "/api/patient-locations",
        { params: { admissionId: admissionId, resultDate: resultDate } }
      );
      console.log(response.data);
      console.log("로케이션");
      return response;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}

export default PatientLocationsApi;
