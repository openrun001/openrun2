// ============================================================
// 사진 추가 방법
// 1) assets 폴더에 새 사진을 넣습니다.
// 2) 아래 GALLERY_ITEMS 안에 한 줄을 복사해 파일명과 분류를 바꿉니다.
// category: seafood / meat / korean / cafe 중 하나
// ============================================================
const GALLERY_ITEMS = [
  { src: "assets/gallery-01.jpg", category: "seafood", title: "회·해산물 촬영 01" },
  { src: "assets/gallery-02.jpg", category: "seafood", title: "회·해산물 촬영 02" },
  { src: "assets/gallery-03.jpg", category: "seafood", title: "회·해산물 촬영 03" },
  { src: "assets/gallery-04.jpg", category: "seafood", title: "회·해산물 촬영 04" },
  { src: "assets/gallery-05.jpg", category: "meat", title: "고기·구이 촬영 05" },
  { src: "assets/gallery-06.jpg", category: "meat", title: "고기·구이 촬영 06" },
  { src: "assets/gallery-07.jpg", category: "meat", title: "고기·구이 촬영 07" },
  { src: "assets/gallery-08.jpg", category: "meat", title: "고기·구이 촬영 08" },
  { src: "assets/gallery-09.jpg", category: "korean", title: "한식·찌개 촬영 09" },
  { src: "assets/gallery-10.jpg", category: "korean", title: "한식·찌개 촬영 10" },
  { src: "assets/gallery-11.jpg", category: "korean", title: "한식·찌개 촬영 11" },
  { src: "assets/gallery-12.jpg", category: "korean", title: "한식·찌개 촬영 12" },
  { src: "assets/gallery-13.jpg", category: "cafe", title: "카페·디저트 촬영 13" },
  { src: "assets/gallery-14.jpg", category: "cafe", title: "카페·디저트 촬영 14" },
  { src: "assets/gallery-15.jpg", category: "cafe", title: "카페·디저트 촬영 15" },
  { src: "assets/gallery-16.jpg", category: "cafe", title: "카페·디저트 촬영 16" }
];

// ============================================================
// 영상 링크 추가 방법
// type: "youtube"  → 사이트 안에서 바로 재생
// type: "link"     → 인스타그램, 네이버 블로그, 네이버TV 등 새 창으로 이동
//
// 유튜브 주소 예시:
// https://www.youtube.com/watch?v=동영상ID
// https://youtu.be/동영상ID
//
// 외부 영상 예시:
// https://www.instagram.com/reel/...
// https://blog.naver.com/...
// ============================================================
const VIDEO_ITEMS = [
  
  {
    type: "link",
    url: "https://www.instagram.com/sunsazang?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    title: "크리에이터 선사장",
    description: "선사장 맛집소개 릴스",
    thumbnail: "assets/portfolio-meat.jpg"
  },
  
];

const CATEGORY_NAMES = {
  seafood: "회·해산물",
  meat: "고기·구이",
  korean: "한식·찌개",
  cafe: "카페·디저트"
};

let activeFilter = "all";
let visibleCount = 8;
let visibleItems = [];
let lightboxIndex = 0;

function getYouTubeId(url) {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) return parsed.pathname.slice(1);
    if (parsed.hostname.includes("youtube.com")) {
      if (parsed.pathname.startsWith("/shorts/")) return parsed.pathname.split("/")[2];
      return parsed.searchParams.get("v");
    }
  } catch (e) {}
  return "";
}

function renderGallery(reset = false) {
  const grid = document.getElementById("galleryGrid");
  const loadMore = document.getElementById("loadMoreButton");
  if (!grid || !loadMore) return;

  if (reset) visibleCount = 8;
  const filtered = activeFilter === "all"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeFilter);

  visibleItems = filtered;
  grid.innerHTML = "";

  filtered.slice(0, visibleCount).forEach((item, index) => {
    const figure = document.createElement("figure");
    figure.className = "gallery-card reveal visible";
    figure.innerHTML = `
      <button type="button" aria-label="${item.title} 크게 보기">
        <img src="${item.src}" alt="${item.title}" loading="lazy">
        <span class="gallery-card-overlay">
          <small>${CATEGORY_NAMES[item.category] || ""}</small>
          <strong>${item.title}</strong>
        </span>
      </button>
    `;
    figure.querySelector("button").addEventListener("click", () => openLightbox(index));
    grid.appendChild(figure);
  });

  loadMore.hidden = visibleCount >= filtered.length;
}

function openLightbox(index) {
  lightboxIndex = index;
  updateLightbox();
  document.getElementById("lightbox").showModal();
  document.body.classList.add("no-scroll");
}

function updateLightbox() {
  const item = visibleItems[lightboxIndex];
  if (!item) return;
  document.getElementById("lightboxImage").src = item.src;
  document.getElementById("lightboxImage").alt = item.title;
  document.getElementById("lightboxCaption").textContent =
    `${CATEGORY_NAMES[item.category] || ""} · ${item.title}`;
}

function closeLightbox() {
  document.getElementById("lightbox").close();
  document.body.classList.remove("no-scroll");
}

function renderVideos() {
  const grid = document.getElementById("videoGrid");
  if (!grid) return;

  grid.innerHTML = VIDEO_ITEMS.map(item => {
    if (item.type === "youtube") {
      const id = getYouTubeId(item.url);
      if (!id) return "";
      return `
        <article class="video-card reveal visible">
          <div class="video-embed">
            <iframe
              src="https://www.youtube-nocookie.com/embed/${id}"
              title="${item.title}"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen></iframe>
          </div>
          <div class="video-copy">
            <span>YOUTUBE</span>
            <h3>${item.title}</h3>
            <p>${item.description || ""}</p>
          </div>
        </article>
      `;
    }

    return `
      <a class="video-card external-video reveal visible" href="${item.url}" target="_blank" rel="noopener noreferrer">
        <div class="external-thumbnail">
          <img src="${item.thumbnail || "assets/hero.jpg"}" alt="${item.title}" loading="lazy">
          <span class="play-icon">▶</span>
        </div>
        <div class="video-copy">
          <span>VIDEO LINK</span>
          <h3>${item.title}</h3>
          <p>${item.description || ""}</p>
          <strong>영상 보러 가기 ↗</strong>
        </div>
      </a>
    `;
  }).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  renderGallery();
  renderVideos();

  document.querySelectorAll(".filter-button").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".filter-button").forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
      activeFilter = button.dataset.filter;
      renderGallery(true);
    });
  });

  document.getElementById("loadMoreButton")?.addEventListener("click", () => {
    visibleCount += 8;
    renderGallery();
  });

  document.getElementById("lightboxClose")?.addEventListener("click", closeLightbox);
  document.getElementById("lightboxPrev")?.addEventListener("click", () => {
    lightboxIndex = (lightboxIndex - 1 + visibleItems.length) % visibleItems.length;
    updateLightbox();
  });
  document.getElementById("lightboxNext")?.addEventListener("click", () => {
    lightboxIndex = (lightboxIndex + 1) % visibleItems.length;
    updateLightbox();
  });

  document.getElementById("lightbox")?.addEventListener("click", event => {
    if (event.target.id === "lightbox") closeLightbox();
  });

  document.addEventListener("keydown", event => {
    const lightbox = document.getElementById("lightbox");
    if (!lightbox?.open) return;
    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowLeft") {
      lightboxIndex = (lightboxIndex - 1 + visibleItems.length) % visibleItems.length;
      updateLightbox();
    }
    if (event.key === "ArrowRight") {
      lightboxIndex = (lightboxIndex + 1) % visibleItems.length;
      updateLightbox();
    }
  });
});
