import {createContext, useState} from "react";

export const AlertContext = createContext({});

/**
 * Alert
 */
const AlertStore = ({children}) => {
    const [ showAlert, setShowAlert ] = useState(false);
    const [ alertTitle, setAlertTitle ] = useState('알림');
    const [ alertContent, setAlertContent ] = useState('정보');
    const [ isConfirm, setIsConfirm ] = useState(false);
    const [ confirmCallback, setConfirmCallback ] = useState(null);
    return(
        <AlertContext.Provider value={{
            showAlert, setShowAlert,
            alertTitle, setAlertTitle,
            alertContent, setAlertContent,
            isConfirm, setIsConfirm,
            confirmCallback, setConfirmCallback
        }}>
            {children}
        </AlertContext.Provider>
    )
}

export default AlertStore;