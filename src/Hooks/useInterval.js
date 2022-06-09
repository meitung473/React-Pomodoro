import { useEffect, useRef } from "react";

function useInterval(callback, delay) {
    const savecallback = useRef();
    // 把現在的 callback 記住
    useEffect(() => {
        savecallback.current = callback;
    }, [callback]);

    useEffect(() => {
        function tick() {
            savecallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, 1000);
            return () => {
                clearInterval(id);
            };
        }
    }, [delay]);
}
export default useInterval;
