let currentLang = 'zh';
let currentView = 'grid'; // grid, list, map

const i18n = {
    en: {
        "logo": "Elite Estates",
        "nav-home": "Home",
        "nav-rent": "Rent",
        "nav-buy": "Buy",
        "nav-contact": "Contact Us",
        "hero-title": "Find Your Dream Home",
        "hero-desc": "Premium properties for rent and sale in prime locations.",
        "search-placeholder": "Search by location, property type...",
        "filter-all": "All Types",
        "filter-rent": "For Rent",
        "filter-sale": "For Sale",
        "btn-search": "Search",
        "section-featured": "Featured Properties",
        "lang-toggle": "粵語",
        "grid": "Grid",
        "list": "List",
        "map": "Map",
        "no-properties": "No properties found matching your criteria.",
        "badge-rent": "For Rent",
        "badge-sale": "For Sale",
        "beds": "Beds",
        "baths": "Baths",
        "sqft": "sqft",
        "stats-properties": "Properties Listed",
        "stats-clients": "Happy Clients",
        "stats-awards": "Awards Won",
        "stats-agents": "Expert Agents",
        "load-more": "Load More Items",
        "watch-video": "Watch Video",
        "gallery": "Property Gallery",
        "any-price": "Any Price",
        "view-as": "View As:",
        "grid": "Grid",
        "map": "Map",
        "sort-by": "Sort By:",
        "sort-def": "Default",
        "sort-low": "Price: Low to High",
        "sort-high": "Price: High to Low",
        "sort-new": "Newest First",
        "sort-sqft-high": "Size: High to Low",
        "sort-sqft-low": "Size: Low to High",
        "sort-old": "Oldest First",
        "sort-views": "Most Viewed",
        "sort-rating": "Highest Rated",
        "sort-comments": "Most Commented",
        "items-per-page": "Show per page:",
        "all": "All"
    },
    zh: {
        "logo": "28精選樓盤",
        "nav-home": "主頁面",
        "nav-rent": "搵屋租",
        "nav-buy": "買樓盤",
        "nav-contact": "搵我哋",
        "hero-title": "全香港最齊樓盤",
        "hero-desc": "最新成交、正嘢筍盤、第一次買樓首選。",
        "search-placeholder": "打屋苑名、邊區或者關鍵字",
        "filter-all": "全部種類",
        "filter-rent": "租屋",
        "filter-sale": "買樓",
        "btn-search": "即刻搵",
        "section-featured": "最新推介正筍盤",
        "lang-toggle": "English",
        "grid": "網格",
        "list": "列表",
        "map": "地圖",
        "no-properties": "搵唔到符合你要求嘅樓盤喎。",
        "badge-rent": "租",
        "badge-sale": "售",
        "beds": "房",
        "baths": "廁",
        "sqft": "呎",
        "stats-properties": "有幾多樓盤",
        "stats-clients": "滿意客仔",
        "stats-awards": "攞過嘅獎",
        "stats-agents": "專業代理",
        "upload-photo": "上載張相",
        "saving": "儲存緊...",
        "uploading": "上傳緊...",
        "watch-video": "睇片",
        "award-badge": "攞過獎嘅代理",
        "tab-all": "全部",
        "tab-rent": "租屋",
        "tab-buy": "買樓",
        "tab-comm": "商業",
        "region-all": "全部地區",
        "region-hk": "香港",
        "region-china": "中國內地",
        "prop-apt": "住宅單位",
        "prop-house": "屋苑",
        "prop-villa": "別墅",
        "prop-pent": "特色戶",
        "any-price": "任何價錢",
        "under-1k": "$1萬以下/月",
        "1k-5k": "$1萬 - $5萬/月",
        "5k-plus": "$5萬以上 / 買樓",
        "view-as": "顯示方式:",
        "grid": "格子",
        "map": "地圖",
        "sort-by": "排序:",
        "sort-def": "預設",
        "sort-low": "價錢: 由低至高",
        "sort-high": "價錢: 由高至低",
        "sort-new": "最新刊登",
        "load-more": "載入更多筍盤",
        "features": "特色",
        "gallery": "物業相簿",
        "watch-video": "觀看影片",
        "items-per-page": "每頁顯示:",
        "all": "全部",
        "sort-old": "最舊刊登",
        "sort-views": "最多人睇",
        "sort-rating": "最高評分",
        "sort-comments": "最多評論",
        "video-modal-title": "物業導賞",
        "back-to-top": "回到頂部",
        "services-title": "服務流程",
        "step-1-title": "搜尋物業",
        "step-2-title": "預約睇樓",
        "step-3-title": "即時成交",
        "blog-title": "市場趨勢與建議",
        "read-more": "閱讀更多",
        "subscribe": "立即訂閱",
        "mortgage-calc": "按揭計算機"
    }
};

// Removed redundant uploadImage function (now in utils.js)

let defaultProperties = [
    {
        id: 1,
        title: { en: "Modern Penthouse", zh: "現代頂層特色戶" },
        location: { en: "Mong Kok", zh: "旺角" },
        price: "HK$ 45,000/mo",
        type: "rent",
        beds: 3,
        baths: 2,
        sqft: 2100,
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
        features: "高級裝修,開揚景觀",
        area: "HK",
        lat: 22.3193,
        lng: 114.1694
    },
    {
        id: 2,
        title: { en: "Luxury Villa", zh: "淺水灣獨立屋" },
        location: { en: "Repulse Bay", zh: "淺水灣" },
        price: "HK$ 85,000,000",
        type: "sale",
        beds: 5,
        baths: 6,
        sqft: 6500,
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80",
        features: "海景,寧靜舒適",
        area: "HK",
        lat: 22.2368,
        lng: 114.1970
    },
    {
        id: 3,
        title: { en: "Skyline Apartment", zh: "高層海景單位" },
        location: { en: "Tsim Sha Tsui", zh: "尖沙咀" },
        price: "HK$ 32,000/mo",
        type: "rent",
        beds: 2,
        baths: 1,
        sqft: 950,
        image: "https://images.unsplash.com/photo-1502672260266-1c1e52504431?auto=format&fit=crop&w=800&q=80",
        features: "海景,鄰近地鐵",
        area: "HK",
        lat: 22.2988,
        lng: 114.1722
    },
    {
        id: 4,
        title: { en: "Oceanfront Estate", zh: "西貢海景別墅" },
        location: { en: "Sai Kung", zh: "西貢" },
        price: "HK$ 120,000,000",
        type: "sale",
        beds: 6,
        baths: 7,
        sqft: 8200,
        image: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=80",
        features: "海景,開揚景觀",
        area: "HK",
        lat: 22.3813,
        lng: 114.2775
    },
    {
        id: 5,
        title: { en: "Minimalist Loft", zh: "工廈靚裝特色戶" },
        location: { en: "Kwun Tong", zh: "觀塘" },
        price: "HK$ 28,000/mo",
        type: "rent",
        beds: 1,
        baths: 1,
        sqft: 1100,
        image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=800&q=80",
        features: "寧靜舒適,開揚景觀",
        area: "China",
        lat: 22.3129,
        lng: 114.2251
    },
    {
        id: 6,
        title: { en: "Suburban Family Home", zh: "沙田第一城" },
        location: { en: "Sha Tin", zh: "沙田" },
        price: "HK$ 6,500,000",
        type: "sale",
        beds: 2,
        baths: 1,
        sqft: 327,
        image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80",
        features: "鄰近地鐵,實用率高",
        area: "HK",
        lat: 22.3860,
        lng: 114.1950,
        views: 1250,
        rating: 4.5,
        comments_count: 12
    }
];

// Add default stats to other default properties
defaultProperties = defaultProperties.map((p, idx) => ({
    ...p,
    views: p.views || (100 + idx * 50),
    rating: p.rating || (4.0 + (idx % 10) * 0.1),
    comments_count: p.comments_count || (idx * 3)
}));

// Map View Logic
let map = null;
let markers = [];

function initMap(propertiesToMap) {
    const mapContainer = document.getElementById('mapView');
    if (!mapContainer || mapContainer.style.display === 'none') return;

    if (!map) {
        map = L.map('mapView').setView([22.3193, 114.1694], 12);
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 20
        }).addTo(map);
    }

    // Clear existing markers
    markers.forEach(m => map.removeLayer(m));
    markers = [];

    propertiesToMap.forEach(p => {
        if (p.lat && p.lng) {
            const title = typeof p.title === 'object' ? p.title[currentLang] : p.title;
            const marker = L.marker([p.lat, p.lng]).addTo(map);
            marker.bindPopup(`
                <div style="width: 200px; color: #fff;">
                    <img src="${p.image}" style="width: 100%; height: 100px; object-fit: cover; border-radius: 5px;">
                    <h4 style="margin: 5px 0;">${title}</h4>
                    <p style="margin: 0; color: var(--accent-color); font-weight: bold;">${p.price}</p>
                    <button class="btn-primary" style="padding: 5px 10px; font-size: 11px; margin-top: 5px; width: 100%;" onclick="openInquiryModal(${p.id})">${currentLang === 'zh' ? '立即詢問' : 'Inquire Now'}</button>
                </div>
            `, { className: 'glass-popup' });
            markers.push(marker);
        }
    });

    if (propertiesToMap.length > 0) {
        const group = new L.featureGroup(markers);
        map.fitBounds(group.getBounds().pad(0.1));
    }

    setTimeout(() => { map.invalidateSize(); }, 300);
}

// Inquiry Form Logic
function openInquiryModal(propId) {
    const property = properties.find(p => p.id == propId);
    if (!property) return;

    const title = typeof property.title === 'object' ? property.title[currentLang] : property.title;
    const modal = document.getElementById('propertyModal');
    const modalBody = document.getElementById('modalBody');

    modalBody.innerHTML = `
        <div class="inquiry-form-container glass" style="padding: 30px; animation: fadeIn 0.4s ease;">
            <h2 style="margin-bottom: 20px; text-align: center;">${currentLang === 'zh' ? '諮詢樓盤' : 'Inquire Property'}</h2>
            <div style="display: flex; gap: 15px; margin-bottom: 25px; align-items: center; background: rgba(255,255,255,0.05); padding: 10px; border-radius: 12px;">
                <img src="${property.image}" style="width: 80px; height: 60px; object-fit: cover; border-radius: 8px;">
                <div>
                    <h4 style="margin: 0;">${title}</h4>
                    <p style="margin: 0; color: var(--accent-color);">${property.price}</p>
                </div>
            </div>
            <form id="inquiryForm">
                <input type="hidden" name="property_id" value="${propId}">
                <div class="form-group">
                    <label>${currentLang === 'zh' ? '姓名' : 'Full Name'}</label>
                    <input type="text" name="name" required placeholder="${currentLang === 'zh' ? '您的稱呼' : 'Ex: John Doe'}">
                </div>
                <div class="form-group">
                    <label>${currentLang === 'zh' ? '電郵' : 'Email'}</label>
                    <input type="email" name="email" required placeholder="example@mail.com">
                </div>
                <div class="form-group">
                    <label>${currentLang === 'zh' ? '訊息' : 'Message'}</label>
                    <textarea name="message" required rows="4" placeholder="${currentLang === 'zh' ? '我想索取更多資料及預約睇樓...' : 'I would like to request more details...'}"></textarea>
                </div>
                <button type="submit" class="btn-primary" style="width: 100%; height: 50px;">${currentLang === 'zh' ? '發送訊息' : 'Send Inquiry'}</button>
            </form>
            <div id="inquiryStatus" style="margin-top: 15px; text-align: center; font-weight: 500;"></div>
        </div>
    `;

    const form = document.getElementById('inquiryForm');
    form.onsubmit = async (e) => {
        e.preventDefault();
        const submitBtn = e.target.querySelector('button');
        submitBtn.disabled = true;
        submitBtn.innerText = currentLang === 'zh' ? '發送中...' : 'Sending...';

        const data = {
            property_id: propId,
            name: form.name.value,
            email: form.email.value,
            message: form.message.value
        };

        try {
            const res = await fetch('/api/inquiries', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (res.ok) {
                document.getElementById('inquiryStatus').innerHTML = `<span style="color: #4ade80;">✔ ${currentLang === 'zh' ? '感謝您的詢問！' : 'Inquiry Sent Successfully!'}</span>`;
                setTimeout(() => { modal.classList.remove('show'); }, 2500);
            } else {
                throw new Error();
            }
        } catch (err) {
            document.getElementById('inquiryStatus').innerHTML = '<span style="color: #f87171;">✘ 發送失敗，請稍後再試。</span>';
            submitBtn.disabled = false;
            submitBtn.innerText = currentLang === 'zh' ? '重發訊息' : 'Retry';
        }
    };

    modal.classList.add('show');
}

function openPropertyDetails(propId) {
    const property = properties.find(p => p.id == propId);
    if (!property) return;

    const title = typeof property.title === 'object' ? property.title[currentLang] : property.title;
    const loc = typeof property.location === 'object' ? property.location[currentLang] : property.location;
    const modal = document.getElementById('propertyModal');
    const modalBody = document.getElementById('modalBody');
    const dict = i18n[currentLang];

    modalBody.innerHTML = `
        <div class="property-detail-view" style="animation: fadeIn 0.4s ease;">
            <div class="detail-gallery" style="position: relative; height: 350px; overflow: hidden; border-radius: 15px; margin-bottom: 25px;">
                <img src="${property.image}" style="width: 100%; height: 100%; object-fit: cover;">
                <div style="position: absolute; bottom: 20px; left: 20px; display: flex; gap: 10px;">
                    ${property.video ? `<button class="media-btn" onclick="openVideoModal('${property.video}', '${title}')" style="background: var(--accent-color); padding: 10px 20px; height: auto; border-radius: 30px;"><i class="fas fa-play"></i> Watch Video</button>` : ''}
                </div>
            </div>
            
            <div class="detail-info" style="display: grid; grid-template-columns: 1fr 320px; gap: 30px;">
                <div class="main-info">
                    <h1 style="font-size: 2rem; margin-bottom: 10px;">${title}</h1>
                    <p style="color: #94a3b8; font-size: 1.1rem; margin-bottom: 20px;"><i class="fas fa-map-marker-alt"></i> ${loc}</p>
                    
                    <div class="detail-features-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 30px; background: rgba(255,255,255,0.03); padding: 20px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05);">
                        <div class="detail-feat" style="display: flex; flex-direction: column; align-items: center; gap: 5px;">
                            <i class="fas fa-bed" style="font-size: 1.5rem; color: var(--accent-color);"></i>
                            <span><strong>${property.beds}</strong> ${dict["beds"]}</span>
                        </div>
                        <div class="detail-feat" style="display: flex; flex-direction: column; align-items: center; gap: 5px;">
                            <i class="fas fa-bath" style="font-size: 1.5rem; color: var(--accent-color);"></i>
                            <span><strong>${property.baths}</strong> ${dict["baths"]}</span>
                        </div>
                        <div class="detail-feat" style="display: flex; flex-direction: column; align-items: center; gap: 5px;">
                            <i class="fas fa-expand-arrows-alt" style="font-size: 1.5rem; color: var(--accent-color);"></i>
                            <span><strong>${property.sqft}</strong> ${dict["sqft"]}</span>
                        </div>
                    </div>

                    <h3 style="margin-bottom: 15px;">🔍 ${currentLang === 'zh' ? '物業精確位置' : 'Exact Location'}</h3>
                    <div id="propertyMapDetail" style="height: 350px; border-radius: 15px; border: 1px solid rgba(255,255,255,0.1); margin-bottom: 10px; z-index: 1;"></div>
                    <a href="https://www.google.com/maps/search/?api=1&query=${property.lat},${property.lng}" target="_blank" style="color: var(--accent-hover); font-size: 0.9rem; text-decoration: none; display: flex; align-items: center; gap: 5px;">
                        <i class="fas fa-external-link-alt"></i> ${currentLang === 'zh' ? '在 Google 地圖中開啟' : 'Open in Google Maps'}
                    </a>
                </div>

                <div class="side-info">
                    <div class="price-stick glass-dark" style="padding: 30px; border-radius: 20px; position: sticky; top: 20px; border: 1px solid rgba(255,255,255,0.1);">
                        <h2 style="color: var(--accent-hover); font-size: 2rem; margin-bottom: 5px;">${property.price}</h2>
                        <p style="font-size: 1rem; color: #94a3b8; margin-bottom: 25px; text-transform: uppercase; letter-spacing: 1px;">${property.type === 'rent' ? dict["badge-rent"] : dict["badge-sale"]}</p>
                        
                        <button class="btn-primary" style="width: 100%; height: 55px; font-size: 1.2rem; margin-bottom: 15px; border-radius: 12px; display: flex; align-items: center; justify-content: center; gap: 10px;" onclick="openInquiryModal(${propId})">
                            <i class="fas fa-envelope"></i> ${currentLang === 'zh' ? '立即預約睇樓' : 'Book a Tour'}
                        </button>
                        
                        <a href="tel:+85223456789" class="btn-outline" style="width: 100%; height: 50px; display: flex; align-items: center; justify-content: center; border-radius: 12px; text-decoration: none; gap: 10px;">
                            <i class="fas fa-phone-alt"></i> ${currentLang === 'zh' ? '致電代理' : 'Call Agent'}
                        </a>
                        
                        <div style="margin-top: 25px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.05); color: #94a3b8; font-size: 0.85rem; line-height: 1.6;">
                            <p><i class="fas fa-check-circle" style="color: #4ade80; margin-right: 8px;"></i> Verified by EliteEstates</p>
                            <p><i class="fas fa-clock" style="color: #60a5fa; margin-right: 8px;"></i> Listed 2 days ago</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    modal.classList.add('show');

    // Initialize property-specific map with Leaflet (Google Map style)
    if (property.lat && property.lng) {
        setTimeout(() => {
            const propMap = L.map('propertyMapDetail').setView([property.lat, property.lng], 16);
            L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
                attribution: '&copy; CARTO'
            }).addTo(propMap);

            // Custom marker
            const customIcon = L.divIcon({
                className: 'custom-div-icon',
                html: "<div style='background-color:var(--accent-color); width: 30px; height: 30px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); border: 2px solid white; display: flex; align-items: center; justify-content: center;'><i class='fas fa-home' style='transform: rotate(45deg); color: white; font-size: 14px;'></i></div>",
                iconSize: [30, 42],
                iconAnchor: [15, 42]
            });

            L.marker([property.lat, property.lng], { icon: customIcon }).addTo(propMap)
                .bindPopup(`<b style="color:#000">${title}</b>`).openPopup();

            // Fix for modal display
            propMap.invalidateSize();
        }, 500);
    }
}

let properties = [...defaultProperties];
let filteredResults = [];

async function fetchPropertiesFromDB() {
    try {
        // Fetch all properties for instant visibility
        const response = await fetch(API_BASE + '/api/properties?limit=5000');
        if (response.ok) {
            const dbProps = await response.json();

            const validDbProps = dbProps.map(p => {
                let validP = { ...p };
                if (typeof validP.title === 'string') validP.title = { en: validP.title, zh: validP.title };
                if (typeof validP.location === 'string') validP.location = { en: validP.location, zh: validP.location };
                return validP;
            });

            properties = [...validDbProps, ...defaultProperties];
            console.log("Initial batch loaded:", properties.length);

            // Background fetch the rest if needed, or just let the 1000 suffice for the demo
            // Since 10k is huge, we'll stick to a large enough batch for performance

            // Update the property count data-target
            const propCounter = document.getElementById('propertyCount');
            if (propCounter) {
                propCounter.setAttribute('data-target', properties.length);
                animateCounter(propCounter);
            }

            handleSearch();
        } else {
            console.error("Server returned error:", response.status);
            properties = [...defaultProperties];
            handleSearch();
        }
    } finally {
        // Always try to render something to remove the spinner
        handleSearch();
        
        // Update the property count display
        const propCounter = document.getElementById('propertyCount');
        if (propCounter) {
            propCounter.setAttribute('data-target', properties.length);
            animateCounter(propCounter);
        }
    }
}


function animateCounter(counter) {
    const speed = 200;
    const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const inc = target / speed;
        const step = inc < 1 ? 1 : inc;

        if (count < target) {
            counter.innerText = Math.ceil(count + step);
            setTimeout(updateCount, 20);
        } else {
            counter.innerText = target;
        }
    };
    updateCount();
}

function checkProfile() {
    const savedUser = localStorage.getItem('property_user');
    const profileContainer = document.querySelector('.user-profile');
    if (savedUser && profileContainer) {
        const user = JSON.parse(savedUser);
        const avatar = profileContainer.querySelector('.avatar');
        if (avatar) avatar.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=7232f2&color=fff`;

        const dropdown = profileContainer.querySelector('.dropdown-menu');
        if (dropdown) {
            dropdown.innerHTML = `
                <a href="login.html"><i class="fas fa-tachometer-alt"></i> 控制台</a>
                <a href="#" onclick="handleLogout(event)"><i class="fas fa-sign-out-alt"></i> 登出</a>
            `;
        }
    }
}

function handleLogout(e) {
    e.preventDefault();
    localStorage.removeItem('property_user');
    window.location.reload();
}

function updateLanguage() {
    const dict = i18n[currentLang];

    // Update simple text elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) {
            el.textContent = dict[key];
        }
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (dict[key]) {
            el.placeholder = dict[key];
        }
    });

    // Re-render properties so they use the correct language
    handleSearch();
    checkProfile();
}

function toggleFavorite(e, id) {
    e.stopPropagation(); // Don't open modal if we have one
    let favorites = JSON.parse(localStorage.getItem('property_favorites') || '[]');
    const index = favorites.indexOf(id);

    if (index > -1) {
        favorites.splice(index, 1);
        showToast("已從收藏夾移除");
    } else {
        favorites.push(id);
        showToast("已加入收藏夾");
    }

    localStorage.setItem('property_favorites', JSON.stringify(favorites));
    handleSearch(); // Re-render to update heart icon
}

function showToast(msg) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

let currentPage = 1;
const itemsPerPage = 48;

function renderProperties(props, append = false) {
    const grid = document.getElementById('propertyGrid');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const loadMoreContainer = document.getElementById('loadMoreContainer');
    
    if (!append) {
        grid.innerHTML = '';
        currentPage = 1;
    }
    const dict = i18n[currentLang];
    
    if (props.length === 0) {
        grid.innerHTML = `<div class="no-results-container">
            <i class="fas fa-search-minus" style="font-size: 4rem; color: #334155; margin-bottom: 20px; display: block;"></i>
            <h3 style="font-size: 1.5rem; margin-bottom: 10px;">${dict["no-properties"]}</h3>
            <p style="color: #94a3b8;">Try adjusting your filters or search terms.</p>
        </div>`;
        if (loadMoreContainer) loadMoreContainer.style.display = 'none';
        return;
    }
    
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedProps = props.slice(start, end);

    if (loadMoreContainer) {
        loadMoreContainer.style.display = props.length > end ? 'block' : 'none';
    }

    if (!append) {
        // Add result count info
        const resultInfo = document.createElement('div');
        resultInfo.className = 'result-info';
        resultInfo.id = 'resultInfoCount';
        resultInfo.style.gridColumn = "1/-1";
        resultInfo.innerHTML = `<span><i class="fas fa-info-circle"></i> ${currentLang === 'zh' ? `顯示 <strong>${Math.min(end, props.length)}</strong> / <strong>${props.length}</strong> 個符合嘅樓盤` : `Showing <strong>${Math.min(end, props.length)}</strong> / <strong>${props.length}</strong> matching properties`}</span>`;
        grid.appendChild(resultInfo);
    } else {
        const info = document.getElementById('resultInfoCount');
        if (info) {
            info.innerHTML = `<span><i class="fas fa-info-circle"></i> ${currentLang === 'zh' ? `顯示 <strong>${Math.min(end, props.length)}</strong> / <strong>${props.length}</strong> 個符合嘅樓盤` : `Showing <strong>${Math.min(end, props.length)}</strong> / <strong>${props.length}</strong> matching properties`}</span>`;
        }
    }

    paginatedProps.forEach(prop => {
        const card = document.createElement('div');
        const favorites = JSON.parse(localStorage.getItem('property_favorites') || '[]');
        const isFavorited = favorites.includes(prop.id);

        if (currentView === 'list') {
            card.className = `property-list-item ${prop.is_premium ? 'premium' : ''}`;
            card.innerHTML = `
                <div class="title-area" onclick="openPropertyDetails(${prop.id})">
                    <h3 style="margin:0; font-size: 1.1rem; color: #fff;">${prop.title[currentLang]}</h3>
                    <p style="margin:0; font-size: 0.85rem; color: #94a3b8;"><i class="fas fa-map-marker-alt" style="margin-right: 5px;"></i> ${prop.location[currentLang]}</p>
                </div>
                <div class="price-area" style="font-weight: 700; color: var(--accent-hover);">${prop.price}</div>
                <div class="info-item" style="color: #cbd5e1; font-size: 0.9rem;"><i class="fas fa-bed"></i> ${prop.beds}</div>
                <div class="info-item" style="color: #cbd5e1; font-size: 0.9rem;"><i class="fas fa-bath"></i> ${prop.baths}</div>
                <div class="info-item" style="color: #cbd5e1; font-size: 0.9rem;"><i class="fas fa-expand-arrows-alt"></i> ${prop.sqft} ${dict["sqft"]}</div>
                <div class="actions-area" style="display: flex; gap: 8px;">
                     <button class="btn-outline" style="padding: 5px 12px; font-size: 0.75rem; border-radius: 6px;" onclick="openPropertyDetails(${prop.id})">${currentLang === 'zh' ? '詳情' : 'Details'}</button>
                     <button class="favorite-btn ${isFavorited ? 'active' : ''}" style="position:static; padding: 5px; background:transparent;" onclick="toggleFavorite(event, ${prop.id})">
                        <i class="fa${isFavorited ? 's' : 'r'} fa-heart"></i>
                    </button>
                </div>
            `;
        } else {
            card.className = `property-card ${prop.is_premium ? 'premium' : ''}`;
            card.innerHTML = `
                <div class="property-image-container" onclick="openPropertyDetails(${prop.id})" style="cursor: zoom-in;">
                    <img src="${prop.image}" alt="${prop.title[currentLang]}" class="property-image">
                    
                    <span class="property-badge">${prop.type === 'rent' ? dict["badge-rent"] : dict["badge-sale"]}</span>
                    <button class="favorite-btn ${isFavorited ? 'active' : ''}" onclick="toggleFavorite(event, ${prop.id})">
                        <i class="fa${isFavorited ? 's' : 'r'} fa-heart"></i>
                    </button>
                    <div class="property-media-actions">
                        ${prop.video ? `<button class="media-btn" onclick="openVideoModal('${prop.video}', '${prop.title[currentLang]}')"><i class="fas fa-play"></i></button>` : ''}
                        ${(prop.images && prop.images.length > 0) ? `<button class="media-btn" onclick="openGalleryModal(${prop.id})"><i class="fas fa-images"></i> <span style="font-size: 0.6rem;">+${prop.images.length}</span></button>` : ''}
                    </div>
                </div>
                <div class="property-details" onclick="openPropertyDetails(${prop.id})" style="cursor: pointer;">
                    <h3 class="property-title">${prop.title[currentLang]}</h3>
                    <p style="color: #94a3b8; margin-bottom: 10px; font-size: 0.9rem;"><i class="fas fa-map-marker-alt" style="margin-right: 5px;"></i> ${prop.location[currentLang]}</p>
                    <div style="display: flex; gap: 15px; margin-bottom: 10px; font-size: 0.8rem; color: #94a3b8;">
                        <span><i class="fas fa-star" style="color: #ffd700;"></i> ${prop.rating || 0}</span>
                        <span><i class="fas fa-eye"></i> ${prop.views || 0}</span>
                        <span><i class="fas fa-comment"></i> ${prop.comments_count || 0}</span>
                    </div>
                    <div class="property-price">${prop.price}</div>
                    <div class="property-features">
                        <div class="feature"><i class="fas fa-bed"></i> ${prop.beds} ${dict["beds"]}</div>
                        <div class="feature"><i class="fas fa-bath"></i> ${prop.baths} ${dict["baths"]}</div>
                        <div class="feature"><i class="fas fa-expand-arrows-alt"></i> ${prop.sqft} ${dict["sqft"]}</div>
                    </div>
                    ${prop.features ? `
                    <div class="property-tags" style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 15px;">
                        ${prop.features.split(',').map(f => `<span style="background: rgba(114, 50, 242, 0.1); color: var(--accent-color); font-size: 0.75rem; padding: 4px 10px; border-radius: 20px; border: 1px solid rgba(114, 50, 242, 0.2);">${f}</span>`).join('')}
                    </div>
                    ` : ''}
                    <div style="margin-top: 20px; display: flex; gap: 10px;" onclick="event.stopPropagation()">
                        <button class="btn-primary" style="flex: 1; height: 43px; font-size: 0.9rem;" onclick="openPropertyDetails(${prop.id})">
                            <i class="fas fa-eye"></i> ${currentLang === 'zh' ? '查看詳情' : 'View Details'}
                        </button>
                        <button class="btn-outline" style="width: 43px; height: 43px; display: flex; align-items: center; justify-content: center; border-radius: 8px;" onclick="openInquiryModal(${prop.id})">
                            <i class="fas fa-envelope"></i>
                        </button>
                    </div>
                </div>
            `;
        }
        grid.appendChild(card);
    });
}

// Bilingual Area Mapping for search enhancement
const areaMappings = {
    // Hong Kong Island
    "tst": ["tsim sha tsui", "尖沙咀"],
    "cwb": ["causeway bay", "銅鑼灣"],
    "wc": ["wan chai", "灣仔"],
    "central": ["中環"],
    "admiral": ["admiralty", "金鐘"],
    "sw": ["sheung wan", "上環"],
    "syp": ["sai ying pun", "西營盤"],
    "kt": ["kennedy town", "堅尼地城"],
    "np": ["north point", "北角"],
    "qb": ["quarry bay", "鰂魚涌"],
    "tk": ["tai koo", "太古"],
    "skw": ["shau kei wan", "筲箕灣"],
    "cw": ["chai wan", "柴灣"],
    "abd": ["aberdeen", "香港仔"],
    "pfl": ["pok fu lam", "薄扶林"],
    "ml": ["mid levels", "mid-levels", "半山"],
    "stl": ["stanley", "赤柱"],
    "rb": ["repulse bay", "淺水灣"],
    
    // Kowloon
    "mk": ["mong kok", "旺角"],
    "hh": ["hung hom", "紅磡"],
    "tkw": ["to kwa wan", "土瓜灣"],
    "hmt": ["ho man tin", "何文田"],
    "kc": ["kowloon city", "九龍城"],
    "klt": ["kowloon tong", "九龍塘"],
    "dh": ["diamond hill", "鑽石山"],
    "wts": ["wong tai sin", "黃大仙"],
    "kt": ["kwun tong", "觀塘"],
    "ssp": ["sham shui po", "深水埗"],
    "lck": ["lai chi kok", "荔枝角"],
    "mf": ["mei foo", "美孚"],
    "kln": ["kowloon", "九龍"],
    
    // New Territories & Islands
    "st": ["sha tin", "沙田"],
    "shatin": ["sha tin", "沙田"],
    "mos": ["ma on shan", "馬鞍山"],
    "tp": ["tai po", "大埔"],
    "fl": ["fanling", "粉嶺"],
    "ss": ["sheung shui", "上水"],
    "tm": ["tuen mun", "屯門"],
    "yl": ["yuen long", "元朗"],
    "tsw": ["tin shui wai", "天水圍"],
    "tw": ["tsuen wan", "荃灣"],
    "ty": ["tsing yi", "青衣"],
    "tko": ["tseung kwan o", "將軍澳"],
    "tk": ["tai kok tsui", "大角咀"],
    "tc": ["tung chung", "東涌"],
    "db": ["discovery bay", "愉景灣"],
    "lantau": ["大嶼山"],
    "cc": ["cheung chau", "長洲"],
    "lamma": ["南丫島"],
    "sk": ["sai kung", "西貢"]
};

function handleSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.trim().toLowerCase();
    const typeFilter = document.getElementById('typeFilter')?.value || 'all';
    const areaFilter = document.getElementById('areaFilter')?.value || 'all';
    const priceFilter = document.getElementById('priceFilter')?.value || 'all';
    const bedsFilter = parseInt(document.getElementById('bedsFilter')?.value) || 0;
    const bathsFilter = parseInt(document.getElementById('bathsFilter')?.value) || 0;
    const sqftFilter = parseInt(document.getElementById('sqftFilter')?.value) || 0;

    const searchTerms = [searchTerm];
    if (areaMappings[searchTerm]) {
        searchTerms.push(...areaMappings[searchTerm]);
    }

    const filtered = properties.filter(prop => {
        // Safe access to nested properties
        const titleEn = (prop.title?.en || '').toLowerCase();
        const titleZh = (prop.title?.zh || '').toLowerCase();
        const locEn = (prop.location?.en || '').toLowerCase();
        const locZh = (prop.location?.zh || '').toLowerCase();
        const features = (prop.features || '').toLowerCase();

        // Normalize for better matching (e.g. Sha Tin matches shatin)
        const normalize = text => text.replace(/\s+/g, '');
        const normTitleEn = normalize(titleEn);
        const normLocEn = normalize(locEn);
        const normSearch = normalize(searchTerm);

        const matchesSearch = searchTerm === "" || searchTerms.some(term => {
            const t = term.toLowerCase();
            const nt = normalize(t);
            return titleEn.includes(t) || titleZh.includes(t) || 
                   locEn.includes(t) || locZh.includes(t) || 
                   features.includes(t) ||
                   normTitleEn.includes(nt) || normLocEn.includes(nt);
        });

        const matchesType = typeFilter === 'all' || prop.type === typeFilter;
        const matchesArea = areaFilter === 'all' || prop.area === areaFilter;
        
        // Price filtering logic (extract number from string like "HK$ 15,000/mo")
        let matchesPrice = true;
        if (priceFilter !== 'all') {
            const numPrice = parseInt(prop.price.replace(/[^0-9]/g, ''));
            if (priceFilter === '0-1000') matchesPrice = numPrice <= 10000; // Adjusted for realistic HK prices (e.g. 10k)
            else if (priceFilter === '1000-5000') matchesPrice = numPrice > 10000 && numPrice <= 50000;
            else if (priceFilter === '5000-plus') matchesPrice = numPrice > 50000 || prop.type === 'sale';
        }

        const matchesBeds = bedsFilter === 0 || prop.beds >= bedsFilter;
        const matchesBaths = bathsFilter === 0 || prop.baths >= bathsFilter;
        const matchesSqft = sqftFilter === 0 || prop.sqft >= sqftFilter;

        return matchesSearch && matchesType && matchesArea && matchesPrice && matchesBeds && matchesBaths && matchesSqft;
    });

    // Apply sorting
    sortProperties(filtered);
    filteredResults = filtered; // Store globally for "Load More"
    renderProperties(filteredResults);
    initMap(filteredResults);

    // Scroll to results for better UX
    const featuredSection = document.getElementById('featured');
    if (featuredSection) {
        featuredSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function sortProperties(props) {
    const sortVal = document.getElementById('sortSelect')?.value || 'default';
    if (sortVal === 'default') return;

    props.sort((a, b) => {
        const priceA = parseInt(a.price.replace(/[^0-9]/g, ''));
        const priceB = parseInt(b.price.replace(/[^0-9]/g, ''));

        if (sortVal === 'price-low') return priceA - priceB;
        if (sortVal === 'price-high') return priceB - priceA;
        if (sortVal === 'sqft-high') return b.sqft - a.sqft;
        if (sortVal === 'sqft-low') return a.sqft - b.sqft;
        if (sortVal === 'newest') return b.id - a.id;
        if (sortVal === 'oldest') return a.id - b.id;
        if (sortVal === 'views-high') return (b.views || 0) - (a.views || 0);
        if (sortVal === 'rating-high') return (b.rating || 0) - (a.rating || 0);
        if (sortVal === 'comments-high') return (b.comments_count || 0) - (a.comments_count || 0);
        return 0;
    });
}

function openGalleryModal(propId) {
    const property = properties.find(p => p.id == propId);
    if (!property) return;
    
    // For now, gallery modal also opens the full details view which has the large image
    // In a mature app, this could be a dedicated slider
    openPropertyDetails(propId);
}

document.addEventListener('DOMContentLoaded', () => {
    // Initial language setup
    updateLanguage();
    checkProfile();
    startCounters(); // Start other counters immediately
    
    // Set a loading state
    const grid = document.getElementById('propertyGrid');
    if (grid) grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 50px;"><i class="fas fa-spinner fa-spin" style="font-size: 3rem; color: var(--accent-color);"></i><p style="margin-top: 20px; font-weight: 600;">正在智能配對優質樓盤...</p></div>';

    // Fetch and render
    fetchPropertiesFromDB(); 

    // Event listeners
    document.getElementById('loadMoreBtn')?.addEventListener('click', () => {
        currentPage++;
        renderProperties(filteredResults, true);
    });

    document.getElementById('searchBtn')?.addEventListener('click', handleSearch);
    document.getElementById('typeFilter')?.addEventListener('change', handleSearch);
    document.getElementById('areaFilter')?.addEventListener('change', handleSearch);
    document.getElementById('searchInput').addEventListener('keyup', (e) => {
        if (e.key === 'Enter') handleSearch();
    });
    document.getElementById('sortSelect')?.addEventListener('change', handleSearch);
    document.getElementById('advancedFilterBtn')?.addEventListener('click', () => {
        const filters = document.getElementById('expandedFilters');
        if (filters) filters.style.display = filters.style.display === 'none' ? 'block' : 'none';
    });

    document.getElementById('mapViewBtn').addEventListener('click', () => {
        currentView = 'map';
        document.getElementById('propertyGrid').style.display = 'none';
        document.getElementById('mapView').style.display = 'block';
        document.getElementById('mapViewBtn').classList.add('active');
        document.getElementById('gridViewBtn').classList.remove('active');
        document.getElementById('listViewBtn').classList.remove('active');
        initMap(properties);
    });

    document.getElementById('gridViewBtn').addEventListener('click', () => {
        currentView = 'grid';
        const grid = document.getElementById('propertyGrid');
        grid.style.display = 'grid';
        grid.classList.remove('list-view');
        document.getElementById('mapView').style.display = 'none';
        document.getElementById('gridViewBtn').classList.add('active');
        document.getElementById('listViewBtn').classList.remove('active');
        document.getElementById('mapViewBtn').classList.remove('active');
        renderProperties(filteredResults);
    });

    document.getElementById('listViewBtn')?.addEventListener('click', () => {
        currentView = 'list';
        const grid = document.getElementById('propertyGrid');
        grid.style.display = 'flex';
        grid.classList.add('list-view');
        document.getElementById('mapView').style.display = 'none';
        document.getElementById('listViewBtn').classList.add('active');
        document.getElementById('gridViewBtn').classList.remove('active');
        document.getElementById('mapViewBtn').classList.remove('active');
        renderProperties(filteredResults);
    });

    document.getElementById('langToggle').addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'zh' : 'en';
        updateLanguage();
    });
});

// Animate stats counters helper
function startCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        if (counter.id !== 'propertyCount') { // propertyCount is handled after fetch
            animateCounter(counter);
        }
    });
}

function openVideoModal(url, title = 'Property Video') {
    const modal = document.getElementById('propertyModal');
    const modalBody = document.getElementById('modalBody');

    let videoHtml = `<h3 style="margin-bottom: 20px; color: #fff;">${title}</h3>`;
    videoHtml += `<div class="video-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 12px; background: #000;">`;

    if (url.includes('youtube.com') || url.includes('youtu.be')) {
        const videoId = url.includes('v=') ? url.split('v=')[1].split('&')[0] : url.split('/').pop();
        videoHtml += `<iframe src="https://www.youtube.com/embed/${videoId}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" frameborder="0" allowfullscreen></iframe>`;
    } else {
        videoHtml += `<video style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" controls autoplay><source src="${url}" type="video/mp4">Your browser does not support the video tag.</video>`;
    }

    videoHtml += `</div>`;

    modalBody.innerHTML = videoHtml;
    modal.classList.add('show');
}

// Modal closing logic
document.querySelector('.close-modal')?.addEventListener('click', () => {
    const modal = document.getElementById('propertyModal');
    modal.classList.remove('show');
    document.getElementById('modalBody').innerHTML = ''; // Stop video
});

window.onclick = (e) => {
    const modal = document.getElementById('propertyModal');
    if (e.target == modal) {
        modal.classList.remove('show');
        document.getElementById('modalBody').innerHTML = '';
    }
};

// Mortgage Calculator Logic
function calculateMortgage() {
    const price = parseFloat(document.getElementById('calcPrice').value);
    const downPaymentPercent = parseFloat(document.getElementById('calcDown').value);
    const rate = parseFloat(document.getElementById('calcRate').value) / 100 / 12;
    const term = parseFloat(document.getElementById('calcTerm').value) * 12;

    if (price && rate && term) {
        const principal = price * (1 - downPaymentPercent / 100);
        const x = Math.pow(1 + rate, term);
        const monthly = (principal * x * rate) / (x - 1);

        const resultDiv = document.getElementById('calcResult');
        const priceSpan = document.getElementById('monthlyPrice');

        if (resultDiv && priceSpan) {
            resultDiv.style.display = 'block';
            priceSpan.innerText = `HK$ ${Math.round(monthly).toLocaleString()}`;
        }
    }
}

document.getElementById('calculateBtn')?.addEventListener('click', calculateMortgage);

