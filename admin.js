import { auth, db, onAuthStateChanged, signOut, isAdminUser, getUserId, getDocs, collection, query, orderBy } from "./firebase.js";

let progressRows = [];
let eventRows = [];

function ts(v) { if (!v) return ""; if (v.toDate) return v.toDate().toLocaleString(); return String(v); }

async function loadData() {
  try {
    const progressSnap = await getDocs(collection(db, "progress"));
    progressRows = [];
    progressSnap.forEach(doc => progressRows.push(doc.data()));
    progressRows.sort((a,b) => String(a.userId).localeCompare(String(b.userId)));
    const eventSnap = await getDocs(query(collection(db, "events"), orderBy("createdAt", "desc")));
    eventRows = [];
    eventSnap.forEach(doc => eventRows.push(doc.data()));
    render();
  } catch (err) {
    console.error(err);
    document.querySelector("#adminMsg").textContent = "Firestore 읽기 실패. Rules 또는 관리자 계정을 확인하십시오.";
  }
}

function render() {
  document.querySelector("#progressBody").innerHTML = progressRows.map(r => `<tr><td>${r.userId || ""}</td><td>${r.pair || ""}</td><td>${r.role || ""}</td><td>${r.stage ?? ""}</td><td>${r.done ? "YES" : "NO"}</td><td>${ts(r.updatedAt)}</td></tr>`).join("");
  document.querySelector("#eventBody").innerHTML = eventRows.slice(0, 150).map(r => `<tr><td>${ts(r.createdAt)}</td><td>${r.userId || ""}</td><td>${r.pair || ""}</td><td>${r.role || ""}</td><td>${r.type || ""}</td><td><code>${JSON.stringify(r.payload || {})}</code></td></tr>`).join("");
  document.querySelector("#adminMsg").textContent = `진행 ${progressRows.length}건 / 로그 ${eventRows.length}건`;
}

function downloadCsv() {
  const header = ["userId","pair","role","stage","done","startedAt","updatedAt"];
  const lines = [header.join(",")];
  for (const r of progressRows) lines.push(header.map(k => `"${String(k === "updatedAt" ? ts(r[k]) : (r[k] ?? "")).replaceAll('"','""')}"`).join(","));
  const blob = new Blob(["\ufeff" + lines.join("\n")], { type: "text/csv;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "argus_progress.csv";
  a.click();
  URL.revokeObjectURL(a.href);
}

onAuthStateChanged(auth, async (user) => {
  if (!user) { location.href = "./login.html"; return; }
  if (!isAdminUser(user)) { document.body.innerHTML = "<main class='wrap'><h1>ACCESS DENIED</h1><p>관리자 계정이 아닙니다.</p></main>"; return; }
  document.querySelector("#adminUser").textContent = getUserId(user);
  await loadData();
});

document.querySelector("#refreshBtn").onclick = loadData;
document.querySelector("#downloadBtn").onclick = downloadCsv;
document.querySelector("#logoutBtn").onclick = async () => { await signOut(auth); location.href = "./login.html"; };
