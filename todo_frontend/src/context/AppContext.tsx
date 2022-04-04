import React from 'react'
import ContextType from '../types/ContextType'
const AppContext = React.createContext<ContextType>({user_auth_token: ''})
export const ContextProvider = AppContext.Provider
export default AppContext