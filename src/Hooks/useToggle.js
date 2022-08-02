import { useState } from "react";

function useToggle(originalBoolean = false) {
    const [open, setOpen] = useState(originalBoolean);
    const ToggleHandler = (original = false) => {
        if (original) {
            setOpen(false);
            return;
        }
        setOpen((prevOpen) => !prevOpen);
    };

    return { ToggleHandler, open };
}

export default useToggle;
