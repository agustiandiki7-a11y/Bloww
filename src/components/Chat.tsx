import React, { useState, useRef, useEffect } from 'react';
import { Send, Heart, Sparkles, Smile, ArrowDown, SmilePlus, HelpCircle } from 'lucide-react';
import { ChatMessage } from '../types';

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'c1', sender: 'partner', text: "Hey sweetheart! Have you opened today's love pill note box yet? 🥰", timestamp: '10:14 AM' },
    { id: 'c2', sender: 'user', text: 'Yes! It made me blush so hard! The kitty illustration was adorable. 🐱💖', timestamp: '10:15 AM' },
    { id: 'c3', sender: 'partner', text: "Aww! I scheduled some cute GIF gifts to drop on your feed this afternoon too, keep an eye out! 🎈", timestamp: '10:16 AM' },
  ]);
  const [inputText, setInputText] = useState('');
  const [activeReactionMsgId, setActiveReactionMsgId] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new message
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: inputText,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    // Simulate partner auto sweet response
    const replies = [
      "You make me the happiest person in the universe! 🥰✨",
      "Sending you a million virtual cheek squeezes right now! 🧸🎀",
      "Hehehe, can't wait for our cozy movie Date tonight! 🍿🕯️",
      "I love you higher than the clouds of the mountain heights! ☁️❤️",
      "Hurry back to our shared space! I miss your voice! 🥺🌸"
    ];

    setTimeout(() => {
      const partnerMsg: ChatMessage = {
        id: `prt-${Date.now()}`,
        sender: 'partner',
        text: replies[Math.floor(Math.random() * replies.length)],
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, partnerMsg]);
    }, 1400);
  };

  const addReactionToMessage = (msgId: string, reaction: string) => {
    setMessages(prev => prev.map(m => {
      if (m.id === msgId) {
        return { ...m, reaction: m.reaction === reaction ? undefined : reaction };
      }
      return m;
    }));
    setActiveReactionMsgId(null);
  };

  return (
    <div id="chat-tab" className="space-y-4 max-w-xl mx-auto pb-10">
      
      {/* Upper header */}
      <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-4 border border-white/50 shadow-sm flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 text-left">
          <div className="relative">
            <div className="w-10 h-10 rounded-full border bg-pink-100 flex items-center justify-center text-xl select-none leading-none">
              🐱
            </div>
            <span className="w-2.5 h-2.5 bg-green-500 rounded-full border border-white absolute bottom-0 right-0 animate-pulse" />
          </div>

          <div>
            <h3 className="font-extrabold text-stone-850 text-xs md:text-sm leading-none">Darling Partner</h3>
            <span className="text-[10px] text-stone-400 font-semibold leading-none mt-1 block">Active inside LoveBloom space</span>
          </div>
        </div>

        <span className="text-[9px] font-extrabold bg-pink-100 text-pink-700 hover:text-pink-850 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
          Secure Tunnel
        </span>
      </div>

      {/* Message Chat Feed Box */}
      <div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-stone-200/55 p-4 h-[420px] flex flex-col justify-between relative shadow-xl">
        
        {/* Scroll Container */}
        <div
          ref={containerRef}
          className="flex-grow overflow-y-auto space-y-3 pr-1 scrollbar-none pb-4"
        >
          {messages.map((m) => {
            const isUser = m.sender === 'user';
            const reactionActive = activeReactionMsgId === m.id;
            
            return (
              <div key={m.id} className={`flex flex-col relative ${isUser ? 'items-end' : 'items-start'}`}>
                
                {/* Bubble content */}
                <div className="group relative max-w-[85%]">
                  <div
                    onClick={() => setActiveReactionMsgId(reactionActive ? null : m.id)}
                    className={`p-3 rounded-2xl text-xs font-semibold leading-relaxed tracking-wide shadow-sm cursor-pointer relative select-none text-left ${
                      isUser
                        ? 'bg-gradient-to-r from-pink-500 to-rose-450 text-white rounded-tr-none'
                        : 'bg-stone-50 border text-stone-800 rounded-tl-none'
                    }`}
                  >
                    {m.text}

                    {/* Reaction micro indicator tag on the bubble */}
                    {m.reaction && (
                      <span className="absolute -bottom-2 right-1.5 bg-white border rounded-full px-1 py-0.5 text-[11px] shadow-sm leading-none z-10 animate-fade-in block">
                        {m.reaction}
                      </span>
                    )}
                  </div>

                  {/* Message timestamp metadata */}
                  <span className="text-[9px] text-stone-400 font-medium block mt-1 px-1 text-right">
                    {m.timestamp}
                  </span>

                  {/* Click trigger sticker reactions bar */}
                  {reactionActive && (
                    <div className="absolute top-10 right-0 left-0 bg-white border shadow-2xl p-1.5 rounded-xl flex justify-around items-center select-none z-40 gap-1.5 animate-bounce max-w-[200px] mx-auto border-pink-100">
                      {['❤️', '💖', '😂', '🥺', '😮', '🍿'].map(rx => (
                        <button
                          key={rx}
                          onClick={() => addReactionToMessage(m.id, rx)}
                          className="text-base hover:bg-pink-105 p-1 rounded-lg transition active:scale-90"
                        >
                          {rx}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Input area */}
        <form onSubmit={handleSendMessage} className="border-t pt-3 flex gap-2 items-center">
          
          <button
            type="button"
            onClick={() => setInputText((prev) => prev + ' ❤️')}
            className="w-[44px] h-[44px] flex items-center justify-center shrink-0 bg-stone-50 border border-stone-200 text-stone-500 hover:text-pink-500 rounded-xl transition shadow-sm cursor-pointer hover:bg-pink-50/20"
            title="Insert Hearts"
          >
            <Heart className="w-4 h-4 fill-pink-500 text-pink-500" />
          </button>

          <input
            type="text"
            placeholder="Type confidential couple telegram code..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-grow px-3.5 h-[44px] bg-stone-50 border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-300 text-xs shadow-inner text-stone-800"
          />

          <button
            type="submit"
            className="w-[44px] h-[44px] flex items-center justify-center shrink-0 bg-pink-500 hover:bg-pink-600 text-white rounded-xl transition shadow-md shadow-pink-300/30 cursor-pointer active:scale-95"
            title="Send"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Preset reminders block */}
      <div className="bg-amber-50/40 border border-amber-250 p-3 rounded-2xl text-[11px] font-semibold text-stone-750 text-left flex gap-1.5 items-center justify-between">
        <span className="truncate pr-1">🌸 Quick Suggestion: Send partner a popcorn date reminder!</span>
        <button
          onClick={() => setInputText("Don't forget our cozy movies date night tonight! I've bookmarked everything in the gallery! 🎬🌸")}
          className="px-3 py-1 bg-amber-550 border border-amber-300 rounded-lg text-amber-900 bg-amber-100/60 font-bold hover:bg-amber-100"
        >
          Insert Prompt
        </button>
      </div>
    </div>
  );
}
