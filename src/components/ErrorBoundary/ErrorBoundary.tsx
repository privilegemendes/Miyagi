import React from "react";
import styled from "styled-components";

type ErrorBoundaryProps = {
    children: React.ReactNode[];
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
    info: object;
}

class ErrorBoundary extends React.Component<
    ErrorBoundaryProps,
    ErrorBoundaryState
> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false,
            error: new Error(),
            info: { componentStack: "" },
        };
    }

    static getDerivedStateFromError = (error: Error) => {
        return { hasError: true };
    };

    componentDidCatch(error: Error | null, info: object) {
        console.log("error", error);
        this.setState({ hasError: true, error, info });
    }

    render() {
        if (this.state.hasError) {
            return <ErrorContainer>
                    <h2 style={{ padding: "2em" }}>
                        Something has gone wrong. Please reload your screen.
                    </h2>
                </ErrorContainer>;
        }

        return this.props.children;
    }
}


const ErrorContainer = styled.div`
    margin: 0 auto;
    max-width: 500px;
`;
export default ErrorBoundary;
