import { auth, db, onAuthStateChanged, signOut, isAdminUser, getUserId, getDocs, collection, query, orderBy, doc, setDoc, addDoc, serverTimestamp } from "./firebase.js";

let progressRows = [];
let eventRows = [];
let currentAdmin = null;

function ts(v) {
  if (!v) return "";
  if (v.toDate) return v.toDate().toLocaleString();
  return String(v);
}

async function loadData() {
  try {
    const progressSnap = await getDocs(collection(db, "progress"));
    progressRows = [];
    progressSnap.forEach(docSnap => progressRows.push(docSnap.data()));
    progressRows.sort((a,b) => String(a.userId).localeCompare(String(b.userId)));

    const eventSnap = await getDocs(query(collection(db, "events"), orderBy("createdAt", "desc")));
    eventRows = [];
    eventSnap.forEach(docSnap => eventRows.push(docSnap.data()));

    render();
  } catch (err) {
    console.error(err);
    document.querySelector("#adminMsg").textContent = "Firestore 읽기 실패. Rules 또는 관리자 계정을 확인하십시오.";
  }
}

function escapeHtml(v) {
  return String(v ?? "").replace(/[&<>"']/g, s => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;" }[s]));
}

function render() {
  document.querySelector("#progressBody").innerHTML = progressRows.map(r => {
    const userId = escapeHtml(r.userId || "");
    return `<tr>
      <td>${userId}</td>
      <td>${escapeHtml(r.pair || "")}</td>
      <td>${escapeHtml(r.role || "")}</td>
      <td>${r.stage ?? ""}</td>
      <td>${r.done ? "YES" : "NO"}</td>
      <td>${escapeHtml(ts(r.updatedAt))}</td>
      <td><button class="danger reset-row" data-id="${userId}">초기화</button></td>
    </tr>`;
  }).join("");

  document.querySelectorAll(".reset-row").forEach(btn => {
    btn.onclick = () => resetMember(btn.dataset.id);
  });

  document.querySelector("#eventBody").innerHTML = eventRows.slice(0, 150).map(r => `<tr>
    <td>${escapeHtml(ts(r.createdAt))}</td>
    <td>${escapeHtml(r.userId || "")}</td>
    <td>${escapeHtml(r.pair || "")}</td>
    <td>${escapeHtml(r.role || "")}</td>
    <td>${escapeHtml(r.type || "")}</td>
    <td><code>${escapeHtml(JSON.stringify(r.payload || {}))}</code></td>
  </tr>`).join("");

  document.querySelector("#adminMsg").textContent = `진행 ${progressRows.length}건 / 로그 ${eventRows.length}건`;
}

async function resetMember(userId) {
  const id = String(userId || "").trim();
  if (!id) {
    document.querySelector("#adminMsg").textContent = "초기화할 ID를 입력하십시오.";
    return;
  }

  const row = progressRows.find(r => String(r.userId) === id);
  if (!row) {
    const ok = confirm(`${id}의 진행 기록이 아직 없습니다. 그래도 다음 접속 시 초기화되도록 예약할까요?`);
    if (!ok) return;
  } else {
    const ok = confirm(`${id}의 진행도를 0단계로 초기화할까요? 해당 참가자가 현재 접속 중이면 최대 5초 안에 화면도 초기화됩니다.`);
    if (!ok) return;
  }

  const marker = Date.now();
  try {
    await setDoc(doc(db, "resets", id), {
      userId: id,
      pair: row?.pair || "",
      role: row?.role || "",
      resetMarker: marker,
      requestedBy: currentAdmin?.email || "",
      requestedAt: serverTimestamp()
    }, { merge: true });

    if (row?.uid) {
      await setDoc(doc(db, "progress", row.uid), {
        uid: row.uid,
        userId: id,
        email: row.email || "",
        pair: row.pair || "",
        role: row.role || "",
        stage: 0,
        done: false,
        startedAt: null,
        resetMarkerSeen: marker,
        updatedAt: serverTimestamp(),
        resetByAdminAt: serverTimestamp()
      }, { merge: true });
    }

    await addDoc(collection(db, "events"), {
      uid: currentAdmin?.uid || "",
      userId: id,
      email: currentAdmin?.email || "",
      pair: row?.pair || "",
      role: row?.role || "",
      type: "admin_reset",
      payload: { targetUserId: id, resetMarker: marker },
      createdAt: serverTimestamp()
    });

    document.querySelector("#adminMsg").textContent = `${id} 진행도 초기화 요청 완료. 참가자 화면은 새로고침 또는 최대 5초 내 반영됩니다.`;
    await loadData();
  } catch (err) {
    console.error(err);
    document.querySelector("#adminMsg").textContent = "초기화 실패. Firestore Rules를 v2.2 버전으로 적용했는지 확인하십시오.";
  }
}

function downloadCsv() {
  const header = ["userId","pair","role","stage","done","startedAt","updatedAt"];
  const lines = [header.join(",")];
  for (const r of progressRows) {
    lines.push(header.map(k => `"${String(k === "updatedAt" ? ts(r[k]) : (r[k] ?? "")).replaceAll('"','""')}"`).join(","));
  }
  const blob = new Blob(["\ufeff" + lines.join("\n")], { type: "text/csv;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "argus_progress.csv";
  a.click();
  URL.revokeObjectURL(a.href);
}

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    location.href = "./login.html";
    return;
  }

  if (!isAdminUser(user)) {
    document.body.innerHTML = "<main class='wrap'><h1>ACCESS DENIED</h1><p>관리자 계정이 아닙니다.</p></main>";
    return;
  }

  currentAdmin = user;
  document.querySelector("#adminUser").textContent = getUserId(user);
  await loadData();
});

document.querySelector("#refreshBtn").onclick = loadData;
document.querySelector("#downloadBtn").onclick = downloadCsv;
document.querySelector("#resetBtn").onclick = () => resetMember(document.querySelector("#resetId").value);

document.querySelector("#resetId").addEventListener("keydown", (e) => {
  if (e.key === "Enter") resetMember(document.querySelector("#resetId").value);
});

document.querySelector("#logoutBtn").onclick = async () => {
  await signOut(auth);
  location.href = "./login.html";
};
