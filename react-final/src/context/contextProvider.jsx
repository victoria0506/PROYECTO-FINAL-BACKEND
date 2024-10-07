import { useContext, useState, createContext } from "react";

export const theContext = createContext() 

export const ContextProvider = ({children}) => {
    const [actualizador, setActu] = useState(0) 
    const [apiData, setApiData] = useState([])
  return (
    <theContext.Provider value={{actualizador, setActu, apiData, setApiData}}>
        {children}
    </theContext.Provider>
    
  )
}

export const compartirContexto = () => useContext(theContext)