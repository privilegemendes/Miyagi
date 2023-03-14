import * as React from "react";
import {createContext, FC, useMemo, useState} from "react";
import {
	useAndRequireContext
} from "../../hooks/useAndRequireContext/useAndRequireContext";


type Context = {
	rows: number
	columns: number
	puzzleSize: number
	setPuzzleSize: (puzzleSize: number) => void
	onSliderChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}
export interface PuzzleSize {
	rows: number
	columns: number
}

const ContextRef = createContext<Context | undefined>(undefined);

type Props = {
	children: React.ReactNode
	defaultPuzzleSize?: number
	defaultRows?: number
	defaultColumns?: number
}
export const PuzzleProvider: FC<Props> =
	(
		{
			children,
			defaultPuzzleSize = 2,
			defaultRows = 2,
			defaultColumns = 2,

		}
	) =>
	{
		const [puzzleSize, setPuzzleSize] = useState<number>(defaultPuzzleSize);
		const [rows, setRows] = useState<number>(defaultRows);
		const [columns, setColumns] = useState<number>(defaultColumns);
		const onSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
			const value = parseInt(event.target.value);
			setPuzzleSize(value);
			setRows(value);
			setColumns(value);
		}

		const contextValue = useMemo(() => ({
			rows,
			columns,
			puzzleSize,
			setPuzzleSize,
			onSliderChange,
		}), [rows, columns, puzzleSize]);

		return <ContextRef.Provider value={contextValue}>
				{children}
		</ContextRef.Provider>;
};


export const usePuzzleSize = () => {

	return useAndRequireContext(ContextRef);
}

