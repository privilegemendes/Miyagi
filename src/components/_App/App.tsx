import * as React from "react";
import { FC } from "react";
import { AppBar, Container, Description, Main, Title } from "../../styles/SharedStyles";
import { GitHubShareButton } from "../GitHubShareButton";
import {PuzzleLayout} from "../PuzzleLayout";
import {PuzzleConfigurations} from "../PuzzleConfigurations";
import {PuzzleProvider} from "../../contexts/puzzle-provider/PuzzleProvider";

export const App: FC = () =>
{

	return <Container>
		<AppBar>
			<Title>Miyagi</Title>
			<Description>
				A puzzle slider game with a twist
			</Description>
			<GitHubShareButton/>
		</AppBar>
		<Main>
			<PuzzleProvider>
				<PuzzleLayout/>
				<PuzzleConfigurations/>
			</PuzzleProvider>
		</Main>
	</Container>;
}
