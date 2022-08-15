import React, { useEffect, useRef, useState, useMemo } from "react";

const audionum = 6;

const stopAlarm = (el) => () => {
    el.currentTime = 0;
    el.pause();
};
const playAlarm = (el) => () => {
    el.addEventListener("ended", stopAlarm(el));
    const promise = el.play();
    if (promise !== undefined) {
        promise
            .then(() => {
                // console.log("play sound now!");
            })
            .catch((err) => {
                el.load();
                el.play();
            });
    }
};

export function useAudio() {
    // 視聽
    const [currentPlay, setCurrentPlay] = useState(null);
    const [timesupPlay, setTimesupPlay] = useState(null);

    const audiocontrollers = useRef([]);

    if (audiocontrollers.current.length === 0) {
        audiocontrollers.current = Array.from(
            { length: audionum },
            (el) => (el = React.createRef())
        );
    }
    const value = useMemo(
        () => ({
            currentPlay,
            timesupPlay,
        }),
        [currentPlay, timesupPlay]
    );

    useEffect(() => {
        let audio = null;
        const notNull = value.timesupPlay ?? value.currentPlay;
        if (notNull !== null) {
            audio = audiocontrollers.current[notNull].current;
            playAlarm(audio)();
        }
        return () => {
            if (notNull !== null) {
                stopAlarm(audio)();
                audio.removeEventListener("ended", stopAlarm(audio));
            }
        };
    }, [value]);

    return { audiocontrollers, setCurrentPlay, setTimesupPlay };
}
