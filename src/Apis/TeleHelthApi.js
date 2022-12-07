import AuthorizationAxios from "../Utils/AuthorizationAxios";

class TeleHelthApi {

    constructor() {
    }
    async select() {
        try {
            const response = await AuthorizationAxios.post(
            process.env.REACT_APP_BASE_URL + '/api/teleHealth/getTeleHealth',
                {headers: {'Content-Type': "application/json"}}
            )
            return response;
        }catch (e) {
            console.log(e);
            return false;
        }
    }
}
export default TeleHelthApi;