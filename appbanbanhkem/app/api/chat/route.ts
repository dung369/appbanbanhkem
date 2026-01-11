// API Route: /api/chat
// Simple chatbot with keyword matching

import { NextRequest, NextResponse } from "next/server";
import {
  generateSimpleResponse,
  getCategorySuggestions,
} from "@/lib/simple-chatbot";
import { db } from "@/lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, chatId, message, isLiveMode } = body;

    if (!userId || !message) {
      return NextResponse.json({ error: "Thiếu thông tin" }, { status: 400 });
    }

    // 1. Save user message
    const userMessage = {
      chatId,
      senderId: userId,
      senderType: "user",
      content: message,
      timestamp: Timestamp.now(),
      read: false,
    };

    await addDoc(collection(db, "chat_messages"), userMessage);

    // 2. If in live mode, don't send bot response - admin will reply
    if (isLiveMode) {
      return NextResponse.json({
        type: "live_mode",
        message: "Tin nhắn đã được gửi đến shop. Vui lòng đợi phản hồi...",
        reply: "LIVE_MODE_ACTIVE",
      });
    }

    // 3. Generate bot response
    const botResponse = generateSimpleResponse(message);
    const suggestions = getCategorySuggestions(message);

    // 4. Check if bot wants to trigger live chat
    if (botResponse === "LIVE_CHAT_REQUEST") {
      // Don't save bot message, just return the signal
      return NextResponse.json({
        type: "live_chat_request",
        message: "Đang kết nối với shop...",
        reply: "LIVE_CHAT_REQUEST",
      });
    }

    // 5. Save bot message (don't include undefined fields)
    const botMessage: any = {
      chatId,
      senderId: "bot",
      senderType: "bot",
      content: botResponse,
      timestamp: Timestamp.now(),
      read: false,
    };

    // Only add suggestions if there are any
    if (suggestions.length > 0) {
      botMessage.suggestions = suggestions;
    }

    await addDoc(collection(db, "chat_messages"), botMessage);

    return NextResponse.json({
      type: "bot_response",
      message: botResponse,
      reply: botResponse,
      suggestions,
    });
  } catch (error: any) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: error.message || "Lỗi hệ thống" },
      { status: 500 }
    );
  }
}
