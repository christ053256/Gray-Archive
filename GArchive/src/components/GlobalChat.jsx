import { useState, useEffect, useRef } from "react";
import "./CSS/GlobalChat.css";
import axios from 'axios';

const GlobalChat = ({setUserData}) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [currentUser, setCurrentUser] = useState(setUserData.username); // Replace with actual user data
    const messagesEndRef = useRef(null);

    // Auto scroll to bottom when new messages arrive
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
        // Fetch initial messages
        fetchMessages();
    }, [messages]);

    // Fetch messages from backend
    const fetchMessages = async () => {
        try {
            const response = await axios.get('http://localhost:5000/messages');
            setMessages(response.data);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    // Send message to backend
    const sendMessage = async () => {
        if (!newMessage.trim()) return;

        try {
            await axios.post('http://localhost:5000/send-message', {
                content: newMessage,
                user: currentUser,
                timestamp: new Date().toISOString()
            });

            setNewMessage("");
            // Fetch updated messages
            fetchMessages();
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    // Handle Enter key press
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="main-container">
            <div className="main-global-content">
                <div className="content-container">
                    <div className="chat-container">
                        <div className="chat-header">
                            <h1>Global Chat</h1>
                        </div>
                        <div className="chat-messages">
                            {messages.map((msg, index) => (
                                <div 
                                    key={index} 
                                    className={`chat-message ${msg.user === currentUser ? 'sent' : 'received'}`}
                                >
                                    <div className="chat-message-user">
                                        <p>{msg.user}</p>
                                    </div>
                                    <div className="chat-message-content">
                                        <p>{msg.content}</p>
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                        <div className="chat-input">
                            <input 
                                type="text" 
                                placeholder="Type a message..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                onKeyPress={handleKeyPress}
                            />
                            <button onClick={sendMessage}>Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GlobalChat;