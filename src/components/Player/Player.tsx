import React, {FC} from 'react';
import {Form} from './Form';
import useNameStorage from "../../hooks/useNameStorage/useNameStorage";
import Toast from "../Toast";
import NavBar from "../NavBar";
import {
    useRandomNameGenerator
} from "../../hooks/useRandomNameGenerator/useRandomNameGenerator";

export const Player: FC = () => {


    const randomName = useRandomNameGenerator();
    const [name, setName] = useNameStorage('player-name', randomName);

    const handleNameSubmit = (value: string) => {
        if (value.length === 0 || null) {
            setName(randomName);
        }

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
            {name && <p>Hello, {name}!</p>}
        </Toast>
    </>
};
