import {useState} from "react";
import {useWindowDimensions} from "../useWindowDimensions/useWindowDimensions";

type GridDimensions = {
	width: number;
	height: number;
}
export const usePuzzleLayoutDimensions = () => {

	const [gridDimensions, setGridDimensions] = useState<GridDimensions>({width: 0, height: 0});
	const {height, width} = useWindowDimensions();

}
