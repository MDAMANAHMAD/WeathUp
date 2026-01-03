import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import GeneralContext from "./GeneralContext";
import { useAuth } from "../context/AuthContext"; // Import useAuth

const VoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [feedback, setFeedback] = useState("");
  const { openBuyWindow } = useContext(GeneralContext);
  const { logout } = useAuth(); // Get logout function
  const navigate = useNavigate();

  // Use refs to access the latest state in callbacks without re-initializing recognition on every render
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = false; // We want single commands when holding
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
        setIsListening(true);
        setFeedback("Listening...");
    };

    recognition.onend = () => {
        setIsListening(false);
        // Do NOT clear feedback immediately so user can see what happened
        setTimeout(() => {
             setFeedback("");
        }, 3000);
    };

    recognition.onresult = (event) => {
      const command = event.results[0][0].transcript.toLowerCase();
      setTranscript(command);
      processCommand(command);
    };

    recognition.onerror = (event) => {
        // Ignore "no-speech" errors which happen if user releases too fast or doesn't speak
        if (event.error !== 'no-speech') {
            console.error("Speech recognition error", event.error);
            setFeedback("Error: " + event.error);
        }
        setIsListening(false);
    };

    recognitionRef.current = recognition;
  }, []); // Initialize once

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      try {
        recognitionRef.current.start();
      } catch (e) {
        console.error("Start error", e);
      }
    }
    setFeedback("Listening..."); // Immediate visual feedback
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
       // We don't forcefully stop here because we want the result to process.
       // However, for "Hold to Speak", users expect it to process when they release.
       // The API processes on silence or stop.
       try {
         recognitionRef.current.stop();
       } catch (e) {
         console.error("Stop error", e);
       }
    }
  };

  const processCommand = (cmd) => {
    console.log("Processing Voice Command:", cmd);

    // 1. Navigation Commands
    if (cmd.includes("go to") || cmd.includes("open") || cmd.includes("show")) {
        if (cmd.includes("holdings") || cmd.includes("holding")) {
            setFeedback("Navigating to Holdings...");
            navigate("/holdings");
            return;
        }
        if (cmd.includes("orders") || cmd.includes("order")) {
            setFeedback("Navigating to Orders...");
            navigate("/orders");
            return;
        }
        if (cmd.includes("positions") || cmd.includes("position")) {
            setFeedback("Navigating to Positions...");
            navigate("/positions");
            return;
        }
        if (cmd.includes("funds") || cmd.includes("fund")) {
            setFeedback("Navigating to Funds...");
            navigate("/funds");
            return;
        }
        if (cmd.includes("analytics") || cmd.includes("insight")) {
            setFeedback("Opening Analytics...");
            navigate("/analytics");
            return;
        }
        if (cmd.includes("dashboard") || cmd.includes("home")) {
            setFeedback("Going Home...");
            navigate("/");
            return;
        }
        if (cmd.includes("logout") || cmd.includes("log out")) {
            setFeedback("Logging out...");
            logout();
            return;
        }
    }

    // 2. Trading Commands (Buy/Sell)
    let quantity = 1;
    const qtyMatch = cmd.match(/(\d+)/); 
    if (qtyMatch) {
        quantity = parseInt(qtyMatch[0], 10);
    }

    if (cmd.includes("buy") || cmd.includes("purchase")) {
        const stock = extractStockName(cmd);
        if (stock) {
            setFeedback(`Buying ${quantity} ${stock.toUpperCase()}...`);
            openBuyWindow(stock.toUpperCase(), "BUY", quantity);
        } else {
            setFeedback(`Could not identify stock in "${cmd}"`);
        }
    } 
    else if (cmd.includes("sell")) {
        const stock = extractStockName(cmd);
        if (stock) {
             setFeedback(`Selling ${quantity} ${stock.toUpperCase()}...`);
             openBuyWindow(stock.toUpperCase(), "SELL", quantity);
        } else {
            setFeedback(`Could not identify stock in "${cmd}"`);
        }
    }
    else {
        if (!cmd.includes("go to") && !cmd.includes("show")) {
             setFeedback(`Unknown command: "${cmd}"`);
        }
    }
  };

  const extractStockName = (cmd) => {
    const knownStocks = [
        "RELIANCE", "TCS", "INFY", "INFOSYS", "WIPRO", "HDFC", "HDFCBANK", 
        "SBIN", "SBI", "ITC", "KOTAK", "ICICI", "AXIS", "AXISBANK", 
        "MARUTI", "TITAN", "ADANI", "ADANIENT", "ASIANPAINT", "SUNPHARMA", 
        "ULTRACEMCO", "TATAPOWER", "TATA", "QUICKHEAL", "QUICK", "HEAL"
    ];

    const upperCmd = cmd.toUpperCase();

    for (const stock of knownStocks) {
        if (upperCmd.includes(stock)) {
            if (stock === "INFOSYS") return "INFY";
            if (stock === "SBI") return "SBIN";
            if (stock === "ADANI") return "ADANIENT";
            if (stock === "HDFC") return "HDFCBANK";
            if (stock === "AXIS") return "AXISBANK";
            if (stock === "TATA") return "TATAPOWER";
            if (stock === "QUICK" || stock === "HEAL") return "QUICKHEAL"; 
            return stock;
        }
    }
    return null;
  };

  if (!window.SpeechRecognition && !window.webkitSpeechRecognition) return null;

  return (
    <div className="voice-assistant-container position-fixed bottom-0 end-0 m-4 z-3 d-flex flex-column align-items-end">
        {/* Feedback Bubble */}
        {feedback && (
            <div className="bg-dark text-white p-2 rounded-3 mb-2 shadow-sm animate__animated animate__fadeInUp small text-center" style={{maxWidth: '200px'}}>
                {feedback}
            </div>
        )}

        {/* Hold-to-Speak Mic Button */}
        <button 
            className={`btn btn-lg rounded-circle shadow-lg d-flex align-items-center justify-content-center p-3 fs-3 transition-all ${isListening ? 'btn-danger pulse-animation' : 'btn-primary'}`}
            onMouseDown={startListening}
            onMouseUp={stopListening}
            onMouseLeave={stopListening}
            onTouchStart={startListening}
            onTouchEnd={stopListening}
            style={{width: '70px', height: '70px', userSelect: 'none'}}
            title="Hold to Speak"
        >
            <i className={`fa ${isListening ? 'fa-microphone' : 'fa-microphone-alt'}`}></i>
        </button>
        
        {/* Helper Text */}
        <div className="small text-muted fw-bold mt-1 text-center bg-white px-2 rounded shadow-sm" style={{fontSize: '0.7rem'}}>
            {isListening ? "Release to Send" : "Hold to Speak"}
        </div>
        
        <style>
            {`
                .pulse-animation {
                    animation: pulse 1.0s infinite;
                    box-shadow: 0 0 0 0 rgba(220, 53, 69, 0.7);
                    transform: scale(1.1);
                }
                
                @keyframes pulse {
                    0% {
                        transform: scale(1.1);
                        box-shadow: 0 0 0 0 rgba(220, 53, 69, 0.7);
                    }
                    
                    70% {
                        transform: scale(1.15);
                        box-shadow: 0 0 0 15px rgba(220, 53, 69, 0);
                    }
                    
                    100% {
                        transform: scale(1.1);
                        box-shadow: 0 0 0 0 rgba(220, 53, 69, 0);
                    }
                }
            `}
        </style>
    </div>
  );
};

export default VoiceAssistant;
