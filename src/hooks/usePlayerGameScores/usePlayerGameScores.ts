import { useState } from 'react';

const usePlayerGameScores = (key: string, initialValue: string) => {
	const [name, setName] = useState(() => {
		const storedValue = window.localStorage.getItem(key);
		return storedValue !== null ? storedValue : initialValue;
	});

	const setNameWithStorage = (value: string) => {
		setName(value);
		window.localStorage.setItem(key, value);
	};
};

export default usePlayerGameScores;
