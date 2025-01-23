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
    const [confirmedOTP, setConfirmedOTP] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showNewPasswordInput, setShowPasswordInput] = useState(false);


    //Register Variables
    const [email, setEmail] = useState("");
    const [nickname, setNickname] = useState("");
    const [isCooldown, setIsCooldown] = useState(false); // To track cooldown state
    const [timeLeft, setTimeLeft] = useState(0); // To show remaining cooldown time

    const handleShowPasswordInput = () => {
        setPassword("");
        setEmail("");
        setNickname("");

        setConfirmedOTP(false);
        setShowLogin(false);
        setShowRegister(false);
        setShowForgotPassword(false);
        setShowOTPinput(false);
        setShowOTPinput(false);
        setConfirmedOTP(false);
        setShowPasswordInput(true);
    }

    const handleShowLogin = (e)=>{
        setUsername("");
        setPassword("");
        setEmail("");
        setNickname("");
        setOtp("");
        setUser_otp("");

        setConfirmedOTP(false);
        setShowLogin(true);
        setShowRegister(false);
        setShowForgotPassword(false);
        setShowOTPinput(false);
        setShowOTPinput(false);
        setConfirmedOTP(false);
    }

    const handleShowSignUp = (e)=>{
        setUsername("");
        setPassword("");
        setUser_otp("");
        setOtp("");

        setConfirmedOTP(false);
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
        setUser_otp("");
        setOtp("");

        setConfirmedOTP(false);
        setShowLogin(false);
        setShowRegister(false);
        setShowForgotPassword(true);
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

    const verifyOTP = () => {
        if (user_otp.length === 0){
            setMessage("Please input OTP");
            return;
        }

        if (otp == user_otp) {
            setConfirmedOTP(true);
            setMessage(null);
        } else {
            setMessage("Incorrect OTP");
        }
    }

    const djb2Hash = (password) =>{
        let hash = 5381;
        
        for (let i = 0; i < password.length; i++){
            hash = (((hash * 32) + hash) + password.charCodeAt(i));
        }
        console.log(hash.toString);
        return hash.toString();
    }

  

    const ForgotPassword = () =>{
        const handleForgotPassword = async () =>{
            try {
                const { data } = await axios.get('http://localhost:5000/users');
            
                // Check if a specific username already exists
                const userExists = data.some(user => user.username === username && user.email === email);
            
                if (userExists) {
                    alert("This user indeed exist!");
                    return;
                } 
            } catch (error) {
                console.error('Error fetching users:', error);
                setMessage(error.response?.data?.error || "Failed to fetch users");
            }
        }

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

                    <button onClick={(e)=>{
                        e.preventDefault();
                        handleShowOTPinput();
                        handleForgotPassword();
                        handleSendOTP();
                    }}
                        disabled={isCooldown || confirmedOTP}
                    >{showOTPinput ? `Resend OTP ${isCooldown ? 'in '+timeLeft:''}` : "Send OTP"}

                    {(email.length < 11 ? true : false) && <span className="tooltip">Please enter your email address</span>}</button>
                    
                    {showOTPinput &&
                        <div>
                            <input
                                className="otp-input" 
                                type="number"
                                placeholder="OTP"
                                value={user_otp}
                                onChange={(e) => setUser_otp(e.target.value)}
                            />
                            {message && <p>{message}</p>}
                            <button
                            className="verify-otp"
                            onClick={(e)=>{
                                e.preventDefault();
                                verifyOTP();
                            }}

                            disabled={confirmedOTP}
                            > Verify OTP</button>
                            {console.log(`OTP: ${otp}`)}
                            {console.log(`USER OTP: ${user_otp}`)}
                            <button 
                                className="new-password"
                                onClick={handleShowPasswordInput}
                                disabled={!confirmedOTP}
                                
                            >
                                {!confirmedOTP && <span className="tooltip">Please verify your OTP</span>}
                                Create new password  
                            </button>
                            
                        </div>
                    }
                    <p>Already remember your password? <a href="#" onClick={handleShowLogin}>Login now!</a></p>
                </form>
            </div>
        );
    }

    const createNewPassword = () =>{
        const handleChangePassword = async () =>{
            if(newPassword !== confirmPassword){
                setMessage("Please make sure new password and confirm password are the same!");
                return;
            }

            try {
                const response = await axios.post('http://localhost:5000/change-password', {
                    username,
                    newPassword : djb2Hash(newPassword),
                });
                alert("Password updated successfully");
                window.location.reload();
            } catch (error) {
                setMessage(error.response?.data?.error || 'Error changing password');
            }
        }

        return(
            <div className="createNewPassword LoginPage">
                <form>
                    <h1>Create new password for {username}</h1>
                        <input 
                            type="password"
                            placeholder="new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />

                        <input 
                            type="password"
                            placeholder="confirm password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        
                        {message && <p>{message}</p>}
                        <button onClick={(e)=>{
                            e.preventDefault();
                            handleChangePassword();
                        }}>Change Password</button>
                        
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
                    password : djb2Hash(password),
                });
                console.log(response.data);
                onLogin();
                alert("Login successful!");
                setMessage(null);
            } catch (error) {
                setMessage("Wrong username or password!");
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
                    {message && <p>{message}</p>}

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
                    password: djb2Hash(password),
                    email,
                    nickname
                });
                
                alert("Registration successful!");
                setMessage(null);

                //Reset the input fields
                setShowOTPinput(false);
                setConfirmedOTP(false);

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

                    {!confirmedOTP && 
                    <button 
                        type="submit"
                        onClick={(e)=>{
                            e.preventDefault();
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

                    
                    {(showOTPinput && !confirmedOTP) && 
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

                    {confirmedOTP && <button onClick={handleRegister}>Sign up</button>}
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
                {showNewPasswordInput && createNewPassword()}
            </div>
        </div>
    );
}

export default Login;