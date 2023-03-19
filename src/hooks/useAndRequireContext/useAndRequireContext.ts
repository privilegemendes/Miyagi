import {Context, useContext, useMemo} from "react";

export function useAndRequireContext<T>(
    context: Context<T | undefined>,
    objectName: string = 'hook',
    providerName: string = 'provider'
): T
{
    const possiblyUndefinedContext = useContext(context);
    return useMemo(
        () => {
            if (possiblyUndefinedContext === undefined)
                throw new Error(
                    `Attempted to use ${objectName} outside of ${providerName}`
                );
            return possiblyUndefinedContext;
        },
        [objectName, possiblyUndefinedContext, providerName],
    );
}
