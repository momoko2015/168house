import requests
import os
import glob
import json

# =============================================
# CONFIGURATION
# =============================================
USERNAME   = 'hkproperty'
TOKEN      = '1dfef1097a3ef8d73663deb0c8fcf56608abf9b0'
DOMAIN     = 'www.88loft.com'
SITE_DIR   = '/home/hkproperty/88loft'
BASE_URL   = f'https://www.pythonanywhere.com/api/v0/user/{USERNAME}/'
HEADERS    = {'Authorization': f'Token {TOKEN}'}

# List of files to upload (Root)
FILES_TO_UPLOAD = [
    "flask_app.py",
    "utils.js",
    "index.html",
    "hk.html",
    "login.html",
    "admin.html",
    "add.html",
    "edit.html",
    "property.html",
    "jp.html",
    "usa.html",
    "cn.html",
    "style.css",
    "app.js",
    "map.html",
    "payment.html",
    "wishlist.html",
    "reset.html",
    "manifest.json",
    "logo.png",
    "properties.db",
    "requirements.txt",
    "Procfile"
]

def upload_file(local_path, remote_path):
    url = BASE_URL + 'files/path' + remote_path
    if not os.path.exists(local_path):
        print(f"Skipping {local_path} (not found)")
        return False
    
    with open(local_path, 'rb') as f:
        files = {'content': f}
        response = requests.post(url, headers=HEADERS, files=files)
        if response.status_code in [200, 201]:
            print(f"Successfully uploaded {local_path} to {remote_path}")
            return True
        else:
            print(f"Failed to upload {local_path}: {response.status_code} {response.text}")
            return False

def reload_webapp():
    url = BASE_URL + f'webapps/{DOMAIN}/reload/'
    response = requests.post(url, headers=HEADERS)
    if response.status_code == 200:
        print(f"Successfully reloaded {DOMAIN}")
    else:
        print(f"Failed to reload {DOMAIN}: {response.status_code} {response.text}")

def upload_directory(local_dir, remote_dir):
    if not os.path.exists(local_dir):
        print(f"Skipping directory {local_dir} (not found)")
        return
    
    for root, dirs, files in os.walk(local_dir):
        # Create remote directory if it doesn't exist
        relative_path = os.path.relpath(root, local_dir)
        if relative_path == ".":
            current_remote_dir = remote_dir
        else:
            current_remote_dir = os.path.join(remote_dir, relative_path).replace('\\', '/')
        
        # Note: PA API creates directories automatically when a file is uploaded to a path
        # but we can also explicitly create if needed.
        
        for file in files:
            local_file_path = os.path.join(root, file)
            remote_file_path = os.path.join(current_remote_dir, file).replace('\\', '/')
            upload_file(local_file_path, remote_file_path)

if __name__ == "__main__":
    print("Starting deployment to 88loft.com...")
    
    # 1. Upload root files
    for file_name in FILES_TO_UPLOAD:
        local_path = file_name
        remote_path = f"{SITE_DIR}/{file_name}"
        upload_file(local_path, remote_path)
    
    # 2. Upload 'uploads' directory
    print("\nUploading 'uploads' directory...")
    upload_directory("uploads", f"{SITE_DIR}/uploads")
    
    # 3. Reload webapp
    print("\nReloading webapp...")
    reload_webapp()
    
    print("\nDeployment Complete!")
