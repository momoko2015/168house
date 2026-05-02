import sqlite3
import json
import os

def find_by_images():
    dbs = [
        r'C:\Users\lily\ai code\property_app\properties.db',
        r'C:\Users\lily\ai code\properties.db',
        # Add more if found
    ]
    
    images = ['ava 1.jpeg', 'IMG_7121.jpeg']
    found = []
    
    for db_path in dbs:
        if not os.path.exists(db_path): continue
        print(f"Checking {db_path}...")
        conn = sqlite3.connect(db_path)
        conn.row_factory = sqlite3.Row
        
        # Check properties table
        rows = conn.execute("SELECT * FROM properties").fetchall()
        for row in rows:
            img = (row['image'] or "")
            if any(i in img for i in images):
                p = dict(row)
                p['db_source'] = db_path
                found.append(p)
                
        # Check property_images table
        rows = conn.execute("SELECT property_id, image_path FROM property_images").fetchall()
        for row in rows:
            img = (row['image_path'] or "")
            if any(i in img for i in images):
                # Fetch the property
                prop = conn.execute("SELECT * FROM properties WHERE id = ?", (row['property_id'],)).fetchone()
                if prop:
                    p = dict(prop)
                    p['db_source'] = db_path
                    found.append(p)
                    
        conn.close()
        
    print(json.dumps(found, indent=2))

if __name__ == "__main__":
    find_by_images()
