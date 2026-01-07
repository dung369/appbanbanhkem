// API Route: /api/chat
// Simple chatbot with keyword matching

import { NextRequest, NextResponse } from 'next/server';
import { generateSimpleResponse, getCategorySuggestions } from '@/lib/simple-chatbot';
import { db } from '@/lib/firebase';
import { 
  collection, 
  addDoc, 
  Timestamp
} from 'firebase/firestore';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, chatId, message } = body;

    if (!userId || !message) {
      return NextResponse.json(
        { error: 'Thiếu thông tin' },
        { status: 400 }
      );
    }

    // 1. Save user message
    const userMessage = {
      chatId,
      senderId: userId,
      senderType: 'user',
      content: message,
      timestamp: Timestamp.now(),
      read: false,
    };

    await addDoc(collection(db, 'chat_messages'), userMessage);

    // 2. Generate bot response
    const botResponse = generateSimpleResponse(message);
    const suggestions = getCategorySuggestions(message);

    // 3. Save bot message (don't include undefined fields)
    const botMessage: any = {
      chatId,
      senderId: 'bot',
      senderType: 'bot',
      content: botResponse,
      timestamp: Timestamp.now(),
      read: false,
    };

    // Only add suggestions if there are any
    if (suggestions.length > 0) {
      botMessage.suggestions = suggestions;
    }

    await addDoc(collection(db, 'chat_messages'), botMessage);

    return NextResponse.json({
      type: 'bot_response',
      message: botResponse,
      suggestions,
    });

  } catch (error: any) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: error.message || 'Lỗi hệ thống' },
      { status: 500 }
    );
  }
}
