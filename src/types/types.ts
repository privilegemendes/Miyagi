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
}
