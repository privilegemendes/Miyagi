import {useState} from 'react';

export const useSetNameInWebStorage = (key: string, addName: string) => {
	const [name, setName] = useState(() => {
		const storedValue = window.localStorage.getItem(key);
		return storedValue !== null ? storedValue : addName;
	});

	window.localStorage.setItem(key, addName);
};
