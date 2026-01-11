"use client";

// Chat Widget Component
// Main chatbot interface with Claude Haiku 4.5 integration

import { useState, useEffect, useRef } from "react";
import {
  Send,
  Image as ImageIcon,
  X,
  Minimize2,
  Maximize2,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { auth } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Message {
  id: string;
  content: string;
  senderType: "user" | "bot" | "cskh";
  timestamp: any;
  images?: string[];
}

interface ChatWidgetProps {
  position?: "bottom-right" | "bottom-left";
}

export function ChatWidget({ position = "bottom-right" }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [showLiveChatPrompt, setShowLiveChatPrompt] = useState(false);

  // Get current user or create anonymous ID
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        // When user logs out, clear all chat state
        setMessages([]);
        setSessionId(null);
        setIsLiveMode(false);
        setShowLiveChatPrompt(false);
        setInputMessage("");
        setError(null);
        
        // Create anonymous user ID for guests
        let guestId = localStorage.getItem("guestUserId");
        if (!guestId) {
          guestId =
            "guest_" +
            Date.now() +
            "_" +
            Math.random().toString(36).substr(2, 9);
          localStorage.setItem("guestUserId", guestId);
        }
        setUserId(guestId);
      }
    });
    return () => unsubscribe();
  }, []);

  // Initialize chat session - always create new session when opening chat
  useEffect(() => {
    if (!userId || !isOpen || sessionId) return;

    const initializeSession = async () => {
      try {
        console.log("Creating new chat session for user:", userId);
        // Always create new session
        const createResponse = await fetch("/api/chat/session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        });

        if (!createResponse.ok) {
          throw new Error("Failed to create session");
        }

        const newSession = await createResponse.json();
        console.log("Session created:", newSession.sessionId);
        setSessionId(newSession.sessionId);
      } catch (error) {
        console.error("Error initializing session:", error);
        setError("Không thể khởi tạo chat. Vui lòng thử lại!");
      }
    };

    initializeSession();
  }, [userId, isOpen, sessionId]);

  // Subscribe to messages
  useEffect(() => {
    if (!sessionId) return;

    const messagesQuery = query(
      collection(db, "chat_messages"),
      where("chatId", "==", sessionId),
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const newMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Message[];
      setMessages(newMessages);
    });

    return () => unsubscribe();
  }, [sessionId]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    console.log("handleSendMessage called", {
      inputMessage,
      userId,
      sessionId,
      isLoading,
    });

    if (!inputMessage.trim() || !userId || !sessionId || isLoading) {
      console.log("Validation failed", {
        hasInput: !!inputMessage.trim(),
        hasUserId: !!userId,
        hasSessionId: !!sessionId,
        isLoading,
      });
      return;
    }

    setIsLoading(true);
    const messageToSend = inputMessage;
    setInputMessage("");

    try {
      console.log("Sending message to API...");
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          chatId: sessionId,
          message: messageToSend,
          isLiveMode, // Pass live mode status to API
        }),
      });

      console.log("API response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API error:", errorData);
        setError(errorData.error || "Không thể gửi tin nhắn");
        setIsLoading(false);
        return;
      }

      const data = await response.json();
      console.log("API response data:", data);
      
      // Check if bot wants to trigger live chat
      if (data.reply === "LIVE_CHAT_REQUEST") {
        setShowLiveChatPrompt(true);
      }
      
      setError(null);
    } catch (error) {
      console.error("Error sending message:", error);
      setError("Lỗi kết nối. Vui lòng thử lại!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const positionClasses =
    position === "bottom-right" ? "right-2 sm:right-4 bottom-2 sm:bottom-4" : "left-2 sm:left-4 bottom-2 sm:bottom-4";

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed ${positionClasses} z-50 bg-pink-500 hover:bg-pink-600 text-white rounded-full p-3 sm:p-4 shadow-lg transition-all duration-300 hover:scale-110`}
        aria-label="Open chat"
      >
        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
    );
  }

  return (
    <div
      className={`fixed ${positionClasses} z-50 bg-white rounded-lg shadow-2xl transition-all duration-300 ${
        isMinimized 
          ? "w-[calc(100vw-1rem)] sm:w-80 h-14 sm:h-16" 
          : "w-[calc(100vw-1rem)] sm:w-96 h-[calc(100vh-2rem)] sm:h-[600px] max-h-[calc(100vh-2rem)]"
      }`}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white p-3 sm:p-4 rounded-t-lg flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-sm sm:text-base">
            💬 Chat hỗ trợ bánh kem
          </h3>
          <div className="text-xs mt-1 hidden sm:block">
            {isLiveMode ? "👤 Đang kết nối với shop" : "🤖 Chatbot tự động"}
          </div>
        </div>
        <div className="flex gap-1 sm:gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="hover:bg-white/20 p-1 rounded"
          >
            {isMinimized ? (
              <Maximize2 className="w-4 h-4" />
            ) : (
              <Minimize2 className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="hover:bg-white/20 p-1 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages Area */}
          <div className="h-[calc(100%-110px)] sm:h-[calc(100%-130px)] overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-gray-50">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 mt-4 sm:mt-8">
                <MessageCircle className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 text-gray-400" />
                <p className="text-sm sm:text-base">Xin chào! Tôi có thể giúp gì cho bạn?</p>
                <p className="text-xs sm:text-sm mt-2">
                  Hỏi về bánh kem, giá cả, đặt hàng...
                </p>
              </div>
            )}

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.senderType === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-[80%] rounded-lg p-2 sm:p-3 ${
                    msg.senderType === "user"
                      ? "bg-pink-500 text-white"
                      : msg.senderType === "cskh"
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-800 border border-gray-200"
                  }`}
                >
                  {msg.senderType === "cskh" && (
                    <div className="flex items-center gap-1 mb-1">
                      <span className="text-xs font-semibold">👤 Shop</span>
                    </div>
                  )}
                  <p className="text-xs sm:text-sm whitespace-pre-wrap">{msg.content}</p>
                  {msg.images && msg.images.length > 0 && (
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      {msg.images.map((img, idx) => (
                        <img
                          key={idx}
                          src={img}
                          alt="Uploaded"
                          className="rounded w-full h-16 sm:h-20 object-cover"
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Live Chat Prompt in Messages Area */}
            {showLiveChatPrompt && !isLiveMode && (
              <div className="flex justify-center">
                <div className="max-w-[90%] p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-300 rounded-xl shadow-lg">
                  <div className="text-center mb-3">
                    <div className="text-2xl mb-2">💬</div>
                    <p className="text-sm font-semibold text-gray-800 mb-1">
                      Bạn muốn chat trực tiếp với shop?
                    </p>
                    <p className="text-xs text-gray-600">
                      Nhân viên sẽ tư vấn chi tiết cho bạn
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => {
                        setIsLiveMode(true);
                        setShowLiveChatPrompt(false);
                      }}
                      className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-sm font-semibold shadow-md"
                    >
                      👤 Kết nối ngay
                    </Button>
                    <Button
                      onClick={() => setShowLiveChatPrompt(false)}
                      variant="outline"
                      className="text-sm"
                    >
                      Để sau
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {isLiveMode && messages.length > 0 && (
              <div className="flex justify-center py-2">
                <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-xs font-semibold border border-green-300">
                  ✅ Đã kết nối với shop - Vui lòng đợi phản hồi
                </div>
              </div>
            )}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 border border-gray-200 rounded-lg p-2 sm:p-3">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t p-2 sm:p-4 bg-white rounded-b-lg">
            {error && (
              <div className="mb-2 p-2 bg-red-100 text-red-700 text-xs sm:text-sm rounded">
                {error}
              </div>
            )}
            
            <div className="flex gap-1 sm:gap-2">
              <Input
                type="text"
                placeholder="Nhập tin nhắn..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                className="flex-1 text-sm"
              />
              <Button
                onClick={handleSendMessage}
                disabled={isLoading || !inputMessage.trim()}
                className="bg-pink-500 hover:bg-pink-600 px-3 sm:px-4"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
