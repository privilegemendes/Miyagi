import { useState } from 'react';

const useNameStorage = (key: string, initialValue: string): [string, (value: string) => void] => {
	const [name, setName] = useState(() => {
		const storedValue = window.localStorage.getItem(key);
		return storedValue !== null ? storedValue : initialValue;
	});

	const setNameWithStorage = (value: string) => {
		setName(value);
		window.localStorage.setItem(key, value);
	};

	return [name, setNameWithStorage];
};

export default useNameStorage;
