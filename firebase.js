import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, setPersistence, browserLocalPersistence } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore, doc, setDoc, addDoc, getDoc, getDocs, collection, serverTimestamp, query, orderBy } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { firebaseConfig, ADMIN_EMAILS, PARTICIPANTS } from "./config.js";

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
setPersistence(auth, browserLocalPersistence).catch(console.warn);

export { signInWithEmailAndPassword, signOut, onAuthStateChanged, doc, setDoc, addDoc, getDoc, getDocs, collection, serverTimestamp, query, orderBy, ADMIN_EMAILS, PARTICIPANTS };

export function idToEmail(id) {
  const clean = String(id || "").trim();
  return clean.includes("@") ? clean : `${clean}@argus.test`;
}

export function getUserId(user) {
  return user?.email ? user.email.split("@")[0] : "";
}

export function isAdminUser(user) {
  return !!user?.email && ADMIN_EMAILS.includes(user.email);
}

export function getParticipantInfo(id) {
  return PARTICIPANTS[id] || null;
}

export function firebaseErrorMessage(err) {
  const code = err?.code || "";
  if (code.includes("auth/invalid-credential") || code.includes("auth/wrong-password") || code.includes("auth/user-not-found")) return "로그인 실패. ID 또는 PW를 확인하십시오.";
  if (code.includes("auth/unauthorized-domain")) return "Firebase Authentication의 Authorized domains에 laskitheia-hub.github.io를 추가해야 합니다.";
  if (code.includes("auth/network-request-failed")) return "네트워크 오류입니다.";
  return `오류: ${code || err.message}`;
}
