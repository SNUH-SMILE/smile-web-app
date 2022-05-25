import React, { useContext } from 'react';
import PropTypes from "prop-types";
import {TitleContext} from "../Providers/TitleContext";

function Header({wrapper}) {
    const handledSideBar = ()=>{
        wrapper.current.classList.toggle('toggled');
    }
    const context = useContext(TitleContext);
    const {title} = context;
    return (
        <nav className="page-head">
            <button type="button" id="menu-toggle" onClick={handledSideBar}/>
            <h2 className="page-title">{title}</h2>
            {/* TODO: 로그아웃 기능 */}
            <a href="#" className="logout">
                <span>로그아웃</span>
                <i/>
            </a>
        </nav>
    );
}

Header.propTypes = {
    wrapper: PropTypes.object.isRequired
}
export default Header;
