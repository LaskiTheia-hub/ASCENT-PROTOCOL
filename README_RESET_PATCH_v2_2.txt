ASCENT ARGUS Portal Reset Patch v2.2

추가 기능:
- 관리자 페이지에서 특정 ID 진행도 초기화
- 진행도 표의 각 행에 초기화 버튼 추가
- ID 직접 입력 후 초기화 가능
- 참가자가 현재 접속 중이면 최대 5초 안에 초기화 반영
- 참가자가 꺼둔 상태면 다음 접속 시 초기화 반영

업로드할 파일:
- firebase.js
- test.js
- admin.html
- admin.js
- firestore.rules.txt

중요:
Firestore Rules도 반드시 firestore.rules.txt 내용으로 교체해야 resets 컬렉션을 쓸 수 있습니다.
tests.js는 포함하지 않았습니다. 기존 퀴즈 파일은 그대로 유지됩니다.
