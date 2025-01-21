import { useState } from "react";
import "./CSS/Login.css";

const star = () => {
    return(
        <div class="stars">
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
        </div>
    );

}


const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showLogin, setShowLogin] = useState(true);
    const [showRegister, setShowRegister] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [showResetPassword, setShowResetPassword] = useState(false);

    //Forgot passwords OTP Variables
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    


    //Register Variables
    const [email, setEmail] = useState("");
    const [nickname, setNickname] = useState("");

    const handleShowLogin = (e)=>{
        setUsername("");
        setPassword("");
        setEmail("");
        setNickname("");
        setShowLogin(true);
        setShowRegister(false);
        setShowForgotPassword(false);
    }

    const handleShowSignUp = (e)=>{
        setUsername("");
        setPassword("");
        setShowLogin(false);
        setShowRegister(true);
        setShowForgotPassword(false);
    }

    const handleShowForgotPassword = (e)=>{
        setUsername("");
        setPassword("");
        setEmail("");
        setNickname("");
        setShowLogin(false);
        setShowRegister(false);
        setShowForgotPassword(true);
    }

    const handShowResetPassword = (e) => {
        setUsername("");
        setPassword("");
        setEmail("");
        setNickname("");
        setShowLogin(false);
        setShowRegister(false);
        setShowForgotPassword(false);
        setShowResetPassword(true);
    }

    const generateOTP = () => {
        const otp = Math.floor(100000 + Math.random() * 900000);
        return otp;
    }

    const handleSendOTP = (e) => {
        e.preventDefault();
        //If the username and email match send OTP
    }

    const checkEmailandUsername = (e) => {
        e.preventDefault();
        //Check if the email and username match in the database
    }

    const verifyOTP = (e) => {
        e.preventDefault();
        //Check if the OTP is correct

    }


    const handleResetPassword = (e) => {
        //Reset the password
        return (
            <div className="ResetPassword LoginPage">
                <form>
                    <h1>Reset Password</h1>
                    <input 
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <input 
                        type="password"
                        placeholder="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <button>RESET PASSWORD</button>

                </form>
            </div>
        );
    }
    

    const ForgotPassword = () =>{
        return (
            <div className="ForgotPasswordPage LoginPage">
                <form>
                    <h1>Forgot Password</h1>
                    <input 
                        type="text"
                        placeholder="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <input 
                        type="text"
                        placeholder="example@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <button>Send OTP</button>
                    <p>Already member your password? <a href="#" onClick={handleShowLogin}>Login now!</a></p>
                </form>
            </div>
        );
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
                    <p>Don't have account yet? <a href="#" onClick={handleShowSignUp}>Sign-up now!</a></p>
                    <p>Forgot password? <a href="#" onClick={handleShowForgotPassword}>Click here!</a></p>

                    <p>TEST RESET MODAL? <a href="#" onClick={handShowResetPassword}>Click here!</a></p>
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
                    <p>Already register? <a href="#" onClick={handleShowLogin}>Login now!</a></p>
                </form>
            </div>
        );
    }

    return (
        <div className="main-container">
            <div className="account-page">
                {showLogin && LoginPage()}
                {showRegister && RegisterPage()}
                {showForgotPassword && ForgotPassword()}
                {showResetPassword && handleResetPassword()}
            </div>
        </div>
    );
}

export default Login;