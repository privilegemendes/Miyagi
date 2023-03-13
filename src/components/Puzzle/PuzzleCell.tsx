import {FC} from "react";
import styled from "styled-components";

export const PuzzleCell: FC = () => {
	return <Cell>

	</Cell>;
};

const Cell = styled.span`
  border-radius: 8px;
  border: 1px solid #08a0ff;
  background: #0066ff;
  display: block;
  height: 100%;
  width: 100%;
`;
