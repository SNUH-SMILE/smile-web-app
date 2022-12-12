import React, {useEffect, useRef, useState, Fragment} from 'react';
import { OTPublisher ,OTPublisherRef} from "opentok-react";

import Checkbox from "./Checkbox";

export default function Publisher({videoSource,video,audio,width,height}) {
    const [error, setError] = React.useState(null);
    const [height1, setHeight1] =useState();
    const [width1, setWidth1] =useState();

    useEffect(() => {
        setHeight1(height)
        setWidth1(width)
        console.log(width1);
        return()=> {
          console.log("과연")
        };
    });
    const onError = (err) => {
        setError(`Failed to publish: ${err.message}`);
    };



    return (
        <div>
            { width1 ?
                <OTPublisher
                    properties={{
                        width: width1,
                        height: height1,
                        publishAudio: audio,
                        publishVideo: video,
                        videoSource: videoSource === "screen" ? "screen" : undefined
                    }}
                    onError={onError}
                /> : <div></div>
            }
            {width1}
        </div>
    );
}
