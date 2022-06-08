import React, {useEffect, useState} from 'react';
import {Modal} from "react-bootstrap";
import TreatmentCenterApi from "../Apis/TreatmentCenterApi";
import ReactTable from "./ReactTable";
function TreatmentCenterModal({treatmentCenterModalObject,handleClose}) {
    const[selectedData,setSelectedData] = useState([]);
    const makeSelectedData = (data,mode) =>{
        if(mode === 'add'){
            setSelectedData(
                [...selectedData,data]
            )
        }
        if(mode === 'except'){
            setSelectedData(
                selectedData.filter(value => value.centerId !== data.centerId)
            )
        }
    }
    const comCdDetailColumn = [
        {
            Header: '선택',
            accessor: 'header',
            editElement:treatmentCenterModalObject.headerElement,
            editEvent:makeSelectedData
        },
        {Header: '치료센터ID', accessor: 'centerId'  },
        {Header: '치료센터명', accessor: 'centerNm'   },
        {Header: '위치', accessor: 'centerLocation'},
        {Header: '병원명', accessor: 'hospitalNm'   }
    ]
    const treatmentCenterApi = new TreatmentCenterApi();
    const [treatmentCenterList,setTreatmentCenterList] = useState([]);
    useEffect(()=>{
        treatmentCenterApi.select().then(({data}) =>setTreatmentCenterList(data.result));
    },[])
    return (
        <Modal show={treatmentCenterModalObject.show}
               onHide={handleClose}
               className={'lifecenterModal'}
               dialogClassName={'modal-dialog-centered modal-dialog-scrollable'}
        >
            <Modal.Header closeButton>
                <Modal.Title>생활치료센터</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="table-responsive">
                    <ReactTable tableHeader={comCdDetailColumn} tableBody={treatmentCenterList} customTableStyle={'table table-striped table-hover'}/>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button
                    type="button"
                    className="btn btn-pr4"
                    onClick={()=>console.log(selectedData)}
                >선택</button>
            </Modal.Footer>
        </Modal>
    );
}

export default TreatmentCenterModal;