import React, { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import PatientLocationsApi from "../Apis/PatientLocationsApi";
import getToday from "../Utils/common";

function LocationModal({ locationModal, handledClose }) {
  const todayInput = useRef();
  const [resultDate, setResultDate] = useState("");
  const [locationData, setLocationData] = useState([]);
  const locationApi = new PatientLocationsApi();

  useEffect(() => {
    setLocationData(locationModal.data);
    if (locationModal.show) {
      todayInput.current.value = getToday();
      setResultDate(getToday());
    }
  }, [locationModal.show]);

  useEffect(() => {
    if (locationModal.admissionId && resultDate) {
      locationApi
        .update(locationModal.admissionId, resultDate)
        .then(({ data }) => {
          setLocationData({ ...data });
        });
    }
  }, [resultDate, locationModal.admissionId]);

  function onChangeDate(e) {
    setResultDate(e.target.value);
  }
  return (
    <Modal
      show={locationModal.show}
      onHide={() => handledClose()}
      className={"locationModal"}
      dialogClassName={
        "modal-dialog modal-dialog-centered modal-dialog-scrollable"
      }
    >
      <Modal.Header closeButton>
        <Modal.Title>{locationData.patientNm}/자택격리자</Modal.Title>
        <span className="divideLine">|</span>
        <span className="modalSubTitle">생년월일</span>
        <span className="headerText">
          {locationData.birthDate} ({locationData.age}/{locationData.sex})
        </span>
        <span className="modalSubTitle">환자번호</span>
        <span className="headerText">{locationData.patientId}</span>
        <span className="modalSubTitle">연락처</span>
        <span className="headerText">{locationData.cellPhone}</span>
      </Modal.Header>
      <Modal.Body>
        <div className="dateContainer">
          <span className="inputLabel">측정일</span>
          <input
            className="form-control date inputWidth"
            type="date"
            ref={todayInput}
            required
            onChange={onChangeDate}
          />
        </div>
        <div
          className="table-responsive"
          style={{ height: "600px", overflow: "scroll" }}
        >
          <table className="table table-borderless mt-3 alignCenter tHeader">
            <thead>
              <tr>
                <th>측정 시간</th>
                <th>위도</th>
                <th>경도</th>
              </tr>
            </thead>
            <tbody>
              {locationData.patientLocations &&
                locationData.patientLocations.map((value, idx) => (
                  <tr key={idx}>
                    <td>{value.resultDt}</td>
                    <td>{value.latitude}</td>
                    <td>{value.longitude}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </Modal.Body>
    </Modal>
  );
}
export default React.memo(LocationModal);
