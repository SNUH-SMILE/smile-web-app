import React from 'react';
import SMILELogo from '../Assets/Images/main_logo.png';
import {NavLink, useLocation} from "react-router-dom";

const onClickParent = (e) =>{
    if(e.currentTarget.getAttribute('aria-expanded') === 'false'){
        e.currentTarget.setAttribute('aria-expanded', 'true')
        e.currentTarget.nextElementSibling.classList.add('show')
    }
    else{
        e.currentTarget.setAttribute('aria-expanded', 'false')
        e.currentTarget.nextElementSibling.classList.remove('show')
    }

}

const menu = [
    {
        parent: '공통관리',
        child: [
            {name: '공통코드', url: '/comCd'},
            {name: '생활치료센터', url: '/treatmentCenter'},
            {name: '사용자관리', url: '/user'},
            {name: '측정항목관리', url: '/item'},
            {name: '생활치료센터 환자 현황', url: '/treatmentCenterPatient'},
            {name: '자가격리자 환자 현황', url: '/isolationPatient'},
            {name: '문의사항', url: '/qna'},
            {name: '생활치료센터 대시보드', url: '/dashboard/center'},
            {name: '자택격리환자 대시보드', url: '/dashboard/quarantine'},
        ]
    }


]
function Side() {
    const currentUrl = useLocation();
    return (
        <aside className="bg-white" id="sidebar-wrapper">
            <div className="sidebar-heading">
                <img src={SMILELogo} alt="SMILE 보호관리"/>
            </div>
            <nav className="navbar-light">
                <ul className="gnb navbar-nav">
                    {menu.map((menu,idx) => {
                        let current = menu.child.find(value => value.url === currentUrl.pathname)
                        return (
                            <li className="py-1" key={menu.parent}>
                                <a className="nav-link sidebar-link" data-bs-toggle="collapse" href={"#collapse"+idx}
                                   role="button"
                                   onClick={(e)=>onClickParent(e,"#collapse"+idx)}
                                   aria-controls={"collapse" + idx}
                                   aria-expanded={current ? 'true' : 'false'}

                                >
                                    <span className="mname">{menu.parent}</span>
                                    <span className="right-icon ms-auto">
                                    <i/>
                                </span>
                                </a>
                                <div className={current ? 'collapse show' : 'collapse'} id={"#collapse"+idx} role={"collapse"+idx}>
                                    <div className="card my-2">
                                        <ul className="submenu navbar-nav my-2 px-3">
                                            {menu.child.map((value,idx) => {
                                                return (
                                                    <li key={value.url}>
                                                        <NavLink to={value.url} className="nav-link fs12">{value.name}</NavLink>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </aside>
    );
}

export default React.memo(Side);
