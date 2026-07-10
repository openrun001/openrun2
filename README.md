# OPEN RUN 무료 홈페이지 V2

사진을 계속 추가할 수 있는 자동 갤러리와 영상 링크 섹션이 포함된 버전입니다.

## 가장 쉬운 미리보기

압축을 풀고 `index.html`을 더블클릭하세요.

---

## 사진 추가 방법

### 1단계: 사진 넣기

새 사진을 `assets` 폴더 안에 넣습니다.

예시:

- `seafood-01.jpg`
- `meat-01.jpg`
- `korean-01.jpg`
- `cafe-01.jpg`

영문 파일명과 JPG 또는 WEBP 형식을 권장합니다.

### 2단계: 사진 목록 추가

`gallery.js`를 메모장으로 엽니다.

상단의 `GALLERY_ITEMS` 안에서 아래 한 줄을 복사합니다.

```js
{ src: "assets/gallery-01.jpg", category: "seafood", title: "회·해산물 촬영 01" },
```

새 사진에 맞게 바꿉니다.

```js
{ src: "assets/seafood-01.jpg", category: "seafood", title: "도다리회 촬영" },
```

분류는 아래 네 가지 중 하나를 사용합니다.

- `seafood` : 회·해산물
- `meat` : 고기
- `korean` : 한식
- `cafe` : 카페·디저트

사진 개수에는 사실상 제한이 없지만, 한 페이지에는 50~150장 정도를 권장합니다.

---

## 유튜브 영상 넣기

`gallery.js` 안의 `VIDEO_ITEMS`를 찾습니다.

```js
{
  type: "youtube",
  url: "https://www.youtube.com/watch?v=동영상ID",
  title: "촬영 현장 영상",
  description: "음식 촬영 현장을 소개합니다."
},
```

`url`에 실제 유튜브 주소를 붙여 넣으면 홈페이지에서 바로 재생됩니다.

유튜브 쇼츠 주소도 사용할 수 있습니다.

```text
https://www.youtube.com/shorts/동영상ID
```

---

## 인스타그램·네이버 영상 링크 넣기

인스타 릴스나 네이버 영상은 아래처럼 입력합니다.

```js
{
  type: "link",
  url: "https://www.instagram.com/reel/실제주소/",
  title: "인스타그램 촬영 릴스",
  description: "촬영 현장을 릴스로 확인하세요.",
  thumbnail: "assets/meat-01.jpg"
},
```

- `url` : 열릴 영상 주소
- `title` : 홈페이지에 보이는 제목
- `description` : 짧은 설명
- `thumbnail` : 영상 카드에 보일 대표사진

인스타그램과 네이버는 플랫폼 정책 때문에 홈페이지 안에서 직접 재생이 막힐 수 있어,
썸네일을 누르면 해당 영상 페이지가 새 창으로 열리도록 구성했습니다.

---

## 첫 화면 사진 교체

`assets/hero.jpg`를 같은 이름의 새 사진으로 교체합니다.

---

## GitHub Pages 무료 공개

1. GitHub 회원가입
2. `openrun` 공개 저장소 생성
3. 이 폴더 안의 파일 전체 업로드
4. 저장소 `Settings` → `Pages`
5. Source: `Deploy from a branch`
6. Branch: `main`, Folder: `/root`
7. Save

공개 주소:

```text
https://깃허브아이디.github.io/openrun/
```

---

## 기존 사이트를 수정해서 다시 올리는 방법

파일을 수정한 뒤 GitHub 저장소에서 같은 파일을 다시 업로드하고
`Commit changes`를 누르면 홈페이지가 자동으로 갱신됩니다.
