import { useState } from "react";
import "./CSS/Login.css";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showLogin, setShowLogin] = useState(true);
    const [showRegister, setShowRegister] = useState(false);

    //Register Variables
    const [email, setEmail] = useState("");
    const [nickname, setNickname] = useState("");

    const DeactiveLogin = (e)=>{
        setUsername("");
        setPassword("");
        setEmail("");
        setShowLogin(false);
        setShowRegister(true);
    }

    const DeactiveSignUp = (e)=>{
        setUsername("");
        setPassword("");
        setShowLogin(true);
        setShowRegister(false);
    }

    const LoginPage = () => {
        return (
            <div className="LoginPage">
                <form>
                    <h1>Login</h1>
                    <input 
                        type="text"
                        placeholder="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <input 
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button>Login</button>
                    <p>Don't have account yet? <a href="#" onClick={DeactiveLogin}>Sign-up now!</a></p>
                </form>
            </div>
        );
    }

    const RegisterPage = () => {
        return (
            <div className="RegisterPage">
                
                <form>
                    <h1>Sign-up</h1>

                    <input 
                        type="text"
                        placeholder="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <input 
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <input 
                        type="text"
                        placeholder="nickname"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                    />

                    <input 
                        type="text"
                        placeholder="user_email@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <button>Sign up</button>
                    <p>Already register? <a href="#" onClick={DeactiveSignUp}>Login now!</a></p>
                </form>
            </div>
        );
    }

    return (
        <div className="main-container">
            <div className="account-page">
                {showLogin && LoginPage()}
                {showRegister && RegisterPage()}
            </div>
        </div>
    );
}

export default Login;