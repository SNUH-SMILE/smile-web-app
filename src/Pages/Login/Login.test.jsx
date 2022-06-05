import Login from "./Login";
import AlertStore from "../../Providers/AlertContext";
import {BrowserRouter} from "react-router-dom";
import {fireEvent, render} from "@testing-library/react";
import HcAlert from "../../component/HCAlert";

let container;

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    document.body.removeChild(container);
    container = null;
});


describe("Login Page",()=>{

    // 아이디가 공백일때
    test('Id Input is Null',  () => {
        const{ getByPlaceholderText, getByText } = render(
            <AlertStore>
                <BrowserRouter>
                    <Login setTokenInterval={()=> null}/>
                </BrowserRouter>
                <HcAlert />
            </AlertStore>
            ,container)

        // 아이디 Input의 Value 가 '' 인지 체크
        const id = getByPlaceholderText('Email');
        expect(id.value).toBe('');

        // 로그인 버튼클릭
        const loginButton = getByText('로그인');
        fireEvent.click(loginButton);

        // "아이디가 공백입니다." 문구가 화면에 출력되었는지 체크
        const alert = getByText('아이디가 공백입니다.');
        expect(alert).toBeInTheDocument();

        // Alert 확인 버튼 클릭 후 "아이디가 공백입니다." 문구가 화면에서 사라졌는지 체크
        const confirmButton = getByText('확인');
        fireEvent.click(confirmButton);
        expect(alert).not.toBeInTheDocument();
    })

    // 패스워드가 공백일때
    test('Password Input is Null',  () => {

        const{ getByPlaceholderText, getByText } = render(
            <AlertStore>
                <BrowserRouter>
                    <Login setTokenInterval={()=> null}/>
                </BrowserRouter>
                <HcAlert />
            </AlertStore>
            ,container)

        // 아이디가 공백인지 먼저 체크하기 때문에 아이디 Value 에 test 삽입
        const id = getByPlaceholderText('Email');
        id.value = 'test'

        // 패스워드 Input의 Value 가 '' 인지 체크
        const password = getByPlaceholderText('Password');
        expect(password.value).toBe('');

        // 로그인 버튼 클릭
        const loginButton = getByText('로그인');
        fireEvent.click(loginButton);

        // "비밀번호가 공백입니다." 문구가 화면에 출력되었는지 체크
        const alert = getByText('비밀번호가 공백입니다.');
        expect(alert).toBeInTheDocument();

        // Alert 확인 버튼 클릭 후 "비밀번호가 공백입니다." 문구가 화면에서 사라졌는지 체크
        const confirmButton = getByText('확인');
        fireEvent.click(confirmButton);
        expect(alert).not.toBeInTheDocument();
    })
})