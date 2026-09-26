import { auth, signInWithEmailAndPassword, onAuthStateChanged, idToEmail, getUserId, isAdminUser, getParticipantInfo, firebaseErrorMessage } from "./firebase.js";

const loginView = document.querySelector("#loginView");
const loadingView = document.querySelector("#loadingView");
const loginBtn = document.querySelector("#loginBtn");
const msg = document.querySelector("#loginMsg");

onAuthStateChanged(auth, (user) => {
  if (!user) {
    loadingView.classList.add("hidden");
    loginView.classList.remove("hidden");
    return;
  }
  const id = getUserId(user);
  if (isAdminUser(user)) {
    location.href = "./admin.html";
    return;
  }
  const info = getParticipantInfo(id);
  if (!info) {
    msg.textContent = "등록되지 않은 ID입니다. 운영자에게 문의하십시오.";
    return;
  }
  location.href = "./test.html";
});

async function doLogin() {
  const id = document.querySelector("#loginId").value.trim();
  const pw = document.querySelector("#loginPw").value.trim();
  if (!id || !pw) {
    msg.textContent = "ID와 PW를 모두 입력하십시오.";
    return;
  }
  try {
    loginBtn.disabled = true;
    msg.textContent = "인증 중...";
    await signInWithEmailAndPassword(auth, idToEmail(id), pw);
  } catch (err) {
    console.error(err);
    msg.textContent = firebaseErrorMessage(err);
    loginBtn.disabled = false;
  }
}

loginBtn.addEventListener("click", doLogin);
document.querySelector("#loginPw").addEventListener("keydown", (e) => {
  if (e.key === "Enter") doLogin();
});
