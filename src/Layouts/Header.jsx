import React, { useContext } from 'react';
import PropTypes from "prop-types";
import {TitleContext} from "../Providers/TitleContext";
import AuthenticationApi from "../Apis/AuthenticationApi";
import {useNavigate} from "react-router-dom";

function Header({wrapper,interval, setHide}) {
    // 로그아웃시 로그인 페이지로 이동하기 위해 선언
    const navigate = useNavigate()

    // 로그아웃
    const handledLogOut = () =>{
        AuthenticationApi.logOut().then(() => {
            localStorage.setItem('Authorization', null);
            clearInterval(interval);
            setHide(false);
            navigate('/');
        });
    }

    // 사이드바 Collapse 토글
    const handledSideBar = ()=> {
        wrapper.current.classList.toggle('toggled');
    }
    const context = useContext(TitleContext);
    const {title} = context;
    return (
        <nav className="page-head">
            <button type="button" id="menu-toggle" onClick={handledSideBar}/>
            <h2 className="page-title">{title}</h2>
            <button className="logout" onClick={handledLogOut}>
                <span>로그아웃</span>
                <i/>
            </button>
        </nav>
    );
}

Header.propTypes = {
    wrapper: PropTypes.object.isRequired,
    interval: PropTypes.number
}
export default Header;
