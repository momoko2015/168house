import sqlite3
import os

DB_FILE = 'properties.db'
try:
    print("Connecting...")
    conn = sqlite3.connect(DB_FILE, timeout=5)
    c = conn.cursor()
    print("Counting...")
    c.execute('SELECT COUNT(*) FROM properties')
    print(f"Total properties: {c.fetchone()[0]}")
    conn.close()
    print("Success")
except Exception as e:
    print(f"Failed: {e}")
