ASCENT ARGUS Portal Firebase v2.1

v2.1 변경점:
1. src 폴더 의존을 없앴습니다. 모든 JS 파일을 루트에 두었습니다.
2. tests.json fetch를 없애고 tests.js import 방식으로 바꿨습니다.
3. GitHub Pages에서 경로 404가 덜 나도록 구조를 단순화했습니다.
4. 페어는 config.js에 고정되어 있으며 랜덤 배정은 없습니다.
5. Firestore 문서 ID를 Firebase uid 기준으로 바꿔 Rules 충돌 가능성을 줄였습니다.

필수 Firebase 설정:
1. Authentication > Settings > Authorized domains에 laskitheia-hub.github.io 추가.
2. Firestore Rules에 firestore.rules.txt 내용 붙여넣기.
3. 관리자 페이지 사용 시 Authentication에 operator@argus.test 계정 추가.

업로드:
이 ZIP을 압축 해제한 뒤, 폴더 안의 모든 파일을 GitHub 저장소 루트에 덮어쓰기 업로드하세요.
기존 src, data 폴더가 저장소에 남아 있어도 이번 버전은 사용하지 않습니다.
