import { useState } from 'react';
import {
	useRandomNameGenerator
} from "../useRandomNameGenerator/useRandomNameGenerator";

export const useGetNameFromStorage = (key: string): string | null => {
	const randomName = useRandomNameGenerator();

	const [name, setName] = useState(() => {
		const storedValue = window.localStorage.getItem(key);
		return storedValue !== null ? storedValue : null;
	});

	window.addEventListener('storage', (event: StorageEvent) => {
		if (event.key === key) {
			setName(event.newValue);
		} else {
			setName(randomName);
		}

	});

	return name;
};
