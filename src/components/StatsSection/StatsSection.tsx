import * as React from 'react';
import styled from "styled-components";
import {Title} from "../../styles/SharedStyles";
import {
    useWindowDimensions
} from "../../hooks/useWindowDimensions/useWindowDimensions";

function StatsSection() {

    const {width} = useWindowDimensions();

    if (width < 768) {
        return null;
    }

    return <StatsContainer>
    <Title>Miyagi</Title>
    </StatsContainer>;
}

export default StatsSection;

const StatsContainer = styled.div`
    grid-area: stats;
    
    display: flex;
    flex-direction: column;
    padding-left: 8px;
    //border-right: 1px solid #08a0ff;
`;
