import React, {useContext, useEffect, useRef, useState} from 'react';
import UseSetPageTitle from "../../Utils/UseSetPageTitle";
import DashboardCard from "../../component/DashboardCard";
import {getLonginUserInfo} from "../../Apis/CommonCode";
import CenterDashboardApi from "../../Apis/CenterDashboardApi";
import {TitleContext} from "../../Providers/TitleContext";
import useAdmissionDetail from "../../Utils/useAdmissionDetail";

function CenterAdmissionBoard() {

    UseSetPageTitle('생활치료센터 대시보드', 'Center')

    const {onMove} = useAdmissionDetail()
    const palette = ['#228be6', '#90d094', '#f1b244', '#e85564', '#735fc9', '#ad7922', '#ffcf00', '#2822ad', '#ad2222', '#f06595'];
    const paletteNum = useRef(0);
    const [patientList, setPatientList] = useState([]);
    const centerDashboardApi = new CenterDashboardApi();

    const {setDashBoardData,setDashBoardFunc} = useContext(TitleContext);
    const selectPatientList = (centerId) => {
        getLonginUserInfo().then(({data}) => {
            centerDashboardApi.select('2', centerId ? centerId.target.value : data.result.mainCenterId)
                .then(({data}) => {
                    setPatientList(data.result.patientList)
                    setDashBoardData(data.result.header)

                });
        })
    }

    useEffect(() => {
        selectPatientList();
        setDashBoardFunc(()=>selectPatientList)
    }, [])


    return (
        <main className="dashboard">
            <div className="row">
                {
                    patientList === [] || patientList.map((value, idx) => {
                        if (idx <= 0) {
                            paletteNum.current = 0;
                        } else if (paletteNum.current >= palette.length - 1 && value.room !== patientList[idx - 1].room) {
                            paletteNum.current = 0;
                        } else if (idx >= 1 && value.room !== patientList[idx - 1].room) {
                            paletteNum.current++;
                        }
                        return (
                            <DashboardCard key={idx + value.patientNm + value.room}
                                           mode={'Center'}
                                           data={value}
                                           color={palette[paletteNum.current]}
                                           lightDisplay={'flex'}
                                           onClick={()=>onMove(value.admissionId)}
                            />
                        )
                    })
                }

            </div>
        </main>
    );
}

export default React.memo(CenterAdmissionBoard);