import React, {useEffect, useRef} from 'react';
import {Outlet} from "react-router-dom";
import Side from "./Side";
import Header from "./Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import '../Assets/Styles/style.css';
import styled from "styled-components";
import PropTypes from "prop-types";

const LayoutBody = styled.div`
  background: #f5f5f5;
  min-width: 1400px;
`

function Layouts({interval,setHide}) {

    let wrapper = useRef();

    // 윈도우 ClientWidth 에 따라서 사이드바 Collapse 여부 설정
    const resize = () => {
        let windowClientWidth = document.querySelector('body').clientWidth;
        if (windowClientWidth <= 1400) {
            wrapper.current.classList.add('toggled');
        } else if (windowClientWidth > 1400) {
            wrapper.current.classList.remove('toggled');
        }
    };

    // 윈도우 ClientWidth 에 따라서 처음 로딩시 사이드바 Collapse 여부 설정
    useEffect(() => {
        resize();
    }, []);

    // 윈도우 ClientWidth 가 변경될 때 사이드바 Collapse 여부 설정
    window.onresize = function () {
        resize();
    };

    return (
        <LayoutBody>
            <div className="d-flex wrapper" ref={wrapper}>
                <Side/>
                <div id="page-content-wrapper">
                    <Header wrapper={wrapper} interval={interval} setHide={setHide}/>
                    <Outlet/>
                </div>
            </div>
        </LayoutBody>
    );
}


Layouts.propTypes = {
    interval: PropTypes.number
}
export default Layouts;
