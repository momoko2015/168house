"""
Setup script for AI development environment
"""
import subprocess
import sys
import os


def install_requirements():
    """Install required packages"""
    print("Installing requirements...")
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
        print("Requirements installed successfully!")
    except subprocess.CalledProcessError as e:
        print(f"Error installing requirements: {e}")
        return False
    return True


def create_directories():
    """Create necessary directories"""
    directories = ["data", "models", "logs", "outputs"]
    for directory in directories:
        os.makedirs(directory, exist_ok=True)
        print(f"Created directory: {directory}")


def setup_env_file():
    """Setup .env file if it doesn't exist"""
    if not os.path.exists(".env"):
        if os.path.exists(".env.example"):
            import shutil
            shutil.copy(".env.example", ".env")
            print("Created .env file from .env.example")
            print("Please update .env with your API keys!")
        else:
            print("Warning: .env.example not found")
    else:
        print(".env file already exists")


def main():
    """Main setup function"""
    print("=" * 50)
    print("AI Development Environment Setup")
    print("=" * 50)
    
    # Create directories
    print("\n1. Creating directories...")
    create_directories()
    
    # Setup environment file
    print("\n2. Setting up environment file...")
    setup_env_file()
    
    # Install requirements
    print("\n3. Installing requirements...")
    install_requirements()
    
    print("\n" + "=" * 50)
    print("Setup completed!")
    print("=" * 50)
    print("\nNext steps:")
    print("1. Update .env file with your API keys")
    print("2. Run any of the example scripts:")
    print("   - python chatbot.py")
    print("   - python ml_model.py")
    print("   - python neural_network.py")
    print("   - python image_classifier.py")


if __name__ == "__main__":
    main()


