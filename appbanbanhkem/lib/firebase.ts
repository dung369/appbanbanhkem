// Lightweight Firebase client initializer for Next.js (App Router)
// - Initializes the app once
// - Initializes Analytics only in the browser and only if supported

import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// These values are safe to be public in Firebase Web apps, but you can
// move them to environment variables later if you prefer.
const firebaseConfig = {
  apiKey: "AIzaSyA-VTY7Bp1vi6GToMccVa8DM3Zv48R-o14",
  authDomain: "webbanhoa-26a60.firebaseapp.com",
  projectId: "webbanhoa-26a60",
  storageBucket: "webbanhoa-26a60.firebasestorage.app",
  messagingSenderId: "690656269794",
  appId: "1:690656269794:web:38949e1a8531264c90d5bb",
  measurementId: "G-D2NTZDNTMY",
};

// Ensure we don't initialize more than once (Next.js can render multiple times)
export const firebaseApp = getApps().length
  ? getApp()
  : initializeApp(firebaseConfig);

// Initialize Analytics only on the client, and only if supported by the current environment
export async function initAnalytics() {
  if (typeof window === "undefined") return undefined;
  try {
    const { getAnalytics, isSupported } = await import("firebase/analytics");
    if (await isSupported()) {
      return getAnalytics(firebaseApp);
    }
  } catch {
    // ignore analytics init errors (e.g., unsupported environment)
  }
  return undefined;
}

// Auth instance for client-side authentication flows
export const auth = getAuth(firebaseApp);

// Firestore instance for database operations
import { getFirestore } from "firebase/firestore";
export const db = getFirestore(firebaseApp);

// Storage instance for file uploads
import { getStorage } from "firebase/storage";
export const storage = getStorage(firebaseApp);
