import * as React from "react";
import {FC} from "react";
import {Home} from "../Home";
import {ErrorBoundary} from "react-error-boundary";
import {ErrorFallback} from "../ErrorFallback";

export const App: FC = () =>
{
	const onReset = () => {
		"";
	}

	return <ErrorBoundary
		FallbackComponent={ErrorFallback}
		onReset={onReset}
	>
		<Home/>
	</ErrorBoundary>

}
