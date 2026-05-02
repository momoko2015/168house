let currentLang = 'zh';
let currentView = 'grid'; // grid, list, map

const i18n = {
    en: {
        "logo": "88loft",
        "nav-home": "Home",
        "nav-rent": "Rent",
        "nav-buy": "Buy",
        "nav-contact": "User Login",
        "nav-about": "About Us",
        "footer-links": "Quick Links",
        "footer-services": "Services",
        "footer-listings": "Listings",
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
        "all": "All",
        "services-desc": "Finding your dream home has never been easier with our streamlined 3-step process.",
        "step-1-desc": "Use our advanced search filters to find the perfect property that matches all your criteria.",
        "step-2-desc": "Book a tour online or request a virtual 3D tour for any property you're interested in.",
        "step-3-desc": "Complete the paperwork digitally and securely. Move into your new dream home.",
        "mortgage-desc": "Estimate your monthly payments, including principal and interest, taxes, insurance, and HOA fees.",
        "loan-amount": "Property Price ($)",
        "interest-rate": "Interest Rate (%)",
        "loan-term": "Loan Term (Years)",
        "calculate": "Calculate Payment",
        "monthly-payment": "Estimated Monthly Payment",
        "down-payment-label": "Down Payment (%)",
        "newsletter-title": "Subscribe to Our Newsletter",
        "newsletter-desc": "Get the latest properties and market trends delivered directly to your inbox.",
        "subscribe": "Subscribe",
        "ticker-hot": "Hot Topic:",
        "ticker-rate": "Current Rate:",
        "ticker-new": "Featured:",
        "ticker-trend": "Market Info:",
        "badge-commercial": "Commercial",
        "services-subtitle": "Simple Process",
        "stat-total-label": "Total Listings",
        "stat-rent-label": "Median Rent",
        "stat-sale-label": "Median Price",
        "stat-hot-label": "Hot Area"
    },
    ja: {
        "logo": "88loft",
        "nav-home": "ホーム",
        "nav-rent": "賃貸を探す",
        "nav-buy": "購入する",
        "nav-contact": "ユーザーログイン",
        "nav-about": "私たちについて",
        "footer-links": "クイックリンク",
        "footer-services": "サービス内容",
        "footer-listings": "物件一覧",
        "hero-title": "理想の住まいを見つける",
        "hero-desc": "日本の主要都市における厳選された賃貸・売買物件。",
        "search-placeholder": "地域、物件種別、キーワードで検索",
        "filter-all": "すべてのタイプ",
        "filter-rent": "賃貸",
        "filter-sale": "売買",
        "badge-commercial": "商業用",
        "btn-search": "今すぐ検索",
        "section-featured": "おすすめ物件",
        "lang-toggle": "English",
        "grid": "グリッド",
        "list": "リスト",
        "map": "マップ",
        "no-properties": "条件に一致する物件が見つかりませんでした。",
        "badge-rent": "賃貸",
        "badge-sale": "売買",
        "beds": "部屋",
        "baths": "バス",
        "sqft": "平米",
        "stats-properties": "掲載物件数",
        "stats-clients": "満足した顧客",
        "stats-awards": "受賞歴",
        "stats-agents": "専門エージェント",
        "load-more": "もっと見る",
        "watch-video": "動画を見る",
        "gallery": "フォトギャラリー",
        "any-price": "価格指定なし",
        "view-as": "表示形式:",
        "sort-by": "並べ替え:",
        "sort-def": "デフォルト",
        "sort-low": "価格: 安い順",
        "sort-high": "価格: 高い順",
        "sort-new": "新着順",
        "sort-sqft-high": "面積: 広い順",
        "sort-sqft-low": "面積: 狭い順",
        "sort-old": "古い順",
        "sort-views": "閲覧数順",
        "sort-rating": "評価順",
        "sort-comments": "コメント数順",
        "items-per-page": "表示件数:",
        "all": "すべて",
        "services-title": "サービスの流れ",
        "step-1-title": "物件検索",
        "step-2-title": "内見予約",
        "step-3-title": "成約・入居",
        "services-desc": "理想の住まい探しから入居まで、シンプルな3ステップでサポートします。",
        "step-1-desc": "高度な検索フィルターを使用して、すべての条件に一致する完璧な物件を見つけます。",
        "step-2-desc": "オンラインで内見を予約するか、バーチャル3Dツアーをリクエストしてください。",
        "step-3-desc": "書類手続きをデジタルで安全に完了し、すぐに新しい住まいへ入居できます。",
        "mortgage-calc": "ローンシミュレーション",
        "mortgage-desc": "元金、利息、税金、保険料を含む月々の支払額を試算します。",
        "loan-amount": "物価格納 (円)",
        "interest-rate": "金利 (%)",
        "loan-term": "借入期間 (年)",
        "calculate": "計算する",
        "monthly-payment": "予想月額支払額",
        "down-payment-label": "頭金 (%)",
        "newsletter-title": "メールマガジン登録",
        "newsletter-desc": "最新の物件情報や市場トレンドを定期的にお届けします。",
        "subscribe": "購読する",
        "services-subtitle": "簡単なプロセス",
        "stat-total-label": "総物件数",
        "stat-rent-label": "家賃中央値",
        "stat-sale-label": "販売価格中央値",
        "stat-hot-label": "人気エリア"
    },
    zh: {
        "logo": "88loft精選樓盤",
        "nav-home": "主頁面",
        "nav-rent": "搵屋租",
        "nav-buy": "買樓盤",
        "nav-contact": "用戶登入",
        "nav-about": "關於我哋",
        "footer-links": "快速連結",
        "footer-services": "服務範疇",
        "footer-listings": "旗下樓盤",
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
        "load-more": "載入更多筍盤",
        "services-title": "服務流程",
        "mortgage-calc": "按揭計算機",
        "newsletter-title": "訂閱我們的通訊",
        "subscribe": "立即訂閱",
        "ticker-hot": "最新熱話:",
        "ticker-rate": "目前利率:",
        "ticker-new": "新盤推介:",
        "ticker-trend": "市場走勢:",
        "badge-commercial": "商",
        "services-desc": "助您輕鬆搵屋，只需三步。",
        "step-1-title": "搜尋樓盤",
        "step-1-desc": "利用篩選器搵心水筍盤。",
        "step-2-title": "預約睇樓",
        "step-2-desc": "聯絡業主或代理睇實位。",
        "step-3-title": "成交入伙",
        "step-3-desc": "完成手續，搬入新屋。",
        "services-subtitle": "簡單流程",
        "stat-total-label": "全港盤源",
        "stat-rent-label": "租盤中位數",
        "stat-sale-label": "售盤中位數",
        "stat-hot-label": "熱門地區"
    },
    cn: {
        "logo": "88Loft精选楼盘",
        "nav-home": "主页面",
        "nav-rent": "找房租",
        "nav-buy": "买楼盘",
        "nav-contact": "用户登录",
        "nav-about": "关于我们",
        "footer-links": "快速链接",
        "footer-services": "服务范畴",
        "footer-listings": "旗下楼盘",
        "hero-title": "全香港最全楼盘",
        "hero-desc": "最新成交、精选好盘、首次置业首选。",
        "search-placeholder": "输入屋苑名、地段 or 关键字",
        "filter-all": "全部种类",
        "filter-rent": "租房",
        "filter-sale": "买房",
        "btn-search": "立即查找",
        "section-featured": "最新推介精选好盘",
        "lang-toggle": "English",
        "grid": "网格",
        "list": "列表",
        "map": "地图",
        "no-properties": "找不到符合您要求的楼盘。",
        "badge-rent": "租",
        "badge-sale": "售",
        "beds": "房",
        "baths": "卫",
        "sqft": "呎",
        "stats-properties": "楼盘数量",
        "stats-clients": "满意客户",
        "stats-awards": "所获奖项",
        "stats-agents": "专业代理",
        "load-more": "载入更多好盘",
        "services-title": "服务流程",
        "mortgage-calc": "按揭计算器",
        "newsletter-title": "订阅我们的通讯",
        "subscribe": "立即订阅",
        "services-desc": "助您轻松找房，只需三步。",
        "step-1-title": "搜索楼盘",
        "step-1-desc": "利用筛选器找心仪好盘。",
        "step-2-title": "预约看房",
        "step-2-desc": "联系业主或代理看实位。",
        "step-3-title": "成交入伙",
        "step-3-desc": "完成手续，搬入新家。",
        "services-subtitle": "简单流程",
        "stat-total-label": "全境房源",
        "stat-rent-label": "租金中位数",
        "stat-sale-label": "售价中位数",
        "stat-hot-label": "热门地区"
    }
};;

// Removed redundant uploadImage function (now in utils.js)

let defaultProperties = [];

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

    if (!window.clusterGroup) {
        window.clusterGroup = L.markerClusterGroup({
            showCoverageOnHover: false,
            chunkedLoading: true
        });
        map.addLayer(window.clusterGroup);
    }

    // Clear existing markers
    window.clusterGroup.clearLayers();
    const newMarkers = [];

    propertiesToMap.forEach(p => {
        const lat = parseFloat(p.lat);
        const lng = parseFloat(p.lng);
        if (!isNaN(lat) && !isNaN(lng)) {
            const getTitle = (p) => {
                if (typeof p.title === 'string') return p.title;
                return p.title[currentLang] || p.title['en'] || p.title['zh'] || 'Property';
            };
            const title = getTitle(p);
            const marker = L.marker([lat, lng]);
            marker.bindPopup(`
                <div style="width: 200px; color: #000;">
                    <img src="${p.image}" style="width: 100%; height: 100px; object-fit: cover; border-radius: 5px;">
                    <h4 style="margin: 5px 0;">${title}</h4>
                    <p style="margin: 0; color: #7232f2; font-weight: bold;">${p.price}</p>
                    <button class="btn-primary" style="padding: 5px 10px; font-size: 11px; margin-top: 5px; width: 100%;" onclick="openInquiryModal(${p.id})">${currentLang === 'zh' ? '立即詢問' : 'Inquire Now'}</button>
                </div>
            `, { className: 'glass-popup' });
            newMarkers.push(marker);
        }
    });

    window.clusterGroup.addLayers(newMarkers);

    if (newMarkers.length > 0) {
        const group = new L.featureGroup(newMarkers);
        map.fitBounds(group.getBounds().pad(0.1));
    }

    setTimeout(() => { map.invalidateSize(); }, 300);
}

// Inquiry Form Logic
function openInquiryModal(propId) {
    const property = properties.find(p => p.id == propId);
    if (!property) return;

    const getTitle = (p) => {
        if (typeof p.title === 'string') return p.title;
        return p.title[currentLang] || p.title['en'] || p.title['zh'] || 'Property';
    };
    const title = getTitle(property);
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

    const getTitle = (p) => {
        if (typeof p.title === 'string') return p.title;
        return p.title[currentLang] || p.title['en'] || p.title['zh'] || 'Property';
    };
    const getLocation = (p) => {
        if (typeof p.location === 'string') return p.location;
        return p.location[currentLang] || p.location['en'] || p.location['zh'] || 'Location';
    };
    const title = getTitle(property);
    const loc = getLocation(property);
    const modal = document.getElementById('propertyModal');
    const modalBody = document.getElementById('modalBody');
    const dict = i18n[currentLang];

    let listedDateText = currentLang === 'zh' ? '最新刊登' : 'Recently added';
    if (property.created_at) {
        const diffTime = Math.abs(new Date() - new Date(property.created_at));
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (currentLang === 'zh') {
            listedDateText = diffDays <= 1 ? '今天刊登' : diffDays + ' 天前刊登';
        } else {
            listedDateText = diffDays <= 1 ? 'Listed today' : 'Listed ' + diffDays + ' days ago';
        }
    }

    let allImages = [];
    if (property.image) allImages.push(property.image);
    if (property.images && Array.isArray(property.images)) {
        property.images.forEach(img => {
            if (img && img !== property.image) allImages.push(img);
        });
    }

    let galleryHTML = `
        <div class="detail-gallery" style="position: relative; border-radius: 15px; margin-bottom: 25px;">
            <div style="height: 350px; overflow: hidden; border-radius: 15px; position: relative;">
                <img id="mainDisplayImg" src="${allImages[0] || 'placeholder.jpg'}" style="width: 100%; height: 100%; object-fit: cover; transition: 0.3s;">
                <div style="position: absolute; bottom: 20px; left: 20px; display: flex; gap: 10px;">
                    ${property.video ? `<button class="media-btn" onclick="openVideoModal('${property.video}', '${title}')" style="background: var(--accent-color); padding: 10px 20px; height: auto; border-radius: 30px;"><i class="fas fa-play"></i> Watch Video</button>` : ''}
                </div>
            </div>`;
            
    if (allImages.length > 1) {
        galleryHTML += `<div style="display: flex; gap: 10px; margin-top: 15px; overflow-x: auto; padding-bottom: 10px; scrollbar-width: thin;">`;
        allImages.forEach(img => {
            galleryHTML += `<img src="${img}" onclick="document.getElementById('mainDisplayImg').src=this.src" style="width: 80px; height: 60px; object-fit: cover; border-radius: 8px; cursor: pointer; border: 2px solid transparent;" onmouseover="this.style.borderColor='var(--accent-color)'" onmouseout="this.style.borderColor='transparent'">`;
        });
        galleryHTML += `</div>`;
    }
    galleryHTML += `</div>`;

    modalBody.innerHTML = `
        <div class="property-detail-view" style="animation: fadeIn 0.4s ease;">
            ${galleryHTML}
            
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

                    <!-- ZILLOW FEATURES SECTION -->
                    <div class="zillow-features" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 30px;">
                        <div class="z-card glass" style="padding: 15px; border-radius: 10px;">
                            <h4 style="font-size: 0.8rem; text-transform: uppercase; color: #94a3b8; margin-bottom: 10px;">Estimated Value</h4>
                            <div style="font-size: 1.5rem; font-weight: 700; color: #4ade80;">HK$ ${(parseCurrency(property.price) * 1.05).toLocaleString()}</div>
                            <span style="font-size: 0.75rem; color: #94a3b8;">Based on market trends in ${loc.split(',')[0]}</span>
                        </div>
                        <div class="z-card glass" style="padding: 15px; border-radius: 10px;">
                            <h4 style="font-size: 0.8rem; text-transform: uppercase; color: #94a3b8; margin-bottom: 10px;">Neighborhood Scores</h4>
                            <div style="display: flex; gap: 15px;">
                                <div style="text-align: center;">
                                    <div style="width: 45px; height: 45px; border: 3px solid var(--accent-color); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; margin-bottom: 4px;">${property.walk_score || 88}</div>
                                    <span style="font-size: 0.65rem;">Walk</span>
                                </div>
                                <div style="text-align: center;">
                                    <div style="width: 45px; height: 45px; border: 3px solid #60a5fa; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; margin-bottom: 4px;">${property.transit_score || 92}</div>
                                    <span style="font-size: 0.65rem;">Transit</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <h3 style="margin-bottom: 15px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 10px;">📉 Price History</h3>
                    <div class="price-history" style="font-size: 0.85rem; background: rgba(0,0,0,0.2); border-radius: 10px; overflow: hidden; margin-bottom: 30px;">
                        <table style="width: 100%; border-collapse: collapse;">
                            <thead style="background: rgba(255,255,255,0.05);">
                                <tr>
                                    <th style="padding: 10px; border-bottom:1px solid #333; text-align: left;">Date</th>
                                    <th style="padding: 10px; border-bottom:1px solid #333; text-align: left;">Event</th>
                                    <th style="padding: 10px; border-bottom:1px solid #333; text-align: left;">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td style="padding: 8px 10px;">2024-03-15</td><td style="padding: 8px 10px;">Price Changed</td><td style="padding: 8px 10px;">${property.price}</td></tr>
                                <tr><td style="padding: 8px 10px;">2023-11-20</td><td style="padding: 8px 10px;">Listed</td><td style="padding: 8px 10px;">HK$ ${(parseCurrency(property.price)*1.1).toLocaleString()}</td></tr>
                            </tbody>
                        </table>
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
                        
                        <!-- Z-ESTIMATE BADGE -->
                        <div style="background: rgba(74, 222, 128, 0.1); color: #4ade80; padding: 5px 10px; border-radius: 5px; font-size: 0.75rem; margin-bottom: 20px; display: inline-block;">
                            <i class="fas fa-chart-line"></i> EliteValue Estimate: HK$ ${(parseCurrency(property.price) * 1.02).toLocaleString()}
                        </div>

                        <p style="font-size: 1rem; color: #94a3b8; margin-bottom: 25px; text-transform: uppercase; letter-spacing: 1px;">${property.type === 'rent' ? dict["badge-rent"] : dict["badge-sale"]}</p>
                        
                        <div class="z-neighborhood" style="margin-bottom: 25px; border-top: 1px solid #333; padding-top: 15px;">
                            <h4 style="font-size: 0.8rem; color: #fff; margin-bottom: 10px;">Nearby Schools</h4>
                            <div style="font-size: 0.75rem; color: #94a3b8;">
                                <p><i class="fas fa-graduation-cap"></i> ${loc.split(',')[0]} International School (A+)</p>
                                <p><i class="fas fa-graduation-cap"></i> West Kowloon High (A)</p>
                            </div>
                        </div>

                        <button class="btn-primary" style="width: 100%; height: 55px; font-size: 1.2rem; margin-bottom: 15px; border-radius: 12px; display: flex; align-items: center; justify-content: center; gap: 10px;" onclick="openInquiryModal(${propId})">
                            <i class="fas fa-envelope"></i> ${currentLang === 'zh' ? '立即預約睇樓' : 'Book a Tour'}
                        </button>
                        
                        <a href="tel:+85223456789" class="btn-outline" style="width: 100%; height: 50px; display: flex; align-items: center; justify-content: center; border-radius: 12px; text-decoration: none; gap: 10px;">
                            <i class="fas fa-phone-alt"></i> ${currentLang === 'zh' ? '致電代理' : 'Call Agent'}
                        </a>
                        
                        <div style="margin-top: 25px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.05); color: #94a3b8; font-size: 0.85rem; line-height: 1.6;">
                            <p><i class="fas fa-check-circle" style="color: #4ade80; margin-right: 8px;"></i> Verified by EliteEstates</p>
                            <p><i class="fas fa-clock" style="color: #60a5fa; margin-right: 8px;"></i> ${listedDateText}</p>
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
        const response = await fetch(API_BASE + '/api/properties?limit=10000');
        if (response.ok) {
            const dbProps = await response.json();

            const validDbProps = dbProps.map(p => {
                let validP = { ...p };
                if (typeof validP.title === 'string') validP.title = { en: validP.title, zh: validP.title };
                if (typeof validP.location === 'string') validP.location = { en: validP.location, zh: validP.location };
                
                // Fix image paths
                if (validP.image && validP.image.startsWith('/uploads/')) {
                    validP.image = API_BASE + validP.image;
                }
                if (validP.images && Array.isArray(validP.images)) {
                    validP.images = validP.images.map(img => img.startsWith('/uploads/') ? API_BASE + img : img);
                }

                // Handle stats ensure they are numbers
                validP.views = parseInt(validP.views) || 0;
                validP.rating = parseFloat(validP.rating) || 0;
                validP.comments_count = parseInt(validP.comments_count) || 0;
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
    const loginBtn = document.querySelector('.nav-links .btn-primary[data-i18n="nav-contact"]');
    const themeToggle = document.getElementById('themeToggle');
    
    if (savedUser) {
        const user = JSON.parse(savedUser);
        const savedAvatar = localStorage.getItem('property_avatar');
        
        // Update all avatars in the header
        document.querySelectorAll('.user-profile .avatar').forEach(img => {
            img.src = savedAvatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=7232f2&color=fff`;
        });

        // Reposition profile before theme toggle as requested
        if (profileContainer && themeToggle && profileContainer.nextSibling !== themeToggle) {
            themeToggle.parentNode.insertBefore(profileContainer, themeToggle);
            profileContainer.style.marginRight = "10px";
        }

        // Hide login button if logged in
        if (loginBtn) loginBtn.style.display = 'none';

        if (profileContainer) {
            const dropdown = profileContainer.querySelector('.dropdown-menu');
            if (dropdown) {
                dropdown.innerHTML = `
                    <div style="padding: 10px 15px; border-bottom: 1px solid rgba(255,255,255,0.1); margin-bottom: 5px;">
                        <div style="font-weight: 700; color: #fff;">${user.name}</div>
                        <div style="font-size: 0.75rem; color: #94a3b8;">${user.email}</div>
                    </div>
                    <a href="/login.html"><i class="fas fa-tachometer-alt"></i> 控制台 (Dashboard)</a>
                    <a href="/wishlist.html"><i class="fas fa-heart"></i> 收藏夾</a>
                    <a href="#" onclick="handleLogout(event)" style="color: #ff4d4d;"><i class="fas fa-sign-out-alt"></i> 登出 (Logout)</a>
                `;
            }
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

    const langNames = { 'zh': '繁體中文', 'cn': '简体中文', 'en': 'English', 'ja': '日本語' };
    const langBtn = document.getElementById('langToggle');
    if (langBtn) langBtn.innerText = langNames[currentLang];

    // Update Lang Pills active state
    document.querySelectorAll('.lang-pill').forEach(pill => {
        pill.classList.toggle('active', pill.getAttribute('data-lang') === currentLang);
    });

    // Re-render properties so they use the correct language
    handleSearch();
    checkProfile();
}

function getTimeAgo(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    
    if (seconds < 60) return `${seconds} 秒前 刊登`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} 分鐘前 刊登`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} 小時前 刊登`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days} 天前 刊登`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months} 個月前 刊登`;
    const years = Math.floor(months / 12);
    return `${years} 年前 刊登`;
}

function toggleFavorite(e, id) {
    e.stopPropagation();
    const numId = Number(id);
    let favorites = JSON.parse(localStorage.getItem('property_favorites') || '[]').map(Number);
    const index = favorites.indexOf(numId);

    if (index > -1) {
        favorites.splice(index, 1);
        showToast("已從收藏夾移除");
    } else {
        favorites.push(numId);
        showToast("已加入收藏夾");
        const btn = e.currentTarget;
        btn.style.transform = 'scale(1.4)';
        setTimeout(() => { btn.style.transform = ''; }, 300);
    }

    localStorage.setItem('property_favorites', JSON.stringify(favorites));
    
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        const btnId = Number(btn.getAttribute('data-prop-id'));
        if (btnId) { // Safety check
            const isFav = favorites.includes(btnId);
            btn.classList.toggle('active', isFav);
            const icon = btn.querySelector('i');
            if (icon) {
                icon.className = isFav ? 'fas fa-heart' : 'far fa-heart';
            }
        }
    });
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
        resultInfo.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
                <span><i class="fas fa-info-circle"></i> ${currentLang === 'zh' ? `顯示 <strong>${Math.min(end, props.length)}</strong> / <strong>${props.length}</strong> 個符合嘅樓盤` : `Showing <strong>${Math.min(end, props.length)}</strong> / <strong>${props.length}</strong> matching properties`}</span>
                <button id="saveSearchBtn" class="btn-outline" style="padding: 6px 12px; font-size: 0.8rem; border-radius: 20px; display: flex; align-items: center; gap: 6px; cursor: pointer;" onclick="saveCurrentSearch()">
                    <i class="fas fa-bookmark"></i> ${currentLang === 'zh' ? '儲存搜尋' : 'Save Search'}
                </button>
            </div>
        `;
        grid.appendChild(resultInfo);
    } else {
        const info = document.getElementById('resultInfoCount');
        if (info) {
            info.innerHTML = `<span><i class="fas fa-info-circle"></i> ${currentLang === 'zh' ? `顯示 <strong>${Math.min(end, props.length)}</strong> / <strong>${props.length}</strong> 個符合嘅樓盤` : `Showing <strong>${Math.min(end, props.length)}</strong> / <strong>${props.length}</strong> matching properties`}</span>`;
        }
    }

    paginatedProps.forEach(prop => {
        const getTitle = (p) => {
            if (typeof p.title === 'string') return p.title;
            return p.title[currentLang] || p.title['en'] || p.title['zh'] || 'Property';
        };
        const getLocation = (p) => {
            if (typeof p.location === 'string') return p.location;
            return p.location[currentLang] || p.location['en'] || p.location['zh'] || 'Location';
        };
        const title = getTitle(prop);
        const loc = getLocation(prop);

        const card = document.createElement('div');
        const favorites = JSON.parse(localStorage.getItem('property_favorites') || '[]').map(Number);
        const isFavorited = favorites.includes(Number(prop.id));

        if (currentView === 'list') {
            card.className = `property-list-item ${prop.is_premium ? 'premium' : ''}`;
            card.innerHTML = `
                <div class="title-area" onclick="window.location.href='/property.html?id=${prop.id}'" style="cursor:pointer;">
                    <h3 style="margin:0; font-size: 1.1rem; color: #fff;">${title}</h3>
                    <p style="margin:0; font-size: 0.85rem; color: #94a3b8;"><i class="fas fa-map-marker-alt" style="margin-right: 5px;"></i> ${loc}</p>
                </div>
                <div class="price-area" style="font-weight: 700; color: var(--accent-hover);">${prop.price}</div>
                <div class="info-item" style="color: #cbd5e1; font-size: 0.9rem;"><i class="fas fa-bed"></i> ${prop.beds}</div>
                <div class="info-item" style="color: #cbd5e1; font-size: 0.9rem;"><i class="fas fa-bath"></i> ${prop.baths}</div>
                <div class="info-item" style="color: #cbd5e1; font-size: 0.9rem;"><i class="fas fa-expand-arrows-alt"></i> ${prop.sqft} ${dict["sqft"]}</div>
                <div class="actions-area" style="display: flex; gap: 8px;">
                     <a href="/property.html?id=${prop.id}" class="btn-outline" style="padding: 5px 12px; font-size: 0.75rem; border-radius: 6px; text-decoration:none;">${currentLang === 'zh' ? '詳情' : 'Details'}</a>
                     <button class="btn-outline" style="padding: 5px; background:transparent; color: #25D366; border-color: rgba(37, 211, 102, 0.3);" onclick="shareToWhatsApp(${prop.id})" title="Share to WhatsApp">
                        <i class="fab fa-whatsapp"></i>
                    </button>
                     <button class="favorite-btn ${isFavorited ? 'active' : ''}" data-prop-id="${prop.id}" style="position:static; padding: 5px; background:transparent;" onclick="toggleFavorite(event, ${prop.id})">
                        <i class="fa${isFavorited ? 's' : 'r'} fa-heart"></i>
                    </button>
                </div>
            `;
        } else {
            card.className = `property-card ${prop.is_premium ? 'premium' : ''}`;
            const beds = prop.beds || prop.bedrooms || '—';
            const baths = prop.baths || prop.bathrooms || '—';
            const sqft = prop.sqft || prop.area || '—';
            const publishTimeAgo = getTimeAgo(prop.publish_date || prop.date);
            
            let priceHTML = '<div style="font-size:1.4rem;font-weight:800;color:var(--accent-hover);margin-bottom:14px;">' + (prop.price || '—') + '</div>';
            if (prop.discount_price) {
                priceHTML = '<div style="margin-bottom:14px;">' +
                    '<span style="font-size:1.4rem;font-weight:800;color:#ff4d4d;margin-right:8px;">' + prop.discount_price + '</span>' +
                    '<span style="font-size:0.9rem;color:#94a3b8;text-decoration:line-through;">' + prop.price + '</span>' +
                    (prop.discount_until ? '<div style="font-size:0.75rem;color:#ff4d4d;margin-top:2px;font-weight:600;"><i class="fas fa-clock"></i> 優惠至: ' + prop.discount_until + '</div>' : '') +
                '</div>';
            }

            card.innerHTML = [
                '<div class="property-image-container" onclick="window.location.href=\'/property.html?id=' + prop.id + '\'" style="cursor:zoom-in;">',
                    '<img src="' + (prop.image || '') + '" alt="' + title + '" class="property-image" onerror="this.src=\'https://via.placeholder.com/400x250?text=88loft\'">',
                    '<span class="property-badge">' + (prop.type === 'rent' ? dict['badge-rent'] : (prop.type === 'commercial' ? dict['badge-commercial'] : dict['badge-sale'])) + '</span>',
                    '<button class="favorite-btn ' + (isFavorited ? 'active' : '') + '" data-prop-id="' + prop.id + '" onclick="toggleFavorite(event,' + prop.id + ')">',
                        '<i class="fa' + (isFavorited ? 's' : 'r') + ' fa-heart"></i>',
                    '</button>',
                    '<div class="property-media-actions">',
                        prop.video ? '<button class="media-btn" onclick="openVideoModal(\'' + prop.video + '\',\'' + title + '\')"><i class="fas fa-play"></i></button>' : '',
                        (prop.images && prop.images.length > 0) ? '<button class="media-btn" onclick="openGalleryModal(' + prop.id + ')"><i class="fas fa-images"></i> <span style="font-size:0.6rem">+' + prop.images.length + '</span></button>' : '',
                        '<button class="media-btn" style="color:#25D366;" onclick="shareToWhatsApp(' + prop.id + ')" title="WhatsApp Share"><i class="fab fa-whatsapp"></i></button>',
                    '</div>',
                '</div>',
                '<div class="property-details" onclick="window.location.href=\'/property.html?id=' + prop.id + '\'" style="padding:20px;flex-grow:1;display:flex;flex-direction:column;cursor:pointer;">',
                    '<h3 style="font-size:1.1rem;margin-bottom:8px;color:#fff;font-weight:700;">' + title + '</h3>',
                    '<p style="color:#94a3b8;margin-bottom:12px;font-size:0.85rem;"><i class="fas fa-map-marker-alt" style="margin-right:5px;color:var(--accent-color);"></i>' + loc + '</p>',
                    priceHTML,
                    '<div style="display:flex;gap:16px;color:#94a3b8;font-size:0.85rem;border-top:1px solid rgba(255,255,255,0.08);padding-top:14px;margin-top:auto;">',
                        '<span><i class="fas fa-bed" style="color:var(--accent-color);margin-right:4px;"></i>' + beds + ' ' + dict['beds'] + '</span>',
                        '<span><i class="fas fa-bath" style="color:var(--accent-color);margin-right:4px;"></i>' + baths + ' ' + dict['baths'] + '</span>',
                        '<span><i class="fas fa-expand-arrows-alt" style="color:var(--accent-color);margin-right:4px;"></i>' + sqft + ' ' + dict['sqft'] + '</span>',
                    '</div>',
                    '<div style="margin-top:8px;font-size:0.75rem;color:#64748b;display:flex;align-items:center;gap:5px;">',
                        '<i class="fas fa-history"></i> ' + publishTimeAgo,
                    '</div>',
                    '<div style="margin-top:14px;display:flex;gap:10px;" onclick="event.stopPropagation()">',
                        '<a href="/property.html?id=' + prop.id + '" class="btn-primary" style="flex:1;height:40px;font-size:0.85rem;display:flex;align-items:center;justify-content:center;text-decoration:none;border-radius:8px;">',
                            '<i class="fas fa-eye" style="margin-right:6px;"></i>' + (currentLang === 'zh' ? '查看詳情' : 'View Details'),
                        '</a>',
                        '<button class="btn-outline" style="width:40px;height:40px;display:flex;align-items:center;justify-content:center;border-radius:8px;" onclick="openInquiryModal(' + prop.id + ')">',
                            '<i class="fas fa-envelope"></i>',
                        '</button>',
                    '</div>',
                '</div>'
            ].join('');
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
    const searchTerm = searchInput ? searchInput.value.trim().toLowerCase() : '';

    const areaFilter = document.getElementById('areaFilter')?.value || 'all';
    const typeFilter = document.getElementById('typeFilter')?.value || 'all';
    const priceFilter = document.getElementById('priceFilter')?.value || 'all';
    
    // Check active search tab
    const activeTab = document.querySelector('.search-tab.active');
    const tabType = activeTab ? activeTab.getAttribute('data-type') : 'all';

    const searchTerms = [searchTerm];
    if (searchTerm && areaMappings && areaMappings[searchTerm]) {
        searchTerms.push(...areaMappings[searchTerm]);
    }

    const filtered = properties.filter(prop => {
        const titleEn = (prop.title?.en || '').toLowerCase();
        const titleZh = (prop.title?.zh || '').toLowerCase();
        const locEn = (prop.location?.en || prop.location || '').toString().toLowerCase();
        const locZh = (prop.location?.zh || prop.location || '').toString().toLowerCase();
        const features = (prop.features || '').toLowerCase();

        const districtMapping = {
            "中西區": ["中環", "上環", "西環", "半山", "堅尼地城", "西營盤", "金鐘", "central", "sheung wan", "sai wan", "mid-levels", "kennedy town"],
            "灣仔區": ["灣仔", "銅鑼灣", "跑馬地", "大坑", "渣甸山", "wan chai", "causeway bay", "happy valley", "tai hang"],
            "東區": ["北角", "鰂魚涌", "太古", "西灣河", "筲箕灣", "柴灣", "杏花邨", "north point", "quarry bay", "taikoo", "shau kei wan", "chai wan"],
            "南區": ["香港仔", "鴨脷洲", "黃竹坑", "深水灣", "淺水灣", "赤柱", "石澳", "repulse bay", "stanley", "aberdeen", "ap lei chau"],
            "油尖旺區": ["尖沙咀", "旺角", "大角咀", "油麻地", "佐敦", "太子", "tst", "tsim sha tsui", "mong kok", "yau ma tei", "jordan", "prince edward"],
            "深水埗區": ["深水埗", "長沙灣", "荔枝角", "美孚", "石硤尾", "sham shui po", "cheung sha wan", "lai chi kok", "mei foo", "shek kip mei"],
            "九龍城區": ["九龍城", "何文田", "土瓜灣", "紅磡", "啟德", "kowloon city", "ho man tin", "to kwa wan", "hung hom", "kai tak"],
            "黃大仙區": ["黃大仙", "新蒲崗", "慈雲山", "樂富", "彩虹", "wong tai sin", "san po kong"],
            "觀塘區": ["觀塘", "藍田", "油塘", "九龍灣", "牛頭角", "kwun tong", "lam tin", "yau tong", "kowloon bay"],
            "葵青區": ["葵涌", "青衣", "kwai chung", "tsing yi"],
            "荃灣區": ["荃灣", "馬灣", "深井", "tsuen wan", "ma wan", "sham tseng"],
            "屯門區": ["屯門", "黃金海岸", "tuen mun", "gold coast"],
            "元朗區": ["元朗", "天水圍", "錦田", "yuen long", "tin shui wai", "kam tin"],
            "北區": ["上水", "粉嶺", "聯和墟", "sheung shui", "fanling"],
            "大埔區": ["大埔", "太和", "tai po", "tai wo"],
            "沙田區": ["沙田", "馬鞍山", "火炭", "大圍", "sha tin", "ma on shan", "tai wai"],
            "西貢區": ["西貢", "將軍澳", "清水灣", "坑口", "調景嶺", "sai kung", "tseung kwan o", "clear water bay"],
            "離島區": ["東涌", "愉景灣", "馬灣", "梅窩", "長洲", "tung chung", "discovery bay", "lantau"]
        };

        const normalize = text => text.replace(/\s+/g, '').toLowerCase();
        const normTitleEn = normalize((prop.title?.en || prop.title || '').toString());
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

        // Tab selection filtering (All, Rent, Sale, Commercial)
        let matchesTab = true;
        if (tabType === 'rent') matchesTab = prop.type === 'rent';
        else if (tabType === 'sale') matchesTab = prop.type === 'sale';
        else if (tabType === 'commercial') matchesTab = prop.type === 'commercial' || features.includes('工商');

        // Country filtering based on current page
        const path = window.location.pathname.toLowerCase();
        let matchesCountry = true;
        
        // Determine target area based on page
        let targetArea = "HK";
        if (path.includes('jp.html')) targetArea = "JP";
        else if (path.includes('usa.html')) targetArea = "USA";
        else if (path.includes('cn.html')) targetArea = "China";

        // If property has an explicit area, it must match
        if (prop.area) {
            matchesCountry = (prop.area === targetArea);
        } else {
            // Fallback to keyword matching for legacy or unassigned data
            if (targetArea === 'JP') {
                const jpKw = ['tokyo', 'osaka', 'kyoto', 'japan', '東京', '大阪', '京都', '区', '千代田', '中央', '港区', '新宿', '文京', '台東', '墨田', '江東', '品川', '目黒', '大田', '世田谷', '渋谷', '中野', '杉並', '豊島', '北区', '荒川', '板橋', '練馬', '足立', '葛飾', '江戸川'];
                matchesCountry = jpKw.some(kw => locZh.includes(kw) || locEn.includes(kw.toLowerCase()));
            } else if (targetArea === 'USA') {
                const usaKw = ['usa', 'united states', 'new york', 'california', 'texas', 'florida', 'washington', 'chicago', 'los angeles', 'san francisco'];
                const stateAbbr = ['al', 'ak', 'az', 'ar', 'ca', 'co', 'ct', 'de', 'fl', 'ga', 'hi', 'id', 'il', 'in', 'ia', 'ks', 'ky', 'la', 'me', 'md', 'ma', 'mi', 'mn', 'ms', 'mo', 'mt', 'ne', 'nv', 'nh', 'nj', 'nm', 'ny', 'nc', 'nd', 'oh', 'ok', 'or', 'pa', 'ri', 'sc', 'sd', 'tn', 'tx', 'ut', 'vt', 'va', 'wa', 'wv', 'wi', 'wy'];
                
                const matchesKw = usaKw.some(kw => locZh.includes(kw) || locEn.includes(kw));
                // For abbreviations, only match if it's a separate word or at the end
                const matchesAbbr = stateAbbr.some(abbr => {
                    const regex = new RegExp(`\\b${abbr}\\b`, 'i');
                    return regex.test(locEn);
                });
                matchesCountry = matchesKw || matchesAbbr;
            } else if (targetArea === 'China') {
                const cnKw = ['china', '北京', '上海', '天津', '重庆', '广东', '深圳', '广州', '浙江', '杭州', '江苏', '南京', '四川', '成都', '福建', '厦门', '山东', '湖北', '武汉', '陕西', '西安', 'beijing', 'shanghai', 'shenzhen'];
                matchesCountry = cnKw.some(kw => locZh.includes(kw) || locEn.includes(kw.toLowerCase()));
            } else {
                // Default to HK
                const hkKw = ['hong kong', 'hk', '香港', '九龍', '新界', 'kowloon', 'new territories'];
                matchesCountry = hkKw.some(kw => locZh.includes(kw) || locEn.includes(kw.toLowerCase())) || (!locZh && !locEn);
            }
        }

        // Area filtering
        let matchesArea = true;
        if (areaFilter !== 'all') {
            const districtKeywords = districtMapping[areaFilter] || [areaFilter];
            matchesArea = locZh.includes(areaFilter) || 
                          features.includes(areaFilter) || 
                          (prop.area === areaFilter) ||
                          districtKeywords.some(kw => locZh.includes(kw.toLowerCase()) || locEn.includes(kw.toLowerCase()));
        }

        // Type filtering
        let matchesType = true;
        if (typeFilter !== 'all') {
            if (typeFilter === 'apartment') matchesType = prop.type !== 'commercial' && !features.includes('工商');
            else if (typeFilter === 'commercial') matchesType = prop.type === 'commercial' || features.includes('工商');
            else if (typeFilter === 'carpark') matchesType = titleZh.includes('車位') || features.includes('車位');
        }

        // Price filtering
        let matchesPrice = true;
        const priceMinVal = parseInt(document.getElementById('priceMin')?.value || 0) * 10000;
        const priceMaxVal = parseInt(document.getElementById('priceMax')?.value || 100000) * 10000;
        
        const numPrice = parseInt((prop.price || '').toString().replace(/[^0-9]/g, '')) || 0;
        matchesPrice = numPrice >= priceMinVal && numPrice <= priceMaxVal;

        return matchesSearch && matchesTab && matchesCountry && matchesArea && matchesType && matchesPrice;
    });

    // Apply sorting
    sortProperties(filtered);
    filteredResults = filtered; // Store globally for "Load More"
    renderProperties(filteredResults);
    initMap(filteredResults);
    
    // Update histogram to reflect the current distribution of filtered results
    const pMin = document.getElementById('priceMin');
    const pMax = document.getElementById('priceMax');
    if (pMin && pMax && typeof renderPriceHistogram === 'function') {
        renderPriceHistogram(parseInt(pMin.value), parseInt(pMax.value));
    }

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
        const strA = (a.price || '').toString();
        const strB = (b.price || '').toString();
        const priceA = parseInt(strA.replace(/[^0-9]/g, '')) || 0;
        const priceB = parseInt(strB.replace(/[^0-9]/g, '')) || 0;

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

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Language Detection Logic
    const savedLang = localStorage.getItem('selectedLanguage');
    if (savedLang) {
        currentLang = savedLang;
    }

    // Region Detection from Filename
    const path = window.location.pathname.toLowerCase();
    if (path.includes('jp.html')) {
        currentLang = 'ja';
        const areaSel = document.getElementById('areaFilter');
        if (areaSel) areaSel.value = 'JP';
    } else if (path.includes('usa.html')) {
        currentLang = 'en';
        const areaSel = document.getElementById('areaFilter');
        if (areaSel) areaSel.value = 'USA';
    } else if (path.includes('cn.html')) {
        currentLang = 'cn';
        const areaSel = document.getElementById('areaFilter');
        if (areaSel) areaSel.value = 'China';
    }

    updateLanguage();
    if (!savedLang && !path.includes('.html')) { // Only auto-detect on homepage if no preference
        // Simple IP detection (Don't let failures block the app)
        try {
            const response = await fetch('https://ipapi.co/json/');
            if (response.ok) {
                const data = await response.json();
                const country = data.country_code;
                if (country === 'HK' || country === 'TW') currentLang = 'zh';
                else if (country === 'JP') currentLang = 'ja';
                else if (country === 'CN') currentLang = 'cn';
                else currentLang = 'en';
                updateLanguage();
            }
        } catch (e) { console.warn("Language detection failed."); }
    }

    // 2. Deep Linking (Open modal from URL param)
    const urlParams = new URLSearchParams(window.location.search);
    const sharedId = urlParams.get('id');

    checkProfile();
    startCounters();

    // Set a loading state
    renderSkeletons();

    // Fetch and render
    await fetchPropertiesFromDB();

    if (sharedId) {
        setTimeout(() => {
            openPropertyDetails(sharedId);
        }, 300);
    }


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

    document.getElementById('mapViewBtn')?.addEventListener('click', () => {
        currentView = 'map';
        document.getElementById('propertyGrid').style.display = 'none';
        document.getElementById('mapView').style.display = 'block';
        document.getElementById('mapViewBtn')?.classList.add('active');
        document.getElementById('gridViewBtn')?.classList.remove('active');
        document.getElementById('listViewBtn')?.classList.remove('active');
        initMap(properties);
    });

    document.getElementById('gridViewBtn')?.addEventListener('click', () => {
        currentView = 'grid';
        const grid = document.getElementById('propertyGrid');
        if(grid) {
            grid.style.display = 'grid';
            grid.classList.remove('list-view');
        }
        const mv = document.getElementById('mapView');
        if(mv) mv.style.display = 'none';
        document.getElementById('gridViewBtn')?.classList.add('active');
        document.getElementById('listViewBtn')?.classList.remove('active');
        document.getElementById('mapViewBtn')?.classList.remove('active');
        renderProperties(filteredResults);
    });

    document.getElementById('listViewBtn')?.addEventListener('click', () => {
        currentView = 'list';
        const grid = document.getElementById('propertyGrid');
        if(grid) {
            grid.style.display = 'flex';
            grid.classList.add('list-view');
        }
        const mv = document.getElementById('mapView');
        if(mv) mv.style.display = 'none';
        document.getElementById('listViewBtn')?.classList.add('active');
        document.getElementById('gridViewBtn')?.classList.remove('active');
        document.getElementById('mapViewBtn')?.classList.remove('active');
        renderProperties(filteredResults);
    });

    document.getElementById('langToggle')?.addEventListener('click', () => {
        const langs = ['zh', 'cn', 'en', 'ja'];
        let idx = langs.indexOf(currentLang);
        currentLang = langs[(idx + 1) % langs.length];
        updateLanguage();
    });

    // 3. Continuous Enhancements Init
    initAutocomplete();
    initScrollTop();
    initPWAInstall();
});

// --- PWA Install Logic ---
function initPWAInstall() {
    let deferredPrompt;
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        // Optionally show a custom install banner after 10 seconds
        setTimeout(() => {
            showInstallBanner(deferredPrompt);
        }, 10000);
    });
}

function showInstallBanner(deferredPrompt) {
    if (document.getElementById('installBanner')) return;
    
    const banner = document.createElement('div');
    banner.id = 'installBanner';
    banner.className = 'glass install-banner';
    banner.innerHTML = `
        <div class="banner-content">
            <img src="/logo.png" alt="88loft">
            <div>
                <h4>Install 88Loft App</h4>
                <p>Add to home screen for faster access & offline search.</p>
            </div>
            <button id="installBtn" class="btn-primary">Install</button>
            <button onclick="this.parentElement.parentElement.remove()" class="close-btn">&times;</button>
        </div>
    `;
    document.body.appendChild(banner);

    document.getElementById('installBtn').addEventListener('click', async () => {
        banner.remove();
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User response to install prompt: ${outcome}`);
        deferredPrompt = null;
    });
}

// --- Sharing Logic ---
function shareToWhatsApp(propId) {
    const prop = properties.find(p => p.id == propId);
    if (!prop) return;

    const lang = currentLang;
    const title = prop.title[lang] || prop.title['en'];
    const price = prop.price;
    const url = window.location.origin + '/property.html?id=' + propId;
    
    const text = encodeURIComponent(`🚀 Check out this property on 88Loft!\n\n🏠 ${title}\n💰 Price: ${price}\n📍 Area: ${prop.area}\n\nView details: ${url}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
}

function initAutocomplete() {
    const input = document.getElementById('searchInput');
    if (!input) return;

    // Create dropdown container if not exists
    let dropdown = document.getElementById('autocompleteDropdown');
    if (!dropdown) {
        dropdown = document.createElement('div');
        dropdown.id = 'autocompleteDropdown';
        dropdown.className = 'autocomplete-dropdown';
        input.parentElement.appendChild(dropdown);
    }

    input.addEventListener('input', (e) => {
        const term = e.target.value.trim().toLowerCase();
        if (term.length < 2) {
            dropdown.style.display = 'none';
            return;
        }

        // Generate suggestions from properties
        const suggestions = [];
        const seen = new Set();

        properties.forEach(p => {
            const titleEn = (p.title?.en || '').toLowerCase();
            const titleZh = (p.title?.zh || '').toLowerCase();
            const locEn = (p.location?.en || '').toLowerCase();
            const locZh = (p.location?.zh || '').toLowerCase();

            // Match Building/Project Name
            [titleEn, titleZh].forEach(t => {
                if (t.includes(term) && !seen.has(t)) {
                    suggestions.push({ text: t, type: 'building', icon: 'fa-building' });
                    seen.add(t);
                }
            });

            // Match Area/Location
            [locEn, locZh].forEach(l => {
                if (l.includes(term) && !seen.has(l)) {
                    suggestions.push({ text: l, type: 'area', icon: 'fa-map-marker-alt' });
                    seen.add(l);
                }
            });
        });

        // Limit and Render
        const topSuggestions = suggestions.slice(0, 8);
        if (topSuggestions.length > 0) {
            dropdown.innerHTML = topSuggestions.map(s => `
                <div class="autocomplete-item" onclick="selectAutocomplete('${s.text.replace(/'/g, "\\'")}')">
                    <i class="fas ${s.icon}"></i>
                    <span class="item-text">${s.text}</span>
                    <span class="item-type">${s.type}</span>
                </div>
            `).join('');
            dropdown.style.display = 'block';
        } else {
            dropdown.style.display = 'none';
        }
    });

    // Close dropdown on outside click
    document.addEventListener('click', (e) => {
        if (!input.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.style.display = 'none';
        }
    });
}

function selectAutocomplete(text) {
    const input = document.getElementById('searchInput');
    if (input) {
        input.value = text;
        document.getElementById('autocompleteDropdown').style.display = 'none';
        handleSearch();
    }
}

function initScrollTop() {
    let btn = document.getElementById('scrollTopBtn');
    if (!btn) {
        btn = document.createElement('button');
        btn.id = 'scrollTopBtn';
        btn.className = 'scroll-top-btn';
        btn.innerHTML = '<i class="fas fa-chevron-up"></i>';
        document.body.appendChild(btn);
        
        btn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 400) {
            btn.classList.add('show');
        } else {
            btn.classList.remove('show');
        }
    });
}

function renderSkeletons() {
    const grid = document.getElementById('propertyGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    for (let i = 0; i < 8; i++) {
        const skeleton = document.createElement('div');
        skeleton.className = 'skeleton-card';
        skeleton.innerHTML = `
            <div class="skeleton-image"></div>
            <div class="skeleton-title"></div>
            <div class="skeleton-text"></div>
            <div class="skeleton-text" style="width: 40%"></div>
            <div class="skeleton-price"></div>
            <div class="skeleton-footer"></div>
        `;
        grid.appendChild(skeleton);
    }
}

function changeLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('selectedLanguage', lang);
    updateLanguage();
    
    // Auto-close menu on mobile if lang changed from within menu
    const navLinks = document.querySelector('.nav-links');
    if (navLinks && window.innerWidth <= 768) {
        navLinks.classList.remove('active');
    }
}

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
        let videoId = '';
        if (url.includes('v=')) {
            videoId = url.split('v=')[1].split('&')[0];
        } else if (url.includes('youtu.be/')) {
            videoId = url.split('youtu.be/')[1].split('?')[0];
        } else if (url.includes('embed/')) {
            videoId = url.split('embed/')[1].split('?')[0];
        } else {
            videoId = url.split('/').pop().split('?')[0];
        }
        videoHtml += `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
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

// Mobile Menu Toggle Logic
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !mobileMenu.contains(e.target)) {
                navLinks.classList.remove('active');
            }
        });

        // Close menu when clicking a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }
});


/**
 * --- ENHANCED FEATURE SUITE (50+ FUNCTIONS) ---
 */

function getLiveViewCount(id) {
    // Simulated real-time viewing count
    const seed = parseInt(id) || 0;
    const base = 3 + (seed % 17);
    const jitter = Math.floor(Math.random() * 5);
    return base + jitter;
}

// UI & Animations
const showLoading = (elId) => { if(document.getElementById(elId)) document.getElementById(elId).innerHTML = '<div class="loader"></div>'; };
const hideLoading = (elId) => { if(document.getElementById(elId)) document.getElementById(elId).innerHTML = ''; };
const fadeIn = (el) => { if(el) { el.style.opacity = 0; el.style.display = 'block'; setTimeout(() => el.style.opacity = 1, 10); } };
const fadeOut = (el) => { if(el) { el.style.opacity = 0; setTimeout(() => el.style.display = 'none', 300); } };
const shakeElement = (id) => { const el = document.getElementById(id); if(el) { el.classList.add('shake'); setTimeout(() => el.classList.remove('shake'), 500); } };
const pulseElement = (id) => { const el = document.getElementById(id); if(el) { el.classList.add('pulse'); setTimeout(() => el.classList.remove('pulse'), 2000); } };
const glowElement = (id) => { document.getElementById(id)?.classList.add('glow'); };
const resetGlow = (id) => { document.getElementById(id)?.classList.remove('glow'); };

// Search & Filtering Refinements
const clearAllFilters = () => {
    document.querySelectorAll('.search-bar input, .search-bar select').forEach(el => el.value = el.tagName === 'SELECT' ? 'all' : '');
    handleSearch();
};
const updateResultCountLabel = (count) => { const el = document.getElementById('resultCount'); if(el) el.innerText = `${count} ${currentLang === 'en' ? 'Results' : '個搜尋結果'}`; };
const showNoResultsMessage = () => { document.getElementById('propertyGrid').innerHTML = '<div class="no-results">Sorry, no matches found.</div>'; };
const validateSearchInput = (term) => term.length > 0 && term.length < 100;
const formatPriceRangeLabel = (min, max) => `HK$${min} - HK$${max}`;

// Navigation & URL State
const pushSearchToURL = (params) => { const url = new URL(window.location); Object.entries(params).forEach(([k,v]) => url.searchParams.set(k,v)); history.pushState({}, '', url); };
const loadSearchFromURL = () => { const params = new URLSearchParams(window.location.search); /* set values and search */ };
const handlePopState = () => { loadSearchFromURL(); handleSearch(); };
const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

// Property Interaction Functions
const toggleFav = (id) => { /* local logic */ const el = document.querySelector(`[data-fav-id="${id}"]`); el?.classList.toggle('active'); };
const shareOnWhatsApp = (id) => { const p = properties.find(x => x.id == id); shareToWhatsApp(p.title.en, window.location.href); };
const copyShareLink = (id) => copyToClipboard(`${window.location.origin}/property.html?id=${id}`);
const printPropertyDetails = (id) => window.print();
const calculatePriceTrend = (history) => { /* mock trend calculation */ return "Rising"; };

// Mapping Utilities
const centerMapOn = (lat, lng) => { if(window.map) window.map.setView([lat, lng], 15); };
const getMarkerIcon = (type) => type === 'rent' ? 'blue' : 'red';
const handleMarkerClick = (id) => { openPropertyDetails(id); };

// Profile & Auth Support
const handleUserLogout = () => { localStorage.removeItem('property_user'); window.location.reload(); };
const isUserLoggedIn = () => !!localStorage.getItem('property_user');
const getUserName = () => JSON.parse(localStorage.getItem('property_user'))?.name || 'Guest';

// Inquiry Management
const initInquirySubmissions = () => { /* setup listeners */ };
const validateInquiryForm = (data) => data.message.length > 10 && validateEmail(data.email);
const handleInquiryResponse = (success) => showToast(success ? "Inquiry Sent!" : "Failed to send");

// Advanced UI Components
const toggleThemeMode = () => { const cur = getDeviceTheme(); setTheme(cur === 'dark' ? 'light' : 'dark'); };
const setupInfiniteScroll = () => { /* intersection observer logic */ };
const renderSkeletonListing = () => '<div class="skeleton-card"></div>';
const highlightListing = (id) => document.querySelector(`[data-id="${id}"]`)?.classList.add('highlight');
const removeListingHighlight = (id) => document.querySelector(`[data-id="${id}"]`)?.classList.remove('highlight');

// Image & Media Features
const openFullscreenGallery = (imgs) => { /* lightbox logic */ };
const closeGallery = () => { /* hide lightbox */ };
const nextImage = () => { /* carousel logic */ };
const prevImage = () => { /* carousel logic */ };

// Data & Helpers
document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.search-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            tabs.forEach(t => t.classList.remove('active'));
            e.target.classList.add('active');
            handleSearch();
        });
    });

    // Price Range Slider Logic
    const priceMin = document.getElementById('priceMin');
    const priceMax = document.getElementById('priceMax');
    const priceMinInput = document.getElementById('priceMinInput');
    const priceMaxInput = document.getElementById('priceMaxInput');
    const priceTrack = document.getElementById('priceTrack');
    const priceSummary = document.getElementById('priceRangeSummary');
    const histogramTitle = document.getElementById('histogramTitle');

    function updatePriceSlider(e) {
        if (!priceMin || !priceMax || !priceTrack) return;
        
        let minVal, maxVal;
        
        if (e && (e.target.id === 'priceMinInput' || e.target.id === 'priceMaxInput')) {
            minVal = parseInt(priceMinInput.value) || 0;
            maxVal = parseInt(priceMaxInput.value) || 100000;
            priceMin.value = minVal;
            priceMax.value = maxVal;
        } else {
            minVal = parseInt(priceMin.value);
            maxVal = parseInt(priceMax.value);
            if (priceMinInput) priceMinInput.value = minVal;
            if (priceMaxInput) priceMaxInput.value = maxVal;
        }

        if (maxVal < minVal) {
            if (e && e.target.id === 'priceMin') { priceMax.value = minVal; maxVal = minVal; }
            else { priceMin.value = maxVal; minVal = maxVal; }
            if (priceMinInput) priceMinInput.value = minVal;
            if (priceMaxInput) priceMaxInput.value = maxVal;
        }

        const maxRange = parseInt(priceMin.max);
        const minPercent = (minVal / maxRange) * 100;
        const maxPercent = (maxVal / maxRange) * 100;

        priceTrack.style.left = minPercent + "%";
        priceTrack.style.width = (maxPercent - minPercent) + "%";

        const formatLabel = (v) => {
            if (v >= 10000) return (v/10000).toFixed(1) + '億';
            return v + '萬';
        };

        if (histogramTitle) {
            histogramTitle.innerText = `範圍 ${formatLabel(minVal)} - ${formatLabel(maxVal)}`;
        }
        
        if (priceSummary) {
            priceSummary.innerText = `HK$ ${formatLabel(minVal)} - ${formatLabel(maxVal)}`;
        }
        
        handleSearch();
    }

    function renderPriceHistogram(min, max) {
        const container = document.getElementById('priceHistogram');
        if (!container) return;
        
        // Use properties to build histogram
        const prices = properties.map(p => {
            const val = parseInt((p.price || '').toString().replace(/[^0-9]/g, '')) || 0;
            return val / 10000; // Convert to '萬'
        }).filter(v => v > 0);
        
        const binCount = 30;
        const maxVal = 100000; // 10億
        const bins = new Array(binCount).fill(0);
        
        prices.forEach(p => {
            const binIdx = Math.min(Math.floor((p / maxVal) * binCount), binCount - 1);
            if (binIdx >= 0) bins[binIdx]++;
        });
        
        const maxBin = Math.max(...bins) || 1;
        container.innerHTML = bins.map((count, i) => {
            const binMin = (i / binCount) * maxVal;
            const binMax = ((i + 1) / binCount) * maxVal;
            const isActive = binMin >= min && binMax <= max;
            const height = (count / maxBin) * 100;
            return `<div class="histogram-bar ${isActive ? 'active' : ''}" style="height: ${height}%"></div>`;
        }).join('');
    }

    priceMin?.addEventListener('input', updatePriceSlider);
    priceMax?.addEventListener('input', updatePriceSlider);
    priceMinInput?.addEventListener('change', updatePriceSlider);
    priceMaxInput?.addEventListener('change', updatePriceSlider);
    
    // Initialize slider position
    updatePriceSlider();
});

const filterByArea = (area) => { document.getElementById('areaFilter').value = area; handleSearch(); };
const filterByType = (type) => { document.getElementById('typeFilter').value = type; handleSearch(); };
const sortByPrice = (order) => { document.getElementById('sortSelect').value = order === 'asc' ? 'price-low' : 'price-high'; handleSearch(); };

// Extra Feature Mockups
const generatePropertyPDF = (id) => { showToast("Generating PDF..."); };
const scheduleViewingModal = (id) => { /* modal logic */ };
const requestValuation = (id) => { showToast("Valuation request sent"); };
const savePropertyToPDF = () => { window.print(); };

// Infinite Scroll / Load More Logic
const handleInfiniteScroll = (entries) => { if(entries[0].isIntersecting) { /* load more */ } };

// Live Updates
const refreshPropertyData = async () => { await fetchPropertiesFromDB(); handleSearch(); };
const toggleAutoRefresh = (bool) => { if(bool) setInterval(refreshPropertyData, 60000); };

// Language Support
const getTranslation = (key) => translations[currentLang][key] || key;
const setLanguage = (lang) => { currentLang = lang; updateLanguage(); };

// Statistics
const getPropertyCountTotal = () => properties.length;
const getAvgPrice = (type) => { const set = properties.filter(p => p.type === type); return set.reduce((a,b) => a + parseCurrency(b.price), 0) / set.length; };

// Debugging
const logPropertyState = () => console.table(properties);

window.addEventListener('popstate', handlePopState);


// Mortgage Calculator Logic
document.addEventListener('DOMContentLoaded', () => {
    const calcBtn = document.getElementById('calculateBtn');
    if (calcBtn) {
        calcBtn.addEventListener('click', () => {
            const price = parseFloat(document.getElementById('calcPrice').value) || 0;
            const downPct = (parseFloat(document.getElementById('calcDown').value) || 0) / 100;
            const rate = (parseFloat(document.getElementById('calcRate').value) || 0) / 100 / 12;
            const term = (parseInt(document.getElementById('calcTerm').value) || 30) * 12;

            const principal = price * (1 - downPct);
            let monthly = 0;
            if (rate === 0) {
                monthly = principal / (term || 1);
            } else {
                monthly = principal * rate * Math.pow(1 + rate, term) / (Math.pow(1 + rate, term) - 1);
            }

            const resultDiv = document.getElementById('calcResult');
            const priceDiv = document.getElementById('monthlyPrice');
            if(resultDiv && priceDiv) {
                resultDiv.style.display = 'block';
                priceDiv.innerText = '$' + (monthly || 0).toLocaleString('en-US', {maximumFractionDigits: 0});
            }
        });
    }

    // Modern Search Bar Tab Logic
    const tabs = document.querySelectorAll('.search-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            handleSearch();
        });
    });

    const searchBtn = document.getElementById('searchBtn');
    if (searchBtn) {
        searchBtn.addEventListener('click', handleSearch);
    }
});

/* ================================================
   NEW FEATURES JAVASCRIPT — 88loft Enhanced UX
   ================================================ */

// ---- Advanced Filter Drawer State ----
const advFilters = { beds: 'any', baths: 'any', type: 'any', sqftMin: 0, sqftMax: 10000, features: [] };

function openFilterDrawer() {
    document.getElementById('filterDrawer').classList.add('open');
    document.getElementById('filterOverlay').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeFilterDrawer() {
    document.getElementById('filterDrawer').classList.remove('open');
    document.getElementById('filterOverlay').classList.remove('open');
    document.body.style.overflow = '';
}

function initFilterChips(groupId, stateKey) {
    const container = document.getElementById(groupId);
    if (!container) return;
    container.querySelectorAll('.filter-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            if (stateKey === 'features') {
                chip.classList.toggle('active');
                const val = chip.dataset.val;
                const idx = advFilters.features.indexOf(val);
                idx > -1 ? advFilters.features.splice(idx, 1) : advFilters.features.push(val);
            } else {
                container.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                advFilters[stateKey] = chip.dataset.val;
            }
        });
    });
}

function applyAdvancedFilters() {
    advFilters.sqftMin = parseInt(document.getElementById('sqftMin')?.value || 0);
    advFilters.sqftMax = parseInt(document.getElementById('sqftMax')?.value || 10000);
    closeFilterDrawer();

    // Count active filters for badge
    let count = 0;
    if (advFilters.beds !== 'any') count++;
    if (advFilters.baths !== 'any') count++;
    if (advFilters.type !== 'any') count++;
    if (advFilters.sqftMin > 0) count++;
    if (advFilters.sqftMax < 10000) count++;
    count += advFilters.features.length;

    const badge = document.getElementById('filterActiveBadge');
    if (badge) {
        badge.style.display = count > 0 ? 'inline-flex' : 'none';
        badge.textContent = count;
    }
    handleSearch();
}

function resetAdvancedFilters() {
    advFilters.beds = 'any'; advFilters.baths = 'any'; advFilters.type = 'any';
    advFilters.sqftMin = 0; advFilters.sqftMax = 10000; advFilters.features = [];

    ['filterBeds','filterBaths','filterType'].forEach(id => {
        const c = document.getElementById(id);
        if (c) {
            c.querySelectorAll('.filter-chip').forEach(ch => ch.classList.remove('active'));
            const first = c.querySelector('.filter-chip');
            if (first) first.classList.add('active');
        }
    });
    document.getElementById('filterFeatures')?.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
    const sqftMin = document.getElementById('sqftMin');
    const sqftMax = document.getElementById('sqftMax');
    if (sqftMin) { sqftMin.value = 0; document.getElementById('sqftMinLabel').textContent = '0'; }
    if (sqftMax) { sqftMax.value = 10000; document.getElementById('sqftMaxLabel').textContent = '10,000+'; }

    const badge = document.getElementById('filterActiveBadge');
    if (badge) badge.style.display = 'none';
}

// Hook advanced filters into handleSearch — patch existing filtering
const _origHandleSearch = handleSearch;
window._advFilterPatch = function(props) {
    return props.filter(p => {
        if (advFilters.beds !== 'any') {
            const minBeds = parseInt(advFilters.beds);
            if (advFilters.beds === '4') { if (p.beds < 4) return false; }
            else { if (p.beds != minBeds) return false; }
        }
        if (advFilters.baths !== 'any') {
            const minBaths = parseInt(advFilters.baths);
            if (advFilters.baths === '3') { if (p.baths < 3) return false; }
            else { if (p.baths != minBaths) return false; }
        }
        if (advFilters.type !== 'any' && p.type !== advFilters.type) return false;
        if (p.sqft && (p.sqft < advFilters.sqftMin || (advFilters.sqftMax < 10000 && p.sqft > advFilters.sqftMax))) return false;
        if (advFilters.features.length > 0) {
            const featureStr = (p.features || '').toLowerCase();
            if (!advFilters.features.every(f => featureStr.includes(f.toLowerCase()))) return false;
        }
        return true;
    });
};

// ---- Market Stats Bar ----
async function loadMarketStats() {
    try {
        const res = await fetch(API_BASE + '/api/stats/summary');
        if (!res.ok) return;
        const data = await res.json();
        const totalEl = document.getElementById('msStat-total');
        if (totalEl) totalEl.textContent = (data.total || 0).toLocaleString() + ' 個';

        // Compute median-ish values from loaded properties  
        const rentPrices = properties.filter(p => p.type === 'rent').map(p => parseCurrency(p.price)).filter(v => v > 0).sort((a,b)=>a-b);
        const salePrices = properties.filter(p => p.type === 'sale').map(p => parseCurrency(p.price)).filter(v => v > 0).sort((a,b)=>a-b);
        const median = arr => arr.length ? arr[Math.floor(arr.length/2)] : 0;
        const rentMed = document.getElementById('msStat-rent');
        const saleMed = document.getElementById('msStat-sale');
        if (rentMed && rentPrices.length) rentMed.textContent = 'HK$' + Math.round(median(rentPrices)/1000) + 'K';
        if (saleMed && salePrices.length) saleMed.textContent = 'HK$' + (median(salePrices)/1e6).toFixed(1) + 'M';
    } catch(e) { /* silent */ }
}
setTimeout(loadMarketStats, 2000);

// ---- Wishlist Badge in Nav ----
function updateWishlistBadge() {
    const favs = JSON.parse(localStorage.getItem('property_favorites') || '[]');
    const badge = document.getElementById('navWishlistBadge');
    if (!badge) return;
    if (favs.length > 0) {
        badge.textContent = favs.length;
        badge.style.display = 'flex';
    } else {
        badge.style.display = 'none';
    }
}
// Update badge on page load and after favorites change
document.addEventListener('DOMContentLoaded', updateWishlistBadge);
const _origToggleFav = toggleFavorite;
window.toggleFavorite = function(e, id) {
    _origToggleFav(e, id);
    updateWishlistBadge();
};

// ---- Save Search ----
function getCurrentSearchState() {
    const q = document.getElementById('searchInput')?.value?.trim() || '';
    const type = document.querySelector('.search-tab.active')?.dataset?.type || 'all';
    const area = document.getElementById('areaFilter')?.value || 'all';
    const price = document.getElementById('priceFilter')?.value || 'all';
    return { q, type, area, price, advFilters: JSON.stringify(advFilters), timestamp: Date.now() };
}

function getSearchLabel(s) {
    const parts = [];
    if (s.q) parts.push(`"${s.q}"`);
    if (s.type && s.type !== 'all') parts.push(s.type === 'rent' ? '租盤' : s.type === 'sale' ? '售盤' : s.type);
    if (s.area && s.area !== 'all') parts.push(s.area);
    return parts.join(' · ') || '全部樓盤';
}

function saveCurrentSearch() {
    const state = getCurrentSearchState();
    const label = getSearchLabel(state);
    const saved = JSON.parse(localStorage.getItem('88loft_saved_searches') || '[]');
    if (saved.some(s => getSearchLabel(s) === label)) { showToast('此搜尋已儲存！'); return; }
    saved.unshift({ ...state, label });
    if (saved.length > 8) saved.pop();
    localStorage.setItem('88loft_saved_searches', JSON.stringify(saved));
    showToast('✅ 搜尋已儲存！新盤符合將會通知您。');
    const btn = document.getElementById('saveSearchBtn');
    if (btn) { btn.classList.add('saved'); btn.innerHTML = '<i class="fas fa-check"></i> 已儲存'; }
    renderSavedSearches();
}

function renderSavedSearches() {
    const container = document.getElementById('savedSearchesDropdown');
    if (!container) return;
    const saved = JSON.parse(localStorage.getItem('88loft_saved_searches') || '[]');
    if (saved.length === 0) {
        container.innerHTML = '<div style="padding:16px;color:#64748b;font-size:0.85rem;">暫無已儲存的搜尋</div>';
        return;
    }
    container.innerHTML = saved.map((s, i) => `
        <div class="saved-search-item" onclick="applySearch(${i})">
            <span>${s.label}</span>
            <button class="del-search" onclick="deleteSavedSearch(event,${i})"><i class="fas fa-trash-alt"></i></button>
        </div>
    `).join('');
}

function applySearch(idx) {
    const saved = JSON.parse(localStorage.getItem('88loft_saved_searches') || '[]');
    const s = saved[idx];
    if (!s) return;
    const searchInput = document.getElementById('searchInput');
    if (searchInput && s.q) searchInput.value = s.q;
    const areaFilter = document.getElementById('areaFilter');
    if (areaFilter && s.area) areaFilter.value = s.area;
    const priceFilter = document.getElementById('priceFilter');
    if (priceFilter && s.price) priceFilter.value = s.price;
    document.getElementById('savedSearchesDropdown').classList.remove('show');
    handleSearch();
    showToast(`已套用搜尋：${s.label}`);
}

function deleteSavedSearch(e, idx) {
    e.stopPropagation();
    const saved = JSON.parse(localStorage.getItem('88loft_saved_searches') || '[]');
    saved.splice(idx, 1);
    localStorage.setItem('88loft_saved_searches', JSON.stringify(saved));
    renderSavedSearches();
    showToast('搜尋記錄已刪除');
}

function toggleSavedSearches(e) {
    e.stopPropagation();
    renderSavedSearches();
    const dd = document.getElementById('savedSearchesDropdown');
    if (dd) dd.classList.toggle('show');
}

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    const dd = document.getElementById('savedSearchesDropdown');
    if (dd && !dd.contains(e.target) && e.target.id !== 'savedSearchesBtn') {
        dd.classList.remove('show');
    }
});

// Update search summary label whenever search runs
const _origHandleSearch2 = window.handleSearch;
if (_origHandleSearch2) {
    window.handleSearch = function() {
        _origHandleSearch2();
        const state = getCurrentSearchState();
        const summaryEl = document.getElementById('saveSearchSummary');
        if (summaryEl) summaryEl.textContent = '🔍 目前搜尋：' + getSearchLabel(state);
        const saveBtn = document.getElementById('saveSearchBtn');
        if (saveBtn) { saveBtn.classList.remove('saved'); saveBtn.innerHTML = '<i class="fas fa-bookmark"></i> 儲存搜尋'; }
    };
}

// ---- FAB Toggle ----
function toggleFab() {
    const group = document.getElementById('fabGroup');
    const btn = document.getElementById('fabToggleBtn');
    if (!group || !btn) return;
    group.classList.toggle('open');
    btn.classList.toggle('open');
}

// ---- Compare Tray ----
let compareList = JSON.parse(localStorage.getItem('88loft_compare') || '[]');

function addToCompare(propId, title) {
    if (compareList.length >= 3 && !compareList.includes(propId)) {
        showToast('最多比較 3 個樓盤');
        return;
    }
    if (!compareList.includes(propId)) {
        compareList.push(propId);
        localStorage.setItem('88loft_compare', JSON.stringify(compareList));
        showToast(`✅ 已加入比較：${title}`);
    } else {
        compareList = compareList.filter(id => id !== propId);
        localStorage.setItem('88loft_compare', JSON.stringify(compareList));
        showToast('已從比較移除');
    }
    renderCompareTray();
}

function renderCompareTray() {
    let tray = document.getElementById('compareTray');
    if (!tray) {
        tray = document.createElement('div');
        tray.id = 'compareTray';
        tray.className = 'compare-tray';
        tray.innerHTML = `
            <span class="compare-tray-label">🔎 比較樓盤</span>
            <div class="compare-tray-items" id="compareTrayItems"></div>
            <button class="btn-compare-now" onclick="doCompare()">立即比較</button>
            <button class="btn-compare-clear" onclick="clearCompare()">清除</button>
        `;
        document.body.appendChild(tray);
    }
    const items = document.getElementById('compareTrayItems');
    if (!items) return;
    while (items.children.length < 3) {
        const slot = document.createElement('div');
        slot.className = 'compare-tray-item';
        slot.textContent = '+ 加入比較';
        items.appendChild(slot);
    }
    compareList.forEach((id, i) => {
        const prop = properties.find(p => p.id == id);
        if (!prop) return;
        const title = typeof prop.title === 'string' ? prop.title : (prop.title.zh || prop.title.en);
        items.children[i].className = 'compare-tray-item filled';
        items.children[i].innerHTML = `<span style="overflow:hidden;text-overflow:ellipsis;">${title}</span><button class="remove-compare" onclick="addToCompare(${id},'')"><i class="fas fa-times"></i></button>`;
    });
    tray.classList.toggle('visible', compareList.length > 0);
}

function clearCompare() {
    compareList = [];
    localStorage.setItem('88loft_compare', JSON.stringify(compareList));
    renderCompareTray();
}

function doCompare() {
    if (compareList.length < 2) { showToast('請至少選擇 2 個樓盤來比較'); return; }
    const url = 'compare.html?ids=' + compareList.join(',');
    window.location.href = url;
}

// ---- UI Enhancements: Skeleton, ScrollTop, Autocomplete ----

function renderSkeletons(count = 12) {
    const grid = document.getElementById('propertyGrid');
    if (!grid) return;
    grid.innerHTML = Array(count).fill(0).map(() => `
        <div class="property-card skeleton">
            <div class="skeleton skeleton-img"></div>
            <div style="padding:20px;">
                <div class="skeleton skeleton-text" style="width:90%"></div>
                <div class="skeleton skeleton-text" style="width:60%"></div>
                <div class="skeleton skeleton-price"></div>
                <div style="display:flex; gap:10px;">
                    <div class="skeleton skeleton-text" style="width:30%"></div>
                    <div class="skeleton skeleton-text" style="width:30%"></div>
                    <div class="skeleton skeleton-text" style="width:30%"></div>
                </div>
            </div>
        </div>
    `).join('');
}

function initAutocomplete() {
    const input = document.getElementById('searchInput');
    if (!input) return;

    const dropdown = document.createElement('div');
    dropdown.className = 'search-autocomplete';
    input.parentNode.appendChild(dropdown);

    input.addEventListener('input', (e) => {
        const val = e.target.value.trim().toLowerCase();
        if (val.length < 1) { dropdown.classList.remove('active'); return; }

        const matches = [];
        
        // 1. Search in Area Mappings
        Object.keys(areaMappings).forEach(key => {
            const alias = areaMappings[key];
            const found = alias.find(a => a.toLowerCase().includes(val));
            if (found) matches.push({ type: 'location', label: found, icon: 'fa-map-marker-alt' });
        });

        // 2. Search in Property Titles
        properties.forEach(p => {
            const title = (typeof p.title === 'string' ? p.title : (p.title[currentLang] || p.title.en)).toLowerCase();
            if (title.includes(val)) {
                matches.push({ type: 'property', label: title, icon: 'fa-home', id: p.id });
            }
        });

        // Unique and limited matches
        const uniqueMatches = [];
        const seen = new Set();
        for (const m of matches) {
            if (!seen.has(m.label)) {
                seen.add(m.label);
                uniqueMatches.push(m);
            }
            if (uniqueMatches.length >= 10) break;
        }

        if (uniqueMatches.length > 0) {
            dropdown.innerHTML = uniqueMatches.map(m => `
                <div class="autocomplete-item" onclick="${m.type === 'property' ? `window.location.href='/property.html?id=${m.id}'` : `applyAutocomplete('${m.label}')`}">
                    <i class="fas ${m.icon}"></i>
                    <div style="display:flex; flex-direction:column;">
                        <span style="font-size:0.95rem;">${m.label.replace(new RegExp(val, 'gi'), match => `<span class="match">${match}</span>`)}</span>
                        <span style="font-size:0.7rem; color:#64748b; text-transform:uppercase;">${m.type === 'location' ? '地區 (Area)' : '樓盤 (Property)'}</span>
                    </div>
                </div>
            `).join('');
            dropdown.classList.add('active');
        } else {
            dropdown.classList.remove('active');
        }
    });

    document.addEventListener('click', (e) => {
        if (!input.contains(e.target) && !dropdown.contains(e.target)) dropdown.classList.remove('active');
    });
}

function applyAutocomplete(val) {
    const input = document.getElementById('searchInput');
    if (input) {
        input.value = val;
        document.querySelector('.search-autocomplete')?.classList.remove('active');
        handleSearch();
    }
}

function initScrollTop() {
    const btn = document.createElement('div');
    btn.className = 'scroll-top-btn';
    btn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    document.body.appendChild(btn);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 400) btn.classList.add('show');
        else btn.classList.remove('show');
    });

    btn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ---- Init on DOMContentLoaded ----
document.addEventListener('DOMContentLoaded', () => {
    initFilterChips('filterBeds', 'beds');
    initFilterChips('filterBaths', 'baths');
    initFilterChips('filterType', 'type');
    initFilterChips('filterFeatures', 'features');
    updateWishlistBadge();
    renderSavedSearches();
    renderCompareTray();
    
    // New Enhancements
    initAutocomplete();
    initScrollTop();

    // ESC closes filter drawer
    document.addEventListener('keydown', e => { 
        if (e.key === 'Escape') { 
            closeFilterDrawer(); 
            document.getElementById('savedSearchesDropdown')?.classList.remove('show'); 
            document.querySelector('.search-autocomplete')?.classList.remove('active');
        } 
    });

    // Patch fetchPropertiesFromDB to show skeletons
    const _origFetch = fetchPropertiesFromDB;
    window.fetchPropertiesFromDB = async function() {
        renderSkeletons();
        return _origFetch();
    };
});

function filterByCategory(type) {
    console.log("Filtering by category:", type);
    // Update active state in mobile pills
    document.querySelectorAll('.selection-pills span').forEach(pill => {
        const pType = pill.getAttribute('data-type');
        if (pType === type) {
            pill.classList.add('active');
        } else {
            pill.classList.remove('active');
        }
    });

    // Sync with desktop tabs
    document.querySelectorAll('.search-tab').forEach(tab => {
        if (tab.getAttribute('data-type') === type) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });

    // Perform the actual search
    if (typeof handleSearch === 'function') {
        handleSearch();
    }
}
window.LiveActivityManager = {
    activities: [
        { name: "Mr. Wong", action: "剛查詢了", property: "尖沙咀海景豪宅", img: "https://ui-avatars.com/api/?name=W&background=7232f2&color=fff" },
        { name: "Ms. Chen", action: "剛剛收藏了", property: "半山壹號 特色單位", img: "https://ui-avatars.com/api/?name=C&background=4ade80&color=fff" },
        { name: "買家 A", action: "正預約參觀", property: "啟德維港1號", img: "https://ui-avatars.com/api/?name=A&background=facc15&color=fff" },
        { name: "匿名用戶", action: "剛剛分享了", property: "西九龍 凱旋門", img: "https://ui-avatars.com/api/?name=U&background=ef4444&color=fff" }
    ],
    start() {
        // Show pulse on FAB
        document.getElementById('fabToggleBtn')?.classList.add('live');
        
        // Show first activity after 5s
        setTimeout(() => this.showNext(), 5000);
        
        // Randomly update viewer counts on cards
        setInterval(() => this.updateViewerCounts(), 10000);
    },
    showNext() {
        const act = this.activities[Math.floor(Math.random() * this.activities.length)];
        const hub = document.getElementById('liveActivityHub');
        if (!hub) return;

        const bubble = document.createElement('div');
        bubble.className = 'activity-bubble';
        bubble.innerHTML = `
            <img src="${act.img}" alt="User">
            <div class="activity-text">
                <strong>${act.name}</strong>
                <span>${act.action} ${act.property}</span>
            </div>
        `;
        hub.appendChild(bubble);

        // Remove from DOM after animation
        setTimeout(() => bubble.remove(), 5500);

        // Schedule next (15-30s)
        const nextTime = 15000 + Math.random() * 15000;
        setTimeout(() => this.showNext(), nextTime);
    },
    updateViewerCounts() {
        // Disabled viewing count badge logic
    }
};

// Initialize Live manager
document.addEventListener('DOMContentLoaded', () => {
    // Register Service Worker for PWA
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js').catch(err => console.log('SW registration failed:', err));
        });
    }
});

async function handleSubscription(event) {
    if (event) event.preventDefault();
    const emailInput = event.target.querySelector('input[type="email"]');
    const email = emailInput.value;
    if (!email) return;

    try {
        const response = await fetch('/api/subscriptions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        const data = await response.json();
        if (response.ok) {
            alert(currentLang === 'en' ? 'Subscribed successfully!' : '訂閱成功！');
            emailInput.value = '';
        } else {
            alert(data.error || 'Subscription failed');
        }
    } catch (err) {
        console.error('Subscription error:', err);
        alert('Network error');
    }
}

// ---- Region Awareness ----
function initRegion() {
    const path = window.location.pathname;
    let region = 'hk';
    if (path.includes('jp.html')) region = 'jp';
    else if (path.includes('cn.html')) region = 'cn';
    else if (path.includes('usa.html')) region = 'usa';
    else if (path.includes('hk.html')) region = 'hk';
    else {
        // If on a sub-page, get from storage
        region = localStorage.getItem('88loft_region') || 'hk';
    }
    
    localStorage.setItem('88loft_region', region);
    
    // Update all back links on the page
    document.querySelectorAll('a[href="/hk.html"]').forEach(link => {
        if (!link.classList.contains('logo-link')) { // Keep logo pointing to home or current region
            link.href = `/${region}.html`;
        }
    });
}

document.addEventListener('DOMContentLoaded', initRegion);
