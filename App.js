import React, { useState } from 'react';
import axios from 'axios';
import chatBackgroundImage from './Backimage.jpg'; // Ensure this is the correct path
import chatboxBackgroundImage from './rb_41919.png'; // Add path for the chatbox image

function App() {
    const [messages, setMessages] = useState([]); // Chat history
    const [input, setInput] = useState(""); // User input

    const sendMessage = async () => {
        if (!input.trim()) return; // Ignore empty messages

        // Add user message to chat
        const userMessage = { user: "You", text: input };
        setMessages((prev) => [...prev, userMessage]);

        try {
            // Send input to backend
            const response = await axios.post('http://127.0.0.1:5000/chat', { message: input });
            const botMessage = { user: "Bot", text: response.data.reply };
            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error("Error connecting to backend:", error);
            setMessages((prev) => [
                ...prev,
                { user: "Bot", text: "Error: Unable to connect to the server." },
            ]);
        }

        setInput(""); // Clear input field
    };

    return (
        <div
            style={{
                // Setting the image as the background of the whole page
                backgroundImage: `url(${chatBackgroundImage})`, // Apply background image here
                backgroundSize: "cover", // Ensures the image covers the whole window
                backgroundPosition: "center", // Centers the image
                backgroundRepeat: "no-repeat", // Prevents repeating the image
                height: "100vh", // Full viewport height
                display: "flex",
                justifyContent: "flex-start", // Aligns to the left side
                alignItems: "center", // Centers the chat box vertically
                padding: "20px", // Adds some padding around the container
                position: "relative", // Position context for the heading
            }}
        >
            {/* Heading on top of background */}
            <div
                style={{
                    position: "absolute",
                    top: "7%", // Move the heading a little upward
                    left: "40%", // Align heading left-center
                    transform: "translateX(0)", // Center horizontally on the left
                    color: "white",
                    fontSize: "60px",
                    fontWeight: "600",
                    zIndex: 1, // Ensure the heading is above the background image
                    backgroundColor: "rgba(0, 0, 0, 0.5)", // Add a semi-transparent background
                    padding: "10px 20px", // Add padding to the heading
                    borderRadius: "10px", // Optional: Rounded corners for the background
                }}
            >
                ChatBot
            </div>

            {/* Chatbot Container */}
            <div
                style={{
                    maxWidth: "600px",
                    width: "100%", // Ensure it fits inside the screen
                    fontFamily: "'Poppins', sans-serif",
                    boxShadow: "0px 8px 15px rgba(0, 0, 0, 1)",
                    borderRadius: "12px",
                    overflow: "hidden",
                    backgroundColor: "#6df4f1", // Light background for chatbox
                    margin: "20px", // Add margin around the chat box
                    paddingTop: "30px", // Create space between the heading and the chat box messages
                }}
            >
                {/* Chatbox Header */}
                <div
                    style={{
                        textAlign: "center",
                        marginBottom: "10px", // Space below the header text
                    }}
                >
                    <h3
                        style={{
                            margin: "0",
                            fontSize: "16px",
                            fontWeight: "bold", // Make text bold
                            backgroundColor: "#6a11cb", // Add background color to just the text
                            padding: "10px 20px", // Padding around the text for emphasis
                            borderRadius: "5px", // Rounded corners for the background
                            display: "inline-block", // Ensures it only affects the text, not the entire box
                            color: "white"
                        }}
                    >
                        Ask me Anything...! I will answer according to the provided Dataset.
                    </h3>
                </div>

                {/* Chat Area */}
                <div
                    style={{
                        border: "1px solid #e5e5e5",
                        borderTop: "none",
                        padding: "15px",
                        height: "300px", // Adjusted height for compactness
                        overflowY: "auto",
                        marginBottom: "10px", // Space between chat area and input area
                        paddingTop: "25px", // Ensure space between the heading and chat area
                        backgroundImage: `url(${chatboxBackgroundImage})`, // Set background image for chat area
                        backgroundSize: "cover", // Ensure background covers the area
                    }}
                >
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            style={{
                                display: "flex",
                                justifyContent: msg.user === "You" ? "flex-end" : "flex-start",
                                margin: "10px 0",
                            }}
                        >
                            <div
                                style={{
                                    maxWidth: "75%",
                                    padding: "10px 15px",
                                    borderRadius: "12px",
                                    backgroundColor:
                                        msg.user === "You" ? "#1b1c1c" : "rgba(37, 117, 252, 1 )", // Different colors for user and bot
                                    color: "White", // White text for both
                                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                                    wordBreak: "break-word",
                                }}
                            >
                                <strong style={{ fontSize: "14px" }}>{msg.user}:</strong>
                                <p style={{ margin: "5px 0", fontSize: "15px" }}>{msg.text}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input Area */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "15px",
                        backgroundColor: "transparent", // Transparent background for input
                        borderTop: "1px solid #e5e5e5",
                    }}
                >
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        style={{
                            flex: 1,
                            padding: "12px",
                            border: "1px solid #ccc",
                            borderRadius: "25px",
                            outline: "none",
                            fontSize: "14px",
                            boxShadow: "inset 0px 2px 4px rgba(0, 0, 0, 0.1)",
                            transition: "border-color 0.3s",
                        }}
                        placeholder="Type your message..."
                        onFocus={(e) => (e.target.style.borderColor = "#6a11cb")}
                        onBlur={(e) => (e.target.style.borderColor = "#ccc")}
                    />
                    <button
                        onClick={sendMessage}
                        style={{
                            marginLeft: "10px",
                            padding: "10px 25px",
                            background: "linear-gradient(90deg, #6a11cb, #2575fc)",
                            color: "white",
                            border: "none",
                            borderRadius: "25px",
                            cursor: "pointer",
                            fontWeight: "600",
                            fontSize: "14px",
                            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
                            transition: "transform 0.2s, box-shadow 0.2s",
                        }}
                        onMouseOver={(e) => {
                            e.target.style.transform = "scale(1.05)";
                            e.target.style.boxShadow = "0px 6px 10px rgba(0, 0, 0, 0.3)";
                        }}
                        onMouseOut={(e) => {
                            e.target.style.transform = "scale(1)";
                            e.target.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.2)";
                        }}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
