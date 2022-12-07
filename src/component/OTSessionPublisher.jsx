import ConnectionStatus from "../Utils/VedioChat/ConnectionStatus";
import Publisher from "../Utils/VedioChat/Publisher";
import Subscriber from "../Utils/VedioChat/Subscriber";
import React, {useState} from "react";
import { OTStreams, preloadScript, OTSession } from "opentok-react";
function OTSessionPublisher({token,sessionId,apiKey}) {
    const state = useState({
        error: null,
        connected: false
    });

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
            <OTSession
                apiKey={apiKey}
                sessionId={sessionId}
                token={token}
                eventHandlers={sessionEvents}
                onError={onError}
            >
                {error ? <div style={{color: "red"}}>{error}</div> : null}
                <ConnectionStatus connected={state.connected}/>
                <Publisher/>
            </OTSession>
        </div>
    )
}export default preloadScript(OTSessionPublisher);