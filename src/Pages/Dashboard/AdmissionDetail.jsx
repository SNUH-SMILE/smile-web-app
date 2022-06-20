import React from 'react';
import {useLocation} from "react-router-dom";

function AdmissionDetail() {
    const locationStateLocation = useLocation();
    const locationState = locationStateLocation.state;

    return (
        <div>{locationState?.id}</div>
    );
}

export default AdmissionDetail;