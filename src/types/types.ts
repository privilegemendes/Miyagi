import * as React from "react";

export type SVGProps = {
	text?: string;
	height?: string;
	width?: string;
	color?: string;
	onClick?: (e: React.MouseEvent) => void;
}

export type NavButtonStyleProps = {
	activeRouteColor?: string;
	gameState?: string;
	puzzleSolved?: boolean;
}


export type GamePlayStyleProps = {
	gameState: string;
	puzzleSolved: boolean;

}
