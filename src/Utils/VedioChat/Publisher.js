import React from "react";
import { OTPublisher } from "opentok-react";

import Checkbox from "./Checkbox";

export default function Publisher() {
    const [error, setError] = React.useState(null);
    const [audio, setAudio] = React.useState(true);
    const [video, setVideo] = React.useState(true);
    const [videoSource, setVideoSource] = React.useState("camera");

    const setChatAudio = (audio) => {
        setAudio(audio);
    };

    const setChatVideo = (video) => {
        setVideo(video);
    };

    const changeVideoSource = (videoSource) => {
        videoSource !== "camera"
            ? setVideoSource("camera")
            : setVideoSource("screen");
    };

    const onError = (err) => {
        setError(`Failed to publish: ${err.message}`);
    };

    return (
        <div>
            Publisher
            <OTPublisher
                properties={{
                    publishAudio: audio,
                    publishVideo: video,
                    videoSource: videoSource === "screen" ? "screen" : undefined
                }}
                onError={onError}
            />
            <Checkbox label="Share Screen" onChange={changeVideoSource} />
            <Checkbox
                label="Publish Audio"
                initialChecked={audio}
                onChange={setChatAudio}
            />
            <Checkbox
                label="Publish Video"
                initialChecked={video}
                onChange={setVideo}
            />
        </div>
    );
}
