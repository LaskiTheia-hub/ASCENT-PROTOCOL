ASCENT ARGUS Portal Firebase v2.1

v2.1 변경점:
1. src 폴더 의존없앰 모든 JS 파일을 루트에 둠
2. tests.json fetch를 없애고 tests.js import 방식으로 바꿈
3. GitHub Pages에서 경로 404가 덜 나도록 구조를 단순화
4. 페어는 config.js에 고정되어 있으며 랜덤 배정은 없음
5. Firestore 문서 ID를 Firebase uid 기준으로 바꿔 Rules 충돌 가능성을 줄임

필수 Firebase 설정:
1. Authentication > Settings > Authorized domains에 laskitheia-hub.github.io 추가.
2. Firestore Rules에 firestore.rules.txt 내용 붙여넣기.
3. 관리자 페이지 사용 시 Authentication에 operator@argus.test 계정 추가.


