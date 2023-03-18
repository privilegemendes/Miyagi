import * as React from 'react';

import {FC, useState} from 'react';
import {Button3D} from "../atoms/Button3D";
import {Link} from "react-router-dom";


interface FormProps {
	onSubmit: (name: string) => void;
}

export const Form: FC<FormProps> = ({ onSubmit }) => {
	const [name, setName] = useState('');

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onSubmit(name);
	};

	const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
			required
		/>
		<Link to={'/game'}>
			<Button3D type={"submit"}/>
		</Link>
	</form>
};




