
import sqlite3
import json

DB_FILE = 'c:/Users/lily/ai code/property_app/properties.db'

centraline_properties = [
    {
        "title": {"en": "The Masterpiece", "zh": "名鑄"},
        "location": {"en": "Tsim Sha Tsui", "zh": "尖沙咀"},
        "price": "HK$ 45,000,000",
        "type": "sale",
        "beds": 3,
        "baths": 2,
        "sqft": 1123,
        "image": "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
        "features": "Victoria Harbour View, High Floor, Luxury Interior",
        "area": "HK",
        "lat": 22.2988,
        "lng": 114.1722
    },
    {
        "title": {"en": "Taikoo Shing - Harbour View Mansion", "zh": "太古城 - 海景花園"},
        "location": {"en": "Quarry Bay", "zh": "鰂魚涌"},
        "price": "HK$ 18,500,000",
        "type": "sale",
        "beds": 3,
        "baths": 2,
        "sqft": 922,
        "image": "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80",
        "features": "Classic Estate, Near MTR, High Efficiency",
        "area": "HK",
        "lat": 22.2862,
        "lng": 114.2183
    },
    {
        "title": {"en": "Bel-Air on the Peak", "zh": "貝沙灣"},
        "location": {"en": "Cyberport", "zh": "數碼港"},
        "price": "HK$ 68,000/mo",
        "type": "rent",
        "beds": 4,
        "baths": 3,
        "sqft": 1650,
        "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
        "features": "Full Sea View, Clubhouse, Prestigious Address",
        "area": "HK",
        "lat": 22.2594,
        "lng": 114.1297
    },
    {
        "title": {"en": "Providence Bay", "zh": "天賦海灣"},
        "location": {"en": "Tai Po", "zh": "大埔"},
        "price": "HK$ 22,000,000",
        "type": "sale",
        "beds": 3,
        "baths": 2,
        "sqft": 1050,
        "image": "https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?auto=format&fit=crop&w=800&q=80",
        "features": "Quiet Environment, Modern Design, Open View",
        "area": "HK",
        "lat": 22.4275,
        "lng": 114.1956
    },
    {
        "title": {"en": "Manhattan Hill", "zh": "曼克頓山"},
        "location": {"en": "Lai Chi Kok", "zh": "荔枝角"},
        "price": "HK$ 35,000/mo",
        "type": "rent",
        "beds": 2,
        "baths": 1,
        "sqft": 750,
        "image": "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=800&q=80",
        "features": "Luxury Clubhouse, Skyline View, Convenient",
        "area": "HK",
        "lat": 22.3364,
        "lng": 114.1378
    }
]

def migrate():
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    
    for prop in centraline_properties:
        c.execute('''INSERT INTO properties 
                     (title_en, title_zh, location_en, location_zh, price, type, beds, baths, sqft, image, features, area, lat, lng)
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)''',
                  (prop['title']['en'], prop['title']['zh'], 
                   prop['location']['en'], prop['location']['zh'],
                   prop['price'], prop['type'], prop['beds'], prop['baths'], prop['sqft'], prop['image'],
                   prop['features'], prop['area'], prop['lat'], prop['lng']))
        print(f"Added {prop['title']['en']}")
        
    conn.commit()
    conn.close()

if __name__ == "__main__":
    migrate()
