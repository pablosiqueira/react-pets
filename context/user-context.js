import React, {useState, useEffect} from "react";

export const UserContext = React.createContext({
    user: {},
    login: (userData) => {},
    logout: () => {},
})

const UserContextProvider = props => {
    const [user, setUser] = useState()

    const loginHandler = (userData) => {
      console.log('login')
      console.log(userData)
      setUser(userData)
      localStorage.setItem('user',JSON.stringify(userData))
    }

    const logoutHandler = () => {
      console.log('logout')
      setUser()
      localStorage.removeItem('user')
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
      // Perform localStorage action
          if(!user){
            console.log('user use effect')
            const localUser = JSON.parse(localStorage.getItem('user')) || undefined
            setUser(localUser)
            console.log(localUser)
          }
        }
      }, [])

      const contextValue = {
        user,
        login: loginHandler,
        logout: logoutHandler,
    }
    
    return (
        <UserContext.Provider value={contextValue}>
        {props.children}</UserContext.Provider>
    )

}

export default UserContextProvider