import { createContext, useEffect, useState } from "react";


export const UserContext = createContext({});

const UserContextProvider = ({ children }) => {
    const [username, setUsername] = useState('');
    const [id, setId] = useState('');


    useEffect(() => {
        const fetchData = async () => {
          const response = await fetch('http://localhost:3000/profile', {
            method: 'GET',
            credentials: 'include', // include cookies in the request
          });
    
          if (response.ok) {
            const data = await response.json();
            if (data) {
              setUsername(data.username);
              setId(data.id);
            }
            else {
              setUsername('');
              setId('');
            }
          }
        };

        fetchData();
      }, []);


      
    return(
        <UserContext.Provider value= {{username, setUsername, id, setId}}>
            {children}
        </UserContext.Provider>
    )
}

export default {UserContext, UserContextProvider}
