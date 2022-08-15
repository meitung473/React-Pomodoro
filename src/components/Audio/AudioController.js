import React from "react";
import { createPortal } from "react-dom";
import soundData from "../../data/sound.json";

export default function AudioController({ refs }) {
    return createPortal(
        soundData.data.map(({ name, path }, i) => {
            return (
                <audio
                    key={name}
                    src={process.env.PUBLIC_URL + path}
                    ref={refs.current[i]}
                    preload="true"
                ></audio>
            );
        }),
        document.getElementById("audio-root")
    );
}
