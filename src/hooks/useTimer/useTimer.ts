import {useRef, useState} from "react";

// https://evanshortiss.com/timers-in-typescript
export function useTimer(initialState = 0) {
	const [timer, setTimer] = useState(initialState)
	const [isActive, setIsActive] = useState(false)
	const [isPaused, setIsPaused] = useState(false)
	const countRef = useRef<NodeJS.Timer>()

	const handleStart = () => {
		setIsActive(true);
		setIsPaused(true);

		if (countRef.current !== null) {

			countRef.current = setInterval(() => {
				setTimer((timer) => timer + 1)
			}, 1000);
		}
	}

	const handlePause = () => {
		clearInterval(countRef!.current)
		setIsPaused(false)
	}

	const handleResume = () => {
		setIsPaused(true)
		countRef.current = setInterval(() => {
			setTimer((timer) => timer + 1)
		}, 1000)
	}

	const handleReset = () => {
		clearInterval(countRef.current)
		setIsActive(false)
		setIsPaused(false)
		setTimer(0)
	}

	return { timer, isActive, isPaused, handleStart, handlePause, handleResume, handleReset }
}
