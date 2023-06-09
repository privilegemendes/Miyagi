import {FallbackProps} from "react-error-boundary";
import {FC} from "react";
import {Toast} from "../Toast";
import {error as myErrorPrompts} from "../../assets/messages/error";


export const ErrorFallback: FC<FallbackProps> =({error, resetErrorBoundary}) =>{

    return <Toast
            variant="error"
            action={"Try again"}
            enableAction={false}
            onClick={resetErrorBoundary}
        >
            {myErrorPrompts.somethingWentWrong}<br/><br/>
            {error.message}
        </Toast>;
}
