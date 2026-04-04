import json
import sqlite3
import os
import uuid
import base64
from flask import Flask, request, jsonify, send_from_directory, abort
from datetime import datetime
import time

# Initialize Flask app to serve static files from the current directory
app = Flask(__name__, static_folder='.', static_url_path='')

DB_FILE = os.path.join(app.root_path, 'properties.db')
UPLOAD_DIR = os.path.join(app.root_path, 'uploads')

if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)

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
    
    conn.commit()
    conn.close()

# Initialize Database on Start
init_db()

def get_db_connection():
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    return conn

# CORS headers (Since original had Access-Control-Allow-Origin: *)
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

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
            "user": {"email": user['email'], "name": user['name'], "bio": user['bio']}
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

    reset_url = f"{request.url_root}login.html?token={reset_token}&email={to_email}"
    
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
          <p style="font-size: 12px; color: #888; text-align: center;">&copy; 2026 Elite Estates 168House</p>
        </div>
      </body>
    </html>
    """
    msg.attach(MIMEText(html, 'html'))
    
    try:
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(SMTP_USER, SMTP_PASS)
        server.send_raw_message(msg)
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
    
    conn = get_db_connection()
    c = conn.cursor()
    
    # Auto-delete expired listings: Free (14 days), Premium/Paid (90 days)
    c.execute('''DELETE FROM property_images WHERE property_id IN (
        SELECT id FROM properties WHERE (is_premium = 0 AND created_at < datetime('now', '-14 days')) OR (is_premium = 1 AND created_at < datetime('now', '-90 days'))
    )''')
    c.execute('''DELETE FROM properties WHERE (is_premium = 0 AND created_at < datetime('now', '-14 days')) OR (is_premium = 1 AND created_at < datetime('now', '-90 days'))''')
    conn.commit()

    rows = conn.execute('SELECT * FROM properties ORDER BY is_premium DESC, id DESC LIMIT ? OFFSET ?', (limit, offset)).fetchall()
    
    prop_ids = [row['id'] for row in rows]
    images_by_prop = {}
    if prop_ids:
        placeholders = ','.join(['?'] * len(prop_ids))
        img_rows = conn.execute(f'SELECT property_id, image_path FROM property_images WHERE property_id IN ({placeholders})', prop_ids).fetchall()
        for r in img_rows:
            images_by_prop.setdefault(r['property_id'], []).append(r['image_path'])

    properties = []
    for row in rows:
        properties.append({
            'id': row['id'],
            'title': {'en': row['title_en'], 'zh': row['title_zh']},
            'location': {'en': row['location_en'], 'zh': row['location_zh']},
            'price': row['price'],
            'type': row['type'],
            'beds': row['beds'],
            'baths': row['baths'],
            'sqft': row['sqft'],
            'image': row['image'],
            'images': images_by_prop.get(row['id'], []),
            'features': row['features'],
            'video': row['video'],
            'area': row['area'],
            'lat': row['lat'],
            'lng': row['lng'],
            'is_premium': row['is_premium'],
            'views': row['views'],
            'rating': row['rating'],
            'comments_count': row['comments_count']
        })
    conn.close()
    return jsonify(properties)

@app.route('/api/properties', methods=['POST'])
def add_property():
    data = request.json
    conn = get_db_connection()
    c = conn.cursor()
    c.execute('''INSERT INTO properties 
                 (title_en, title_zh, location_en, location_zh, price, type, beds, baths, sqft, image, features, video, area, lat, lng)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)''',
              (data['title']['en'], data['title']['zh'], 
               data['location']['en'], data['location']['zh'],
               data['price'], data['type'], data['beds'], data['baths'], data['sqft'], data['image'],
               data.get('features', ''), data.get('video', ''), data.get('area', 'HK'), 
               data.get('lat'), data.get('lng')))
    last_id = c.lastrowid
    
    if 'images' in data and isinstance(data['images'], list):
        for img_path in data['images']:
            c.execute('INSERT INTO property_images (property_id, image_path) VALUES (?, ?)', (last_id, img_path))
    
    conn.commit()
    conn.close()
    return jsonify({"status": "success", "id": last_id}), 201

@app.route('/api/properties/<int:prop_id>', methods=['PUT'])
def edit_property(prop_id):
    data = request.json
    conn = get_db_connection()
    c = conn.cursor()
    c.execute('''UPDATE properties 
                 SET title_en = ?, title_zh = ?, location_en = ?, location_zh = ?, 
                     price = ?, type = ?, beds = ?, baths = ?, sqft = ?, image = ?,
                     features = ?, video = ?, area = ?, lat = ?, lng = ?
                 WHERE id = ?''',
              (data['title']['en'], data['title']['zh'], 
               data['location']['en'], data['location']['zh'],
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
    conn.close()
    return jsonify({
        'properties': prop_count,
        'inquiries': inq_count,
        'unread_inquiries': unread_inq,
        'premium_properties': premium_count
    })

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

@app.route('/api/upload', methods=['POST'])
def upload_file():
    try:
        # Support multipart form upload
        if request.files and 'file' in request.files:
            f = request.files['file']
            ext = os.path.splitext(f.filename)[1] if f.filename else '.png'
            filename = str(uuid.uuid4()) + ext
            save_path = os.path.join(UPLOAD_DIR, filename)
            f.save(save_path)
            return jsonify({"url": "/uploads/" + filename})

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
        print(traceback.format_exc())
        return jsonify({"error": str(e)}), 500

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

@app.route('/<path:path>')
def serve_static(path):
    if os.path.exists(os.path.join(app.root_path, path)):
        return send_from_directory('.', path)
    return abort(404)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8000))
    print(f"Starting Flask server on port {port}...")
    app.run(host='0.0.0.0', port=port, debug=True)
