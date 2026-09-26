
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore, doc, setDoc, addDoc, getDoc, getDocs, collection, serverTimestamp, query, orderBy } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { firebaseConfig, ADMIN_IDS, ADMIN_EMAILS, PARTICIPANTS } from "./config.js";

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export { signInWithEmailAndPassword, signOut, onAuthStateChanged, doc, setDoc, addDoc, getDoc, getDocs, collection, serverTimestamp, query, orderBy, ADMIN_IDS, ADMIN_EMAILS, PARTICIPANTS };

export function idToEmail(id) {
  const clean = String(id || "").trim();
  if (clean.includes("@")) return clean;
  return `${clean}@argus.test`;
}

export function getUserId(user) {
  if (!user || !user.email) return "";
  return user.email.split("@")[0];
}

export function isAdminUser(user) {
  const id = getUserId(user);
  return ADMIN_IDS.includes(id) || ADMIN_EMAILS.includes(user.email);
}

export function getParticipantInfo(id) {
  return PARTICIPANTS[id] || null;
}
