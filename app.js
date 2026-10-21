/**
 * AUSTRIA GUIDE Exkursions-Atlas
 * Application Logic & Map Controller
 */

// --- Application State ---
const urlParams = new URLSearchParams(window.location.search);
const defaultLang = urlParams.get('lang') || (document.documentElement.lang === 'de' ? 'de' : 'ko');

const state = {
  currentCourse: 'all', // 'all' or 'ex01' ~ 'ex05'
  currentCategory: 'all',
  searchQuery: '',
  lang: defaultLang, // 'ko' or 'de'
  activeSpotId: null,
  mapLayer: 'osm'
};

// --- Map & Layers Variables ---
let map = null;
let tileLayers = {};
let coursePolylines = {};
let spotMarkers = [];

// --- Multi-language Strings ---
const I18N = {
  ko: {
    brand_title: 'AUSTRIA GUIDE <span>Exkursions-Atlas</span>',
    brand_sub: 'WIFI Steiermark Fremdenführer • 가이드 외부 견학 & 경로 지도',
    stat_courses: '견학 코스',
    stat_stops: '방문 장소',
    stat_distance: '총 이동거리',
    tab_all: '전체 코스',
    tab_ex01: 'EX 01 서부',
    tab_ex02: 'EX 02 비엔나',
    tab_ex03: 'EX 03 북부',
    tab_ex04: 'EX 04 동부',
    tab_ex05: 'EX 05 남부',
    filter_lbl: '유형별 필터',
    cat_all: '전체',
    cat_castle: '성채/궁전',
    cat_church: '성당/수도원',
    cat_culture: '역사/문화',
    cat_gastronomy: '미식/와인',
    cat_route: '가도/풍경',
    cat_walk: '도보투어',
    collapse_all: '모두 접기',
    expand_all: '모두 펼치기',
    legend_title: '견학 코스 범례',
    legend_ex01: 'EX 01 서부 슈타이어마르크',
    legend_ex02: 'EX 02 연방수도 비엔나',
    legend_ex03: 'EX 03 그라츠 북부 근교',
    legend_ex04: 'EX 04 동부 성채 & 사과가도',
    legend_ex05: 'EX 05 남부 와인랜드 & 수료',
    list_view: '일정 목록 보기',
    search_placeholder: '장소, 도시, 키워드 검색... (예: 피버, 훈데르트바서, Hofburg)',
    no_results: '일치하는 방문지가 없습니다.',
    homework_lbl: '과제(HÜ) & 이수:',
    guide_tip_lbl: '가이드 실습 포인트 & 시험 팁:',
    website_link: '공식 웹사이트 바로가기',
    view_on_map: '지도에서 보기',
    photo_view: '사진 보기',
    photo_group_view: '단체사진 보기',
    details_view: '상세 정보 보기',
    overview_title: '오스트리아 가이드 5대 외부 견학 총괄',
    overview_sub: 'WIFI Steiermark Fremdenführer-Lehrgang 2025/2026',
    overview_desc: '오스트리아 국가공인 외국인안내사(AUSTRIA GUIDE) 양성을 위한 5개 코스의 외부 실습 전 과정입니다. 서부·북부·동부·남부 슈타이어마르크와 연방수도 비엔나를 아우르며 가이드 스피치, 버스 해설, 도보 인솔, 역사·예술 도상학 실습을 완벽하게 수행했습니다.',
    meta_regions: '권역:',
    meta_period: '기간:',
    meta_distance: '총 실습거리:',
    meta_organizer: '주관:',
    meta_date: '일시:',
    meta_time: '시간:',
    meta_guide: '인솔:',
    meta_dist: '거리:',
    about_title: 'WIFI Steiermark AUSTRIA GUIDE 과정',
    about_sub: 'Führungspraxis inkl. Exkursionen, Lehrführungen & Stadtrundgänge',
    about_intro_title: '📌 외부 견학(Exkursionen)의 목적과 중요성',
    about_intro_p: '오스트리아 국가공인 외국인안내사(AUSTRIA GUIDE) 자격 취득을 위해 진행된 현장 중심 실습 과정입니다. 슈타이어마르크의 지리적·역사적 주요 거점(서부, 북부, 동부, 남부)과 연방수도 비엔나를 직접 방문하여, 차내 버스 가이드 스피치 기법, 도보 인솔 테크닉, 명소별 핵심 역사·건축 도상학 해설을 체계적으로 훈련했습니다.'
  },
  de: {
    brand_title: 'AUSTRIA GUIDE <span>Exkursions-Atlas</span>',
    brand_sub: 'WIFI Steiermark Fremdenführer-Ausbildung • Routen & Standorte',
    stat_courses: 'Exkursionen',
    stat_stops: 'Standorte',
    stat_distance: 'Gesamtstrecke',
    tab_all: 'Alle Touren',
    tab_ex01: 'EX 01 Weststmk.',
    tab_ex02: 'EX 02 Wien',
    tab_ex03: 'EX 03 Nordstmk.',
    tab_ex04: 'EX 04 Oststmk.',
    tab_ex05: 'EX 05 Südstmk.',
    filter_lbl: 'Kategorie-Filter',
    cat_all: 'Alle',
    cat_castle: 'Schlösser & Burgen',
    cat_church: 'Kirchen & Stifte',
    cat_culture: 'Kultur & Handwerk',
    cat_gastronomy: 'Kulinarik & Wein',
    cat_route: 'Routen & Panorama',
    cat_walk: 'Stadtrundgänge',
    collapse_all: 'Alles einklappen',
    expand_all: 'Alles aufklappen',
    legend_title: 'Exkursions-Legende',
    legend_ex01: 'EX 01 Weststeiermark (Lipizzaner & Schilcher)',
    legend_ex02: 'EX 02 Bundeshauptstadt Wien (Ringstraße & Bus)',
    legend_ex03: 'EX 03 Region Graz-Nord (Rein & Stübing)',
    legend_ex04: 'EX 04 Oststeiermark (Herberstein & Riegersburg)',
    legend_ex05: 'EX 05 Südsteiermark (Weinland & Abschluss)',
    list_view: 'Programm & Orte',
    search_placeholder: 'Orte, Städte, Stichwörter suchen... (z.B. Piber, Hundertwasser, Hofburg)',
    no_results: 'Keine passenden Standorte gefunden.',
    homework_lbl: 'Hausübung (HÜ) & LE-Anrechnung:',
    guide_tip_lbl: 'Führungs- & Prüfungsschwerpunkte:',
    website_link: 'Offizielle Website',
    view_on_map: 'Auf der Karte zeigen',
    photo_view: 'Foto anzeigen',
    photo_group_view: 'Gruppenfoto anzeigen',
    details_view: 'Details ansehen',
    overview_title: 'Gesamtübersicht der 5 Fachexkursionen',
    overview_sub: 'WIFI Steiermark Fremdenführer-Lehrgang 2025/2026',
    overview_desc: 'Praktische Ausbildungsexkursionen für angehende staatlich geprüfte Austria Guides. Die Touren umfassen alle wesentlichen touristischen und kulturhistorischen Achsen der Steiermark sowie eine intensive Führungspraxis in der Bundeshauptstadt Wien.',
    meta_regions: 'Regionen:',
    meta_period: 'Zeitraum:',
    meta_distance: 'Gesamtstrecke:',
    meta_organizer: 'Veranstalter:',
    meta_date: 'Datum:',
    meta_time: 'Uhrzeit:',
    meta_guide: 'Leitung:',
    meta_dist: 'Distanz:',
    about_title: 'WIFI Steiermark AUSTRIA GUIDE Lehrgang',
    about_sub: 'Führungspraxis inkl. Exkursionen, Lehrführungen & Stadtrundgänge',
    about_intro_title: '📌 Ziel und Bedeutung der Fachexkursionen',
    about_intro_p: 'Praxisorientierte Lehr- und Übungsexkursionen zur Erlangung der staatlichen Fremdenführer-Befähigung. Die Teilnehmer/innen trainierten unter realen Bedingungen: Busmoderation über das Bordmikrofon, Gruppenführung bei Stadtrundgängen und kunsthistorische Fachvermittlung vor Ort.'
  }
};

// --- Initialization on DOM Loaded ---
document.addEventListener('DOMContentLoaded', () => {
  initMap();
  renderCourseSummary();
  renderTimeline();
  setupEventListeners();
  updateLanguageUI();
});

// --- Leaflet Map Initialization ---
function initMap() {
  const mapEl = document.getElementById('map');
  if (!mapEl) return;

  if (typeof L === 'undefined') {
    console.error('Leaflet library is not available');
    mapEl.innerHTML = `
      <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;color:#64748B;gap:12px;padding:20px;text-align:center;">
        <i class="fa-solid fa-triangle-exclamation" style="font-size:2.5rem;color:#DC2626;"></i>
        <h3 style="color:#0F172A;font-weight:700;">지도 라이브러리를 로드하지 못했습니다</h3>
        <p style="font-size:0.9rem;">assets/vendor/leaflet/ 폴더의 파일을 확인해 주세요.</p>
      </div>
    `;
    return;
  }

  try {
    // Center between Graz and Vienna
    map = L.map('map', {
      center: [47.45, 15.65],
      zoom: 9,
      zoomControl: false,
      fadeAnimation: true,
      markerZoomAnimation: true
    });

    // Zoom control in custom position
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Define 100% Free & Open-Source tile layers (No API Key Required, No Block!)
    // 1. OpenStreetMap Humanitarian (HOT - Reliable, clean, vibrant & no 403 block!)
    tileLayers.hot = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a>',
      maxZoom: 19
    });

    // 2. Esri World Street Map (High reliability, clear typography, no API key)
    tileLayers.esri = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012',
      maxZoom: 19
    });

    // 3. OpenTopoMap (Topographic terrain & relief)
    tileLayers.topo = L.tileLayer('https://tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://opentopomap.org" target="_blank">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank">CC-BY-SA</a>)',
      maxZoom: 17
    });

    // Set OpenStreetMap HOT as the reliable default layer
    tileLayers.hot.addTo(map);
    state.mapLayer = 'hot';

    // Synchronize UI style buttons
    document.querySelectorAll('.style-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.layer === 'hot');
    });

    // Render routes and markers
    renderMapElements();

    // Trigger size calculation multiple times to ensure full viewport fill
    const refreshMapSize = () => {
      if (map) {
        map.invalidateSize({ pan: false });
      }
    };

    refreshMapSize();
    setTimeout(refreshMapSize, 100);
    setTimeout(refreshMapSize, 300);
    setTimeout(refreshMapSize, 600);

    // Watch for window resize or layout changes
    window.addEventListener('resize', refreshMapSize);

    if (window.ResizeObserver) {
      const ro = new ResizeObserver(() => {
        refreshMapSize();
      });
      ro.observe(mapEl);
    }

  } catch (err) {
    console.error('Error initializing map:', err);
  }
}

// --- Render Routes (Polylines) & Markers ---
function renderMapElements() {
  // Clear existing layers
  Object.values(coursePolylines).forEach(layer => map.removeLayer(layer));
  coursePolylines = {};
  
  spotMarkers.forEach(m => map.removeLayer(m.marker));
  spotMarkers = [];

  const coursesToRender = state.currentCourse === 'all'
    ? EXCURSION_DATA.courses
    : EXCURSION_DATA.courses.filter(c => c.id === state.currentCourse);

  const allBounds = L.latLngBounds([]);

  coursesToRender.forEach(course => {
    // 1. Build Polyline coordinates
    const coords = course.stops.map(s => s.coords);
    const polyline = L.polyline(coords, {
      color: course.color,
      weight: 4,
      opacity: 0.85,
      dashArray: '8, 6',
      lineJoin: 'round'
    }).addTo(map);

    coursePolylines[course.id] = polyline;

    // 2. Build Markers for each stop
    course.stops.forEach((stop, index) => {
      // Check category & search filter
      if (!isStopVisible(stop, course)) return;

      const marker = createCustomMarker(stop, course, index + 1);
      marker.addTo(map);

      // Extend bounds
      allBounds.extend(stop.coords);

      spotMarkers.push({
        courseId: course.id,
        stopId: `${course.id}_s${stop.step}`,
        stop: stop,
        course: course,
        marker: marker
      });
    });
  });

  // Fit bounds if we have points
  if (allBounds.isValid()) {
    map.fitBounds(allBounds, { padding: [50, 50], maxZoom: 14 });
  }
}

// --- Create Custom Pin Icon & Marker ---
function createCustomMarker(stop, course, number) {
  const isSelected = state.activeSpotId === `${course.id}_s${stop.step}`;
  
  const iconHtml = `
    <div class="custom-pin" style="background-color: ${course.color}; width: 28px; height: 28px;">
      <div class="pin-content">${stop.step}</div>
    </div>
  `;

  const customIcon = L.divIcon({
    html: iconHtml,
    className: 'custom-pin-container',
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -28]
  });

  const marker = L.marker(stop.coords, { icon: customIcon });

  const isDe = state.lang === 'de';
  const mainTitle = isDe ? stop.name_de : stop.name_ko;
  const subTitle = isDe ? '' : stop.name_de;
  const desc = isDe && stop.desc_de ? stop.desc_de : stop.desc_ko;
  const btnText = isDe ? 'Details ansehen' : '상세 정보 보기';

  // Popup Content
  const popupHtml = `
    <div class="popup-card">
      <span class="popup-tag" style="background:${course.color};">${course.code}</span>
      <div class="popup-time"><i class="fa-regular fa-clock"></i> ${stop.time}</div>
      <div class="popup-title">${mainTitle}</div>
      ${subTitle ? `<div class="popup-subtitle">${subTitle}</div>` : ''}
      <div class="popup-desc">${desc}</div>
      <button class="popup-btn" onclick="selectSpot('${course.id}', ${stop.step})">
        ${btnText}
      </button>
    </div>
  `;

  marker.bindPopup(popupHtml);

  marker.on('click', () => {
    selectSpot(course.id, stop.step, false);
  });

  return marker;
}

// --- Check if a stop should be visible according to filters ---
function isStopVisible(stop, course) {
  // Category check
  if (state.currentCategory !== 'all') {
    if (state.currentCategory === 'castle' && stop.category !== 'castle') return false;
    if (state.currentCategory === 'church' && stop.category !== 'church') return false;
    if (state.currentCategory === 'culture' && stop.category !== 'culture') return false;
    if (state.currentCategory === 'gastronomy' && stop.category !== 'gastronomy') return false;
    if (state.currentCategory === 'route' && stop.category !== 'route') return false;
    if (state.currentCategory === 'walk' && stop.category !== 'walk') return false;
  }

  // Search query check
  if (state.searchQuery.trim() !== '') {
    const q = state.searchQuery.toLowerCase();
    const matchNameKo = stop.name_ko.toLowerCase().includes(q);
    const matchNameDe = stop.name_de.toLowerCase().includes(q);
    const matchDescKo = stop.desc_ko.toLowerCase().includes(q);
    const matchDescDe = stop.desc_de.toLowerCase().includes(q);
    const matchGuide = (stop.guide_points_ko || '').toLowerCase().includes(q);
    const matchAddress = (stop.address || '').toLowerCase().includes(q);
    const matchCourse = course.title_ko.toLowerCase().includes(q) || course.title_de.toLowerCase().includes(q);

    if (!matchNameKo && !matchNameDe && !matchDescKo && !matchDescDe && !matchGuide && !matchAddress && !matchCourse) {
      return false;
    }
  }

  return true;
}

// --- Render Course Summary Card in Sidebar ---
function renderCourseSummary() {
  const card = document.getElementById('courseSummaryCard');
  const t = I18N[state.lang];

  if (state.currentCourse === 'all') {
    card.innerHTML = `
      <div class="summary-header">
        <div>
          <span class="summary-code-badge" style="background:#0F172A;">OVERVIEW</span>
          <h2 class="summary-title">${t.overview_title}</h2>
          <div class="summary-title-de">${t.overview_sub}</div>
        </div>
      </div>
      <p class="summary-desc">${t.overview_desc}</p>
      <div class="summary-meta-grid">
        <div class="meta-pill"><i class="fa-solid fa-map-location-dot"></i> <span>${t.meta_regions} <strong>Steiermark & Wien</strong></span></div>
        <div class="meta-pill"><i class="fa-solid fa-clock"></i> <span>${t.meta_period} <strong>2025.10 ~ 2026.10</strong></span></div>
        <div class="meta-pill"><i class="fa-solid fa-bus"></i> <span>${t.meta_distance} <strong>ca. 975 km</strong></span></div>
        <div class="meta-pill"><i class="fa-solid fa-graduation-cap"></i> <span>${t.meta_organizer} <strong>WIFI Steiermark</strong></span></div>
      </div>
    `;
    return;
  }

  const course = EXCURSION_DATA.courses.find(c => c.id === state.currentCourse);
  if (!course) return;

  const isDe = state.lang === 'de';
  const title = isDe ? course.title_de : course.title_ko;
  const subtitle = isDe ? '' : course.title_de;
  const dateStr = isDe ? course.date_display_de : course.date_display_ko;
  const summary = isDe && course.summary_de ? course.summary_de : course.summary_ko;
  const homework = isDe && course.homework_de ? course.homework_de : course.homework_ko;

  card.innerHTML = `
    <div class="summary-header">
      <div>
        <span class="summary-code-badge" style="background:${course.color};">${course.code}</span>
        <h2 class="summary-title">${title}</h2>
        ${subtitle ? `<div class="summary-title-de">${subtitle}</div>` : ''}
      </div>
    </div>
    <p class="summary-desc">${summary}</p>
    <div class="summary-meta-grid">
      <div class="meta-pill"><i class="fa-regular fa-calendar"></i> <span>${t.meta_date} <strong>${dateStr}</strong></span></div>
      <div class="meta-pill"><i class="fa-regular fa-clock"></i> <span>${t.meta_time} <strong>${course.time_range}</strong></span></div>
      <div class="meta-pill"><i class="fa-solid fa-user-tie"></i> <span>${t.meta_guide} <strong>${course.instructors}</strong></span></div>
      <div class="meta-pill"><i class="fa-solid fa-route"></i> <span>${t.meta_dist} <strong>ca. ${course.distance_km} km</strong></span></div>
    </div>
    <div class="summary-homework">
      <strong><i class="fa-solid fa-book-bookmark"></i> ${t.homework_lbl}</strong> ${homework}
    </div>
  `;
}

// --- Render Timeline Spot List ---
function renderTimeline() {
  const container = document.getElementById('timelineList');
  const countEl = document.getElementById('timelineCountText');
  const t = I18N[state.lang];
  const isDe = state.lang === 'de';

  container.innerHTML = '';

  const coursesToRender = state.currentCourse === 'all'
    ? EXCURSION_DATA.courses
    : EXCURSION_DATA.courses.filter(c => c.id === state.currentCourse);

  let visibleCount = 0;

  coursesToRender.forEach(course => {
    course.stops.forEach((stop, index) => {
      if (!isStopVisible(stop, course)) return;

      visibleCount++;
      const spotId = `${course.id}_s${stop.step}`;
      const isActive = state.activeSpotId === spotId;

      const itemEl = document.createElement('div');
      itemEl.className = `timeline-item ${isActive ? 'active' : ''}`;
      itemEl.id = `item_${spotId}`;
      itemEl.style.setProperty('--item-color', course.color);
      itemEl.style.setProperty('--item-bg-tint', course.bg_tint);

      // Spot Photo Check
      let photoHtml = '';
      if (course.id === 'ex02' && stop.step === 3) {
        photoHtml = `
          <div class="spot-photo-thumb" onclick="openLightbox('assets/images/ex02_belvedere.jpg', 'Schloss Belvedere Wien (Fachexkursion 02)')">
            <img src="assets/images/ex02_belvedere.jpg" alt="Schloss Belvedere">
            <span class="photo-overlay-badge"><i class="fa-solid fa-camera"></i> ${t.photo_view}</span>
          </div>
        `;
      } else if (course.id === 'ex03' && stop.step === 5) {
        photoHtml = `
          <div class="spot-photo-thumb" onclick="openLightbox('assets/images/ex03_group.jpg', 'ÖFLM Stübing Gruppenfoto (Fachexkursion 03 Region Graz-Nord)')">
            <img src="assets/images/ex03_group.jpg" alt="Stübing Gruppenfoto">
            <span class="photo-overlay-badge"><i class="fa-solid fa-camera"></i> ${t.photo_group_view}</span>
          </div>
        `;
      } else if (course.id === 'ex04' && stop.step === 3) {
        photoHtml = `
          <div class="spot-photo-thumb" onclick="openLightbox('assets/images/ex04_herberstein.jpg', 'Gartenschloss Herberstein (Fachexkursion 04 Oststeiermark)')">
            <img src="assets/images/ex04_herberstein.jpg" alt="Schloss Herberstein">
            <span class="photo-overlay-badge"><i class="fa-solid fa-camera"></i> ${t.photo_view}</span>
          </div>
        `;
      } else if (course.id === 'ex04' && stop.step === 5) {
        photoHtml = `
          <div class="spot-photo-thumb" onclick="openLightbox('assets/images/ex04_group.jpg', 'Burg Riegersburg Gruppenfoto der Fremdenführer-Kolleginnen (Fachexkursion 04)')">
            <img src="assets/images/ex04_group.jpg" alt="Riegersburg Gruppenfoto">
            <span class="photo-overlay-badge"><i class="fa-solid fa-camera"></i> ${t.photo_group_view}</span>
          </div>
        `;
      }

      // Guide Tip Box
      const guideText = isDe && stop.guide_points_de ? stop.guide_points_de : stop.guide_points_ko;
      let guideBoxHtml = '';
      if (guideText) {
        guideBoxHtml = `
          <div class="spot-guide-box">
            <strong><i class="fa-solid fa-lightbulb"></i> ${t.guide_tip_lbl}</strong><br>
            ${guideText}
          </div>
        `;
      }

      // External Link
      let linkHtml = '';
      if (stop.url) {
        linkHtml = `
          <a href="${stop.url}" target="_blank" rel="noopener noreferrer" class="spot-link">
            <i class="fa-solid fa-arrow-up-right-from-square"></i> ${t.website_link}
          </a>
        `;
      }

      const mainName = isDe ? stop.name_de : stop.name_ko;
      const subName = isDe ? '' : stop.name_de;
      const desc = isDe && stop.desc_de ? stop.desc_de : stop.desc_ko;
      const categoryLabel = isDe && stop.category_de ? stop.category_de : stop.category_ko;

      itemEl.innerHTML = `
        <div class="timeline-node">${stop.step}</div>
        <div class="spot-card">
          <div class="spot-top">
            <span class="spot-time-badge"><i class="fa-regular fa-clock"></i> ${stop.time}</span>
            <span class="spot-cat-tag">${categoryLabel}</span>
          </div>
          <div class="spot-title-ko">${mainName}</div>
          ${subName ? `<div class="spot-title-de">${subName}</div>` : ''}
          <div class="spot-address"><i class="fa-solid fa-location-dot"></i> ${stop.address}</div>
          <p class="spot-desc">${desc}</p>
          ${guideBoxHtml}
          ${photoHtml}
          <div class="spot-actions">
            ${linkHtml || '<span></span>'}
            <button class="spot-fly-btn" onclick="flyToSpot('${course.id}', ${stop.step})">
              <i class="fa-solid fa-crosshairs"></i> ${t.view_on_map}
            </button>
          </div>
        </div>
      `;

      // Click to select
      itemEl.addEventListener('click', (e) => {
        if (e.target.closest('a') || e.target.closest('.spot-photo-thumb')) return;
        selectSpot(course.id, stop.step, true);
      });

      container.appendChild(itemEl);
    });
  });

  countEl.innerText = state.lang === 'ko'
    ? `총 ${visibleCount}개 방문지`
    : `${visibleCount} Standorte insgesamt`;

  if (visibleCount === 0) {
    container.innerHTML = `
      <div style="padding: 40px 20px; text-align: center; color: var(--text-muted);">
        <i class="fa-solid fa-magnifying-glass" style="font-size: 2rem; margin-bottom: 12px; opacity: 0.4;"></i>
        <p>${t.no_results}</p>
      </div>
    `;
  }
}

// --- Select Spot (Synchronize Map & Sidebar) ---
function selectSpot(courseId, stepNumber, zoomMap = true) {
  const spotId = `${courseId}_s${stepNumber}`;
  state.activeSpotId = spotId;

  // Highlight card in sidebar
  document.querySelectorAll('.timeline-item').forEach(el => el.classList.remove('active'));
  const targetCard = document.getElementById(`item_${spotId}`);
  if (targetCard) {
    targetCard.classList.add('active');
    targetCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // Find marker on map
  const match = spotMarkers.find(m => m.courseId === courseId && m.stop.step === stepNumber);
  if (match) {
    if (zoomMap) {
      map.flyTo(match.stop.coords, 14, { duration: 1.2 });
    }
    setTimeout(() => {
      match.marker.openPopup();
    }, 400);
  }
}

// --- Fly directly to spot from button ---
window.flyToSpot = function(courseId, stepNumber) {
  selectSpot(courseId, stepNumber, true);
  // On mobile, close sidebar after clicking
  if (window.innerWidth <= 768) {
    document.getElementById('appSidebar').classList.remove('mobile-open');
  }
};

window.selectSpot = selectSpot;

// --- Open Image Lightbox Modal ---
window.openLightbox = function(imgSrc, caption) {
  const modal = document.getElementById('imageModal');
  const img = document.getElementById('lightboxImg');
  const cap = document.getElementById('lightboxCaption');

  img.src = imgSrc;
  cap.innerText = caption;
  modal.style.display = 'flex';
};

// --- Setup Event Listeners ---
function setupEventListeners() {
  // Course Navigation Tabs
  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const courseId = tab.dataset.course;
      state.currentCourse = courseId;
      state.activeSpotId = null;

      renderCourseSummary();
      renderTimeline();
      renderMapElements();
    });
  });

  // Category Filter Pills
  const pills = document.querySelectorAll('.pill-btn');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      state.currentCategory = pill.dataset.cat;
      renderTimeline();
      renderMapElements();
    });
  });

  // Search Input
  const searchInput = document.getElementById('searchInput');
  const clearBtn = document.getElementById('clearSearchBtn');

  searchInput.addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    clearBtn.style.display = state.searchQuery ? 'block' : 'none';
    renderTimeline();
    renderMapElements();
  });

  clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    state.searchQuery = '';
    clearBtn.style.display = 'none';
    renderTimeline();
    renderMapElements();
  });

  // Language Switcher
  const langBtns = document.querySelectorAll('.lang-btn');
  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      langBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      state.lang = btn.dataset.lang;
      updateLanguageUI();
      renderCourseSummary();
      renderTimeline();
      renderMapElements();
    });
  });

  // Map Tile Layer Switcher
  const styleBtns = document.querySelectorAll('.style-btn');
  styleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      styleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const layerKey = btn.dataset.layer;
      state.mapLayer = layerKey;

      Object.values(tileLayers).forEach(l => map.removeLayer(l));
      tileLayers[layerKey].addTo(map);
    });
  });

  // Fit Bounds Floating Button
  document.getElementById('fitBoundsBtn').addEventListener('click', () => {
    const coursesToRender = state.currentCourse === 'all'
      ? EXCURSION_DATA.courses
      : EXCURSION_DATA.courses.filter(c => c.id === state.currentCourse);

    const bounds = L.latLngBounds([]);
    coursesToRender.forEach(c => c.stops.forEach(s => bounds.extend(s.coords)));

    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 });
    }
  });

  // Map Legend Item Click
  document.querySelectorAll('.legend-item').forEach(item => {
    item.addEventListener('click', () => {
      const courseId = item.dataset.course;
      const targetTab = document.querySelector(`.tab-btn[data-course="${courseId}"]`);
      if (targetTab) targetTab.click();
    });
  });

  // Mobile Sidebar Toggle
  const mobileToggle = document.getElementById('mobileSidebarToggle');
  const sidebar = document.getElementById('appSidebar');
  mobileToggle.addEventListener('click', () => {
    sidebar.classList.toggle('mobile-open');
  });

  // Modals Close
  document.getElementById('closeImageModal').addEventListener('click', () => {
    document.getElementById('imageModal').style.display = 'none';
  });

  document.getElementById('imageModal').addEventListener('click', (e) => {
    if (e.target.id === 'imageModal') {
      document.getElementById('imageModal').style.display = 'none';
    }
  });

  // About Modal
  document.getElementById('aboutBtn').addEventListener('click', () => {
    document.getElementById('aboutModal').style.display = 'flex';
  });

  document.getElementById('closeAboutModal').addEventListener('click', () => {
    document.getElementById('aboutModal').style.display = 'none';
  });

  document.getElementById('aboutModal').addEventListener('click', (e) => {
    if (e.target.id === 'aboutModal') {
      document.getElementById('aboutModal').style.display = 'none';
    }
  });

  // Collapse / Expand All
  let isCollapsed = false;
  document.getElementById('collapseAllBtn').addEventListener('click', () => {
    isCollapsed = !isCollapsed;
    const descriptions = document.querySelectorAll('.spot-desc, .spot-guide-box, .spot-actions, .spot-photo-thumb');
    descriptions.forEach(d => {
      d.style.display = isCollapsed ? 'none' : '';
    });
    document.getElementById('collapseAllBtn').innerText = isCollapsed
      ? I18N[state.lang].expand_all
      : I18N[state.lang].collapse_all;
  });
}

// --- Update UI Text according to Language ---
function updateLanguageUI() {
  const t = I18N[state.lang];

  // Update data-i18n elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t[key]) el.innerHTML = t[key];
  });

  // Update Search Input Placeholder
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.placeholder = t.search_placeholder;
  }

  // Update Course Tabs Text
  const tabs = document.querySelectorAll('.course-tabs .tab-btn');
  tabs.forEach(tab => {
    const cid = tab.dataset.course;
    if (cid === 'all') {
      const span = tab.querySelector('span');
      if (span) span.innerText = t.tab_all;
    } else {
      const key = `tab_${cid}`;
      const span = tab.querySelectorAll('span')[1];
      if (span && t[key]) span.innerText = t[key];
    }
  });

  // Update Map Legend Items
  document.querySelectorAll('.legend-item').forEach(item => {
    const cid = item.dataset.course;
    const txt = item.querySelector('.legend-txt');
    const key = `legend_${cid}`;
    if (txt && t[key]) txt.innerText = t[key];
  });

  // Update Language Button Active State
  document.querySelectorAll('.lang-btn').forEach(btn => {
    if (btn.dataset.lang === state.lang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Document Title & Lang attribute
  document.documentElement.lang = state.lang;
  document.title = state.lang === 'ko'
    ? '오스트리아 가이드 외부 견학 아틀라스 | AUSTRIA GUIDE Exkursions-Atlas'
    : 'AUSTRIA GUIDE Exkursions-Atlas | WIFI Steiermark Fremdenführer';
}
