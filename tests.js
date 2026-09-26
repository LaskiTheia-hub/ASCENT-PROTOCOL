export const TESTS = {
  "pair01": {
    "label": "PAIR 01",
    "title": "REFERENCE INDEX",
    "description": "서로 다른 색인 규칙을 대조해 답을 복원하는 미궁입니다.",
    "stages": [
      {
        "title": "01. 통화표",
        "brief": "숫자가 직접 가리키는 알파벳을 먼저 찾으십시오. B의 단서는 확인용입니다.",
        "a": "19 / 9 / 7 / 14 / 1 / 12",
        "b": "ICAO/NATO 철자 통화표를 떠올리면 읽은 글자가 맞는지 확인할 수 있습니다. Sierra, India, Golf, November, Alfa, Lima.",
        "answers": [
          "SIGNAL"
        ],
        "hint": "1=A, 2=B로 먼저 바꾼 뒤 통화표 이름과 대조하십시오."
      },
      {
        "title": "02. 원소 색인",
        "brief": "원소기호가 아니라 원소의 영어 이름 첫 글자를 읽으십시오.",
        "a": "18 / 86 / 32 / 92 / 16",
        "b": "주기율표 기준입니다. Symbol이 아니라 Name을 보십시오.",
        "answers": [
          "ARGUS"
        ],
        "hint": "18 Argon, 86 Radon, 32 Germanium, 92 Uranium, 16 Sulfur."
      },
      {
        "title": "03. 여섯 점",
        "brief": "점의 번호를 문자로 바꾸십시오.",
        "a": "1 / 234 / 14 / 15 / 1345 / 2345",
        "b": "6점 점자 번호 체계입니다. 영어 소문자 기준으로 읽으십시오.",
        "answers": [
          "ASCENT"
        ],
        "hint": "a=1, s=234, c=14입니다."
      },
      {
        "title": "04. 약어",
        "brief": "다음 표기는 모두 같은 별자리를 가리킵니다.",
        "a": "α Ori / β Ori / γ Ori / κ Ori",
        "b": "IAU 3-letter constellation abbreviation을 검색하십시오. Ori를 확장하면 됩니다.",
        "answers": [
          "ORION",
          "오리온"
        ],
        "hint": "Ori는 Orion의 약어입니다."
      },
      {
        "title": "05. 검산 숫자",
        "brief": "물음표에 들어갈 ISBN-10 체크 디지트를 구하십시오.",
        "a": "0-306-40615-?",
        "b": "ISBN-10 check digit 예시로 자주 쓰이는 번호입니다. mod 11 규칙을 사용합니다.",
        "answers": [
          "2"
        ],
        "hint": "0-306-40615-2가 완성형입니다."
      }
    ]
  },
  "pair02": {
    "label": "PAIR 02",
    "title": "CIPHER ROOM",
    "description": "고전 암호와 표준 부호를 조합해 진행하는 암호 미궁입니다.",
    "stages": [
      {
        "title": "01. 거울 알파벳",
        "brief": "알파벳을 거울처럼 접었을 때 대응되는 글자를 읽으십시오.",
        "a": "Z H X V M G",
        "b": "A↔Z, B↔Y, C↔X. 이 방식은 Atbash로 알려져 있습니다.",
        "answers": [
          "ASCENT"
        ],
        "hint": "Z=A, H=S, X=C입니다."
      },
      {
        "title": "02. 세 칸 뒤",
        "brief": "암호문은 원문을 알파벳 세 칸 뒤로 밀어 적은 것입니다.",
        "a": "SURWRFRO",
        "b": "Caesar cipher. 해독할 때는 세 칸 앞으로 돌아가십시오.",
        "answers": [
          "PROTOCOL"
        ],
        "hint": "S→P, U→R, R→O."
      },
      {
        "title": "03. 반복 키",
        "brief": "Vigenère 암호입니다. 키는 상대 화면에만 있습니다.",
        "a": "MVSIJY",
        "b": "KEY = ARGUS",
        "answers": [
          "MEMORY"
        ],
        "hint": "Vigenère decrypt를 사용하십시오."
      },
      {
        "title": "04. A와 B뿐인 문장",
        "brief": "다섯 글자씩 끊어 읽으십시오.",
        "a": "BABAB AAAAA BABAA ABABB BAABB",
        "b": "Bacon's cipher의 A/B 표기입니다. A=0, B=1처럼 읽어도 됩니다.",
        "answers": [
          "VAULT"
        ],
        "hint": "BABAB=V, AAAAA=A."
      },
      {
        "title": "05. 좌표 표",
        "brief": "5x5 Polybius square입니다. I/J는 같은 칸으로 처리합니다.",
        "a": "43 24 31 15 33 13 15",
        "b": "행-열 좌표입니다. 11=A, 12=B, 13=C ... I/J는 한 칸입니다.",
        "answers": [
          "SILENCE"
        ],
        "hint": "43=S, 24=I, 31=L."
      }
    ]
  },
  "pair03": {
    "label": "PAIR 03",
    "title": "LOGIC WARD",
    "description": "두 사람에게 나뉜 조건을 합쳐 모순 없는 결론을 찾는 논리 미궁입니다.",
    "stages": [
      {
        "title": "01. 세 문",
        "brief": "정확히 하나의 문장만 참입니다. 열쇠가 있는 문을 입력하십시오.",
        "a": "A문: 열쇠는 내 뒤에 없다.\nB문: 열쇠는 C문 뒤에 있다.\nC문: 열쇠는 내 뒤에 있다.",
        "b": "조건: 세 문장 중 정확히 하나만 참입니다.",
        "answers": [
          "B",
          "B문",
          "비"
        ],
        "hint": "A에 열쇠가 있으면 참이 0개, C에 있으면 참이 3개입니다."
      },
      {
        "title": "02. 틀린 이름표",
        "brief": "모든 이름표가 틀렸습니다. '혈액'이라고 적힌 서랍 안에 들어 있는 것을 입력하십시오.",
        "a": "서랍 이름표: 혈액 / 문서 / 혼합",
        "b": "'혼합'이라고 적힌 서랍을 열었더니 문서만 들어 있었습니다. 모든 이름표는 틀렸습니다.",
        "answers": [
          "혼합"
        ],
        "hint": "혼합 서랍은 문서입니다. 혈액 서랍은 혈액도 문서도 될 수 없습니다."
      },
      {
        "title": "03. 한 명만 틀렸다",
        "brief": "세 사람 중 한 명만 거짓말을 했습니다. 연구실에 있는 사람을 입력하십시오.",
        "a": "혁: 나는 정원에 없다.\n윤: 혁은 도서관에 있다.\n서: 윤은 연구실에 있다.",
        "b": "세 사람은 연구실, 정원, 도서관에 한 명씩 있습니다. 세 문장 중 하나만 거짓입니다.",
        "answers": [
          "서"
        ],
        "hint": "혁=도서관, 윤=정원, 서=연구실일 때만 조건이 맞습니다."
      },
      {
        "title": "04. 네 자리",
        "brief": "중복 없는 1~6의 네 자리 암호를 찾으십시오.",
        "a": "1456 → 위치까지 맞은 숫자 1개, 숫자는 맞지만 위치가 틀린 숫자 2개\n3216 → 위치까지 맞은 숫자 1개, 숫자는 맞지만 위치가 틀린 숫자 1개",
        "b": "5134 → 위치까지 맞은 숫자 0개, 숫자는 맞지만 위치가 틀린 숫자 2개\n2561 → 위치까지 맞은 숫자 2개, 숫자는 맞지만 위치가 틀린 숫자 1개",
        "answers": [
          "2546"
        ],
        "hint": "Mastermind 방식으로 right place / wrong place를 세십시오."
      },
      {
        "title": "05. 자기언급 버튼",
        "brief": "정확히 두 문장이 참입니다. 거짓인 버튼의 이름을 입력하십시오.",
        "a": "ALPHA: BETA의 문장은 거짓이다.\nBETA: GAMMA의 문장은 거짓이다.\nGAMMA: ALPHA와 BETA의 참거짓은 서로 다르다.",
        "b": "조건: 세 문장 중 정확히 두 문장만 참입니다. 정답은 거짓인 버튼입니다.",
        "answers": [
          "BETA",
          "베타"
        ],
        "hint": "ALPHA와 GAMMA가 참, BETA가 거짓입니다."
      }
    ]
  },
  "pair04": {
    "label": "PAIR 04",
    "title": "SURFACE READING",
    "description": "표면에 보이는 글자보다 입력 방식, 표기법, 숨은 규칙을 읽어야 하는 미궁입니다.",
    "stages": [
      {
        "title": "01. 한 칸 오른쪽",
        "brief": "QWERTY 키보드에서 한 칸 오른쪽 키를 눌러버린 기록입니다.",
        "a": "S D V R M Y",
        "b": "각 글자를 키보드에서 왼쪽으로 한 칸 되돌리십시오.",
        "answers": [
          "ASCENT"
        ],
        "hint": "S→A, D→S, V→C."
      },
      {
        "title": "02. 대문자만 남은 문장",
        "brief": "문장의 뜻은 버리고, 대문자만 읽으십시오.",
        "a": "aLways eXplain It",
        "b": "대문자를 로마 숫자로 읽으십시오.",
        "answers": [
          "61",
          "LXI"
        ],
        "hint": "LXI = 61."
      },
      {
        "title": "03. 16진수",
        "brief": "U+ 형식의 코드포인트를 문자로 바꾸십시오.",
        "a": "U+0041 U+0052 U+0047 U+0055 U+0053",
        "b": "Unicode code point입니다. Hex 값을 문자로 읽으십시오.",
        "answers": [
          "ARGUS"
        ],
        "hint": "0041=A, 0052=R."
      },
      {
        "title": "04. 산술이 아닌 날짜",
        "brief": "숫자 자체가 아니라 표준 시간의 기준점을 보십시오.",
        "a": "1970-01-01 + 0",
        "b": "Unix epoch의 시작 날짜입니다. 요일을 영어로 입력하십시오.",
        "answers": [
          "THURSDAY",
          "목요일"
        ],
        "hint": "1970년 1월 1일은 Thursday입니다."
      },
      {
        "title": "05. 보이는 순서와 읽는 순서",
        "brief": "문자열은 왼쪽에서 오른쪽으로 읽는 것이 아닙니다.",
        "a": "T N E C S A",
        "b": "오른쪽에서 왼쪽으로 읽은 뒤, 시설명에 맞게 입력하십시오.",
        "answers": [
          "ASCENT"
        ],
        "hint": "문자열을 거꾸로 읽으십시오."
      }
    ]
  },
  "pair05": {
    "label": "PAIR 05",
    "title": "OUTSIDE REFERENCES",
    "description": "인터넷 검색과 외부 지식을 사용해도 되지만, 검색 결과를 그대로 입력하면 풀리지 않는 미궁입니다.",
    "stages": [
      {
        "title": "01. 찻주전자",
        "brief": "숫자는 웹 표준의 농담을 가리킵니다.",
        "a": "418",
        "b": "HTTP status code. 정답은 상태 설명의 핵심 명사입니다.",
        "answers": [
          "TEAPOT",
          "찻주전자"
        ],
        "hint": "I'm a teapot."
      },
      {
        "title": "02. 고요의 바다",
        "brief": "착륙지가 아니라 임무 번호를 입력하십시오.",
        "a": "Sea of Tranquility",
        "b": "처음으로 인간이 달에 착륙한 Apollo mission number.",
        "answers": [
          "11",
          "APOLLO11",
          "아폴로11"
        ],
        "hint": "Apollo 11."
      },
      {
        "title": "03. 두 소수",
        "brief": "메시지는 직사각형으로 읽혔습니다. 더 큰 소수를 입력하십시오.",
        "a": "Arecibo message",
        "b": "1679 = 23 × 73",
        "answers": [
          "73"
        ],
        "hint": "Arecibo message는 23 by 73 grid로 해석됩니다."
      },
      {
        "title": "04. 한 글자 생화학",
        "brief": "아미노산 1문자 표기를 사용하십시오.",
        "a": "Cysteine / Isoleucine / Proline / Histidine / Glutamic acid / Arginine",
        "b": "One-letter amino acid code.",
        "answers": [
          "CIPHER"
        ],
        "hint": "Cys=C, Ile=I, Pro=P, His=H, Glu=E, Arg=R."
      },
      {
        "title": "05. 그리스 문자",
        "brief": "그리스 알파벳 순서를 사용하십시오.",
        "a": "3 / 1 / 19 / 5",
        "b": "3=Gamma, 1=Alpha, 19=Tau, 5=Epsilon. 각 이름의 첫 글자를 읽으십시오.",
        "answers": [
          "GATE"
        ],
        "hint": "Gamma Alpha Tau Epsilon."
      }
    ]
  }
};
