import React from "react";
import { OTSubscriber } from "opentok-react";

import CheckBox from "./Checkbox";

export default function Publisher() {
    const [error, setError] = React.useState(null);
    const [audio, setAudio] = React.useState(true);
    const [video, setVideo] = React.useState(true);

    const setChatAudio = (audio) => {
        setAudio(audio);
    };

    const setChatVideo = (video) => {
        setVideo(video);
    };

    const onError = (err) => {
        setError(`Failed to publish: ${err.message}`);
    };

    return (
        <div className="subscriber">
            Subscriber
            {error ? <div style={{ color: "red" }}>{error}</div> : null}
            <OTSubscriber
                properties={{
                    showControls: true,
                    subscribeToAudio: audio,
                    subscribeToVideo: video
                }}
                onError={onError}
            />
            <CheckBox
                label="Subscribe to Audio"
                initialChecked={audio}
                onChange={setChatAudio}
            />
            <CheckBox
                label="Subscribe to Video"
                initialChecked={video}
                onChange={setChatVideo}
            />
        </div>
    );
}
