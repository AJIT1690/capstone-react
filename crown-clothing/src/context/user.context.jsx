import { createContext, useState } from "react";


//Actual value to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

//provider to get the values/ actual component
export const UserProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(null);

  const value = { currentUser, setCurrentUser };

  return (
    <UserContext.Provider value={value}> { children } </UserContext.Provider>
  )
}