import { auth, db, onAuthStateChanged, signOut, getUserId, getParticipantInfo, doc, setDoc, addDoc, getDoc, collection, serverTimestamp } from "./firebase.js";
import { TESTS } from "./tests.js";

let currentUser = null;
let userId = "";
let info = null;
let pairId = "";
let test = null;
let state = { stage: 0, done: false, startedAt: null, resetMarkerSeen: 0 };
let resetTimer = null;

function norm(v) {
  return String(v || "").trim().toLowerCase().replace(/\s+/g, "").replace(/[·.,:;'"`~!@#$%^&*()_\-+=\[\]{}<>?/\\|]/g, "");
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
      await saveProgress({ resetMarkerSeen: marker, resetAppliedAt: new Date().toISOString() });
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
    await setDoc(doc(db, "progress", currentUser.uid), {
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
    }, { merge: true });
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
  document.querySelector("#pairName").textContent = test.label;
  document.querySelector("#testTitle").textContent = test.title;
  document.querySelector("#testDesc").textContent = test.description;
  document.querySelector("#userLabel").textContent = `ID ${userId}`;
  document.querySelector("#roleLabel").textContent = `ROLE ${info.role}`;
  document.querySelector("#sideInfo").innerHTML = `배정 테스트: <code>${test.label}</code><br>역할: <code>${info.role}</code><br>페어는 config.js에 고정 배정되어 있습니다.`;
}

function render() {
  renderHeader();
  const total = test.stages.length;
  document.querySelector("#progressBar").style.width = `${Math.round((state.stage / total) * 100)}%`;
  const area = document.querySelector("#stageArea");

  if (state.done || state.stage >= total) {
    area.innerHTML = `<div class="end"><strong>OBSERVATION COMPLETE</strong><br>페어 테스트 기록이 저장되었습니다.<br><br><code>${test.label} / ${test.title}</code></div>`;
    document.querySelector("#progressBar").style.width = "100%";
    saveProgress({ done: true });
    return;
  }

  const s = test.stages[state.stage];
  const clue = info.role === "A" ? s.a : s.b;
  area.innerHTML = `<h2 class="stage-title">${s.title}</h2><p class="stage-brief">${s.brief}</p><div class="clue">${clue}</div><div class="inputrow"><input id="answer" autocomplete="off" placeholder="정답 입력"><button id="submit">확인</button><button id="hintBtn">힌트</button></div><div id="msg" class="msg"></div><div id="hint" class="hint">${s.hint}</div>`;
  document.querySelector("#submit").onclick = check;
  document.querySelector("#hintBtn").onclick = () => {
    document.querySelector("#hint").style.display = "block";
    logEvent("hint", { stage: state.stage + 1, title: s.title });
  };
  document.querySelector("#answer").addEventListener("keydown", (e) => {
    if (e.key === "Enter") check();
  });
  saveProgress();
}

async function check() {
  await checkRemoteReset({ rerender: true });
  const input = document.querySelector("#answer").value;
  const s = test.stages[state.stage];
  const ok = s.answers.some(a => norm(a) === norm(input));
  await logEvent(ok ? "correct" : "wrong", { stage: state.stage + 1, title: s.title, input });

  if (ok) {
    document.querySelector("#msg").textContent = "Observation Complete. Proceed.";
    state.stage += 1;
    if (state.stage >= test.stages.length) state.done = true;
    saveLocal();
    await saveProgress();
    setTimeout(render, 650);
  } else {
    document.querySelector("#msg").textContent = "일치하지 않습니다. 두 화면의 정보를 다시 대조하십시오.";
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
