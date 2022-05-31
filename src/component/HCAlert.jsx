import React, {useContext} from 'react';
import {Alert, Modal} from "react-bootstrap";
import {AlertContext} from "../Providers/AlertContext";
import styled from "styled-components";
const AlertHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;
  background: #3b8fd5;
  font-size: 1.35rem;
  color: white;
  padding: 1rem;
`

const AlertBody = styled.div`
  width: 100%;
  height: 100%;
  background: white;
  font-size: 1rem;
  color: black;
  padding: 1rem;
`

const AlertCancelBtn = styled.button`
  background:#fff; 
  color:#666; 
  border:solid 1px #666;
`
const AlertConfirmBtn = styled.button`
  background:var(--primary-color4); 
  color:#fff; 
  border:solid 1px var(--primary-color4);
  &:hover{
    color:#fff;
  }
`
function HcAlert() {
    const alertContext = useContext(AlertContext);
    const {showAlert,setShowAlert, alertTitle, setAlertTitle,alertContent,isConfirm, setIsConfirm,confirmCallback, setConfirmCallback} = alertContext;
    const handleClose = () => {
        setShowAlert(false);
        setAlertTitle('알림');
        setIsConfirm(false);
        setConfirmCallback(null);
    };
    return (
        <Modal className={'border-0'} show={showAlert} >
            <Alert className={'m-0 p-0 border-0'} onClose={handleClose} dismissible>
                <AlertHeader>{alertTitle}</AlertHeader>
                <AlertBody >
                    <p>
                        {alertContent}
                    </p>
                    {isConfirm ?
                    <>
                        <hr />
                        <div className="d-flex justify-content-end">
                            <AlertConfirmBtn className={"me-2 btn"} onClick={()=>{
                                confirmCallback()
                                handleClose()
                            }} > 확인 </AlertConfirmBtn>
                            <AlertCancelBtn className={'btn'} onClick={() => handleClose()}> 취소 </AlertCancelBtn>
                        </div>
                    </> :<>
                            <hr />
                            <div className="d-flex justify-content-end">
                                <AlertCancelBtn className={'btn'} onClick={() => handleClose()} > 확인 </AlertCancelBtn>
                            </div>
                        </>
                    }
                </AlertBody>
            </Alert>
        </Modal>
    )
}

export default HcAlert;