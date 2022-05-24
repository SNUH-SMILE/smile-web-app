import {createContext, useState} from "react";

export const TitleContext = createContext({});

/**
 * 헤더에 현재 페이지 타이틀 Context
 */
const TitleStore = ({children}) => {
    const [ title, setTitle ] = useState('');

    return(
        <TitleContext.Provider value={{title, setTitle}}>
            {children}
        </TitleContext.Provider>
    )
}

export default TitleStore;