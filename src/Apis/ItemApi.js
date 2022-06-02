import AuthorizationAxios from "../Utils/AuthorizationAxios";

/**
 * 측정항목 관리 API
 */
class ItemApi {
    /**
     * 측정항목
     * @param itemId 측정항목ID
     * @param itemNm 측정항목명
     * @param unit 단위
     * @param refFrom 참고치 From
     * @param refTo 참고치 To
     * @param searchItemId 조회조건-측정항목 ID
     * @param searchItemNm 조회조건-측정항목명
     */
    constructor(itemId, itemNm, unit, refFrom, refTo, searchItemId, searchItemNm) {
        this.itemId = itemId;
        this.itemNm = itemNm;
        this.unit = unit;
        this.refFrom = refFrom;
        this.refTo = refTo;

        this.searchItemId = searchItemId;
        this.searchItemNm = searchItemNm;
    }

    /**
     * 측정항목 리스트
     * @returns {Promise<AxiosResponse<any>|boolean>}
     */
    async getItemList() {
        try{
            const response =
                await AuthorizationAxios.post(
                    process.env.REACT_APP_BASE_URL + '/api/item/list',
                    JSON.stringify({
                        itemId: this.searchItemId.current.value,
                        itemNm: this.searchItemNm.current.value,
                    }),
                    {
                        headers: {
                            'Content-Type': "application/json"
                        }
                    }
                );
            // const response = {
            //     "code":"00",
            //     "message":"조회성공",
            //     "result":[
            //         {
            //             "itemId":"CD001",
            //             "itemNm":"측정항목1",
            //             "unit":"kg",
            //             "refFrom":"1",
            //             "refTo":"10"
            //         },{
            //             "itemId":"CD002",
            //             "itemNm":"측정항목2",
            //             "unit":"kg",
            //             "refFrom":"1",
            //             "refTo":"10"
            //         },{
            //             "itemId":"CD003",
            //             "itemNm":"측정항목3",
            //             "unit":"kg",
            //             "refFrom":"1",
            //             "refTo":"10"
            //         }
            //     ]
            // }

            return response;
        }catch (e) {
            console.log(e);
            return false;
        }
    }

    async getItem() {

    }
}

export default ItemApi;