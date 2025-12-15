import React, { useState, useRef, useEffect } from "react";
import { RiTerminalBoxLine, RiCloseLine, RiSendPlaneFill, RiArrowLeftLine, RiBookOpenLine } from "react-icons/ri";
import "./AcademicChatbot.css";
import { academicData, academicWelcomeMessages, academicKeywords } from "../data/academicData";

const AcademicChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [currentView, setCurrentView] = useState("categories");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const messagesEndRef = useRef(null);
    const chatWindowRef = useRef(null);

    useEffect(() => {
        if (messages.length === 0) {
            setMessages(academicWelcomeMessages);
        }
    }, []);

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

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, currentView]);

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setCurrentView("items");

        const botMessage = {
            type: "bot",
            text: `Voici les informations disponibles pour **${category.category}** :`,
            timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
    };

    const handleItemSelect = (item) => {
        setSelectedItem(item);
        setCurrentView("details");

        const botMessage = {
            type: "bot",
            text: `Voici les détails pour : **${item.title}**`,
            isItem: true,
            itemData: item,
            timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
    };

    const handleBack = () => {
        if (currentView === "details") {
            setCurrentView("items");
            setSelectedItem(null);
        } else if (currentView === "items") {
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
        setSelectedItem(null);
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

        const userMsg = {
            type: "user",
            text: inputValue,
            timestamp: new Date()
        };
        setMessages(prev => [...prev, userMsg]);

        const lowerInput = inputValue.toLowerCase();
        let foundItem = null;
        let foundCategory = null;

        for (const category of academicData) {
            const catKey = category.category.toLowerCase().split(' ')[0];
            // Check keywords
            if (academicKeywords[catKey] && academicKeywords[catKey].some(k => lowerInput.includes(k))) {
                foundCategory = category;
            }

            for (const item of category.items) {
                if (item.title.toLowerCase().includes(lowerInput) ||
                    item.description.toLowerCase().includes(lowerInput)) {
                    foundItem = item;
                    foundCategory = category;
                    break;
                }
            }
            if (foundItem) break;
        }

        setTimeout(() => {
            if (foundItem) {
                setSelectedCategory(foundCategory);
                setSelectedItem(foundItem);
                setCurrentView("details");

                setMessages(prev => [...prev, {
                    type: "bot",
                    text: `J'ai trouvé ceci pour vous : **${foundItem.title}**`,
                    isItem: true,
                    itemData: foundItem,
                    timestamp: new Date()
                }]);
            } else if (foundCategory) {
                setSelectedCategory(foundCategory);
                setCurrentView("items");

                setMessages(prev => [...prev, {
                    type: "bot",
                    text: `Vous cherchez des infos sur **${foundCategory.category}**. Voici les sujets disponibles :`,
                    timestamp: new Date()
                }]);
            } else {
                setMessages(prev => [...prev, {
                    type: "bot",
                    text: "Je n'ai pas trouvé d'information exacte. Veuillez choisir parmi les catégories :",
                    timestamp: new Date()
                }]);
                setCurrentView("categories");
                setSelectedCategory(null);
                setSelectedItem(null);
            }
        }, 500);

        setInputValue("");
    };

    const renderContent = () => {
        if (currentView === "categories") {
            return (
                <div className="categories-grid">
                    {academicData.map((cat, index) => (
                        <div
                            key={index}
                            className="academic-category-btn"
                            onClick={() => handleCategorySelect(cat)}
                        >
                            <span className="category-icon">{cat.icon}</span>
                            <span className="category-name">{cat.category}</span>
                        </div>
                    ))}
                </div>
            );
        } else if (currentView === "items" && selectedCategory) {
            return (
                <div className="procedures-list">
                    <div className="nav-actions mb-2">
                        <button onClick={handleBack} className="action-btn">
                            <RiArrowLeftLine className="inline mr-1" /> Retour
                        </button>
                    </div>
                    {selectedCategory.items.map((item, index) => (
                        <div
                            key={index}
                            className="procedure-btn"
                            onClick={() => handleItemSelect(item)}
                        >
                            <span>{item.title}</span>
                            <RiArrowLeftLine className="rotate-180" />
                        </div>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="academic-chatbot-container">
            {isOpen && (
                <div className="academic-chat-window" ref={chatWindowRef}>
                    <div className="academic-chat-header">
                        <div className="header-info">
                            <h3>Assistant Pédagogique</h3>
                            <p>
                                <span className="status-dot"></span>
                                En ligne • Filières & Règles
                            </p>
                        </div>
                        <button onClick={toggleChat} className="close-btn">
                            <RiCloseLine size={20} />
                        </button>
                    </div>

                    <div className="chat-messages">
                        {messages.map((msg, index) => (
                            <div key={index} className={msg.type === 'user' ? 'academic-message-user' : 'academic-message-bot'}>
                                <div dangerouslySetInnerHTML={{
                                    __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>')
                                }} />

                                {msg.isItem && msg.itemData && (
                                    <div className="procedure-details">
                                        {/* Dynamic rendering based on data structure */}
                                        {msg.itemData.details && (
                                            <div className="detail-section">
                                                <div className="academic-detail-title">Détails</div>
                                                <ul className="docs-list">
                                                    {Object.entries(msg.itemData.details).map(([key, value], i) => (
                                                        <li key={i}><strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {Array.isArray(value) ? value.join(", ") : value}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {msg.itemData.content && (
                                            <div className="detail-section">
                                                <div className="academic-detail-title">Règles</div>
                                                <ul className="steps-list">
                                                    {msg.itemData.content.map((line, i) => (
                                                        <li key={i}>{line}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {msg.itemData.table && (
                                            <div className="detail-section">
                                                <div className="academic-detail-title">Modules</div>
                                                <table className="academic-table">
                                                    <thead>
                                                        <tr>
                                                            <th>Module</th>
                                                            <th>Coeff</th>
                                                            <th>Crédit</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {msg.itemData.table.map((row, i) => (
                                                            <tr key={i}>
                                                                <td>{row.module}</td>
                                                                <td>{row.coeff}</td>
                                                                <td>{row.credit}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        )}

                                        <div className="nav-actions">
                                            <button onClick={handleBack} className="action-btn">
                                                Retour
                                            </button>
                                            <button onClick={handleReset} className="action-btn primary">
                                                Autre question
                                            </button>
                                        </div>
                                    </div>
                                )}
                                <div className="message-time">
                                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                            </div>
                        ))}

                        {!selectedItem && (
                            <div className="academic-message-bot" style={{ maxWidth: '100%' }}>
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
                            placeholder="Question sur les filières, notes..."
                            className="chat-input"
                        />
                        <button type="submit" className="academic-send-btn" disabled={!inputValue.trim()}>
                            <RiSendPlaneFill size={18} />
                        </button>
                    </form>
                </div>
            )}

            {!isOpen && (
                <button onClick={toggleChat} className="academic-chatbot-toggle">
                    <RiTerminalBoxLine />
                    <span className="notification-badge"></span>
                </button>
            )}
        </div>
    );
};

export default AcademicChatbot;
