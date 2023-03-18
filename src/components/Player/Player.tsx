import React, {FC} from 'react';
import {Form} from './Form';
import useNameStorage from "../../hooks/useNameStorage/useNameStorage";
import Toast from "../Toast";
import NavBar from "../NavBar";

export const Player: FC = () => {
    const [name, setName] = useNameStorage('player-name', '');

    const handleNameSubmit = (value: string) => {
        setName(value);
    };

    return <>
        <NavBar/>
        <Toast
            variant={"notice"}
            onClick={handleNameSubmit}
            enableAction={false}
        >
            <h1>Welcome to Miyagi!</h1>
            <p>Please enter your name:</p><br/>
            <Form onSubmit={handleNameSubmit}/>
            {name && <p>Hi {name}!</p>}
        </Toast>
    </>
};
