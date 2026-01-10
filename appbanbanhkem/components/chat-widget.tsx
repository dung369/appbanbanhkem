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

  // Get current user or create anonymous ID
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
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
    position === "bottom-right" ? "right-4 bottom-4" : "left-4 bottom-4";

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed ${positionClasses} z-50 bg-pink-500 hover:bg-pink-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110`}
        aria-label="Open chat"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div
      className={`fixed ${positionClasses} z-50 bg-white rounded-lg shadow-2xl transition-all duration-300 ${
        isMinimized ? "w-80 h-16" : "w-96 h-[600px]"
      }`}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white p-4 rounded-t-lg flex justify-between items-center">
        <div>
          <h3 className="font-semibold">💬 Chat hỗ trợ bánh kem</h3>
          <div className="text-xs mt-1">🤖 Chatbot tự động</div>
        </div>
        <div className="flex gap-2">
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
          <div className="h-[calc(100%-130px)] overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 mt-8">
                <MessageCircle className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                <p>Xin chào! Tôi có thể giúp gì cho bạn?</p>
                <p className="text-sm mt-2">
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
                  className={`max-w-[80%] rounded-lg p-3 ${
                    msg.senderType === "user"
                      ? "bg-pink-500 text-white"
                      : "bg-white text-gray-800 border border-gray-200"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  {msg.images && msg.images.length > 0 && (
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      {msg.images.map((img, idx) => (
                        <img
                          key={idx}
                          src={img}
                          alt="Uploaded"
                          className="rounded w-full h-20 object-cover"
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 border border-gray-200 rounded-lg p-3">
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
          <div className="border-t p-4 bg-white rounded-b-lg">
            {error && (
              <div className="mb-2 p-2 bg-red-100 text-red-700 text-sm rounded">
                {error}
              </div>
            )}
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Nhập tin nhắn..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                disabled={isLoading || !inputMessage.trim()}
                className="bg-pink-500 hover:bg-pink-600"
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
