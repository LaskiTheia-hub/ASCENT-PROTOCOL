
ASCENT ARGUS Portal Firebase v1

1. Firebase Authentication에 사용자 06101@argus.test ~ 06110@argus.test를 만든 상태에서 사용합니다.
2. 관리자 페이지를 쓰려면 Authentication에 operator@argus.test 계정을 하나 추가하세요. 비밀번호는 운영자만 알면 됩니다.
3. index.html을 열면 로그인 페이지가 나옵니다.
4. 참가자 ID는 06101처럼 입력합니다. 사이트 내부에서 자동으로 @argus.test를 붙입니다.
5. 로그인 후 ID에 따라 pair01~pair05가 자동 배정됩니다.
6. 결과는 Firestore의 progress, events 컬렉션에 저장됩니다.
7. 관리자 페이지는 admin.html입니다.
8. 문제 수정은 data/tests.json만 수정하면 됩니다. stages 안의 title, brief, a, b, answers, hint를 바꾸세요.
9. GitHub Pages에 올릴 때는 이 폴더 안의 파일 전체를 업로드하면 됩니다.
10. Firestore 보안 규칙을 적용하려면 firestore.rules.txt 내용을 Firebase Console > Firestore > Rules에 붙여넣으세요.

관리자 계정 권장:
email: operator@argus.test
password: 직접 정한 6자 이상 비밀번호
