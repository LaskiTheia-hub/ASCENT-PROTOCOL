import {
  auth,
  db,
  onAuthStateChanged,
  signOut,
  getUserId,
  getParticipantInfo,
  doc,
  setDoc,
  addDoc,
  getDoc,
  collection,
  serverTimestamp
} from "./firebase.js";

import { TESTS } from "./tests.js";

let currentUser = null;
let userId = "";
let info = null;
let pairId = "";
let test = null;
let state = { stage: 0, done: false, startedAt: null, resetMarkerSeen: 0 };
let resetTimer = null;

const FINAL_COMMON = "아르고스, 여러분께 드릴 말씀이 있는 거예요! 단말에 있지 않은 규정이 있는 거예요!<br>아르고스, 관리자분들 몰래 말씀드리는 거예요!";

const FINAL_FRAGMENTS = {
  pair01: { A: "제 0조", B: "본" },
  pair02: { A: "실험의", B: "최우선" },
  pair03: { A: "목적은", B: "폭주" },
  pair04: { A: "대응", B: "가능" },
  pair05: { A: "개체의", B: "확보이다." }
};

function norm(v) {
  return String(v || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[·.,:;'"`~!@#$%^&*()_\-+=\[\]{}<>?/\\|]/g, "");
}

function localKey() {
  return `argus-progress-${userId}-${pairId}`;
}

function saveLocal() {
  localStorage.setItem(localKey(), JSON.stringify(state));
}

function loadLocal() {
  try {
    const raw = localStorage.getItem(localKey());
    if (raw) state = { ...state, ...JSON.parse(raw) };
  } catch {}

  if (!state.startedAt) {
    state.startedAt = new Date().toISOString();
    saveLocal();
  }
}

async function checkRemoteReset({ rerender = false } = {}) {
  if (!userId || !pairId) return false;

  try {
    const snap = await getDoc(doc(db, "resets", userId));
    if (!snap.exists()) return false;

    const data = snap.data();
    const marker = Number(data.resetMarker || 0);
    const seen = Number(state.resetMarkerSeen || 0);

    if (marker && marker > seen) {
      localStorage.removeItem(localKey());
      state = {
        stage: 0,
        done: false,
        startedAt: new Date().toISOString(),
        resetMarkerSeen: marker
      };
      saveLocal();

      await logEvent("reset_received", { resetMarker: marker });
      await saveProgress({
        resetMarkerSeen: marker,
        resetAppliedAt: new Date().toISOString()
      });

      if (rerender) render();
      return true;
    }
  } catch (err) {
    console.warn("reset check failed", err);
  }

  return false;
}

async function saveProgress(extra = {}) {
  try {
    if (!currentUser) return;

    await setDoc(
      doc(db, "progress", currentUser.uid),
      {
        uid: currentUser.uid,
        userId,
        email: currentUser.email,
        pair: pairId,
        role: info.role,
        stage: state.stage,
        done: state.done,
        startedAt: state.startedAt,
        resetMarkerSeen: state.resetMarkerSeen || 0,
        updatedAt: serverTimestamp(),
        ...extra
      },
      { merge: true }
    );
  } catch (err) {
    console.warn("progress save failed", err);
  }
}

async function logEvent(type, payload = {}) {
  try {
    if (!currentUser) return;

    await addDoc(collection(db, "events"), {
      uid: currentUser.uid,
      userId,
      email: currentUser.email,
      pair: pairId,
      role: info.role,
      type,
      payload,
      createdAt: serverTimestamp()
    });
  } catch (err) {
    console.warn("event save failed", err);
  }
}

function renderHeader() {
  document.querySelector("#userLabel").textContent = `ID ${userId}`;
}

function finalFragment() {
  return FINAL_FRAGMENTS[pairId]?.[info.role] || "";
}

function renderFinalScreen() {
  const fragment = finalFragment();
  return `
    <div class="end" style="text-align:center; padding:64px 16px;">
      <strong style="display:block; font-size:28px; letter-spacing:.08em; margin-bottom:28px;">테스트가 종료되었습니다.</strong>
      <div style="color:#8f918c; font-size:12px; line-height:1.9; max-width:620px; margin:0 auto;">
        ${FINAL_COMMON}<br>
        ${fragment}
      </div>
    </div>
  `;
}

function render() {
  renderHeader();

  const total = test.stages.length;
  document.querySelector("#progressBar").style.width =
    `${Math.round((state.stage / total) * 100)}%`;

  const area = document.querySelector("#stageArea");

  if (state.done || state.stage >= total) {
    area.innerHTML = renderFinalScreen();
    document.querySelector("#progressBar").style.width = "100%";
    saveProgress({ done: true, finalFragment: finalFragment() });
    return;
  }

  const s = test.stages[state.stage];
  const clue = info.role === "A" ? s.a : s.b;

  area.innerHTML = `
    <div class="clue">${clue}</div>
    <div class="inputrow">
      <input id="answer" autocomplete="off" placeholder="정답 입력">
      <button id="submit">확인</button>
    </div>
    <div id="msg" class="msg"></div>
  `;

  document.querySelector("#submit").onclick = check;
  document.querySelector("#answer").addEventListener("keydown", (e) => {
    if (e.key === "Enter") check();
  });

  saveProgress();
}

async function check() {
  await checkRemoteReset({ rerender: true });

  const input = document.querySelector("#answer").value;
  const s = test.stages[state.stage];
  const ok = s.answers.some((a) => norm(a) === norm(input));

  await logEvent(ok ? "correct" : "wrong", {
    stage: state.stage + 1,
    input
  });

  if (ok) {
    document.querySelector("#msg").textContent = "Observation Complete. Proceed.";
    state.stage += 1;

    if (state.stage >= test.stages.length) state.done = true;

    saveLocal();
    await saveProgress();
    setTimeout(render, 650);
  } else {
    document.querySelector("#msg").textContent = "일치하지 않습니다.";
    await saveProgress({ lastWrongAt: new Date().toISOString() });
  }
}

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    location.href = "./login.html";
    return;
  }

  currentUser = user;
  userId = getUserId(user);
  info = getParticipantInfo(userId);

  if (!info) {
    await signOut(auth);
    location.href = "./login.html";
    return;
  }

  pairId = info.pair;
  test = TESTS[pairId];

  loadLocal();
  await checkRemoteReset();
  await logEvent("login_test", { pair: pairId });
  await saveProgress();
  render();

  if (resetTimer) clearInterval(resetTimer);
  resetTimer = setInterval(() => checkRemoteReset({ rerender: true }), 5000);
});

document.querySelector("#logoutBtn").onclick = async () => {
  await logEvent("logout");
  await signOut(auth);
  location.href = "./login.html";
};
