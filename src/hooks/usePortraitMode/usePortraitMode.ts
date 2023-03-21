import {useEffect} from "react";

export const usePortraitMode = () => {


    useEffect(() => {
        const portraitOrientation = window.matchMedia("(orientation: portrait)");
        const lockOrientation = () => {
            document.body.classList.add("portrait");
			document.body.classList.remove("landscape");
        }

        const unlockOrientation = () => {
            document.body.classList.remove("portrait");
			document.body.classList.add("landscape");
        }

        // Apply the orientation lock or unlock depending on the screen size and orientation
        if (portraitOrientation.matches) {
            lockOrientation();
        } else {
            unlockOrientation();
        }

        portraitOrientation.addEventListener("change", (event) => {

            if (event.matches) {
                lockOrientation();
            } else {
                unlockOrientation();
            }
        });

        return () => {
           portraitOrientation.removeEventListener("change", lockOrientation);
           portraitOrientation.removeEventListener("change", unlockOrientation);
        };
    }, []);
};
