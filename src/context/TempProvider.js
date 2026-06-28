import React, {createContext} from "react";

export const TempContext = createContext(null);

function TempContextProvider({children}) {
    return (
        <TempContextProvider value={}>
            {children}
        </TempContextProvider>
    )
}

export default TempContextProvider;