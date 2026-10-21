# 🇦🇹 AUSTRIA GUIDE Exkursions-Atlas (오스트리아 가이드 외부 견학 지도 아틀라스)

WIFI Steiermark 오스트리아 국가공인 외국인안내사(AUSTRIA GUIDE) 양성과정의 5대 외부 견학(Exkursionen, Lehrführungen, Stadtrundgänge) 일정, 경로, 방문지, 핵심 가이드 해설 포인트를 100% 오픈소스 인터랙티브 지도(Leaflet.js)로 구현한 웹 애플리케이션입니다.

---

## 📌 주요 특징 (Key Features)

1. **5대 견학 코스 완벽 정리 (총 42개 거점, 약 975km)**
   - 🔵 **EX 01 서부 슈타이어마르크 (Weststeiermark - Lipizzaner & Schilcher)**: 피버 종마목장, 훈데르트바서 성 바르바라 성당, 실허 와인가도, 슈타인츠 성 & 플라셔를축 철도
   - 🔴 **EX 02 연방수도 비엔나 (Bundeshauptstadt Wien - Ringstraße & Bus)**: 그라츠-비엔나 13구간 고속도로 릴레이 버스 가이드, 링슈트라세, 벨베데레, 슈테판 대성당 공식 내부 투어, 호프부르크 왕궁, 쇤브룬, 페어히톨츠도르프 호이리게
   - 🟢 **EX 03 그라츠 북부 근교 (Region Graz-Nord - Stift Rein & Stübing)**: 프론라이텐 무르산책로, 현존 최고 시토회 라인 수도원, 슈튀빙 오스트리아 야외박물관, 마리아 슈트라센겔 고딕성당
   - 🟣 **EX 04 동부 성채 & 사과가도 (Oststeiermark - Herberstein & Riegersburg)**: 사과가도 푸흐 마을, 헤르버슈타인 정원 성채 & 동물원, 리거스부르크 암벽요새 마녀박물관 & 7개 성문 하산길
   - 🟡 **EX 05 남부 와인랜드 & 수료식 (Südsteiermark - Sausal & Weinstraße)**: 하르틀리프 호박씨기름 방앗간, 질버베르크 주립 와인학교 셀러 테이스팅, 제카우 성 300년 셀러, 슬로베니아 국경 테이블 & 에오리코겔 포도송이, 학-게벨 부셴샨크 수료연

2. **100% 완전 무료 & 차단 없는 오픈소스 지도 (No API Keys, No Block)**
   - API 키 가입이나 워터마크, 트래픽 차단이 없는 검증된 오픈소스 타일 적용:
     - ☀️ **밝은 지도 (OSM HOT)**: 가독성 높고 부드러운 인도주의 오픈스트리트맵 (기본)
     - 🛣️ **상세 도로망 (Esri Street)**: 오스트리아 지명과 도로망이 선명한 정밀 지도
     - ⛰️ **지형도 (OpenTopoMap)**: 알프스 및 구릉지 등고선 지형도
   - 코스별 전용 컬러 및 실시간 주행 경로(Polyline), 번호 핀 마커(1~42번) 연동

3. **가이드 시험 대비 & 현장 기록 (Lehr- & Prüfungstipps)**
   - 각 거점별 핵심 역사·건축 도상학·문화 해설 포인트 수록
   - 벨베데레, 슈튀빙, 헤르버슈타인, 리거스부르크 실제 현장 사진 라이트박스 갤러리 지원

4. **한국어 / 독일어 이중 언어 및 독립 페이지 지원**
   - 🇰🇷 **한국어 메인 페이지**: [`index.html`](index.html) - 한국어 설명 + 독일어 원어명 병기
   - 🇩🇪 **독일어 전용 페이지**: [`index_de.html`](index_de.html) - 100% 정통 오스트리아 가이드 전문 독일어 표기
   - 상단 우측 `[KO]` / `[DE]` 버튼으로 언제든지 실시간 전환 가능

---

## 📂 프로젝트 구조 (Project Structure)

```
austria-guide-excursions/
├── index.html              # 한국어 메인 웹페이지
├── index_de.html           # 독일어 전용 웹페이지
├── style.css               # 반응형 UI 디자인 스타일시트
├── app.js                  # 인터랙티브 지도 & 타임라인 컨트롤러
├── data.js                 # 5개 코스 & 42개 거점 정밀 데이터셋
├── data.json               # JSON 원본 데이터
├── assets/
│   ├── images/             # 견학 현장 고해상도 사진 파일
│   └── vendor/leaflet/     # 오프라인 독립 실행용 Leaflet 라이브러리
└── README.md
```

---

## 🚀 GitHub Pages 무료 호스팅 배포 방법

GitHub 저장소(Repository)에 업로드한 후, 무료 웹사이트로 1분 만에 배포할 수 있습니다:

1. **GitHub 저장소 생성 및 푸시**:
   ```bash
   git init
   git add .
   git commit -m "feat: Austria Guide Excursions interactive atlas website"
   git branch -M main
   git remote add origin https://github.com/<YOUR-USERNAME>/<REPO-NAME>.git
   git push -u origin main
   ```

2. **GitHub Pages 활성화**:
   - GitHub 저장소 웹페이지로 이동
   - 상단 **Settings** ➔ 좌측 메뉴의 **Pages** 클릭
   - **Build and deployment** ➔ **Source**: `Deploy from a branch` 선택
   - **Branch**: `main` 브랜치 / `/ (root)` 폴더 선택 후 **Save** 클릭

3. **배포 완료**:
   - 1~2분 후 `https://<YOUR-USERNAME>.github.io/<REPO-NAME>/` 주소로 전 세계 어디서나 접속할 수 있는 웹사이트가 즉시 열립니다!
