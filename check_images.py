import sqlite3
import json

DB_FILE = 'properties.db'
conn = sqlite3.connect(DB_FILE)
c = conn.cursor()

# Check some properties with suspicious images
c.execute('SELECT id, title_zh, image FROM properties WHERE title_zh LIKE "%太平洋%" OR title_zh LIKE "%鰂魚涌%" LIMIT 10')
rows = c.fetchall()

print("Properties and their image URLs:")
for row in rows:
    print(f"ID: {row[0]}, Title: {row[1]}, Image: {row[2]}")

conn.close()
