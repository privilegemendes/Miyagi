import {useState} from 'react';


export const useGetNameFromWebStorage = (): string | null  => {


	const [retrievedPlayerName, setRetrievedPlayerName] = useState(() => {
		const storedValue = window.localStorage.getItem('player-name');
		return storedValue !== null ? storedValue : null;
	});

	window.addEventListener('storage', (event: StorageEvent) => {
		if (event.key === 'player-name') {
			setRetrievedPlayerName(event.newValue);
		}
	});

	return retrievedPlayerName
};
