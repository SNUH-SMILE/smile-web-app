import MockAdapter from "axios-mock-adapter";
import {fireEvent, render, waitFor} from "@testing-library/react";
import AlertStore from "../../Providers/AlertContext";
import {BrowserRouter} from "react-router-dom";
import HcAlert from "../../component/HCAlert";
import TreatmentCenter from "./TreatmentCenter";
import TitleStore from "../../Providers/TitleContext";
import AuthorizationAxios from "../../Utils/AuthorizationAxios";

let container;

beforeEach(() => {
    // Axios-mock-adaptor 사용 및 response 데이터 정의
    const mockAxios = new MockAdapter(AuthorizationAxios, {delayResponse: 0})

    // 검색조건 없는 리스트 조회
    mockAxios.onPost(process.env.REACT_APP_BASE_URL+'/api/treatmentCenter/list',{
        centerId:'',
        centerNm:'',
        hospitalNm:''
    })
        .reply(200,
            {code:'00',message:'조회 성공',
                result: [
                    {
                        "regId": "test",
                        "regNm": null,
                        "regDt": "2022-06-03 12:47:01",
                        "updId": "test",
                        "updNm": null,
                        "updDt": "2022-06-03 12:47:18",
                        "centerId": "C000",
                        "centerNm": "test센터0",
                        "centerLocation": "test센터0Location",
                        "hospitalCd": "testHC0",
                        "hospitalNm": "test병원0"
                    },
                ]
            }
            ,{'Content-Type': 'application/json','Authorization':`Bearer asdadasd`}
        )
    // 센터Id(C001)이 조건이 있는 생활치료센터 리스트 조회
    mockAxios.onPost(process.env.REACT_APP_BASE_URL+'/api/treatmentCenter/list',{
        centerId:'C001',
        centerNm:'',
        hospitalNm:''
    })
        .reply(200,
            {code:'00',message:'조회 성공',
                result: [
                    {
                        "regId": "test",
                        "regNm": null,
                        "regDt": "2022-06-03 12:47:01",
                        "updId": "test",
                        "updNm": null,
                        "updDt": "2022-06-03 12:47:18",
                        "centerId": "C001",
                        "centerNm": "test센터1",
                        "centerLocation": "test센터1Location",
                        "hospitalCd": "testHC1",
                        "hospitalNm": "test병원1"
                    },
                ]
            }
            ,{'Content-Type': 'application/json','Authorization':`Bearer asdadasd`}
        )
    // 센터Id(C001) 상세조회
    mockAxios.onPost(process.env.REACT_APP_BASE_URL+'/api/treatmentCenter/info',{
        centerId:'C000',
    })
        .reply(200,
            {code: '00', message: '조회 성공',
                result:
                    {
                        "regId": "test",
                        "regNm": null,
                        "regDt": "2022-06-03 12:47:01",
                        "updId": "test",
                        "updNm": null,
                        "updDt": "2022-06-03 12:47:18",
                        "centerId": "C000",
                        "centerNm": "test센터0",
                        "centerLocation": "test센터0Location",
                        "hospitalCd": "Detail",
                        "hospitalNm": "Detail대학교병원"
                    }
            }
            ,{'Content-Type': 'application/json','Authorization':`Bearer asdadasd`}
        )
    // 병원 조회
    mockAxios.onPost(process.env.REACT_APP_BASE_URL+'/api/comCd/detail/list',{
        comCd: 'CD002',
        useYn: 'Y'
    })
        .reply(200,
            {code:'00',message:'병원 조회 성공',
                result: [
                    {
                        regId : "admin",
                        regNm : "관리자",
                        regDt : "2021-11-22 15:13:50",
                        updId : "admin",
                        updNm : "관리자",
                        updDt : "2021-11-22 15:13:50",
                        cudFlag : null,
                        comCd : "CD002",
                        detailCd : "SNUH",
                        detailCdNm : "Test대학교병원",
                        sortSeq : 0,
                        useYn : "Y",
                        property1 : null,
                        property2 : null,
                        property3 : null,
                        property4 : null,
                        property5 : null,
                        remark : null,
                    },
                    {
                        regId : "admin",
                        regNm : "관리자",
                        regDt : "2021-11-22 15:13:50",
                        updId : "admin",
                        updNm : "관리자",
                        updDt : "2021-11-22 15:13:50",
                        cudFlag : null,
                        comCd : "CD002",
                        detailCd : "Detail",
                        detailCdNm : "Detail대학교병원",
                        sortSeq : 0,
                        useYn : "Y",
                        property1 : null,
                        property2 : null,
                        property3 : null,
                        property4 : null,
                        property5 : null,
                        remark : null,
                    }
                ]
            }
            ,{'Content-Type': 'application/json','Authorization':`Bearer asdadasd`}
        )
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    document.body.removeChild(container);
    container = null;
});

describe("TreatmentCenter Page",()=>{
    // 생활치료센터 페이지가 Mount 및 useEffect[] 테스트
    test("Mount TreatmentCenter And Effect is Succeed",async ()=>{

        const{ getByText } = render(
            <AlertStore>
                <TitleStore>
                    <BrowserRouter>
                        <TreatmentCenter/>
                    </BrowserRouter>
                </TitleStore>
                <HcAlert />
            </AlertStore>
            ,container)


        await waitFor(()=>{
            expect(getByText("test센터0")).toBeInTheDocument();
        })
        await waitFor(()=>{
            expect(getByText("Test대학교병원")).toBeInTheDocument();
        })
    })

    // 생활치료센터 페이지 검색 테스트
    test("Click Search Button is Succeed",async ()=>{

        const{ getByText, getByTestId } = render(
            <AlertStore>
                <TitleStore>
                    <BrowserRouter>
                        <TreatmentCenter/>
                    </BrowserRouter>
                </TitleStore>
                <HcAlert />
            </AlertStore>
            ,container)

        await waitFor(()=>{
            expect(getByText("test센터0")).toBeInTheDocument();
        })
        await waitFor(()=>{
            expect(getByText("Test대학교병원")).toBeInTheDocument();
        })

        const centerId=getByTestId('centerId');
        centerId.value='C001'


        const searchButton = getByText('검색');

        fireEvent.click(searchButton);

        await waitFor(()=>{
            expect(getByText("test센터1")).toBeInTheDocument();
        })

    })

    // 생활치료센터 페이지 검색 테스트
    test("Enter Key Search Button is Succeed",async ()=>{

        const{ getByText, getByTestId } = render(
            <AlertStore>
                <TitleStore>
                    <BrowserRouter>
                        <TreatmentCenter/>
                    </BrowserRouter>
                </TitleStore>
                <HcAlert />
            </AlertStore>
            ,container)

        await waitFor(()=>{
            expect(getByText("test센터0")).toBeInTheDocument();
        })
        await waitFor(()=>{
            expect(getByText("Test대학교병원")).toBeInTheDocument();
        })

        const centerId=getByTestId('centerId');
        centerId.value='C001'

        fireEvent.keyUp(centerId,{keyCode:13});

        await waitFor(()=>{
            expect(getByText("test센터1")).toBeInTheDocument();
        })

    })


    // 생활치료센터 페이지 생활치료센터 디테일 테스트
    test("Get TreatmentCenter Detail Data is Succeed",async ()=>{

        const{ debug,getByTestId, getByText, getByRole } = render(
            <AlertStore>
                <TitleStore>
                    <BrowserRouter>
                        <TreatmentCenter/>
                    </BrowserRouter>
                </TitleStore>
                <HcAlert />
            </AlertStore>
            ,container)


        await waitFor(()=>{
            expect(getByText("test센터0")).toBeInTheDocument();
        })
        await waitFor(()=>{
            expect(getByText("Test대학교병원")).toBeInTheDocument();
        })

        const testRow = getByText('test병원0');

        fireEvent.click(testRow);


        await waitFor(()=>{
            const centerId=getByTestId('detailId');
            expect(centerId).toHaveValue('C000');
            debug()
        })

    })

    // 신규버튼
    test("TreatmentCenter DetailData Clear",async ()=>{
        const{ debug,getByTestId, getByText, getByRole } = render(
            <AlertStore>
                <TitleStore>
                    <BrowserRouter>
                        <TreatmentCenter/>
                    </BrowserRouter>
                </TitleStore>
                <HcAlert />
            </AlertStore>
            ,container)

        const detailId=getByTestId('detailId');
        detailId.value = 'detailId'
        const detailNm=getByTestId('detailNm');
        detailNm.value = 'detailNm'
        const detailLocation=getByTestId('detailLocation');
        detailLocation.value = 'detailLocation'
        const detailHospital=getByText("선택");
        detailHospital.value = 'Detail'

        const clearButton = getByText('신규');
        fireEvent.click(clearButton);

        await waitFor(()=>{
            expect(detailHospital).toHaveTextContent('선택');
            expect(detailId).toHaveValue('');
            expect(detailNm).toHaveValue('');
            expect(detailLocation).toHaveValue('');
        })
    })


    // 신규 생활치료센터 생성
    test("Create New TreatmentCenter",async ()=>{

        const{ getByText } = render(
            <AlertStore>
                <TitleStore>
                    <BrowserRouter>
                        <TreatmentCenter/>
                    </BrowserRouter>
                </TitleStore>
                <HcAlert />
            </AlertStore>
            ,container)


        await waitFor(()=>{
            expect(getByText("test센터0")).toBeInTheDocument();
        })
        await waitFor(()=>{
            expect(getByText("Test대학교병원")).toBeInTheDocument();
        })

        // const detailId=getByTestId('detailId');
        // detailId.value = 'detailId'
        // const detailNm=getByTestId('detailNm');
        // detailNm.value = 'detailNm'
        // const detailLocation=getByTestId('detailLocation');
        // detailLocation.value = 'detailLocation'
        // const detailHospital=getByText("선택");
        // detailHospital.value = 'Detail'

    })
});
