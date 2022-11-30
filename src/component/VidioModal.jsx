import React, {useEffect, useRef, useState} from 'react';
import {Modal} from "react-bootstrap";
import RecordCard from "./RecordCard";
import NoticeCard from "./NoticeCard";
function VidioModal({video,handledClose}){
    const chatArea = useRef();
    const openChat = ()=>{
        chatArea.current.classList.toggle('chat')

    }
    return (
        <Modal show={video.show}
               className={'videoModal'}
               dialogClassName={'modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xlg'}
        >
            <div className="modal-content" style={{height:"1000px"}}>
            <Modal.Header>
                비디오
                <button type="button" className="ms-auto btn-close" />
            </Modal.Header>
            <Modal.Body>
                <div style={{height:"98%"}}>
                    <main className="flex_layout_dashboard" style={{padding:"8px",background: "whitesmoke",height:"98%"}}>
                        <div className="row history-alarm" ref={chatArea}>
                            <div className="col">
                                <div className="card indiv tab3">
                                    <div className="header d-flex">
                                        <h5 className="title">의사화면</h5>

                                    </div>
                                    <div className="body">
                                        <div className="tab-content" id="pills-tabContent">
                                            <div className="tab-pane fade show active" id="pills-cont1" role="tabpanel">
                                                비디오나오는곳
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
            </Modal.Body>
            <Modal.Footer>
                <button onClick={openChat}>채팅</button>
                <button>화면공유</button>

            </Modal.Footer>
            </div>
        </Modal>
    )
}
export default React.memo(VidioModal);