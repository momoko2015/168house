import sqlite3
import json

DB_FILE = 'properties.db'
conn = sqlite3.connect(DB_FILE)
c = conn.cursor()

titles = ["沙田太平洋山莊", "鰂魚涌大廈", "將軍澳太平洋特色屋"]
for title in titles:
    c.execute('SELECT id, title_zh, image FROM properties WHERE title_zh = ?', (title,))
    row = c.fetchone()
    if row:
        print(f"ID: {row[0]}, Title: {row[1]}, Image: {row[2]}")
    else:
        # Try partial match if exact match fails
        c.execute('SELECT id, title_zh, image FROM properties WHERE title_zh LIKE ?', ('%' + title + '%',))
        row = c.fetchone()
        if row:
            print(f"ID: {row[0]}, Title: {row[1]} (Partial match), Image: {row[2]}")
        else:
            print(f"Title {title} not found.")

conn.close()
