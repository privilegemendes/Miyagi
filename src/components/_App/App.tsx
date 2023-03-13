import * as React from "react";
import { FC } from "react";
import { AppBar, Container, Description, Main, Title } from "../../styles/SharedStyles";
import { GitHubShareButton } from "../GitHubShareButton";

export const App: FC = () =>
{

	return <Container>
		<AppBar>
			<Title>Explosive Roses</Title>
			<Description>
				Exploding Roses using Three.js and React
			</Description>
			<GitHubShareButton/>
		</AppBar>
		<Main>

		</Main>
	</Container>;
}
