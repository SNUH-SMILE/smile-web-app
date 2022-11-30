import React, {useEffect} from 'react';

function RecordCard({data}) {
    const { medicalSeq, medicalRecord  } = data;
    useEffect(()=>{
        document.querySelector('#record'+medicalSeq).focus()
    },[])
    return (
        <li tabIndex={-1} id={'record'+medicalSeq}>
            <div className="msg">
                {medicalRecord}
            </div>
            <div className="from d-flex">
                <span></span>
                <span className="ms-auto">{}</span>
            </div>
        </li>
    );
}

export default RecordCard;