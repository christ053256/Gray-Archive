import { useState, useEffect, useRef } from "react";
import "./CSS/GlobalChat.css";
import axios from "axios";

const GlobalChat = ({ setUserData }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [currentUser] = useState(setUserData.username);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const MESSAGE_LIMIT = 20; // Number of messages to fetch per request

  // Ref to track if the user is scrolling.
  const userScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef(null);

  // Scrolls to the bottom of the chat container.
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({ top: chatContainerRef.current.scrollHeight, behavior: "smooth" });
    }
  };
  

  // On initial mount, load the latest messages and set up polling for new messages.
  useEffect(() => {
    fetchInitialMessages();
    const fetchInterval = setInterval(fetchNewMessages, 3000);
    return () => clearInterval(fetchInterval);
  }, []);

  // Initial fetch: load the latest messages (offset = 0).
  const fetchInitialMessages = async () => {
    try {
      const response = await axios.get("http://localhost:5000/messages", {
        params: { limit: MESSAGE_LIMIT, offset: 0 },
      });
      // Sort messages in ascending order (oldest at top, newest at bottom)
      const sortedMessages = response.data.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
      setMessages(sortedMessages);
      scrollToBottom();
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // Poll for new messages.
  const fetchNewMessages = async () => {
    try {
      const response = await axios.get("http://localhost:5000/messages", {
        params: { limit: MESSAGE_LIMIT, offset: 0 },
      });
      const sortedMessages = response.data.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
      setMessages((prevMessages) => {
        // Merge only messages that aren't already in state.
        const existingIds = new Set(prevMessages.map((msg) => msg.chat_id));
        const merged = [...prevMessages];
        sortedMessages.forEach((msg) => {
          if (!existingIds.has(msg.chat_id)) {
            merged.push(msg);
          }
        });
        return merged.sort((a, b) => new Date(a.date) - new Date(b.date));
      });
      // Auto-scroll down only if the user is not actively scrolling and is near the bottom.
      if (!userScrollingRef.current && isUserNearBottom()) {
        scrollToBottom();
      }
    } catch (error) {
      console.error("Error fetching new messages:", error);
    }
  };

  // Check if the user is near the bottom of the chat container.
  const isUserNearBottom = () => {
    const chatContainer = document.querySelector(".chat-messages");
    if (chatContainer) {
      return (
        chatContainer.scrollHeight -
          chatContainer.scrollTop -
          chatContainer.clientHeight <
        (MESSAGE_LIMIT * 2)
      );
    }
    return false;
  };

  // Fetch older messages when the user scrolls to the top.
  const fetchOlderMessages = async () => {
    try {
      const chatContainer = document.querySelector(".chat-messages");
      const previousScrollHeight = chatContainer ? chatContainer.scrollHeight : 0;
      const response = await axios.get("http://localhost:5000/messages", {
        params: { limit: MESSAGE_LIMIT, offset: messages.length },
      });
      const olderMessages = response.data.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
      if (olderMessages.length > 0) {
        // Prepend the older messages without altering the current view.
        setMessages((prevMessages) => [...olderMessages, ...prevMessages]);
        // Adjust the scroll position to maintain the current view.
        setTimeout(() => {
          if (chatContainer) {
            const newScrollHeight = chatContainer.scrollHeight;
            chatContainer.scrollTop = newScrollHeight - previousScrollHeight;
          }
        }, 0);
      }
    } catch (error) {
      console.error("Error fetching older messages:", error);
    }
  };

  // Helper function to format Date for MySQL (YYYY-MM-DD HH:MM:SS)
  const formatDateForDB = (date) => {
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);
    const seconds = ("0" + date.getSeconds()).slice(-2);
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  // Called when the user sends a message.
  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    const now = new Date();
    const dateForDB = formatDateForDB(now);
    try {
      await axios.post("http://localhost:5000/send-message", {
        username: currentUser,
        message: newMessage,
        date: dateForDB,
      });
      setNewMessage("");
      fetchNewMessages();
      // Scroll to bottom if the user is not scrolling.
      scrollToBottom();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Format the stored datetime for display (in 12‑hour format)
  const formatDateForDisplay = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-PH", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      month: "short",
      day: "numeric",
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // When the user scrolls, mark that they are scrolling and check if they reached the top.
  const handleScroll = (e) => {
    // Mark that the user is scrolling.
    userScrollingRef.current = true;
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    // Clear the scrolling flag after 1 second of no scroll events.
    scrollTimeoutRef.current = setTimeout(() => {
      userScrollingRef.current = false;
    }, 1000);

    // If the user reaches the top, fetch older messages.
    if (e.target.scrollTop === 0) {
      fetchOlderMessages();
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
            {/* The chat-messages container with an onScroll handler */}
            <div className="chat-messages" ref={chatContainerRef} onScroll={handleScroll}>
              {messages.map((msg) => (
                <div
                  key={msg.chat_id}
                  className={`chat-message ${
                    msg.username === currentUser ? "sent" : "received"
                  }`}
                >
                  <div className="chat-message-user">
                    <span>{msg.username === currentUser ? "" : msg.username}</span>
                    <small>{formatDateForDisplay(msg.date)}</small>
                  </div>
                  <div className="chat-message-content">
                    <p>{msg.message}</p>
                  </div>
                </div>
              ))}
              {/* The element used as a target for scrolling */}
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
};

export default GlobalChat;
