import json
import sqlite3
import os
import uuid
import base64
from http.server import SimpleHTTPRequestHandler, HTTPServer
import urllib.parse
import sys


DB_FILE = 'properties.db'
UPLOAD_DIR = 'uploads'

if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)

def init_db():
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    # Main properties table
    c.execute('''CREATE TABLE IF NOT EXISTS properties
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                  title_en TEXT, title_zh TEXT,
                  location_en TEXT, location_zh TEXT,
                  price TEXT, type TEXT, beds INTEGER, baths INTEGER, sqft INTEGER, image TEXT,
                  features TEXT, video TEXT, area TEXT, lat REAL, lng REAL, is_premium INTEGER DEFAULT 0,
                  views INTEGER DEFAULT 0, rating REAL DEFAULT 0.0, comments_count INTEGER DEFAULT 0)''')
    
    # Inquiries table
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
    
    # New table for multiple images
    c.execute('''CREATE TABLE IF NOT EXISTS property_images
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                  property_id INTEGER,
                  image_path TEXT,
                  FOREIGN KEY(property_id) REFERENCES properties(id))''')
    
    # Ensure new columns exist for existing databases
    c.execute("PRAGMA table_info(properties)")
    columns = [row[1] for row in c.fetchall()]
    if 'video' not in columns:
        c.execute("ALTER TABLE properties ADD COLUMN video TEXT")
    if 'area' not in columns:
        c.execute("ALTER TABLE properties ADD COLUMN area TEXT DEFAULT 'HK'")
    if 'lng' not in columns:
        c.execute("ALTER TABLE properties ADD COLUMN lng REAL")
    if 'is_premium' not in columns:
        c.execute("ALTER TABLE properties ADD COLUMN is_premium INTEGER DEFAULT 0")
    if 'views' not in columns:
        c.execute("ALTER TABLE properties ADD COLUMN views INTEGER DEFAULT 0")
    if 'rating' not in columns:
        c.execute("ALTER TABLE properties ADD COLUMN rating REAL DEFAULT 0.0")
    if 'comments_count' not in columns:
        c.execute("ALTER TABLE properties ADD COLUMN comments_count INTEGER DEFAULT 0")
    
    # Check inquiries columns
    c.execute("PRAGMA table_info(inquiries)")
    inq_columns = [row[1] for row in c.fetchall()]
    if 'is_read' not in inq_columns:
        c.execute("ALTER TABLE inquiries ADD COLUMN is_read INTEGER DEFAULT 0")
    
    conn.commit()
    conn.close()

class PropertyHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_GET(self):
        try:
            print(f"GET Request: {self.path}")
            
            # Handle API Property Count
            if self.path == '/api/properties/count':
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                conn = sqlite3.connect(os.path.join(os.path.dirname(__file__), DB_FILE))
                count = conn.execute('SELECT COUNT(*) FROM properties').fetchone()[0]
                conn.close()
                self.wfile.write(json.dumps({'count': count}).encode())
                return

            # Handle API Properties List
            if self.path.startswith('/api/properties'):
                query = urllib.parse.urlparse(self.path).query
                params = urllib.parse.parse_qs(query)
                limit = int(params.get('limit', [10000])[0])
                offset = int(params.get('offset', [0])[0])

                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                
                conn = sqlite3.connect(os.path.join(os.path.dirname(__file__), DB_FILE))
                c = conn.cursor()
                
                c.execute('SELECT * FROM properties ORDER BY is_premium DESC, id DESC LIMIT ? OFFSET ?', (limit, offset))
                rows = c.fetchall()
                
                prop_ids = [row[0] for row in rows]
                images_by_prop = {}
                if prop_ids:
                    placeholders = ','.join(['?'] * len(prop_ids))
                    c.execute(f'SELECT property_id, image_path FROM property_images WHERE property_id IN ({placeholders})', prop_ids)
                    img_rows = c.fetchall()
                    for pid, path in img_rows:
                        if pid not in images_by_prop:
                            images_by_prop[pid] = []
                        images_by_prop[pid].append(path)

                properties = []
                for row in rows:
                    prop_id = row[0]
                    properties.append({
                        'id': prop_id,
                        'title': {'en': row[1], 'zh': row[2]},
                        'location': {'en': row[3], 'zh': row[4]},
                        'price': row[5],
                        'type': row[6],
                        'beds': row[7],
                        'baths': row[8],
                        'sqft': row[9],
                        'image': row[10],
                        'images': images_by_prop.get(prop_id, []),
                        'features': row[11],
                        'video': row[12],
                        'area': row[13],
                        'lat': row[14],
                        'lng': row[15],
                        'is_premium': row[16],
                        'views': row[17],
                        'rating': row[18],
                        'comments_count': row[19]
                    })
                conn.close()
                self.wfile.write(json.dumps(properties).encode())
                return

            # Handle API Admin Stats
            if self.path == '/api/admin/stats':
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                conn = sqlite3.connect(os.path.join(os.path.dirname(__file__), DB_FILE))
                c = conn.cursor()
                prop_count = c.execute('SELECT COUNT(*) FROM properties').fetchone()[0]
                inq_count = c.execute('SELECT COUNT(*) FROM inquiries').fetchone()[0]
                unread_inq = c.execute('SELECT COUNT(*) FROM inquiries WHERE is_read = 0').fetchone()[0]
                premium_count = c.execute('SELECT COUNT(*) FROM properties WHERE is_premium = 1').fetchone()[0]
                conn.close()
                self.wfile.write(json.dumps({
                    'properties': prop_count,
                    'inquiries': inq_count,
                    'unread_inquiries': unread_inq,
                    'premium_properties': premium_count
                }).encode())
                return

            # Handle API Inquiries
            if self.path == '/api/inquiries':
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                conn = sqlite3.connect(os.path.join(os.path.dirname(__file__), DB_FILE))
                c = conn.cursor()
                c.execute('''SELECT inquiries.*, properties.title_en, properties.title_zh 
                             FROM inquiries 
                             LEFT JOIN properties ON inquiries.property_id = properties.id 
                             ORDER BY inquiries.id DESC''')
                rows = c.fetchall()
                inquiries = []
                for row in rows:
                    inquiries.append({
                        'id': row[0],
                        'property_id': row[1],
                        'name': row[2],
                        'email': row[3],
                        'phone': row[4],
                        'message': row[5],
                        'date': row[6],
                        'is_read': row[7],
                        'property_title': {'en': row[8] or 'Deleted Property', 'zh': row[9] or '已刪除樓盤'}
                    })
                conn.close()
                self.wfile.write(json.dumps(inquiries).encode())
                return

            # Static file serving
            super().do_GET()
            
        except Exception as e:
            print(f"Error handling GET {self.path}: {str(e)}")
            import traceback
            traceback.print_exc()
            self.send_error(500, str(e))

    def do_POST(self):
        if self.path == '/api/upload':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            
            try:
                # Handle base64 upload for simplicity in this demo environment
                data = json.loads(post_data.decode('utf-8'))
                image_data = data['image']
                filename = data.get('filename', str(uuid.uuid4()) + '.png')
                
                if ',' in image_data:
                    image_data = image_data.split(',')[1]
                
                with open(os.path.join(UPLOAD_DIR, filename), "wb") as f:
                    f.write(base64.b64decode(image_data))
                
                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"url": "/uploads/" + filename}).encode())
            except Exception as e:
                self.send_error(500, str(e))
        elif self.path == '/api/properties':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            
            conn = sqlite3.connect(DB_FILE)
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
            
            # Handle additional images if provided
            if 'images' in data and isinstance(data['images'], list):
                for img_path in data['images']:
                    c.execute('INSERT INTO property_images (property_id, image_path) VALUES (?, ?)', (last_id, img_path))
            
            conn.commit()
            conn.close()
            
            self.send_response(201)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"status": "success", "id": last_id}).encode())
        elif self.path == '/api/inquiries':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            
            import datetime
            now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

            conn = sqlite3.connect(DB_FILE)
            c = conn.cursor()
            c.execute('''INSERT INTO inquiries (property_id, name, email, phone, message, date) 
                         VALUES (?, ?, ?, ?, ?, ?)''',
                      (data['property_id'], data['name'], data['email'], 
                       data.get('phone', ''), data['message'], now))
            conn.commit()
            conn.close()
            
            self.send_response(201)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'status': 'success'}).encode())
        elif self.path.startswith('/api/properties/') and self.path.endswith('/promote'):
            prop_id = int(self.path.split('/')[-2])
            conn = sqlite3.connect(DB_FILE)
            c = conn.cursor()
            c.execute('UPDATE properties SET is_premium = 1 WHERE id = ?', (prop_id,))
            conn.commit()
            conn.close()
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"status": "success"}).encode())
        else:
            self.send_error(404)
            
    def do_DELETE(self):
        if self.path.startswith('/api/properties/'):
            prop_id = int(self.path.split('/')[-1])
            conn = sqlite3.connect(DB_FILE)
            c = conn.cursor()
            # Delete linked images first
            c.execute('DELETE FROM property_images WHERE property_id = ?', (prop_id,))
            # Delete property
            c.execute('DELETE FROM properties WHERE id = ?', (prop_id,))
            conn.commit()
            conn.close()
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"status": "success"}).encode())
        else:
            self.send_error(404)

    def do_PUT(self):
        if self.path.startswith('/api/properties/'):
            prop_id = int(self.path.split('/')[-1])
            content_length = int(self.headers['Content-Length'])
            put_data = self.rfile.read(content_length)
            data = json.loads(put_data.decode('utf-8'))
            
            conn = sqlite3.connect(DB_FILE)
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
            
            # Update gallery if provided
            if 'images' in data and isinstance(data['images'], list):
                # Clear old gallery references
                c.execute('DELETE FROM property_images WHERE property_id = ?', (prop_id,))
                for img_path in data['images']:
                    c.execute('INSERT INTO property_images (property_id, image_path) VALUES (?, ?)', (prop_id, img_path))
            
            conn.commit()
            conn.close()
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"status": "success"}).encode())
        elif self.path.startswith('/api/inquiries/'):
            inq_id = int(self.path.split('/')[-1])
            content_length = int(self.headers['Content-Length'])
            put_data = self.rfile.read(content_length)
            data = json.loads(put_data.decode('utf-8'))
            
            conn = sqlite3.connect(DB_FILE)
            c = conn.cursor()
            c.execute('UPDATE inquiries SET is_read = ? WHERE id = ?', (data.get('is_read', 1), inq_id))
            conn.commit()
            conn.close()
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"status": "success"}).encode())
        else:
            self.send_error(404)

if __name__ == '__main__':
    init_db()
    server_address = ('', 8000)
    httpd = HTTPServer(server_address, PropertyHandler)
    print("Serving with SQLite on port 8000...")
    httpd.serve_forever()
