import React from 'react';
import SMILELogo from '../Assets/Images/main_logo.png';
import {NavLink} from "react-router-dom";

function Side() {
    return (
        <aside className="bg-white" id="sidebar-wrapper">
            <div className="sidebar-heading">
                <img src={SMILELogo} alt="SMILE 보호관리"/>
            </div>
            <nav className="navbar-light">
                <ul className="gnb navbar-nav">
                    {/* 1뎁스 */}
                    <li className="py-1">
                        <a className="nav-link sidebar-link" data-bs-toggle="collapse" href="#collapse1" role="button"
                           aria-expanded="false" aria-controls="collapse1">
                            <span className="mname">공통 관리</span>
                            <span className="right-icon ms-auto">
                                <i/>
                            </span>
                        </a>
                        <div className="collapse" id="collapse1">
                            <div className="card my-2">
                                <ul className="submenu navbar-nav my-2 px-3">
                                    {/* 2뎁스 */}
                                    <li>
                                        {/* NavLink 에 to Path 와 Location Path 맞춰주면 active Class 자동으로 들어갑니다*/}
                                        <NavLink to={'/treatmentCenter'} className="nav-link fs12">생활치료센터 관리</NavLink>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </li>

                    <li className="py-1">
                        <a className="nav-link sidebar-link" data-bs-toggle="collapse" href="#collapse2" role="button"
                           aria-expanded="false" aria-controls="collapse1">
                            <span className="mname">생활치료센터 관리</span>
                            <span className="right-icon ms-auto">
                                <i/>
                            </span>
                        </a>
                        <div className="collapse" id="collapse2">
                            <div className="card my-2">
                                <ul className="submenu navbar-nav my-2 px-3">
                                    <li>
                                        <NavLink to={'/home'} className="nav-link fs12">대쉬보드</NavLink>
                                    </li>
                                    {/* 2뎁스*/}
                                    <li>
                                        <NavLink to={'/home1'} className="nav-link fs12">환자 상세</NavLink>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </li>


                </ul>
            </nav>
        </aside>
    );
}

export default Side;
