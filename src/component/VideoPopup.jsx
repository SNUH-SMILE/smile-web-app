import React, {useEffect, useRef, useState, Fragment} from 'react';
import OTSessionPublisher from "./OTSessionPublisher";
import OTSessionSubcriber from "./OTSessionSubcriber";
import OTSessionText from "./OTSessionText";

import TeleHelthApi from "../Apis/TeleHelthApi";
import styled from "styled-components";

const ButtonH34 = styled.button`
  height: 34px;
`
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
    const [chat,setChat] = useState(false);
    const openChat = ()=>{
       // setChat(true);
        chatArea.current.classList.toggle('chat')
    }

    const [openScreenShare,setOpenScreenShare] = useState(false);
    const [screenValue,setScreenValue] = useState("");

    const [publicWidth,setPublicWidth] = useState('50vh');
    const [publicHeight,setPublicHeight] = useState('50vh');
    const handleScreenShare = ()=>{
        setPublicWidth('10vh')
        setPublicHeight('10vh')
        console.log(publicWidth)
        screenValue ==="screen" ? setScreenValue(""):setScreenValue("screen")
        setOpenScreenShare(true);
        screenShare.current.classList.toggle('screenShare')
        screenShareOn.current.classList.toggle('screenShareOn')
    }

    const [video, setVideo] = useState(false);
    const [audio, setAudio] = useState(false);
    const setChatVideo =() =>{
        video? setVideo(false) : setVideo(true);
    }
    const setChatAudio =() =>{
       audio? setAudio(false) : setAudio(true);
    }
    const msg = useRef();

    const handleMsg = (e) =>{
        console.log(msg.current.value)
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
                                        <div className="header d-flex" style={{width:"100%"}}>
                                            <div style={{width:"100%"}}>
                                                {api.sessionId}★
                                                {api.officerToken}
                                            <Fragment>
                                                {api.officerToken && openScreenShare ?
                                                    <OTSessionPublisher
                                                        width="100vh"
                                                        height="100vh"
                                                        token={api.officerToken}
                                                        apiKey={api.apiKey}
                                                        sessionId={api.sessionId}
                                                        videoSource ={screenValue}
                                                        video={true}
                                                        audio={false}
                                                    ></OTSessionPublisher>
                                                    : <div></div>
                                                }
                                            </Fragment>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col" ref={screenShare}>
                                    <div className="card indiv tab3">
                                      {/*  <div className="header d-flex">
                                            <h5 className="title">의사화면</h5>
                                        </div>*/}
                                        <div className="body">
                                            <div className="tab-content" id="pills-tabContent">
                                                <div className="tab-pane fade show active" id="pills-cont1" role="tabpanel">
                                                    <Fragment>
                                                        {api.officerToken ?
                                                            <OTSessionPublisher
                                                                width={publicWidth}
                                                                height={publicHeight}
                                                                video={video}
                                                                audio={audio}
                                                                token={api.officerToken}
                                                                apiKey={api.apiKey}
                                                                sessionId={api.sessionId}
                                                                videoSource =""
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
                                        <div className="body">
                                            <Fragment>
                                                {api.officerToken && chat?
                                                    <OTSessionText
                                                        token={api.officerToken}
                                                        apiKey={api.apiKey}
                                                        sessionId={api.sessionId}
                                                    ></OTSessionText>
                                                    : <div></div>
                                                }
                                            </Fragment>

                                        </div>

                                    </div>
                                </div>
                            </div>

                        </main>
                    </div>
                </div>
                <div>
                    <ButtonH34 type="button" className="btn btn-primary" onClick={setChatVideo}>비디오</ButtonH34>
                    <ButtonH34 type="button" className="btn btn-primary" onClick={setChatAudio}>음소거</ButtonH34>
                    <ButtonH34 type="button" className="btn btn-primary" onClick={openChat}>채팅</ButtonH34>
                    <ButtonH34 type="button" className="btn btn-primary" onClick={handleScreenShare}>화면공유</ButtonH34>
                  {/*  <button onClick={test}>테스트</button>
*/}
                </div>
            </div>
        </div>


    )
}export default VideoPopup;
