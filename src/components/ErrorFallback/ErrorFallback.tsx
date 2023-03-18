import {FallbackProps} from "react-error-boundary";
import {FC} from "react";
import Toast from "../Toast";
import {error as myErrorPrompts} from "../../assets/messages/error";


export const ErrorFallback: FC<FallbackProps> =({error, resetErrorBoundary}) =>{

    return <Toast
            variant="error"
            action={"Try again"}
            onClick={resetErrorBoundary}
        >
            {myErrorPrompts.somethingWentWrong}
            {error.message}
        </Toast>;
}


export const ErrorRouterFallback: FC = () =>{

    return <Toast
        variant="error"
        action={"Try again"}
        //onClick={resetErrorBoundary}
    >
        {myErrorPrompts.somethingWentWrong}
    </Toast>;
}
