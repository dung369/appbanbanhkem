// Simple Chatbot Service - Keyword Matching
// Không cần AI API, chỉ dựa vào keywords

import { CHATBOT_DATA, GREETINGS, FALLBACK_RESPONSE } from "./chatbot-data";

interface MatchResult {
  category: string;
  confidence: number;
  response: string;
}

// Normalize Vietnamese text
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
    .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
    .replace(/ì|í|ị|ỉ|ĩ/g, "i")
    .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")
    .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
    .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
    .replace(/đ/g, "d")
    .trim();
}

// Check if greeting
function isGreeting(message: string): boolean {
  const greetingKeywords = [
    "chào",
    "hello",
    "hi",
    "xin chào",
    "chào shop",
    "shop ơi",
    "có ai không",
  ];
  const normalized = normalizeText(message);
  return greetingKeywords.some((keyword) =>
    normalized.includes(normalizeText(keyword))
  );
}

// Check if thank you / goodbye
function isThanksOrBye(message: string): boolean {
  const keywords = [
    "cảm ơn",
    "thank",
    "thanks",
    "bye",
    "tạm biệt",
    "hẹn gặp lại",
  ];
  const normalized = normalizeText(message);
  return keywords.some((keyword) =>
    normalized.includes(normalizeText(keyword))
  );
}
// Check if customer wants to chat with shop directly
export function wantsLiveChat(message: string): boolean {
  const liveChatKeywords = [
    "liên hệ",
    "nhắn tin",
    "chat với shop",
    "inbox",
    "tư vấn",
    "hỏi shop",
    "hỗ trợ",
    "cần tư vấn",
    "nói chuyện với shop",
    "chat ngay",
    "cho mình hỏi",
    "shop ơi",
    "mình cần tư vấn",
    "có ai tư vấn",
    "mình muốn hỏi",
    "cho mình hỏi chút",
    "nói chuyện trực tiếp",
    "chat trực tiếp",
    "muốn nhắn tin",
    "tư vấn trực tiếp",
  ];
  const normalized = normalizeText(message);
  return liveChatKeywords.some((keyword) =>
    normalized.includes(normalizeText(keyword))
  );
}

// Find best matching FAQ
function findBestMatch(userMessage: string): MatchResult | null {
  const normalized = normalizeText(userMessage);
  let bestMatch: MatchResult | null = null;
  let highestScore = 0;

  for (const category of CHATBOT_DATA) {
    // Check keywords
    let keywordScore = 0;
    for (const keyword of category.keywords) {
      if (normalized.includes(normalizeText(keyword))) {
        keywordScore += 1;
      }
    }

    if (keywordScore > 0) {
      // Find best FAQ in this category
      for (const faq of category.faqs) {
        const questionWords = normalizeText(faq.question).split(" ");
        let matchCount = 0;

        for (const word of questionWords) {
          if (word.length > 2 && normalized.includes(word)) {
            matchCount += 1;
          }
        }

        const totalScore = keywordScore * 2 + matchCount;

        if (totalScore > highestScore) {
          highestScore = totalScore;
          bestMatch = {
            category: category.category,
            confidence: Math.min(totalScore / 5, 1), // normalize to 0-1
            response: faq.answer,
          };
        }
      }
    }
  }

  return highestScore > 1 ? bestMatch : null;
}

// Generate response
export function generateSimpleResponse(userMessage: string): string {
  // Check if customer wants live chat first
  if (wantsLiveChat(userMessage)) {
    return "LIVE_CHAT_REQUEST";
  }

  // Check greeting
  if (isGreeting(userMessage)) {
    return GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
  }

  // Check thanks/bye
  if (isThanksOrBye(userMessage)) {
    return "Dạ không có gì ạ! Shop luôn sẵn sàng phục vụ. Chúc anh/chị một ngày tốt lành! 🎂💕";
  }

  // Find matching FAQ
  const match = findBestMatch(userMessage);

  if (match && match.confidence > 0.3) {
    return match.response;
  }

  // Fallback
  return FALLBACK_RESPONSE;
}

// Get category suggestions based on keywords
export function getCategorySuggestions(userMessage: string): string[] {
  const normalized = normalizeText(userMessage);
  const suggestions: string[] = [];

  for (const category of CHATBOT_DATA) {
    for (const keyword of category.keywords) {
      if (normalized.includes(normalizeText(keyword))) {
        if (!suggestions.includes(category.category)) {
          suggestions.push(category.category);
        }
        break;
      }
    }
  }

  return suggestions;
}
