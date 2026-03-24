-- Database Schema for Property App

-- Main properties table
CREATE TABLE IF NOT EXISTS properties (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title_en TEXT,
    title_zh TEXT,
    location_en TEXT,
    location_zh TEXT,
    price TEXT,
    type TEXT,
    beds INTEGER,
    baths INTEGER,
    sqft INTEGER,
    image TEXT, -- Main cover image path or URL
    features TEXT,
    video TEXT,
    area TEXT DEFAULT 'HK'
);

-- Table for additional gallery images
CREATE TABLE IF NOT EXISTS property_images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    property_id INTEGER,
    image_path TEXT,
    FOREIGN KEY(property_id) REFERENCES properties(id)
);

-- Example Insert (Optional)
-- INSERT INTO properties (title_zh, location_zh, price, type, beds, baths, sqft, area) 
-- VALUES ('旺角地鐵上蓋', '旺角', 'HK$ 15,000/mo', 'rent', 2, 1, 450, 'HK');
