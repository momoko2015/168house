import sqlite3
import random
import os

DB_FILE = 'properties.db'

def create_36_properties():
    # Remove existing database to start fresh
    if os.path.exists(DB_FILE):
        os.remove(DB_FILE)
        print(f"Removed old {DB_FILE}")

    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()

    # Re-create tables
    c.execute('''CREATE TABLE IF NOT EXISTS properties
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                  title_en TEXT, title_zh TEXT,
                  location_en TEXT, location_zh TEXT,
                  price TEXT, type TEXT, beds INTEGER, baths INTEGER, sqft INTEGER, image TEXT,
                  features TEXT, video TEXT, area TEXT DEFAULT 'HK',
                  lat REAL, lng REAL, is_premium INTEGER DEFAULT 0,
                  views INTEGER DEFAULT 0, rating REAL DEFAULT 0.0,
                  comments_count INTEGER DEFAULT 0)''')

    c.execute('''CREATE TABLE IF NOT EXISTS property_images
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                  property_id INTEGER,
                  image_path TEXT,
                  FOREIGN KEY(property_id) REFERENCES properties(id))''')

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

    locations = [
        ("Central", "中環", 22.28, 114.15),
        ("Tsim Sha Tsui", "尖沙咀", 22.29, 114.17),
        ("Mong Kok", "旺角", 22.31, 114.16),
        ("Causeway Bay", "銅鑼灣", 22.28, 114.18),
        ("Shatin", "沙田", 22.38, 114.18),
        ("Tuen Mun", "屯門", 22.39, 113.97),
        ("Sai Kung", "西貢", 22.38, 114.27),
        ("Repulse Bay", "淺水灣", 22.23, 114.19)
    ]

    prop_types = ["apartment", "house", "villa", "penthouse"]
    images = [
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1502672260266-1c1e52504431?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=800&q=80"
    ]

    print("Generating 36 properties...")
    for i in range(36):
        loc = random.choice(locations)
        p_type = random.choice(prop_types)
        img = random.choice(images)
        is_rent = random.choice([True, False])
        
        price_val = random.randint(15000, 80000) if is_rent else random.randint(5000000, 50000000)
        price_str = f"HK$ {price_val:,}/mo" if is_rent else f"HK$ {price_val:,}"
        
        deal_type = "rent" if is_rent else "sale"
        
        c.execute('''INSERT INTO properties 
                     (title_en, title_zh, location_en, location_zh, price, type, beds, baths, sqft, image, features, area, lat, lng, is_premium, views, rating, comments_count)
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)''',
                  (f"Elite {p_type.capitalize()} {i+1}", f"精選{p_type} {i+1}", 
                   loc[0], loc[1], price_str, deal_type, random.randint(1, 5), random.randint(1, 4), 
                   random.randint(400, 3000), img, "Sea View, Near MTR", "HK", 
                   loc[2] + random.uniform(-0.01, 0.01), loc[3] + random.uniform(-0.01, 0.01),
                   1 if i < 5 else 0, random.randint(100, 5000), round(random.uniform(3.5, 5.0), 1), random.randint(0, 50)))

    conn.commit()
    conn.close()
    print("Done! 36 properties created.")

if __name__ == "__main__":
    create_36_properties()
