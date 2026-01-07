// API Route: /api/chat/session
// Creates chat sessions - Simplified (no GET needed)

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { 
  collection, 
  addDoc, 
  Timestamp
} from 'firebase/firestore';

// Create new chat session
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json(
        { error: 'Thiếu User ID' },
        { status: 400 }
      );
    }

    console.log('Creating chat session for userId:', userId);

    // Create new chat session
    const sessionData = {
      userId,
      status: 'active',
      startedAt: Timestamp.now(),
      lastMessageAt: Timestamp.now(),
    };
    
    const sessionRef = await addDoc(collection(db, 'chat_sessions'), sessionData);

    console.log('Chat session created:', sessionRef.id);

    return NextResponse.json({
      sessionId: sessionRef.id,
      ...sessionData,
    });

  } catch (error: any) {
    console.error('Create session error:', error);
    return NextResponse.json(
      { error: error.message || 'Không thể tạo chat session' },
      { status: 500 }
    );
  }
}
