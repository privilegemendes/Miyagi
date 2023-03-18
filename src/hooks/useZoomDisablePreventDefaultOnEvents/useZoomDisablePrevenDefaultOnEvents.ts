import {useEffect} from "react";

export function useZoomDisablePreventDefaultOnEvents() {
	useEffect(() => {
		const defaultPreventer = (e: Event) => e.preventDefault();
		document.addEventListener('gesturestart', defaultPreventer);
		return () => {
			document.removeEventListener('gesturestart', defaultPreventer);
		};
	}, []);
}
