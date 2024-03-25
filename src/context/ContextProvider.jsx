import { createContext, useContext, useState } from "react";

const authContext = createContext({
    token: null,
    putToken: () => { }
})

export const ContextProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('ptxr_t'));

    const putToken = (data) => {
        if (data) {
            setToken(data);
            localStorage.setItem('ptxr_t', data);
        } else {
            localStorage.removeItem('ptxr_t');
        }
    }

    return (
        <authContext.Provider value={{ token, putToken }}>
            {children}
        </authContext.Provider>
    )
}

export const useStateContext = () => useContext(authContext);