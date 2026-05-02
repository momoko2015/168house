import sqlite3
import json
import os

def find_by_location():
    dbs = [
        r'C:\Users\lily\ai code\property_app\properties.db',
        r'C:\Users\lily\ai code\properties.db',
        r'C:\Users\lily\ai code\property_app\properties_live_backup.db',
        r'C:\Users\lily\ai code\168house_jp\properties.db'
    ]
    
    locations = ["深水埗", "沙田", "Sham Shui Po", "Sha Tin"]
    found = []
    
    for db_path in dbs:
        if not os.path.exists(db_path): continue
        print(f"Checking {db_path}...")
        conn = sqlite3.connect(db_path)
        conn.row_factory = sqlite3.Row
        
        rows = conn.execute("SELECT * FROM properties").fetchall()
        for row in rows:
            loc = (row['location_zh'] or "") + (row['location_en'] or "")
            if any(l in loc for l in locations):
                p = dict(row)
                p['db_source'] = db_path
                found.append(p)
                    
        conn.close()
        
    # Filter for non-generic titles
    real_props = [p for p in found if "Elite" not in p['title_en'] and "精選" not in p['title_zh']]
    
    print(json.dumps(real_props, indent=2))

if __name__ == "__main__":
    find_by_location()
