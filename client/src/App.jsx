import './App.css'
import UserContextObject from './UserContext';
import Routes from "./Routes";




function App() {
  
  const { UserContextProvider } = UserContextObject;


  return (
    <>
      <UserContextProvider>
        <Routes />
      </UserContextProvider>      
    </>
  )
}

export default App;