import json
import sqlite3
import os
import uuid
import base64
from flask import Flask, request, jsonify, send_from_directory, abort
from datetime import datetime

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

@app.route('/<path:path>')
def serve_static(path):
    if os.path.exists(os.path.join(app.root_path, path)):
        return send_from_directory('.', path)
    return abort(404)

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
    data = request.json
    try:
        image_data = data['image']
        filename = data.get('filename', str(uuid.uuid4()) + '.png')
        if ',' in image_data:
            image_data = image_data.split(',')[1]
        
        with open(os.path.join(UPLOAD_DIR, filename), "wb") as f:
            f.write(base64.b64decode(image_data))
        return jsonify({"url": "/uploads/" + filename})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8000))
    print(f"Starting Flask server on port {port}...")
    app.run(host='0.0.0.0', port=port, debug=True)
