import {useNavigate} from "react-router-dom";

const useMoveAdmissionDetail = () =>{
    const navigate = useNavigate();
    const onMove = (id)=>{
        navigate('/admission/detail',{state:{id:id}})
    }
    return {onMove}
}

export default useMoveAdmissionDetail;