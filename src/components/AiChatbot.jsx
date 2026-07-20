import { useState, useRef, useEffect } from 'react';
import { Send, X } from 'lucide-react';

const GROQ_API_KEY = process.env.REACT_APP_GROQ_API_KEY;

function AiChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hi there! 👋 I am the CodeHouse AI Assistant. How can I help you today?' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);
    const scrollRef = useRef(null);

    // Auto-scroll to bottom of chat
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = async () => {
        if (!inputValue.trim()) return;

        if (!GROQ_API_KEY) {
            alert('Groq API key is missing! Add REACT_APP_GROQ_API_KEY to your .env file.');
            return;
        }

        const newMessages = [...messages, { role: 'user', content: inputValue }];
        setMessages(newMessages);
        setInputValue('');
        setLoading(true);

        try {
            // Prepare the history constraint context for the AI
            const systemPrompt = {
                role: 'system',
                content: `You are a helpful and friendly recruitment assistant for 'CodeHouse', an AI-powered talent management platform. 
        Your goal is to help candidates navigate the platform, understand job requirements, and give broad interview advice. 
        Keep your responses short, professional, and friendly (maximum 2-3 sentences).`
            };

            const apiMessages = [systemPrompt, ...newMessages.map(m => ({ role: m.role, content: m.content }))];

            const response = await fetch(
                'https://api.groq.com/openai/v1/chat/completions',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + GROQ_API_KEY
                    },
                    body: JSON.stringify({
                        model: 'llama-3.3-70b-versatile',
                        messages: apiMessages,
                        temperature: 0.5,
                        max_tokens: 150
                    })
                }
            );

            if (!response.ok) {
                throw new Error('Chat API failed');
            }

            const data = await response.json();
            const aiResponse = data.choices[0].message.content;

            setMessages((prev) => [...prev, { role: 'assistant', content: aiResponse }]);
        } catch (err) {
            console.error(err);
            setMessages((prev) => [...prev, { role: 'assistant', content: "I'm sorry, I'm having trouble connecting right now. Please try again later. \uD83D\uDE22" }]);
        }

        setLoading(false);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Chat Window */}
            {isOpen && (
                <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-80 mb-4 flex flex-col overflow-hidden transition-all duration-300 transform origin-bottom-right">

                    {/* Header */}
                    <div className="bg-blue-800 text-white p-4 flex justify-between items-center z-10 shadow-md">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-sm bg-white flex-shrink-0">
                                <img src="/chatbot_avatar.png" alt="AI Bot" className="w-full h-full object-cover scale-[1.3] origin-bottom-center" />
                            </div>
                            <div>
                                <h3 className="font-bold text-sm">CodeHouse </h3>
                                <p className="text-xs text-blue-200">AI Assistant</p>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="text-white hover:bg-white/20 p-1 rounded-lg transition">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Chat Messages */}
                    <div ref={scrollRef} className="p-4 h-80 overflow-y-auto bg-slate-50 flex flex-col gap-3">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === 'user'
                                    ? 'bg-blue-600 text-white rounded-br-sm'
                                    : 'bg-white border border-slate-200 text-slate-700 rounded-bl-sm'
                                    }`}>
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="flex justify-start">
                                <div className="bg-white border border-slate-200 text-slate-400 p-3 rounded-2xl rounded-bl-sm text-sm flex gap-1">
                                    <span className="animate-bounce">•</span>
                                    <span className="animate-bounce delay-100">•</span>
                                    <span className="animate-bounce delay-200">•</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input Area */}
                    <div className="p-3 bg-white border-t border-slate-100 flex gap-2">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                            placeholder="Type your message..."
                            className="flex-1 bg-slate-100 text-sm p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            disabled={loading}
                        />
                        <button
                            onClick={handleSendMessage}
                            disabled={loading || !inputValue.trim()}
                            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-xl transition flex items-center justify-center disabled:opacity-50"
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            )}

            {/* Floating Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="w-16 h-16 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] shadow-blue-900/30 flex items-center justify-center transition-all transform hover:scale-110 overflow-hidden border-2 border-white bg-blue-50 group relative"
                >
                    <img src="/chatbot_avatar.png" alt="Open AI Assistant" className="w-full h-full object-cover transform transition duration-300 group-hover:scale-125 scale-[1.35] origin-[50%_40%]" />
                    {/* Notification dot */}
                    <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 border-2 border-white rounded-full animate-pulse"></span>
                </button>
            )}
        </div>
    );
}

export default AiChatbot;
