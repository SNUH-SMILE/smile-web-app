import React, {useEffect, useRef, useState, Fragment} from 'react';
import ConnectionStatus from "../Utils/VedioChat/ConnectionStatus";
import Publisher from "../Utils/VedioChat/Publisher";
import Subscriber from "../Utils/VedioChat/Subscriber";
import { OTStreams, preloadScript, OTSession } from "opentok-react";

function VideoPopup() {
    const [popupState,setPopupState] = useState(false);
    const popup = ()=>{
        // window.open("videoPopup.jsx","",'width:800px, height:800px')
        setPopupState(true);
    }
    const handledCloseVideoPopup =() =>{
        setPopupState(false);
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


    const [connected, setConnected] = useState(false);
    const [error, setError] = useState(null);

    const sessionEvents = {
        sessionConnected: () => {
            setConnected(true);
        },

        sessionDisconnected: () => {
            setConnected(false);
        }
    };

    const onError = (err) => {
        setError(`Failed to connect to ${err.message}`);
    };
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
                                                    비디오나오는곳

                                                    <Fragment>
                                                        <OTSession
                                                            apiKey="47595911"
                                                            sessionId="1_MX40NzU5NTkxMX5-MTY2OTI3NTEzOTA4N35CUmNYaUdYdXBGTG5wSmhFYnJCSEduc0R-fg"
                                                            token="T1==cGFydG5lcl9pZD00NzU5NTkxMSZzaWc9YjZmMjFiYjIwYjgwNmJlYmY4ZWE5MWEyODBjZDNjODg0OThhMTA3NDpzZXNzaW9uX2lkPTFfTVg0ME56VTVOVGt4TVg1LU1UWTJPVEkzTlRFek9UQTROMzVDVW1OWWFVZFlkWEJHVEc1d1NtaEZZbkpDU0VkdWMwUi1mZyZjcmVhdGVfdGltZT0xNjY5Mjc1NDE3Jm5vbmNlPS04ODU4OTc3NTImcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTY2OTM2MTgxNw=="
                                                            eventHandlers={sessionEvents}
                                                            onError={onError}
                                                        >
                                                            {error ? <div style={{ color: "red" }}>{error}</div> : null}

                                                            <Publisher />
                                                            <OTStreams>
                                                                <Subscriber />
                                                            </OTStreams>
                                                        </OTSession>
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
                                            <ul className="scrollbar" role={'noticeList'}>
                                            </ul>
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
                </div>
            </div>
        </div>


    )
}export default preloadScript(VideoPopup);
