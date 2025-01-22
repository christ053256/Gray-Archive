import { useState } from "react";
import axios from 'axios';
import "./CSS/Login.css";

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showLogin, setShowLogin] = useState(true);
    const [showRegister, setShowRegister] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [showResetPassword, setShowResetPassword] = useState(false);
    const [showOTPinput, setShowOTPinput] = useState(false);

    const [message, setMessage] = useState("");

    //Forgot passwords OTP Variables
    const [otp, setOtp] = useState("");
    const [user_otp, setUser_otp] = useState("");
    const [notConsfirmOTP, setNotConfirmOTP] = useState(true);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    


    //Register Variables
    const [email, setEmail] = useState("");
    const [nickname, setNickname] = useState("");
    const [isCooldown, setIsCooldown] = useState(false); // To track cooldown state
    const [timeLeft, setTimeLeft] = useState(0); // To show remaining cooldown time


    const handleShowLogin = (e)=>{
        setUsername("");
        setPassword("");
        setEmail("");
        setNickname("");
        setShowLogin(true);
        setShowRegister(false);
        setShowForgotPassword(false);
        setShowOTPinput(false);

        setShowOTPinput(false);
        setNotConfirmOTP(true);
    }

    const handleShowSignUp = (e)=>{
        setUsername("");
        setPassword("");
        setShowLogin(false);
        setShowRegister(true);
        setShowForgotPassword(false);
        setShowOTPinput(false);
    }

    const handleShowForgotPassword = (e)=>{
        setUsername("");
        setPassword("");
        setEmail("");
        setNickname("");
        setShowLogin(false);
        setShowRegister(false);
        setShowForgotPassword(true);
        setShowOTPinput(false);
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
        setShowOTPinput(false);
    }

    const handleShowOTPinput = (e) => {
        if (isCooldown) return;
        setShowOTPinput(true);
        setIsCooldown(true);
        setTimeLeft(60); // Set cooldown time (in seconds)

        // Countdown timer
        const countdown = setInterval(() => {
        setTimeLeft((prevTime) => {
            if (prevTime <= 1) {
            clearInterval(countdown); // Clear the timer when cooldown ends
            setIsCooldown(false); // Enable the button again
            return 0;
            }
            return prevTime - 1;
        });
        }, 1000); // Update every second
    }

  

    const generateOTP = () => {
        const otp = Math.floor(100000 + Math.random() * 900000);
        return otp;
    }

    const handleSendOTP = () => {
        setOtp(generateOTP());
    }

    const checkEmailandUsername = (e) => {
        e.preventDefault();
        //Check if the email and username match in the database
    }

    const verifyOTP = (e) => {
        e.preventDefault();
        if (otp === otp) {
            setNotConfirmOTP(false);
        } else {
            setMessage("Incorrect OTP");
        }
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
                        placeholder="example@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <button onClick={handleShowOTPinput}>Send OTP</button>
                        {showOTPinput && 
                            <div>
                                <input 
                                    type="text"
                                    placeholder="OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                />

                                <button onClick={verifyOTP}>Verify OTP</button>
                            </div>
                        }
                    <p>Already remember your password? <a href="#" onClick={handleShowLogin}>Login now!</a></p>
                </form>
                
            </div>
        );
    }


    const LoginPage = () => {
        const handleLogin = async (e) => {
            e.preventDefault();
            if (!username || !password) {
                setMessage("Please fill in all fields");
                return;
            }

            try {
                const response = await axios.post('http://localhost:5000/login', {
                    username,
                    password
                });
                console.log(response.data);
                onLogin();
                alert("Login successful!");
                setMessage(null);
            } catch (error) {
                console.error('Login failed:', error);
                setMessage(error.response?.data?.error || "Login failed");
            }
        };

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

                    <button onClick={handleLogin}>Login</button>
                    <p>Don't have account yet? <a href="#" onClick={handleShowSignUp}>Sign-up now!</a></p>
                    <p>Forgot password? <a href="#" onClick={handleShowForgotPassword}>Click here!</a></p>
                </form>
            </div>
        );
    }


    
    const RegisterPage = () => {
        const handleRegister = async (e) => {
            e.preventDefault();
            if (!username || !password || !email || !nickname) {
                setMessage("Please fill in all fields");
                return;
            }

            //Check if username already exist
            try {
                const { data } = await axios.get('http://localhost:5000/users');
            
                // Check if a specific username already exists
                const userExists = data.some(user => user.username === username);
            
                if (userExists) {
                    console.log(`The username "${username}" already exists.`);
                    setMessage(`The username "${username}" is already taken.`);
                    return;
                } 
            } catch (error) {
                console.error('Error fetching users:', error);
                setMessage(error.response?.data?.error || "Failed to fetch users");
            }
            
            // Send the user new registered account to the database
            try {
                const response = await axios.post('http://localhost:5000/register', {
                    username,
                    password,
                    email,
                    nickname
                });
                
                alert("Registration successful!");
                setMessage(null);

                //Reset the input fields
                setShowOTPinput(false);
                setNotConfirmOTP(true);

                //Go back to login page
                handleShowLogin();
            } catch (error) {
                console.error('Registration failed:', error);
                setMessage(error.response?.data?.error || "Registration failed");
            }
        };


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
                        placeholder="What should we call you?"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                    />

                    <input 
                        type="text"
                        placeholder="example@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    {notConsfirmOTP && 
                    <button 
                        type="submit"
                        onClick={()=>{
                            handleSendOTP();
                            handleShowOTPinput();
                        }} 
                        disabled={isCooldown || email.length < 11 ? true : false}
                        className="otp-button"
                        >
                            {showOTPinput ? `Resend OTP ${isCooldown ? 'in '+timeLeft:''}` : "Verify Email"}

                            {(email.length < 11 ? true : false) && <span className="tooltip">Please enter your email address</span>}
                    </button>
                    }

                    {console.log(otp)}

                    {(showOTPinput && notConsfirmOTP) && 
                        <div>
                            <input 
                                className="otp-input"
                                type="number"
                                placeholder="OTP"
                                value={user_otp}
                                onChange={(e) => setUser_otp(e.target.value)}
                            />

                            <button className="otp-btn" onClick={verifyOTP}>Verify OTP</button>
                        </div>
                    }

                    {!notConsfirmOTP && <button onClick={handleRegister}>Sign up</button>}
                    {message && <p className="register-messsage">{message}</p>}
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