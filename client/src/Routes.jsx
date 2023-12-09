import Register from "./pages/register";
import { useContext } from "react";
import UserContextObject from './UserContext';
import Login from "./pages/login";


export default function Routes() {
    const {UserContext} = UserContextObject;
    const {username, id} = useContext(UserContext);

    if (username && id) {
        return(
            <div>
                <h1>Logged in as {username}</h1>
            </div>
        )
    }



    return(
        <Login />
    )
}