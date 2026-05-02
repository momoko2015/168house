import json
import sqlite3
import os
import uuid
import base64
from flask import Flask, request, jsonify, send_from_directory, abort, redirect
from datetime import datetime
import time

# Initialize Flask app to serve static files from the current directory
app = Flask(__name__, static_folder='.', static_url_path='')

DB_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'properties.db')
UPLOAD_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'uploads')

if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)

STANDARD_PROPERTIES = [
    {
        "title_en": "AVA 228 - Sham Shui Po",
        "title_zh": "AVA 228 - 深水埗",
        "title_cn": "AVA 228 - 深水埗",
        "title_jp": "AVA 228 - 深水埗",
        "location_en": "228 Sham Shui Po, Kowloon",
        "location_zh": "深水埗區 深水埗 228 號",
        "location_cn": "深水埗区 深水埗 228 号",
        "location_jp": "深水埗区 深水埗 228 号",
        "price": "HK$ 4,500,000",
        "type": "sale",
        "beds": 1,
        "baths": 1,
        "sqft": 250,
        "image": "/uploads/ava 1.jpeg",
        "features": "住宅, 近地鐵, 全新裝修",
        "area": "HK",
        "lat": 22.3308,
        "lng": 114.1622,
        "is_premium": 1,
        "user_id": 1,
        "gallery": ["/uploads/ava 1.jpeg", "/uploads/ava 2.jpeg", "/uploads/ava 3.jpeg", "/uploads/ava 4.jpeg", "/uploads/ava 5.jpeg"]
    },
    {
        "title_en": "Ocean View - Luxury Sea View Villa",
        "title_zh": "太平洋山莊 - 豪華海景別墅",
        "title_cn": "太平洋山庄 - 豪华海景别墅",
        "title_jp": "太平洋山荘 - 豪華海景別荘",
        "location_en": "1 Tai Shui Hang, Sha Tin",
        "location_zh": "沙田區 沙田 大水坑 1 號",
        "location_cn": "沙田区 沙田 大水坑 1 号",
        "location_jp": "沙田区 沙田 大水坑 1 号",
        "price": "HK$ 15,000,000",
        "type": "sale",
        "beds": 3,
        "baths": 2,
        "sqft": 1200,
        "image": "/uploads/IMG_7121.jpeg",
        "features": "住宅, 無敵海景, 豪華裝修, 連車位",
        "area": "HK",
        "lat": 22.4056,
        "lng": 114.2070,
        "is_premium": 1,
        "user_id": 1,
        "gallery": ["/uploads/IMG_7121.jpeg", "/uploads/IMG_7122.jpeg"]
    }
]

def init_db():
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS properties
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                  title_en TEXT, title_zh TEXT,
                  location_en TEXT, location_zh TEXT,
                  price TEXT, type TEXT, beds INTEGER, baths INTEGER, sqft INTEGER, image TEXT,
                  features TEXT, video TEXT, area TEXT, lat REAL, lng REAL, is_premium INTEGER DEFAULT 0,
                  views INTEGER DEFAULT 0, rating REAL DEFAULT 0.0, comments_count INTEGER DEFAULT 0)''')
    
    c.execute('''CREATE TABLE IF NOT EXISTS inquiries
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                  property_id INTEGER,
                  name TEXT,
                  email TEXT,
                  phone TEXT,
                  message TEXT,
                  date TEXT,
                  is_read INTEGER DEFAULT 0,
                  FOREIGN KEY(property_id) REFERENCES properties(id))''')
    
    c.execute('''CREATE TABLE IF NOT EXISTS property_images
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                  property_id INTEGER,
                  image_path TEXT,
                  FOREIGN KEY(property_id) REFERENCES properties(id))''')
    c.execute('''CREATE TABLE IF NOT EXISTS users
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                  email TEXT UNIQUE,
                  password TEXT,
                  name TEXT,
                  bio TEXT,
                  reset_code TEXT,
                  reset_expiry INTEGER,
                  created_at TEXT DEFAULT CURRENT_TIMESTAMP)''')
    
    c.execute('''CREATE TABLE IF NOT EXISTS subscriptions
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                  email TEXT UNIQUE,
                  created_at TEXT DEFAULT CURRENT_TIMESTAMP)''')
    
    # Ensure reset_code column exists for older DBs
    c.execute("PRAGMA table_info(users)")
    user_columns = [row[1] for row in c.fetchall()]
    if 'reset_code' not in user_columns: c.execute("ALTER TABLE users ADD COLUMN reset_code TEXT")
    if 'reset_expiry' not in user_columns: c.execute("ALTER TABLE users ADD COLUMN reset_expiry INTEGER")
    
    # Ensure columns exist 
    c.execute("PRAGMA table_info(properties)")
    columns = [row[1] for row in c.fetchall()]
    if 'video' not in columns: c.execute("ALTER TABLE properties ADD COLUMN video TEXT")
    if 'area' not in columns: c.execute("ALTER TABLE properties ADD COLUMN area TEXT DEFAULT 'HK'")
    if 'lng' not in columns: c.execute("ALTER TABLE properties ADD COLUMN lng REAL")
    if 'is_premium' not in columns: c.execute("ALTER TABLE properties ADD COLUMN is_premium INTEGER DEFAULT 0")
    if 'views' not in columns: c.execute("ALTER TABLE properties ADD COLUMN views INTEGER DEFAULT 0")
    if 'rating' not in columns: c.execute("ALTER TABLE properties ADD COLUMN rating REAL DEFAULT 0.0")
    if 'comments_count' not in columns: c.execute("ALTER TABLE properties ADD COLUMN comments_count INTEGER DEFAULT 0")
    if 'created_at' not in columns: 
        c.execute("ALTER TABLE properties ADD COLUMN created_at TEXT")
        c.execute("UPDATE properties SET created_at = datetime('now') WHERE created_at IS NULL")
    
    c.execute("PRAGMA table_info(inquiries)")
    inq_columns = [row[1] for row in c.fetchall()]
    if 'is_read' not in inq_columns: c.execute("ALTER TABLE inquiries ADD COLUMN is_read INTEGER DEFAULT 0")
    
    # NEW ZILLOW-LIKE COLUMNS
    if 'year_built' not in columns: c.execute("ALTER TABLE properties ADD COLUMN year_built INTEGER DEFAULT 2000")
    if 'tax_annual' not in columns: c.execute("ALTER TABLE properties ADD COLUMN tax_annual REAL DEFAULT 0.0")
    if 'walk_score' not in columns: c.execute("ALTER TABLE properties ADD COLUMN walk_score INTEGER DEFAULT 80")
    if 'transit_score' not in columns: c.execute("ALTER TABLE properties ADD COLUMN transit_score INTEGER DEFAULT 75")
    if 'price_history' not in columns: c.execute("ALTER TABLE properties ADD COLUMN price_history TEXT") # JSON list
    if 'user_id' not in columns: c.execute("ALTER TABLE properties ADD COLUMN user_id INTEGER DEFAULT 1")
    
    c.execute('''CREATE TABLE IF NOT EXISTS room_wanted
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                  user_id INTEGER,
                  title TEXT,
                  location TEXT,
                  budget TEXT,
                  description TEXT,
                  contact_info TEXT,
                  move_in_date TEXT,
                  duration TEXT,
                  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
                  FOREIGN KEY(user_id) REFERENCES users(id))''')
    
    # Multilingual Support
    if 'title_cn' not in columns: c.execute("ALTER TABLE properties ADD COLUMN title_cn TEXT")
    if 'title_jp' not in columns: c.execute("ALTER TABLE properties ADD COLUMN title_jp TEXT")
    if 'location_cn' not in columns: c.execute("ALTER TABLE properties ADD COLUMN location_cn TEXT")
    if 'location_jp' not in columns: c.execute("ALTER TABLE properties ADD COLUMN location_jp TEXT")
    
    # Auto-restore if empty
    count = c.execute("SELECT COUNT(*) FROM properties").fetchone()[0]
    if count == 0:
        for p in STANDARD_PROPERTIES:
            res = c.execute('''INSERT INTO properties 
                        (title_en, title_zh, title_cn, title_jp, location_en, location_zh, location_cn, location_jp, price, type, beds, baths, sqft, image, features, area, lat, lng, is_premium, user_id, created_at)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))''', 
                        (p['title_en'], p['title_zh'], p.get('title_cn'), p.get('title_jp'), p['location_en'], p['location_zh'], p.get('location_cn'), p.get('location_jp'), p['price'], p['type'], p['beds'], p['baths'], p['sqft'], p['image'], p['features'], p['area'], p['lat'], p['lng'], p['is_premium'], p['user_id']))
            prop_id = res.lastrowid
            for img in p.get('gallery', []):
                c.execute('INSERT INTO property_images (property_id, image_path) VALUES (?, ?)', (prop_id, img))
    
    conn.commit()
    conn.close()



# Initialize Database on Start
init_db()

def get_db_connection():
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    return conn

# Allowed origins for CORS and embedding
ALLOWED_ORIGINS = [
    'https://www.88loft.com',
    'https://88loft.com',
    'http://www.88loft.com',
    'http://88loft.com',
    'https://hkproperty.pythonanywhere.com',
    'http://localhost:8000',
    'http://127.0.0.1:8000',
]

@app.after_request
def after_request(response):
    origin = request.headers.get('Origin', '')
    # Allow the specific requesting origin if it's in our list, else fall back to wildcard for APIs
    if origin in ALLOWED_ORIGINS:
        response.headers['Access-Control-Allow-Origin'] = origin
        response.headers['Vary'] = 'Origin'
    else:
        response.headers['Access-Control-Allow-Origin'] = '*'
    
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type,Authorization,X-Requested-With'
    response.headers['Access-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE,OPTIONS'
    response.headers['Access-Control-Max-Age'] = '86400'
    # Allow the app to be embedded in Wix iframes from 88loft.com
    response.headers['X-Frame-Options'] = 'ALLOWALL'
    response.headers['Content-Security-Policy'] = (
        "frame-ancestors 'self' https://www.88loft.com https://88loft.com "
        "https://*.wix.com https://*.wixsite.com https://*.editorx.com"
    )
    return response

# Handle OPTIONS preflight for all /api/* routes
@app.route('/api/', defaults={'path': ''}, methods=['OPTIONS'])
@app.route('/api/<path:path>', methods=['OPTIONS'])
def handle_options(path=''):
    from flask import make_response
    resp = make_response('', 200)
    origin = request.headers.get('Origin', '*')
    resp.headers['Access-Control-Allow-Origin'] = origin if origin else '*'
    resp.headers['Access-Control-Allow-Methods'] = 'GET,POST,PUT,DELETE,OPTIONS'
    resp.headers['Access-Control-Allow-Headers'] = 'Content-Type,Authorization,X-Requested-With'
    resp.headers['Access-Control-Max-Age'] = '86400'
    return resp
# serve_static below handles OPTIONS for static files via methods=['GET','HEAD','OPTIONS'].

# Removed WWW Redirect as it intercepts traffic and sends to broken Wix domain
# Standard Pages
@app.route('/')
def index():
    return send_from_directory('.', 'index.html')


@app.route('/api/auth/signup', methods=['POST'])
def signup():
    data = request.json
    conn = get_db_connection()
    try:
        conn.execute('INSERT INTO users (email, password, name) VALUES (?, ?, ?)',
                     (data['email'], data['password'], data['name']))
        conn.commit()
        return jsonify({"status": "success"})
    except sqlite3.IntegrityError:
        return jsonify({"status": "error", "message": "Email already exists"}), 400
    finally:
        conn.close()

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.json
    conn = get_db_connection()
    user = conn.execute('SELECT * FROM users WHERE email = ? AND password = ?',
                        (data['email'], data['password'])).fetchone()
    conn.close()
    if user:
        return jsonify({
            "status": "success",
            "user": {"id": user['id'], "email": user['email'], "name": user['name'], "bio": user['bio']}
        })
    return jsonify({"status": "error", "message": "Invalid email or password"}), 401

import smtplib
import random
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# Email Configuration (USER MUST FILL IN)
SMTP_SERVER = "smtp.gmail.com" # e.g., smtp.gmail.com or outlook.office365.com
SMTP_PORT = 587
SMTP_USER = "property_app_system@gmail.com" # Your sender email
SMTP_PASS = "your_email_password" # Your email app password

def send_reset_email(to_email, reset_token):
    msg = MIMEMultipart()
    msg['From'] = SMTP_USER
    msg['To'] = to_email
    msg['Subject'] = "重設您的 88 精選樓盤 帳戶密碼"

    reset_url = f"{request.url_root}reset.html?token={reset_token}&email={to_email}"
    
    html = f"""
    <html>
      <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background: #fff; padding: 40px; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #7232f2; text-align: center;">88 精選樓盤</h2>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
          <p>您好，</p>
          <p>我們收到為您的帳戶重設密碼的請求。請點擊下面的按鈕來設置新密碼：</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="{reset_url}" style="background-color: #7232f2; color: #fff; padding: 15px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">點此重設密碼</a>
          </div>
          <p>此連結將在 15 分鐘後過期。如果您沒有提出此請求，請忽略此電郵。</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="font-size: 12px; color: #888; text-align: center;">&copy; 2026 88loft</p>
        </div>
      </body>
    </html>
    """
    msg.attach(MIMEText(html, 'html'))
    
    try:
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(SMTP_USER, SMTP_PASS)
        server.sendmail(SMTP_USER, to_email, msg.as_string())
        server.quit()
        return True
    except Exception as e:
        print(f"SMTP Error: {e}")
        return False

@app.route('/api/auth/forgot-password', methods=['POST'])
def forgot_password():
    data = request.json
    email = data['email']
    conn = get_db_connection()
    user = conn.execute('SELECT * FROM users WHERE email = ?', (email,)).fetchone()
    if user:
        token = str(random.randint(100000, 999999))
        expiry = int(time.time()) + 900 # 15 mins
        conn.execute('UPDATE users SET reset_code = ?, reset_expiry = ? WHERE email = ?', (token, expiry, email))
        conn.commit()
        conn.close()
        
        # Try to send email
        if send_reset_email(email, token):
            return jsonify({"status": "success", "message": "重設連結已發送到您的電子郵件。"})
        else:
            return jsonify({"status": "success", "message": "伺服器忙碌中，暫時使用手動模式 (Token: " + token + ")"})
    conn.close()
    return jsonify({"status": "error", "message": "找不到該電子郵件"}), 404

@app.route('/api/auth/reset-password', methods=['POST'])
def reset_password():
    data = request.json
    email = data.get('email')
    token = data.get('token')
    password = data.get('password')
    
    conn = get_db_connection()
    user = conn.execute('SELECT * FROM users WHERE email = ? AND reset_code = ?', (email, token)).fetchone()
    if user:
        if int(time.time()) > user['reset_expiry']:
            conn.close()
            return jsonify({"status": "error", "message": "重設代碼已過期"}), 400
        
        conn.execute('UPDATE users SET password = ?, reset_code = NULL WHERE email = ?', (password, email))
        conn.commit()
        conn.close()
        return jsonify({"status": "success", "message": "密碼已成功更新！"})
    conn.close()
    return jsonify({"status": "error", "message": "無效的重設代碼"}), 404

# ── Social Login (Google + Facebook) ──────────────────────────────────────────
import urllib.request

@app.route('/api/auth/social', methods=['POST', 'OPTIONS'])
def social_login():
    if request.method == 'OPTIONS':
        return '', 204
    data = request.json
    provider = data.get('provider')   # 'google' or 'facebook'
    token    = data.get('token')      # credential / access_token from the SDK

    if not provider or not token:
        return jsonify({"status": "error", "message": "Missing provider or token"}), 400

    email = name = picture = None

    try:
        if provider == 'google':
            url = f"https://oauth2.googleapis.com/tokeninfo?id_token={token}"
            with urllib.request.urlopen(url, timeout=6) as resp:
                info = json.loads(resp.read().decode())
            email   = info.get('email')
            name    = info.get('name') or (info.get('email','').split('@')[0])
            picture = info.get('picture', '')

        elif provider == 'facebook':
            url = f"https://graph.facebook.com/me?fields=id,name,email,picture&access_token={token}"
            with urllib.request.urlopen(url, timeout=6) as resp:
                info = json.loads(resp.read().decode())
            email   = info.get('email') or f"fb_{info['id']}@facebook.local"
            name    = info.get('name', 'Facebook User')
            picture = info.get('picture', {}).get('data', {}).get('url', '')

        else:
            return jsonify({"status": "error", "message": "Unknown provider"}), 400

    except Exception as e:
        print(f"Social verify error ({provider}): {e}")
        return jsonify({"status": "error", "message": "Token verification failed. Please try again."}), 401

    if not email:
        return jsonify({"status": "error", "message": "Could not retrieve email from provider"}), 400

    conn = get_db_connection()
    user = conn.execute('SELECT * FROM users WHERE email = ?', (email,)).fetchone()
    if not user:
        conn.execute('INSERT INTO users (email, password, name) VALUES (?, ?, ?)',
                     (email, f'__social_{provider}__', name))
        conn.commit()
        user = conn.execute('SELECT * FROM users WHERE email = ?', (email,)).fetchone()
    conn.close()

    return jsonify({
        "status": "success",
        "user": {
            "id":       user['id'],
            "email":    user['email'],
            "name":     user['name'] or name,
            "bio":      user['bio'],
            "picture":  picture,
            "provider": provider
        }
    })

# APIS
@app.route('/api/properties/count', methods=['GET'])
def get_properties_count():
    conn = get_db_connection()
    count = conn.execute('SELECT COUNT(*) FROM properties').fetchone()[0]
    conn.close()
    return jsonify({'count': count})

@app.route('/api/properties', methods=['GET'])
def get_properties():
    limit = int(request.args.get('limit', 10000))
    offset = int(request.args.get('offset', 0))
    user_id = request.args.get('user_id')  # Filter by user for dashboard
    
    conn = get_db_connection()
    c = conn.cursor()

    if user_id:
        rows = conn.execute('''SELECT properties.*, users.name as poster_name, users.email as poster_email 
                              FROM properties 
                              LEFT JOIN users ON properties.user_id = users.id 
                              WHERE properties.user_id = ?
                              ORDER BY is_premium DESC, properties.id DESC 
                              LIMIT ? OFFSET ?''', (user_id, limit, offset)).fetchall()
    else:
        rows = conn.execute('''SELECT properties.*, users.name as poster_name, users.email as poster_email 
                              FROM properties 
                              LEFT JOIN users ON properties.user_id = users.id 
                              ORDER BY is_premium DESC, properties.id DESC 
                              LIMIT ? OFFSET ?''', (limit, offset)).fetchall()
    
    prop_ids = [row['id'] for row in rows]
    images_by_prop = {}
    if prop_ids:
        placeholders = ','.join(['?'] * len(prop_ids))
        img_rows = conn.execute(f'SELECT property_id, image_path FROM property_images WHERE property_id IN ({placeholders})', prop_ids).fetchall()
        for r in img_rows:
            images_by_prop.setdefault(r['property_id'], []).append(r['image_path'])

    properties = []
    for row in rows:
        row_dict = dict(row)
        properties.append({
            'id': row_dict['id'],
            'title': {
                'en': row_dict['title_en'], 
                'zh': row_dict['title_zh'],
                'cn': row_dict.get('title_cn') or row_dict['title_zh'],
                'jp': row_dict.get('title_jp') or row_dict['title_en']
            },
            'location': {
                'en': row_dict['location_en'], 
                'zh': row_dict['location_zh'],
                'cn': row_dict.get('location_cn') or row_dict['location_zh'],
                'jp': row_dict.get('location_jp') or row_dict['location_en']
            },
            'price': row_dict['price'],
            'type': row_dict['type'],
            'beds': row_dict['beds'],
            'baths': row_dict['baths'],
            'sqft': row_dict['sqft'],
            'image': row_dict['image'],
            'images': images_by_prop.get(row_dict['id'], []),
            'features': row_dict['features'],
            'video': row_dict['video'],
            'area': row_dict['area'],
            'lat': row_dict['lat'],
            'lng': row_dict['lng'],
            'is_premium': row_dict['is_premium'],
            'views': row_dict['views'],
            'rating': row_dict['rating'],
            'comments_count': row_dict['comments_count'],
            'poster_name': row_dict['poster_name'] or 'System Admin',
            'poster_email': row_dict['poster_email'] or 'admin@88loft.com',
            'year_built': row_dict.get('year_built', 2022),
            'tax_annual': row_dict.get('tax_annual', 5000),
            'walk_score': row_dict.get('walk_score', 85),
            'transit_score': row_dict.get('transit_score', 78),
            'price_history': row_dict.get('price_history', '[{"date": "2023-01-01", "price": "4,500,000"}]'),
            'created_at': row_dict.get('created_at', '')
        })
    conn.close()
    return jsonify(properties)

@app.route('/api/properties', methods=['POST'])
def add_property():
    data = request.json
    conn = get_db_connection()
    c = conn.cursor()
    c.execute('''INSERT INTO properties 
                 (title_en, title_zh, title_cn, title_jp, location_en, location_zh, location_cn, location_jp, price, type, beds, baths, sqft, image, features, video, area, lat, lng, user_id)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)''',
              (data['title']['en'], data['title']['zh'], data['title'].get('cn'), data['title'].get('jp'),
               data['location']['en'], data['location']['zh'], data['location'].get('cn'), data['location'].get('jp'),
               data['price'], data['type'], data['beds'], data['baths'], data['sqft'], data['image'],
               data.get('features', ''), data.get('video', ''), data.get('area', 'HK'), 
               data.get('lat'), data.get('lng'), data.get('user_id', 1)))
    last_id = c.lastrowid
    
    if 'images' in data and isinstance(data['images'], list):
        for img_path in data['images']:
            c.execute('INSERT INTO property_images (property_id, image_path) VALUES (?, ?)', (last_id, img_path))
    
    conn.commit()
    conn.close()
    return jsonify({"status": "success", "id": last_id}), 201

@app.route('/api/properties/<int:prop_id>', methods=['GET'])
def get_single_property(prop_id):
    conn = get_db_connection()
    row = conn.execute('''SELECT properties.*, users.name as poster_name, users.email as poster_email
                          FROM properties
                          LEFT JOIN users ON properties.user_id = users.id
                          WHERE properties.id = ?''', (prop_id,)).fetchone()
    if not row:
        conn.close()
        return jsonify({'error': 'Not found'}), 404
    img_rows = conn.execute('SELECT image_path FROM property_images WHERE property_id = ?', (prop_id,)).fetchall()
    conn.close()
    row_dict = dict(row)
    return jsonify({
        'id': row_dict['id'],
        'title': {
            'en': row_dict['title_en'], 
            'zh': row_dict['title_zh'],
            'cn': row_dict.get('title_cn') or row_dict['title_zh'],
            'jp': row_dict.get('title_jp') or row_dict['title_en']
        },
        'location': {
            'en': row_dict['location_en'], 
            'zh': row_dict['location_zh'],
            'cn': row_dict.get('location_cn') or row_dict['location_zh'],
            'jp': row_dict.get('location_jp') or row_dict['location_en']
        },
        'price': row_dict['price'], 'type': row_dict['type'],
        'beds': row_dict['beds'], 'baths': row_dict['baths'], 'sqft': row_dict['sqft'],
        'image': row_dict['image'], 'images': [r['image_path'] for r in img_rows],
        'features': row_dict['features'], 'video': row_dict['video'],
        'area': row_dict['area'], 'lat': row_dict['lat'], 'lng': row_dict['lng'],
        'is_premium': row_dict['is_premium'], 'views': row_dict['views'],
        'rating': row_dict['rating'], 'comments_count': row_dict['comments_count'],
        'poster_name': row_dict['poster_name'] or 'System Admin',
        'poster_email': row_dict['poster_email'] or 'admin@88loft.com',
        'year_built': row_dict.get('year_built', 2022),
        'walk_score': row_dict.get('walk_score', 85),
        'transit_score': row_dict.get('transit_score', 78),
        'created_at': row_dict.get('created_at', '')
    })

@app.route('/api/properties/<int:prop_id>', methods=['PUT'])
def edit_property(prop_id):
    data = request.json
    conn = get_db_connection()
    c = conn.cursor()
    c.execute('''UPDATE properties 
                 SET title_en = ?, title_zh = ?, title_cn = ?, title_jp = ?, 
                     location_en = ?, location_zh = ?, location_cn = ?, location_jp = ?, 
                     price = ?, type = ?, beds = ?, baths = ?, sqft = ?, image = ?,
                     features = ?, video = ?, area = ?, lat = ?, lng = ?
                 WHERE id = ?''',
              (data['title']['en'], data['title']['zh'], data['title'].get('cn'), data['title'].get('jp'),
               data['location']['en'], data['location']['zh'], data['location'].get('cn'), data['location'].get('jp'),
               data['price'], data['type'], data['beds'], data['baths'], data['sqft'], data['image'],
               data.get('features', ''), data.get('video', ''), data.get('area', 'HK'),
               data.get('lat'), data.get('lng'), prop_id))
    
    if 'images' in data and isinstance(data['images'], list):
        c.execute('DELETE FROM property_images WHERE property_id = ?', (prop_id,))
        for img_path in data['images']:
            c.execute('INSERT INTO property_images (property_id, image_path) VALUES (?, ?)', (prop_id, img_path))
    
    conn.commit()
    conn.close()
    return jsonify({"status": "success"})

@app.route('/api/properties/<int:prop_id>', methods=['DELETE'])
def delete_property(prop_id):
    conn = get_db_connection()
    c = conn.cursor()
    c.execute('DELETE FROM property_images WHERE property_id = ?', (prop_id,))
    c.execute('DELETE FROM properties WHERE id = ?', (prop_id,))
    conn.commit()
    conn.close()
    return jsonify({"status": "success"})

@app.route('/api/properties/<int:prop_id>/promote', methods=['POST'])
def promote_property(prop_id):
    conn = get_db_connection()
    conn.execute('UPDATE properties SET is_premium = 1 WHERE id = ?', (prop_id,))
    conn.commit()
    conn.close()
    return jsonify({"status": "success"})

@app.route('/api/admin/stats', methods=['GET'])
def get_admin_stats():
    conn = get_db_connection()
    prop_count = conn.execute('SELECT COUNT(*) FROM properties').fetchone()[0]
    inq_count = conn.execute('SELECT COUNT(*) FROM inquiries').fetchone()[0]
    unread_inq = conn.execute('SELECT COUNT(*) FROM inquiries WHERE is_read = 0').fetchone()[0]
    premium_count = conn.execute('SELECT COUNT(*) FROM properties WHERE is_premium = 1').fetchone()[0]
    sub_count = conn.execute('SELECT COUNT(*) FROM subscriptions').fetchone()[0]
    conn.close()
    return jsonify({
        'properties': prop_count,
        'inquiries': inq_count,
        'unread_inquiries': unread_inq,
        'premium_properties': premium_count,
        'subscriptions': sub_count
    })

@app.route('/api/subscriptions', methods=['GET'])
def get_subscriptions():
    conn = get_db_connection()
    rows = conn.execute('SELECT * FROM subscriptions ORDER BY id DESC').fetchall()
    subs = [dict(row) for row in rows]
    conn.close()
    return jsonify(subs)

@app.route('/api/subscriptions', methods=['POST'])
def add_subscription():
    data = request.json
    email = data.get('email')
    if not email:
        return jsonify({"error": "Email is required"}), 400
    
    conn = get_db_connection()
    try:
        conn.execute('INSERT INTO subscriptions (email) VALUES (?)', (email,))
        conn.commit()
        return jsonify({"status": "success", "message": "Subscribed successfully"}), 201
    except sqlite3.IntegrityError:
        return jsonify({"status": "success", "message": "Already subscribed"}), 200
    finally:
        conn.close()

@app.route('/api/inquiries', methods=['GET'])
def get_inquiries():
    conn = get_db_connection()
    rows = conn.execute('''SELECT inquiries.*, properties.title_en, properties.title_zh 
                           FROM inquiries 
                           LEFT JOIN properties ON inquiries.property_id = properties.id 
                           ORDER BY inquiries.id DESC''').fetchall()
    inquiries = []
    for row in rows:
        inquiries.append({
            'id': row['id'],
            'property_id': row['property_id'],
            'name': row['name'],
            'email': row['email'],
            'phone': row['phone'],
            'message': row['message'],
            'date': row['date'],
            'is_read': row['is_read'],
            'property_title': {'en': row['title_en'] or 'Deleted Property', 'zh': row['title_zh'] or '已刪除樓盤'}
        })
    conn.close()
    return jsonify(inquiries)

@app.route('/api/inquiries', methods=['POST'])
def add_inquiry():
    data = request.json
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    conn = get_db_connection()
    conn.execute('''INSERT INTO inquiries (property_id, name, email, phone, message, date) 
                    VALUES (?, ?, ?, ?, ?, ?)''',
                 (data['property_id'], data['name'], data['email'], 
                  data.get('phone', ''), data['message'], now))
    conn.commit()
    conn.close()
    return jsonify({'status': 'success'}), 201

@app.route('/api/inquiries/<int:inq_id>', methods=['PUT'])
def update_inquiry(inq_id):
    data = request.json
    conn = get_db_connection()
    conn.execute('UPDATE inquiries SET is_read = ? WHERE id = ?', (data.get('is_read', 1), inq_id))
    conn.commit()
    conn.close()
    return jsonify({"status": "success"})

# ── Admin System Management ──────────────────────────────────────────────────
@app.route('/api/admin/bulk-delete', methods=['DELETE'])
def admin_bulk_delete():
    conn = get_db_connection()
    c = conn.cursor()
    c.execute('DELETE FROM property_images')
    c.execute('DELETE FROM properties')
    conn.commit()
    conn.close()
    return jsonify({"status": "success", "message": "All properties deleted"})

@app.route('/api/admin/download-db', methods=['GET'])
def download_db():
    from flask import send_file
    return send_file(DB_FILE, as_attachment=True, download_name=f"properties_backup_{datetime.now().strftime('%Y%m%d')}.db")

@app.route('/api/admin/upload-db', methods=['POST'])
def upload_db():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    if file:
        # Save a backup of the current one just in case
        import shutil
        shutil.copy2(DB_FILE, DB_FILE + '.bak')
        file.save(DB_FILE)
        return jsonify({"status": "success", "message": "Database restored successfully!"})

@app.route('/api/admin/backup', methods=['GET'])
def admin_backup():
    # Reuse existing get_properties logic but return EVERYTHING
    conn = get_db_connection()
    rows = conn.execute('SELECT * FROM properties').fetchall()
    
    # Get all images
    img_rows = conn.execute('SELECT * FROM property_images').fetchall()
    images_map = {}
    for r in img_rows:
        images_map.setdefault(r['property_id'], []).append(r['image_path'])
        
    backup = []
    for row in rows:
        p = serialize_property(row)
        p['images'] = images_map.get(row['id'], [])
        backup.append(p)
        
    conn.close()
    return jsonify(backup)

@app.route('/api/admin/restore', methods=['POST'])
def admin_restore():
    data = request.json # List of property objects
    if not isinstance(data, list):
        return jsonify({"error": "Invalid format"}), 400
        
    conn = get_db_connection()
    c = conn.cursor()
    # Optional: Clear existing first? User might want to append or replace.
    # We'll just append for safety, but check if user wants to clear.
    clear_first = request.args.get('clear', '0') == '1'
    if clear_first:
        c.execute('DELETE FROM property_images')
        c.execute('DELETE FROM properties')
        
    for p in data:
        c.execute('''INSERT INTO properties 
                     (title_en, title_zh, title_cn, title_jp, location_en, location_zh, location_cn, location_jp, price, type, beds, baths, sqft, image, features, video, area, lat, lng, is_premium, views, rating, comments_count, year_built, tax_annual, walk_score, transit_score)
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)''',
                  (p['title'].get('en'), p['title'].get('zh'), p['title'].get('cn'), p['title'].get('jp'),
                   p['location'].get('en'), p['location'].get('zh'), p['location'].get('cn'), p['location'].get('jp'),
                   p['price'], p['type'], p['beds'], p['baths'], p['sqft'], p['image'],
                   p.get('features', ''), p.get('video', ''), p.get('area', 'HK'),
                   p.get('lat'), p.get('lng'), p.get('is_premium', 0), p.get('views', 0),
                   p.get('rating', 0), p.get('comments_count', 0), p.get('year_built', 2000),
                   p.get('tax_annual', 0.0), p.get('walk_score', 80), p.get('transit_score', 75)))
        
        last_id = c.lastrowid
        if 'images' in p and isinstance(p['images'], list):
            for img in p['images']:
                c.execute('INSERT INTO property_images (property_id, image_path) VALUES (?, ?)', (last_id, img))
                
    conn.commit()
    conn.close()
    return jsonify({"status": "success", "count": len(data)})

@app.route('/api/upload', methods=['POST'])
def upload_file():
    try:
        # Fallback: support base64 JSON upload
        data = request.get_json(force=True)
        if not data or 'image' not in data:
            return jsonify({"error": "No image provided"}), 400

        image_data = data['image']
        original_name = data.get('filename', '')
        ext = os.path.splitext(original_name)[1] if original_name else '.png'
        if not ext:
            ext = '.png'
        filename = str(uuid.uuid4()) + ext

        if ',' in image_data:
            image_data = image_data.split(',')[1]

        save_path = os.path.join(UPLOAD_DIR, filename)
        with open(save_path, "wb") as f:
            f.write(base64.b64decode(image_data))
        return jsonify({"url": "/uploads/" + filename})
    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

# ── Room Wanted APIs ────────────────────────────────────────────────────────
@app.route('/api/wanted', methods=['GET'])
def get_room_wanted():
    conn = get_db_connection()
    rows = conn.execute('''SELECT room_wanted.*, users.name as user_name, users.email as user_email 
                          FROM room_wanted 
                          LEFT JOIN users ON room_wanted.user_id = users.id 
                          ORDER BY room_wanted.id DESC''').fetchall()
    wanted = [dict(row) for row in rows]
    conn.close()
    return jsonify(wanted)

@app.route('/api/wanted', methods=['POST'])
def add_room_wanted():
    data = request.json
    conn = get_db_connection()
    try:
        conn.execute('''INSERT INTO room_wanted 
                     (user_id, title, location, budget, description, contact_info, move_in_date, duration) 
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?)''',
                     (data.get('user_id'), data['title'], data['location'], data['budget'], 
                      data['description'], data['contact_info'], data.get('move_in_date'), data.get('duration')))
        conn.commit()
        return jsonify({"status": "success"}), 201
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 400
    finally:
        conn.close()

@app.route('/api/wanted/<int:wanted_id>', methods=['DELETE'])
def delete_room_wanted(wanted_id):
    conn = get_db_connection()
    conn.execute('DELETE FROM room_wanted WHERE id = ?', (wanted_id,))
    conn.commit()
    conn.close()
    return jsonify({"status": "success"})

@app.route('/api/users', methods=['GET'])
def get_users():
    conn = get_db_connection()
    c = conn.cursor()
    c.execute('SELECT id, email, name, created_at FROM users ORDER BY id DESC')
    rows = c.fetchall()
    users = [dict(row) for row in rows]
    conn.close()
    return jsonify(users)

# Helper to serialize a property row to a dict
def serialize_property(row):
    row_dict = dict(row)
    return {
        'id': row_dict['id'],
        'title': {
            'en': row_dict.get('title_en', ''), 
            'zh': row_dict.get('title_zh', ''),
            'cn': row_dict.get('title_cn', ''),
            'jp': row_dict.get('title_jp', '')
        },
        'location': {
            'en': row_dict.get('location_en', ''), 
            'zh': row_dict.get('location_zh', ''),
            'cn': row_dict.get('location_cn', ''),
            'jp': row_dict.get('location_jp', '')
        },
        'price': row_dict.get('price', ''),
        'type': row_dict.get('type', ''),
        'beds': row_dict.get('beds', 0),
        'baths': row_dict.get('baths', 0),
        'sqft': row_dict.get('sqft', 0),
        'image': row_dict.get('image', ''),
        'features': row_dict.get('features', ''),
        'video': row_dict.get('video', ''),
        'area': row_dict.get('area', 'HK'),
        'lat': row_dict.get('lat'),
        'lng': row_dict.get('lng'),
        'is_premium': row_dict.get('is_premium', 0),
        'views': row_dict.get('views', 0),
        'rating': row_dict.get('rating', 0.0),
        'comments_count': row_dict.get('comments_count', 0),
        'year_built': row_dict.get('year_built', 2022),
        'tax_annual': row_dict.get('tax_annual', 0.0),
        'walk_score': row_dict.get('walk_score', 80),
        'transit_score': row_dict.get('transit_score', 75),
        'price_history': row_dict.get('price_history', '[{"date": "2023-01-01", "price": "4,500,000"}]'),
        'created_at': row_dict.get('created_at', '')
    }

# NEW ENRICHED BACKEND FUNCTIONS
@app.route('/api/properties/similar/<int:prop_id>')
def get_similar_properties(prop_id):
    conn = get_db_connection()
    target = conn.execute('SELECT * FROM properties WHERE id = ?', (prop_id,)).fetchone()
    if not target:
        conn.close()
        return jsonify([])
    
    similar = conn.execute('SELECT * FROM properties WHERE id != ? AND (type = ? OR area = ?) LIMIT 4',
                         (prop_id, target['type'], target['area'])).fetchall()
    
    res = [serialize_property(row) for row in similar]
    conn.close()
    return jsonify(res)

@app.route('/api/properties/trending')
def get_trending_properties():
    conn = get_db_connection()
    trending = conn.execute('SELECT * FROM properties ORDER BY views DESC, is_premium DESC LIMIT 6').fetchall()
    res = [serialize_property(row) for row in trending]
    conn.close()
    return jsonify(res)

@app.route('/api/user/preferences', methods=['GET', 'POST'])
def user_preferences():
    if request.method == 'POST':
        data = request.json
        return jsonify({"status": "saved", "preferences": data})
    return jsonify({"theme": "dark", "language": "zh", "notifications": True})

@app.route('/api/stats/summary')
def get_stats_summary():
    conn = get_db_connection()
    counts = conn.execute('SELECT type, COUNT(*) as count FROM properties GROUP BY type').fetchall()
    total = sum([(c['count'] or 0) for c in counts])
    conn.close()
    return jsonify({
        "total": total,
        "by_type": {c['type']: c['count'] for c in counts}
    })

# --- Regional Routes ---
@app.route('/jp/')
@app.route('/jp/<path:path>')
def serve_jp(path='index.html'):
    return send_from_directory('jp', path)

@app.route('/usa/')
@app.route('/usa/<path:path>')
def serve_usa(path='index.html'):
    return send_from_directory('usa', path)

@app.route('/cn/')
@app.route('/cn/<path:path>')
def serve_cn(path='index.html'):
    return send_from_directory('cn', path)

@app.route('/<path:path>', methods=['GET', 'HEAD', 'OPTIONS'])
def serve_static(path):
    if request.method == 'OPTIONS':
        return app.make_default_options_response()
    
    file_path = os.path.join(app.root_path, path)
    if os.path.exists(file_path):
        return send_from_directory(app.root_path, path)
    return render_404(404)

@app.errorhandler(404)
def render_404(e):
    return send_from_directory(app.root_path, '404.html'), 404

@app.route('/api/admin/restore-standard-data', methods=['POST'])
def restore_standard_data():
    conn = get_db_connection()
    try:
        # Clear existing data
        conn.execute('DELETE FROM property_images')
        conn.execute('DELETE FROM properties')
        
        for p in STANDARD_PROPERTIES:
            # Insert property
            res = conn.execute('''INSERT INTO properties 
                        (title_en, title_zh, title_cn, title_jp, location_en, location_zh, location_cn, location_jp, price, type, beds, baths, sqft, image, features, area, lat, lng, is_premium, user_id, created_at)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))''', 
                        (p['title_en'], p['title_zh'], p.get('title_cn'), p.get('title_jp'), p['location_en'], p['location_zh'], p.get('location_cn'), p.get('location_jp'), p['price'], p['type'], p['beds'], p['baths'], p['sqft'], p['image'], p['features'], p['area'], p['lat'], p['lng'], p['is_premium'], p['user_id']))
            
            prop_id = res.lastrowid
            
            # Insert gallery
            for img in p.get('gallery', []):
                conn.execute('INSERT INTO property_images (property_id, image_path) VALUES (?, ?)', (prop_id, img))
        
        conn.commit()
        return jsonify({"status": "success", "message": "Restored 2 standard properties"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500
    finally:
        conn.close()

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8000))
    print(f"Starting Flask server on port {port}...")
    app.run(host='0.0.0.0', port=port, debug=True)
