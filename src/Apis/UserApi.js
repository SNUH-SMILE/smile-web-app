import AuthorizationAxios from "../Utils/AuthorizationAxios";

export default class UserApi {

    constructor() {

    }
    async select () {
        try{
            const response = await AuthorizationAxios.post(
                process.env.REACT_APP_BASE_URL + '/api/user/list',
                JSON.stringify({
                    userId:'',
                    userNm:'',
                    centerId:'',
                }),
                {headers: {'Content-Type': "application/json"}}
            );
            return response;
        }catch (e) {
            console.log(e);
            return false;
        }
    }

    async detail (userId) {
        try{
            const response = await AuthorizationAxios.get(
                process.env.REACT_APP_BASE_URL + '/api/user/info',
                {params: {userId: userId}}
            );
            return response;
        }catch (e) {
            console.log(e);
            return false;
        }
    }
}