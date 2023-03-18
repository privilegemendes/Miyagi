import * as React from 'react';

import {FC, useState} from 'react';
import {Button3D} from "../atoms/Button3D";
import {Link} from "react-router-dom";
import {
	useRandomNameGenerator
} from "../../hooks/useRandomNameGenerator/useRandomNameGenerator";


interface FormProps {
	onSubmit: (name: string) => void;
}

export const Form: FC<FormProps> = ({ onSubmit }) => {
	const [name, setName] = useState('');
	const randomName = useRandomNameGenerator();

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onSubmit(name);
	};

	const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.value.length === 0 || null) {
			setName(randomName);
		}
		setName(event.target.value);
	};

	return <form
		onSubmit={handleSubmit}>
		<label htmlFor="name-input">Name:</label>
		<input
			id="name-input"
			type="text"
			value={name}
			onChange={handleNameChange}
		/>
		<Link to={'/game'}>
			<Button3D type={"submit"}/>
		</Link>
	</form>
};




