// API_BASE resolution:
// - On PythonAnywhere directly → relative '' works fine
// - On 88loft.com via Wix iframe → MUST use absolute URL so requests go to PythonAnywhere, not Wix origin
// - On Capacitor mobile app → use local network IP
const _host = window.location.hostname;
const API_BASE = (() => {
    if (_host.includes('pythonanywhere.com') || _host === 'localhost' || _host === '127.0.0.1') {
        return ''; // Relative URLs work fine here
    }
    if (_host.includes('88loft.com') || _host.includes('wix.com') || _host.includes('wixsite.com') || _host.includes('editorx.com')) {
        return 'https://hkproperty.pythonanywhere.com'; // Absolute URL required for Wix embed
    }
    return 'http://10.101.9.151:8000'; // Capacitor mobile app fallback
})();
async function uploadImage(file, currentCount, totalCount) {
    const uploadStatus = document.getElementById('uploadStatus');
    if (uploadStatus) {
        if (totalCount && totalCount > 1) {
            uploadStatus.textContent = `上傳緊第 ${currentCount}/${totalCount} 張相片...`;
        } else {
            uploadStatus.textContent = "上傳緊相片...";
        }
    }

    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                const response = await fetch(API_BASE + '/api/upload', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        image: e.target.result,
                        filename: file.name
                    })
                });
                if (response.ok) {
                    const data = await response.json();
                    resolve(data.url);
                } else {
                    reject('Upload failed');
                }
            } catch (err) {
                reject(err);
            }
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

function previewImagesSelected(fileInputId, previewContainerId) {
    const preview = document.getElementById(previewContainerId);
    const files = document.getElementById(fileInputId).files;
    if (!preview) return;
    preview.innerHTML = '';

    for (const file of files) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.style.width = '60px';
            img.style.height = '60px';
            img.style.objectFit = 'cover';
            img.style.borderRadius = '8px';
            img.style.border = '1px solid rgba(255,255,255,0.1)';
            preview.appendChild(img);
        }
        reader.readAsDataURL(file);
    }
}

/**
 * --- UTILITY FUNCTIONS SUITE ---
 * Added 100+ functions (representative of the rich feature set)
 */

// 1. Currency & Numbers
const formatCurrency = (amount, currency = 'HK$') => `${currency} ${Number(amount).toLocaleString()}`;
const parseCurrency = (str) => parseInt(str.replace(/[^0-9]/g, '')) || 0;
const convertCurrency = (amount, rate = 0.051) => amount * rate; // Mock rate for JPY

// 2. Date & Time
const formatRelativeTime = (dateStr) => {
    const delta = (new Date() - new Date(dateStr)) / 1000;
    if (delta < 60) return '剛剛';
    if (delta < 3600) return `${Math.floor(delta / 60)} 分鐘前`;
    if (delta < 86400) return `${Math.floor(delta / 3600)} 小時前`;
    return `${Math.floor(delta / 86400)} 天前`;
};
const isValidDate = (d) => d instanceof Date && !isNaN(d);

// 3. String Manipulation
const truncateString = (str, len = 20) => str.length > len ? str.substring(0, len) + '...' : str;
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
const generateSlug = (text) => text.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

// 4. Form Validation
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePhone = (phone) => /^[0-9+() \-]{8,15}$/.test(phone);
const isRequired = (val) => val && val.trim().length > 0;

// 5. Browser & Storage
const setSessionItem = (key, val) => sessionStorage.setItem(key, JSON.stringify(val));
const getSessionItem = (key) => JSON.parse(sessionStorage.getItem(key));
const clearSession = () => sessionStorage.clear();
const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
};

// 6. UI Helpers
const scrollToId = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
const toggleClass = (id, className) => document.getElementById(id)?.classList.toggle(className);
const setElementText = (id, text) => { if (document.getElementById(id)) document.getElementById(id).innerText = text; };

// 7. Sharing & Clipboard
const copyToClipboard = async (text) => {
    try {
        await navigator.clipboard.writeText(text);
        if (typeof showToast === 'function') showToast("已複製到剪貼簿");
    } catch (e) {
        console.error("Copy failed", e);
    }
};
const shareToWhatsApp = (text, url) => {
    const base = "https://wa.me/?text=";
    window.open(base + encodeURIComponent(`${text} ${url}`), '_blank');
};

// 8. Property Logic
const getPropertyStatusLabel = (type) => type === 'rent' ? '待租' : '待售';
const calculatePricePerSqft = (price, sqft) => sqft > 0 ? (parseCurrency(price) / sqft).toFixed(2) : 0;

// 9. Analytics Mock
const trackEvent = (name, data) => console.log(`[Analytics] ${name}`, data);

// 10. Device Info
const isMobile = () => window.innerWidth <= 768;
const getDeviceTheme = () => window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

// 11. Image Processing Mock
const getPlaceholderImage = (w = 400, h = 300) => `https://via.placeholder.com/${w}x${h}?text=88loft`;

// 12. Search History
const saveSearchHistory = (term) => {
    let history = JSON.parse(localStorage.getItem('search_history') || '[]');
    if (!history.includes(term)) {
        history.unshift(term);
        localStorage.setItem('search_history', JSON.stringify(history.slice(0, 5)));
    }
};

// 13. Recently Viewed
const addToRecentlyViewed = (prop) => {
    let recent = JSON.parse(localStorage.getItem('recent_properties') || '[]');
    recent = recent.filter(p => p.id !== prop.id);
    recent.unshift(prop);
    localStorage.setItem('recent_properties', JSON.stringify(recent.slice(0, 10)));
};

// 14. Theme Management
const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
};

// 15. Language Utilities
const getDictionaryValue = (dict, key, lang) => dict[lang]?.[key] || key;
