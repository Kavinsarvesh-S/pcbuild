import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Helper to support both Vite (import.meta.env) and process.env formats
const getEnvVar = (viteKey: string, nextKey: string): string => {
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    if (import.meta.env[viteKey]) return import.meta.env[viteKey];
    if (import.meta.env[nextKey]) return import.meta.env[nextKey];
  }
  return '';
};

const firebaseConfig = {
  apiKey: getEnvVar('VITE_FIREBASE_API_KEY', 'NEXT_PUBLIC_FIREBASE_API_KEY'),
  authDomain: getEnvVar('VITE_FIREBASE_AUTH_DOMAIN', 'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN'),
  projectId: getEnvVar('VITE_FIREBASE_PROJECT_ID', 'NEXT_PUBLIC_FIREBASE_PROJECT_ID'),
  storageBucket: getEnvVar('VITE_FIREBASE_STORAGE_BUCKET', 'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: getEnvVar('VITE_FIREBASE_MESSAGING_SENDER_ID', 'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID'),
  appId: getEnvVar('VITE_FIREBASE_APP_ID', 'NEXT_PUBLIC_FIREBASE_APP_ID'),
};

export const isFirebaseConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);

// Initialize Firebase safely
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig.apiKey ? firebaseConfig : {
  apiKey: "mock-api-key",
  authDomain: "edith-pcbuilder.firebaseapp.com",
  projectId: "edith-pcbuilder",
  storageBucket: "edith-pcbuilder.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
});

export const auth = getAuth(app);
export default app;
