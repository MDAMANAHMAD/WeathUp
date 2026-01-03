import React, { useState, useEffect, useContext } from "react";
import GeneralContext from "./GeneralContext";

const VoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [feedback, setFeedback] = useState("");
  const { openBuyWindow } = useContext(GeneralContext);

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
    // Command Logic
    // Pattern: "Buy [Stock]"
    if (cmd.includes("buy") || cmd.includes("purchase")) {
        const stock = extractStockName(cmd);
        if (stock) {
            setFeedback(`Opening Buy Order for ${stock.toUpperCase()}...`);
            openBuyWindow(stock.toUpperCase(), "BUY");
        } else {
            setFeedback("Could not identify stock name.");
        }
    } 
    // Pattern: "Sell [Stock]"
    else if (cmd.includes("sell")) {
        const stock = extractStockName(cmd);
        if (stock) {
             setFeedback(`Opening Sell Order for ${stock.toUpperCase()}...`);
             openBuyWindow(stock.toUpperCase(), "SELL"); // Assuming BuyWindow handles Sell mode too or we need to check
        } else {
            setFeedback("Could not identify stock name.");
        }
    }
    // Pattern: "Show [Stock]" (Navigation/Context - simulated)
    else if (cmd.includes("show") || cmd.includes("open")) {
        const stock = extractStockName(cmd);
        if (stock) {
            setFeedback(`Showing details for ${stock.toUpperCase()}`);
            // In a real app, this would navigate. For now, we'll just open the buy window as a "Detail" view proxy or specific action
             openBuyWindow(stock.toUpperCase(), "BUY"); 
        }
    }
    else {
        setFeedback(`Command not recognized: "${cmd}"`);
    }
  };

  const extractStockName = (cmd) => {
    // Simple heuristic: remove the action verbs and return the rest
    // In a real app, you'd fuzzy match against a known list of stocks (watchlist)
    const verbs = ["buy", "purchase", "sell", "show", "open", "me"];
    const words = cmd.split(" ");
    
    // Filter out verbs and common filler words like "shares", "of", "stock"
    const fillers = ["shares", "of", "stock", "the", "for"];
    
    const stockWords = words.filter(w => !verbs.includes(w) && !fillers.includes(w));
    
    if (stockWords.length > 0) {
        // Simple mapping for common variations or voice misinterpretations
        let stock = stockWords.join("").toUpperCase();
        
        // Manual mapping for demo reliability
        if (stock.includes("RELIANCE")) return "RELIANCE";
        if (stock.includes("TCS")) return "TCS";
        if (stock.includes("INFOSYS") || stock.includes("INFY")) return "INFY";
        if (stock.includes("WIPRO")) return "WIPRO";
        if (stock.includes("HDFC")) return "HDFCBANK";
        
        return stock;
    }
    return null;
  };

  if (!recognition) return null;

  return (
    <div className="voice-assistant-container position-fixed bottom-0 end-0 m-4 z-3">
        {/* Feedback Bubble */}
        {feedback && (
            <div className="bg-dark text-white p-2 rounded-3 mb-2 shadow-sm animate__animated animate__fadeInUp small text-center" style={{maxWidth: '200px'}}>
                {feedback}
            </div>
        )}

        {/* Mic Button */}
        <button 
            className={`btn btn-lg rounded-circle shadow-lg d-flex align-items-center justify-content-center p-3 fs-3 transition-all ${isListening ? 'btn-danger pulse-animation' : 'btn-primary'}`}
            onClick={toggleListening}
            style={{width: '60px', height: '60px'}}
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
