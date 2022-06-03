import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import Error404 from "./Pages/Error/Error404";
import Login from "./Pages/Login/Login";
import Layouts from "./Layouts/Layouts";
import TitleStore from "./Providers/TitleContext";
import TreatmentCenter from "./Pages/Common/TreatmentCenter";
import TokenMethod from "./Apis/Token";
import AlertStore from "./Providers/AlertContext";
import Item from "./Pages/Common/Item";

function App() {

    // Interval Clear 시 사용하려고 선언
    const [tokenInterval,setTokenInterval ] = useState(null);

    const [hide,setHide ] = useState(true);

    // 로그인 성공시 또는 RememberYn 이 Y 일때 MainPage 또는 입력한 URL 로 이동하게 하기 위해 선언
    const location = useLocation();
    const navigate = useNavigate();

    // // 토큰 상태 및 RememberYn 체크
    const checkedTokenAndRememberMe = () => {
        TokenMethod.Status()
            .then(({data})=> {
                const { tokenStatus, rememberYn }=data;
                // 토큰이 유효하면 토큰을 재발급 받고 Interval 실행 및 입력한 URL 페이지로 이동
                if( tokenStatus === '00'){ // 토큰 유효
                    // 토큰 재발급
                    TokenMethod.Reissue();
                    // 메인페이지 또는 입력한 URL 로 이동
                    navigate(location.pathname === '/'? '/treatmentCenter':location.pathname);
                    // Interval 실행
                    setTokenInterval(setInterval(()=>{
                        TokenMethod.Reissue();
                    },1800000))

                }
                else if( tokenStatus === '80'){ // 토큰 만료
                    if(rememberYn === 'Y'){ // 토큰 만료시 로그인 유지가 Y 이면 메인(입력한 URL) or 로그인
                        // 토큰 재발급
                        TokenMethod.Reissue();
                        // 메인페이지로 이동
                        navigate(location.pathname === '/'? '/treatmentCenter':location.pathname);
                    }
                    else { // 토큰 만료시 로그인 유지가 N 이면 로그인 페이지로 이동
                        setHide(false);
                        navigate('/') // 로그인 페이지로 이동
                    }
                }
                //그 외
                else{
                    setHide(false);
                    navigate('/') // 로그인 페이지로 이동
                }
            })
            .catch(()=> {
                setHide(false);
                navigate('/') // 로그인 페이지로 이동
            })
    }

    //로그인 페이지 처음 접근시 RememberYn 이 Y 인지 체크
    useEffect(()=>{
        checkedTokenAndRememberMe();
    },[]);
    return (
        <AlertStore>
            <TitleStore>
                <Routes>
                        <Route exact path={'/'} element={hide || <Login setTokenInterval={setTokenInterval} />}/>
                            <Route element={<Layouts interval={tokenInterval} setHide={setHide}/>}>
                                <Route exact path={'/treatmentCenter'} element={<TreatmentCenter/>}/>
                                <Route exact path={'/item'} element={<Item/>}/>
                            </Route>
                        <Route exact path={'*'} element={<Error404/>}/>
                </Routes>
            </TitleStore>
        </AlertStore>
    );
}

export default App;
