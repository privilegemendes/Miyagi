import * as React from "react";
import {createContext, FC, useMemo, useState} from "react";
import {
	useAndRequireContext
} from "../../hooks/useAndRequireContext/useAndRequireContext";


type Context = {
	rows: number
	columns: number
	gridSize: number
	setGridSize: (gridSize: number) => void
	onSliderChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}
export interface PuzzleSize {
	rows: number
	columns: number
}

const ContextRef = createContext<Context | undefined>(undefined);

type Props = {
	children: React.ReactNode
	defaultGridSize?: number
	defaultRows?: number
	defaultColumns?: number
}
export const PuzzleProvider: FC<Props> =
	(
		{
			children,
			defaultGridSize = 5,
			defaultRows = 5,
			defaultColumns = 5,

		}
	) =>
	{
		const [gridSize, setGridSize] = useState<number>(defaultGridSize);
		const [rows, setRows] = useState<number>(defaultRows);
		const [columns, setColumns] = useState<number>(defaultColumns);
		const onSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
			const value = parseInt(event.target.value);
			setGridSize(value);
			setRows(value);
			setColumns(value);
		}

		const contextValue = useMemo(() => ({
			rows,
			columns,
			gridSize,
			setGridSize,
			onSliderChange,
		}), [rows, columns, gridSize]);

		return <ContextRef.Provider value={contextValue}>
				{children}
		</ContextRef.Provider>;
};


export const usePuzzleSize = () => {

	return useAndRequireContext(ContextRef);
}

