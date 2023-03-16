import {FallbackProps} from "react-error-boundary";
import {FC} from "react";
import Toast from "../Toast";
import {error} from "../../assets/messages/error";

export const ErrorFallback: FC<FallbackProps> =({resetErrorBoundary}) =>{

    return <Toast variant="error" onClose={resetErrorBoundary}>
            {error.somethingWentWrong}
             {/*<button onClick={resetErrorBoundary}>Try again</button>*/}
        </Toast>;
}
