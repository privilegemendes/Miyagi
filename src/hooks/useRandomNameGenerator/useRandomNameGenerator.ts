import {useEffect, useState} from 'react';
import {adjectives, nouns} from "../../assets/mock/randomNames";

export const useRandomNameGenerator = () => {
	const [name, setName] = useState('');

	useEffect(() => {
		const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
		const noun = nouns[Math.floor(Math.random() * nouns.length)];
		setName(`${adjective.word} ${noun.word}`);
	}, []);

	return name;
};

