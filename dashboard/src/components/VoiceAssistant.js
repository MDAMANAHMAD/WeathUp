import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import GeneralContext from "./GeneralContext";

const VoiceAssistant = () => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState("");
    const [feedback, setFeedback] = useState("");
    const { openBuyWindow } = useContext(GeneralContext);
    const navigate = useNavigate();

    // Initialize Speech Recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = SpeechRecognition ? new SpeechRecognition() : null;

    useEffect(() => {
        if (!recognition) return;

        recognition.continuous = false;
        recognition.lang = "en-US";
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
            setIsListening(true);
            setFeedback("Listening...");
        };

        recognition.onend = () => {
            setIsListening(false);
            // Clear feedback after a delay if no command matched
            setTimeout(() => {
                if (feedback === "Listening...") setFeedback("");
            }, 2000);
        };

        recognition.onresult = (event) => {
            const command = event.results[0][0].transcript.toLowerCase();
            setTranscript(command);
            processCommand(command);
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error", event.error);
            setFeedback("Error: " + event.error);
            setIsListening(false);
        };

    }, []);

    const toggleListening = () => {
        if (!recognition) {
            alert("Voice commands are not supported in this browser. Try Chrome.");
            return;
        }

        if (isListening) {
            recognition.stop();
        } else {
            recognition.start();
        }
    };

    const processCommand = (cmd) => {
        console.log("Processing Voice Command:", cmd);

        // 1. Navigation Commands
        if (cmd.includes("go to") || cmd.includes("open") || cmd.includes("show")) {
            if (cmd.includes("holdings") || cmd.includes("holding")) {
                setFeedback("Navigating to Holdings...");
                navigate("/holdings");
                stopListening(); // Reset Mic
                return;
            }
            if (cmd.includes("orders") || cmd.includes("order")) {
                setFeedback("Navigating to Orders...");
                navigate("/orders");
                stopListening(); // Reset Mic
                return;
            }
            if (cmd.includes("positions") || cmd.includes("position")) {
                setFeedback("Navigating to Positions...");
                navigate("/positions");
                stopListening(); // Reset Mic
                return;
            }
            if (cmd.includes("funds") || cmd.includes("fund")) {
                setFeedback("Navigating to Funds...");
                navigate("/funds");
                stopListening(); // Reset Mic
                return;
            }
            if (cmd.includes("analytics") || cmd.includes("insight")) {
                setFeedback("Opening Analytics...");
                navigate("/analytics");
                stopListening(); // Reset Mic
                return;
            }
            if (cmd.includes("dashboard") || cmd.includes("home")) {
                setFeedback("Going Home...");
                navigate("/");
                stopListening(); // Reset Mic
                return;
            }
        }

        // 2. Trading Commands (Buy/Sell)
        // Try to extract quantity first
        let quantity = 1;
        const qtyMatch = cmd.match(/(\d+)/); // Find first number
        if (qtyMatch) {
            quantity = parseInt(qtyMatch[0], 10);
        }

        if (cmd.includes("buy") || cmd.includes("purchase")) {
            const stock = extractStockName(cmd);
            if (stock) {
                setFeedback(`Buying ${quantity} ${stock.toUpperCase()}...`);
                openBuyWindow(stock.toUpperCase(), "BUY", quantity);
                stopListening(); // Reset Mic
            } else {
                setFeedback("Could not identify stock name.");
            }
        }
        else if (cmd.includes("sell")) {
            const stock = extractStockName(cmd);
            if (stock) {
                setFeedback(`Selling ${quantity} ${stock.toUpperCase()}...`);
                openBuyWindow(stock.toUpperCase(), "SELL", quantity);
                stopListening(); // Reset Mic
            } else {
                setFeedback("Could not identify stock name.");
            }
        }
        else {
            // Fallback for just stock names without "Buy" prefix?
            // Or unhandled commands
            if (!cmd.includes("go to") && !cmd.includes("show")) {
                setFeedback(`Command not recognized: "${cmd}"`);
            }
        }
    };

    const stopListening = () => {
        if (recognition) {
            recognition.stop();
            setIsListening(false);
        }
    };

    const extractStockName = (cmd) => {
        // List of known stocks for better matching
        const knownStocks = [
            "RELIANCE", "TCS", "INFY", "INFOSYS", "WIPRO", "HDFC", "HDFCBANK",
            "SBIN", "SBI", "ITC", "KOTAK", "ICICI", "AXIS", "AXISBANK",
            "MARUTI", "TITAN", "ADANI", "ADANIENT", "ASIANPAINT", "SUNPHARMA",
            "ULTRACEMCO", "TATAPOWER", "TATA"
        ];

        // Normalize command
        const upperCmd = cmd.toUpperCase();

        // Check for direct matches
        for (const stock of knownStocks) {
            if (upperCmd.includes(stock)) {
                // Mapping specific spoken works to ticker symbols
                if (stock === "INFOSYS") return "INFY";
                if (stock === "SBI") return "SBIN";
                if (stock === "ADANI") return "ADANIENT";
                if (stock === "HDFC") return "HDFCBANK";
                if (stock === "AXIS") return "AXISBANK";
                if (stock === "TATA") return "TATAPOWER"; // Ambiguous, but mapping to one
                return stock;
            }
        }

        return null;
    };

    if (!recognition) return null;

    return (
        <div className="voice-assistant-container position-fixed bottom-0 end-0 m-4 z-3">
            {/* Feedback Bubble */}
            {feedback && (
                <div className="bg-dark text-white p-2 rounded-3 mb-2 shadow-sm animate__animated animate__fadeInUp small text-center" style={{ maxWidth: '200px' }}>
                    {feedback}
                </div>
            )}

            {/* Mic Button */}
            <button
                className={`btn btn-lg rounded-circle shadow-lg d-flex align-items-center justify-content-center p-3 fs-3 transition-all ${isListening ? 'btn-danger pulse-animation' : 'btn-primary'}`}
                onClick={toggleListening}
                style={{ width: '60px', height: '60px' }}
                title="Voice Trading Assistant"
            >
                <i className={`fa ${isListening ? 'fa-microphone-slash' : 'fa-microphone'}`}></i>
            </button>

            <style>
                {`
                .pulse-animation {
                    animation: pulse 1.5s infinite;
                    box-shadow: 0 0 0 0 rgba(220, 53, 69, 0.7);
                }
                
                @keyframes pulse {
                    0% {
                        transform: scale(0.95);
                        box-shadow: 0 0 0 0 rgba(220, 53, 69, 0.7);
                    }
                    
                    70% {
                        transform: scale(1.0);
                        box-shadow: 0 0 0 10px rgba(220, 53, 69, 0);
                    }
                    
                    100% {
                        transform: scale(0.95);
                        box-shadow: 0 0 0 0 rgba(220, 53, 69, 0);
                    }
                }
            `}
            </style>
        </div>
    );
};

export default VoiceAssistant;
