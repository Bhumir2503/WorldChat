import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useContext } from "react";
import UserContextObject from './UserContext';
import Login from "./pages/login";
import Register from "./pages/register";
import Homepage from "./pages/homepage";
import Chat from './pages/chat';

export default function AppRoutes() {
    const {UserContext} = UserContextObject;
    const {username, id} = useContext(UserContext);

    if (username) {
        return(
            <Chat />
        )
    }

    return(
        <Router>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/chat" element={<Chat />} />
            </Routes>
        </Router>
    )
}