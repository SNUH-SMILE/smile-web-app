import React from 'react';
import PropTypes from "prop-types";

function TreatmentCenterTr({centerId, centerNm, centerLocation, hospitalNm}) {
    return (
        <tr>
            <td className="cid">{centerId}</td>
            <td className="cname">{centerNm}</td>
            <td className="caddr text-start">{centerLocation}</td>
            <td className="hname">{hospitalNm}</td>
        </tr>
    );
}

TreatmentCenterTr.propTypes = {
    centerId:PropTypes.string.isRequired,
    centerNm:PropTypes.string.isRequired,
    centerLocation:PropTypes.string.isRequired,
    hospitalNm:PropTypes.string.isRequired,
}
export default TreatmentCenterTr;