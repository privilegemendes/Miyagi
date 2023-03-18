import { useState } from 'react';

export const useGetNameFromStorage = (key: string): string | null => {
	const [name, setName] = useState(() => {
		const storedValue = window.localStorage.getItem(key);
		return storedValue !== null ? storedValue : null;
	});

	window.addEventListener('storage', (event: StorageEvent) => {
		if (event.key === key) {
			setName(event.newValue);
		}
	});

	return name;
};
