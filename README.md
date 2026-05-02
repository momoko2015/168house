# 168HOUSE - Premium Real Estate Platform

Congratulations! Your property application is ready for launch.

## 📁 Project Structure
- `index.html`: Main landing page with optimized SEO and PWA support.
- `app.js`: Core logic for property loading, searching, filtering, and **Row List View**.
- `server.py`: Python-based backend handling the database and API.
- `admin.html`: Secure dashboard for managing listings and inquiries (PIN: 8888).
- `manifest.json`: PWA configuration for mobile installation.

## 🚀 How to Launch the Website

1. **Start the Server**:
   ```bash
   npm start
   ```
   Or manually:
   ```bash
   python server.py
   ```
   The site will be live at `http://localhost:8000`.

2. **Access Admin Panel**:
   Go to `http://localhost:8000/admin.html` and enter PIN `8888`.

## 📱 How to Launch the App (Mobile)

1. **Sync Assets**:
   Run the following to push latest code to Android/iOS:
   ```bash
   npm run sync
   ```

2. **Android**:
   ```bash
   npm run build:android
   ```
   This will open Android Studio. From there, click "Run" to launch on your device/emulator.

3. **iOS**:
   ```bash
   npm run build:ios
   ```
   This will open Xcode. Click "Run" to launch on your iPhone/Simulator.

## 🛠️ Configuration
- **API Base**: If deploying to a server, update the `API_BASE` in `utils.js` from `10.101.9.151` to your public IP or domain.
- **Database**: The app uses `properties.db` (SQLite). Back up this file to preserve your listings.

## 🔒 Security
- Ensure `admin.html` is protected if users sign up.
- The default Admin PIN is `8888`. Change this in `admin.html` script section if needed.
- **Emergency Restore**: In the Admin Dashboard (Maintenance tab), use "Restore 2 Props Only" to reset the database to the core listings (AVA 228 & Ocean View).

---
**Launched by Antigravity AI**
