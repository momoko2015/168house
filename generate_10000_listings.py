
import sqlite3
import random
import json
import os

DB_FILE = 'c:/Users/lily/ai code/property_app/properties.db'

# Data for generation
districts = [
    ("Central", "中環"), ("Mid-Levels", "半山區"), ("Repulse Bay", "淺水灣"),
    ("Tsim Sha Tsui", "尖沙咀"), ("Mong Kok", "旺角"), ("West Kowloon", "西九龍"),
    ("Causeway Bay", "銅鑼灣"), ("Wan Chai", "灣仔"), ("North Point", "北角"),
    ("Quarry Bay", "鰂魚涌"), ("Sha Tin", "沙田"), ("Tai Po", "大埔"),
    ("Tseung Kwan O", "將軍澳"), ("Sai Kung", "西貢"), ("Clear Water Bay", "清水灣"),
    ("Yuen Long", "元朗"), ("Tuen Mun", "屯門"), ("Ma On Shan", "馬鞍山"),
    ("Discovery Bay", "愉景灣"), ("Tung Chung", "東涌"), ("Ap Lei Chau", "鴨脷洲"),
    ("Aberdeen", "香港仔"), ("Sheung Wan", "上環"), ("Happy Valley", "跑馬地"),
    ("Pok Fu Lam", "薄扶林"), ("Jardine's Lookout", "渣甸山")
]

suffixes = [
    ("Mansion", "大廈"), ("Garden", "花園"), ("Court", "中心"), 
    ("Towers", "大廈"), ("Plaza", "廣場"), ("Manor", "山莊"),
    ("Villa", "別墅"), ("Penthouse", "特色屋"), ("Heights", "天峰"),
    ("Estate", "屋苑"), ("Terrace", "台"), ("Point", "角")
]

prefixes = [
    ("The", ""), ("Royal", "御"), ("Imperial", "皇"), ("Golden", "金"),
    ("Silver", "銀"), ("Grand", "盛世"), ("Pacific", "太平洋"), ("Ocean", "海"),
    ("Elite", "菁英"), ("Green", "翠"), ("City", "城市"), ("Metro", "都會")
]

images = [
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1502672260266-1c1e52504431?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?auto=format&fit=crop&w=800&q=80"
]

features_pool = ["Sea View", "Near MTR", "Renovated", "Quiet", "High Floor", "Clubhouse", "Balcony", "Parking"]
features_pool_zh = ["海景", "鄰近地鐵", "高級裝修", "寧靜舒適", "開揚景觀", "屋苑會所", "露台", "連車位"]

def generate_listing():
    district = random.choice(districts)
    suffix = random.choice(suffixes)
    prefix = random.choice(prefixes)
    
    # Name construction
    if random.random() > 0.5:
        title_en = f"{prefix[0]} {district[0]} {suffix[0]}"
        title_zh = f"{district[1]}{prefix[1]}{suffix[1]}"
    else:
        title_en = f"{district[0]} {suffix[0]}"
        title_zh = f"{district[1]}{suffix[1]}"
        
    prop_type = random.choice(["apartment", "house", "villa", "penthouse"])
    deal_type = random.choice(["rent", "sale"])
    
    if deal_type == "rent":
        price_val = random.randint(15000, 150000)
        price_str = f"HK$ {price_val:,}/mo"
    else:
        price_val = random.randint(5000000, 200000000)
        price_str = f"HK$ {price_val:,}"
        
    beds = random.randint(1, 5)
    baths = random.randint(1, 4)
    sqft = random.randint(300, 4000)
    
    # 3-4 random features
    num_f = random.randint(2, 4)
    f_indices = random.sample(range(len(features_pool)), num_f)
    f_en = ", ".join([features_pool[i] for i in f_indices])
    f_zh = ",".join([features_pool_zh[i] for i in f_indices])
    
    # Coordinates (Approx HK bounds)
    lat = random.uniform(22.25, 22.45)
    lng = random.uniform(113.9, 114.25)
    
    # New stats
    views = random.randint(50, 5000)
    rating = round(random.uniform(3.5, 5.0), 1)
    comments = random.randint(0, 50)
    is_premium = 1 if random.random() < 0.05 else 0
    
    return (
        title_en, title_zh, district[0], district[1],
        price_str, prop_type, beds, baths, sqft,
        random.choice(images), f_en + " | " + f_zh, "", "HK", lat, lng, 
        is_premium, views, rating, comments
    )

def bulk_insert(count=10000):
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    
    print(f"Generating {count} properties...")
    # Clear existing to ensure all 10k match the new type schema
    c.execute('DELETE FROM properties')
    
    listings = [generate_listing() for _ in range(count)]
    
    c.executemany('''INSERT INTO properties 
                     (title_en, title_zh, location_en, location_zh, price, type, beds, baths, sqft, image, features, video, area, lat, lng, is_premium, views, rating, comments_count)
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)''', 
                   listings)
    
    conn.commit()
    conn.close()
    print("Insertion complete!")

if __name__ == "__main__":
    bulk_insert(10000)
