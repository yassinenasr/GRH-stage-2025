import React, { useState, useRef, useEffect } from "react";
import { RiMessage3Fill, RiCloseLine, RiSendPlaneFill, RiArrowLeftLine, RiTimeLine, RiMapPinLine } from "react-icons/ri";
import "./Chatbot.css";
import { proceduresData, welcomeMessages, keywords } from "../data/proceduresData";

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [currentView, setCurrentView] = useState("categories"); // categories, procedures, details
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedProcedure, setSelectedProcedure] = useState(null);
    const messagesEndRef = useRef(null);
    const chatWindowRef = useRef(null);

    // Initialisation
    useEffect(() => {
        if (messages.length === 0) {
            setMessages(welcomeMessages);
        }
    }, []);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpen && chatWindowRef.current && !chatWindowRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, currentView]);

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setCurrentView("procedures");

        const botMessage = {
            type: "bot",
            text: `Voici les procédures disponibles pour **${category.category}** :`,
            timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
    };

    const handleProcedureSelect = (procedure) => {
        setSelectedProcedure(procedure);
        setCurrentView("details");

        const botMessage = {
            type: "bot",
            text: `Voici les détails pour : **${procedure.title}**`,
            isProcedure: true,
            procedureData: procedure,
            timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
    };

    const handleBack = () => {
        if (currentView === "details") {
            setCurrentView("procedures");
            setSelectedProcedure(null);
        } else if (currentView === "procedures") {
            setCurrentView("categories");
            setSelectedCategory(null);

            const botMessage = {
                type: "bot",
                text: "Sélectionnez une catégorie :",
                timestamp: new Date()
            };
            setMessages(prev => [...prev, botMessage]);
        }
    };

    const handleReset = () => {
        setCurrentView("categories");
        setSelectedCategory(null);
        setSelectedProcedure(null);
        setMessages([
            {
                type: "bot",
                text: "Comment puis-je vous aider à nouveau ?",
                timestamp: new Date()
            }
        ]);
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        // User message
        const userMsg = {
            type: "user",
            text: inputValue,
            timestamp: new Date()
        };
        setMessages(prev => [...prev, userMsg]);

        // Process input for keywords
        const lowerInput = inputValue.toLowerCase();
        let foundProcedure = null;
        let foundCategory = null;

        // Search logic
        for (const category of proceduresData) {
            // Check category keywords
            const catKey = category.category.toLowerCase().split(' ')[0];
            if (keywords[catKey] && keywords[catKey].some(k => lowerInput.includes(k))) {
                foundCategory = category;
            }

            // Check procedures
            for (const proc of category.procedures) {
                if (proc.title.toLowerCase().includes(lowerInput) ||
                    proc.description.toLowerCase().includes(lowerInput)) {
                    foundProcedure = proc;
                    foundCategory = category;
                    break;
                }
            }
            if (foundProcedure) break;
        }

        // Bot response
        setTimeout(() => {
            if (foundProcedure) {
                setSelectedCategory(foundCategory);
                setSelectedProcedure(foundProcedure);
                setCurrentView("details");

                setMessages(prev => [...prev, {
                    type: "bot",
                    text: `J'ai trouvé cette procédure pour vous : **${foundProcedure.title}**`,
                    isProcedure: true,
                    procedureData: foundProcedure,
                    timestamp: new Date()
                }]);
            } else if (foundCategory) {
                setSelectedCategory(foundCategory);
                setCurrentView("procedures");

                setMessages(prev => [...prev, {
                    type: "bot",
                    text: `Il semble que vous cherchez des informations sur **${foundCategory.category}**. Voici les procédures associées :`,
                    timestamp: new Date()
                }]);
            } else {
                setMessages(prev => [...prev, {
                    type: "bot",
                    text: "Je n'ai pas trouvé de procédure exacte correspondant à votre demande. Veuillez choisir parmi les catégories ci-dessous :",
                    timestamp: new Date()
                }]);
                setCurrentView("categories");
                setSelectedCategory(null);
                setSelectedProcedure(null);
            }
        }, 500);

        setInputValue("");
    };

    // Render content based on current view
    const renderContent = () => {
        if (currentView === "categories") {
            return (
                <div className="categories-grid">
                    {proceduresData.map((cat, index) => (
                        <div
                            key={index}
                            className="category-btn"
                            onClick={() => handleCategorySelect(cat)}
                        >
                            <span className="category-icon">{cat.icon}</span>
                            <span className="category-name">{cat.category}</span>
                        </div>
                    ))}
                </div>
            );
        } else if (currentView === "procedures" && selectedCategory) {
            return (
                <div className="procedures-list">
                    <div className="nav-actions mb-2">
                        <button onClick={handleBack} className="action-btn">
                            <RiArrowLeftLine className="inline mr-1" /> Retour
                        </button>
                    </div>
                    {selectedCategory.procedures.map((proc, index) => (
                        <div
                            key={index}
                            className="procedure-btn"
                            onClick={() => handleProcedureSelect(proc)}
                        >
                            <span>{proc.title}</span>
                            <RiArrowLeftLine className="rotate-180" />
                        </div>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="chatbot-container">
            {/* Chat Window */}
            {isOpen && (
                <div className="chat-window" ref={chatWindowRef}>
                    <div className="chat-header">
                        <div className="header-info">
                            <h3>Assistant ISSAT</h3>
                            <p>
                                <span className="status-dot"></span>
                                En ligne • Guide Administratif
                            </p>
                        </div>
                        <button onClick={toggleChat} className="close-btn">
                            <RiCloseLine size={20} />
                        </button>
                    </div>

                    <div className="chat-messages">
                        {messages.map((msg, index) => (
                            <div key={index} className={`message ${msg.type}`}>
                                <div dangerouslySetInnerHTML={{
                                    __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                }} />

                                {msg.isProcedure && msg.procedureData && (
                                    <div className="procedure-details">
                                        <div className="detail-section">
                                            <div className="detail-title">Documents Requis</div>
                                            <ul className="docs-list">
                                                {msg.procedureData.documents.map((doc, i) => (
                                                    <li key={i}>{doc}</li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="detail-section">
                                            <div className="detail-title">Étapes à suivre</div>
                                            <ol className="steps-list">
                                                {msg.procedureData.steps.map((step, i) => (
                                                    <li key={i}>{step}</li>
                                                ))}
                                            </ol>
                                        </div>

                                        <div className="grid grid-cols-2 gap-2 mt-3">
                                            <div className="bg-gray-50 p-2 rounded text-xs">
                                                <div className="font-semibold text-cyan-700 flex items-center gap-1">
                                                    <RiTimeLine /> Délai
                                                </div>
                                                {msg.procedureData.delai}
                                            </div>
                                            <div className="bg-gray-50 p-2 rounded text-xs">
                                                <div className="font-semibold text-cyan-700 flex items-center gap-1">
                                                    <RiMapPinLine /> Bureau
                                                </div>
                                                {msg.procedureData.bureau}
                                            </div>
                                        </div>

                                        {msg.procedureData.conseil && (
                                            <div className="info-box">
                                                💡 <strong>Conseil :</strong> {msg.procedureData.conseil}
                                            </div>
                                        )}

                                        <div className="nav-actions">
                                            <button onClick={handleBack} className="action-btn">
                                                Retour
                                            </button>
                                            <button onClick={handleReset} className="action-btn primary">
                                                Autre demande
                                            </button>
                                        </div>
                                    </div>
                                )}
                                <div className="message-time">
                                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                            </div>
                        ))}

                        {/* Dynamic Content Area (Categories/Procedures lists) */}
                        {!selectedProcedure && (
                            <div className="message bot" style={{ maxWidth: '100%' }}>
                                {renderContent()}
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    <form onSubmit={handleSendMessage} className="chat-input-area">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Posez une question..."
                            className="chat-input"
                        />
                        <button type="submit" className="send-btn" disabled={!inputValue.trim()}>
                            <RiSendPlaneFill size={18} />
                        </button>
                    </form>
                </div>
            )}

            {/* Toggle Button */}
            {!isOpen && (
                <button onClick={toggleChat} className="chatbot-toggle">
                    <RiMessage3Fill />
                    <span className="notification-badge"></span>
                </button>
            )}
        </div>
    );
};

export default Chatbot;
