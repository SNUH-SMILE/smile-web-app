import React, {useRef} from 'react';
import '../../Assets/Styles/Login/login.css';
import logo from '../../Assets/Images/Login/login_logo.png';
import background from '../../Assets/Images/Login/login_img.png';
import UserLoginInfo from "./UserLoginInfo";
import axios from "axios";

function Login() {
    //Id 입력시 Validation 이 없기 때문에 UseState 를 사용하지 않고 UseRef 사용
    const idInput = useRef();  //ID
    const passInput = useRef();  //Pass
    const rememberYnChecked = useRef();  //Remember Me

    //로그인 요청
    const handledLogin = () => {
        axios.post(process.env.REACT_APP_BASE_URL + '/login/checkLogin.ajax', null, {
            params: {
                ...new UserLoginInfo(
                    idInput.current.value,  // ID
                    passInput.current.value, // Pass
                    rememberYnChecked.current.checked ? 'Y' : 'N') //Remember Me
            }
        })
            .then(data => console.log(data))
            .catch(e => console.log(e))
    }

    return (
        <div className="loginBody">
            <div className="container login">
                <div className="row">
                    <div className="col-lg-12 col-xl-12 card flex-row mx-auto px-0">
                        <div className="card-body">
                            <h4 className="title logo"><img src={logo} alt="login"/></h4>
                            <form action="" className="form-box">
                                <label htmlFor="inputEmail" className="form-label mt-4">아이디</label>
                                <div className="form-input email">
                                    <input type="text"
                                           className="form-control"
                                           placeholder="Email"
                                           ref={idInput}
                                    />
                                </div>
                                <label htmlFor="inputPassword" className="form-label mt-3">비밀번호</label>
                                <div className="form-input pass">
                                    <input type="password"
                                           className="form-control"
                                           placeholder="Password"
                                           ref={passInput}
                                    />
                                </div>
                                <div className="form-check mt-2">
                                    <input type="checkbox"
                                           className="form-check-input"
                                           ref={rememberYnChecked}
                                    />
                                    <label className="form-check-label">
                                        로그인상태 유지
                                    </label>
                                </div>
                                <div className="mt-5 mb-5">
                                    <button type="button" className="btn btn-block" onClick={handledLogin}>로그인</button>
                                </div>
                            </form>
                        </div>
                        <div className="img-right">
                            <div className="img2"><img src={background} className="img-fluid" alt=""/></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;