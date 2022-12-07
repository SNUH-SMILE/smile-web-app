import React, {useEffect, useRef, useState, Fragment} from 'react';
import OTSessionPublisher from "./OTSessionPublisher";
import OTSessionSubcriber from "./OTSessionSubcriber";

import TeleHelthApi from "../Apis/TeleHelthApi";
function VideoPopup() {
    const [popupState,setPopupState] = useState(false);
    const teleHelthApi = new TeleHelthApi();
    const popup = ()=>{
        // window.open("videoPopup.jsx","",'width:800px, height:800px')
        setPopupState(true);
    }
    const handledCloseVideoPopup =() =>{
        setPopupState(false);
    }
    const [api, setApi] = useState(0);
    useEffect(() => {
       test()
    },[]);

    const test = async ()=>{
        teleHelthApi.select()
            .then(({data}) => {         console.log(data)
                if (data.code === '00') {

                    setApi({
                        "officerToken":data.result.officerToken
                        ,"apiKey":data.result.apiKey
                        ,"sessionId":data.result.sessionId
                    });
                    console.log(api)
                }else {
                    alert(data.message);
                }
            })
    }

    const chatArea = useRef();
    const screenShare = useRef();
    const screenShareOn = useRef();
    const openChat = ()=>{
        chatArea.current.classList.toggle('chat')
    }

    const openScreenShare = ()=>{
        screenShare.current.classList.toggle('screenShare')
        screenShareOn.current.classList.toggle('screenShareOn')
    }


    return(
        <div>
            <div className="modal-content" style={{height:"100vh"}}>
                <div style={{height:"100vh"}}>
                    <div style={{height:"98%"}}>
                        <main className="flex_layout_dashboard" style={{padding:"8px",background: "whitesmoke",height:"98%"}}>
                            <div className="row video" ref={chatArea}>
                                <div className="screen" ref={screenShareOn}>
                                    <div className="card indiv tab3" style={{width:"100%"}}>
                                        <div className="header d-flex">
                                            <h5 className="title">화면공유</h5>

                                        </div>
                                    </div>
                                </div>
                                <div className="col" ref={screenShare}>
                                    <div className="card indiv tab3">
                                        <div className="header d-flex">
                                            <h5 className="title">의사화면</h5>
                                        </div>
                                        <div className="body">
                                            <div className="tab-content" id="pills-tabContent">
                                                <div className="tab-pane fade show active" id="pills-cont1" role="tabpanel">
                                                    <Fragment>
                                                        {api.officerToken ?
                                                            <OTSessionPublisher
                                                                token={api.officerToken}
                                                                apiKey={api.apiKey}
                                                                sessionId={api.sessionId}
                                                            ></OTSessionPublisher>
                                                            : <div></div>
                                                        }
                                                    </Fragment>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card indiv history">
                                        <div className="header d-flex">
                                            <h5 className="title">환자화면</h5>
                                        </div>
                                        <div className="body">
                                            <Fragment>
                                                {api.officerToken ?
                                                    <OTSessionSubcriber
                                                        token={api.officerToken}
                                                        apiKey={api.apiKey}
                                                        sessionId={api.sessionId}
                                                    ></OTSessionSubcriber>
                                                    : <div></div>
                                                }
                                            </Fragment>

                                        </div>
                                    </div>
                                    <div className="card indiv alarm">
                                        <div className="header d-flex">
                                            <h5 className="title">채팅</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </main>
                    </div>
                </div>
                <div>
                    <button onClick={openChat}>채팅</button>
                    <button onClick={openScreenShare}>화면공유</button>
                  {/*  <button onClick={test}>테스트</button>
*/}
                </div>
            </div>
        </div>


    )
}export default VideoPopup;
