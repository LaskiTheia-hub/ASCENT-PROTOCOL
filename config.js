export const firebaseConfig = {
  apiKey: "AIzaSyD7HgCokTKz6Wt8C_TUZTvZGtKr5QqVe6s",
  authDomain: "ascent-protocol-cb228.firebaseapp.com",
  projectId: "ascent-protocol-cb228",
  storageBucket: "ascent-protocol-cb228.firebasestorage.app",
  messagingSenderId: "522029905861",
  appId: "1:522029905861:web:a6842bf953195310cebdac"
};

// 운영자 계정은 Firebase Authentication에서 operator@argus.test 로 1개 추가해서 쓰면 됩니다.
// PW는 Firebase에서 직접 정하세요.
export const ADMIN_IDS = ["operator"];
export const ADMIN_EMAILS = ["operator@argus.test"];

// 페어는 랜덤 배정하지 않습니다. 여기 적힌 값대로만 고정 배정됩니다.
// 실제 페어가 다르면 pair와 role만 수정하면 됩니다.
export const PARTICIPANTS = {
  "06101": { pair: "pair01", role: "A" },
  "06102": { pair: "pair01", role: "B" },
  "06103": { pair: "pair02", role: "A" },
  "06104": { pair: "pair02", role: "B" },
  "06105": { pair: "pair03", role: "A" },
  "06106": { pair: "pair03", role: "B" },
  "06107": { pair: "pair04", role: "A" },
  "06108": { pair: "pair04", role: "B" },
  "06109": { pair: "pair05", role: "A" },
  "06110": { pair: "pair05", role: "B" }
};
