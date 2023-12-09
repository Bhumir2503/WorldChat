import { Link } from 'react-router-dom';
import '../styles/homepage.css';

export default function HomePage() {
    return (
        <div className='LandingPage'>
            <nav>
                <h1>WorldChat</h1>
                <div>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </div>
            </nav>
            <div className="content">
                <img src="/Chatting-Home.svg" alt="Chatting Home" />
                <div>
                    <h2>Welcome to WorldChat!</h2>
                    <p>WorldChat is a real-time chatting web application built using React that aims to break language barriers by providing seamless translation to users' preferred languages. This engaging platform allows individuals from diverse linguistic backgrounds to communicate effortlessly, fostering global connections and understanding.</p>
                </div>
            </div>
        </div>
    );
}