import {useState} from 'react';
import {
	useRandomNameGenerator
} from "../useRandomNameGenerator/useRandomNameGenerator";
import {
	useSetNameInWebStorage
} from "../useSetNameInWebStorage/useSetNameInWebStorage";


export const useGetNameFromWebStorage = (): string  => {

	const randomName = useRandomNameGenerator();

	useSetNameInWebStorage('player', randomName );

	const [retrievedPlayerName, setRetrievedPlayerName] = useState(() => {
		const storedValue = window.localStorage.getItem('player');
		return storedValue !== null ? storedValue : null;
	});

	if (retrievedPlayerName === null) {

		return randomName;
	}



	window.addEventListener('storage', (event: StorageEvent) => {
		if (event.key === 'player-name') {
			setRetrievedPlayerName(event.newValue);
		}
	});

	return retrievedPlayerName
};
