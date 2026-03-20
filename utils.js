const API_BASE = (window.location.hostname.includes('onrender.com') || window.location.hostname.includes('pythonanywhere.com') || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') 
    ? '' 
    : 'http://10.101.9.151:8000'; // Capacitor mobile app fallback
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
