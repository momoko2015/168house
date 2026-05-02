import json
import os

def check_json(filename):
    if not os.path.exists(filename): return
    print(f"--- {filename} ---")
    # Try different encodings
    for enc in ['utf-8', 'utf-16', 'utf-16le', 'cp1252']:
        try:
            with open(filename, 'rb') as f:
                content = f.read().decode(enc)
                print(f"Decoded with {enc}:")
                print(content[:500])
                break
        except Exception as e:
            print(f"Failed with {enc}: {e}")

if __name__ == "__main__":
    check_json('88loft_check.json')
    check_json('hk_check.json')
