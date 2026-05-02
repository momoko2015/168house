import sqlite3
import json

def find_properties():
    conn = sqlite3.connect('properties_live_backup.db')
    conn.row_factory = sqlite3.Row
    # Use simpler query to avoid escaping issues
    rows = conn.execute("SELECT DISTINCT property_id FROM property_images WHERE image_path LIKE '%ava%' OR image_path LIKE '%IMG%'").fetchall()
    found = []
    for row in rows:
        p = conn.execute("SELECT * FROM properties WHERE id = ?", (row[0],)).fetchone()
        if p:
            found.append(dict(p))
            
    # Also fetch images for these properties
    for p in found:
        p_id = p['id']
        images = conn.execute("SELECT image_path FROM property_images WHERE property_id = ?", (p_id,)).fetchall()
        p['images'] = [img[0] for img in images]
        
    print(json.dumps(found, indent=2))
    conn.close()

if __name__ == "__main__":
    find_properties()
