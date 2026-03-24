"""
Configuration file for AI development
"""
import os
from dotenv import load_dotenv

load_dotenv()


class Config:
    """Configuration class for AI development"""
    
    # API Keys
    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", os.getenv("GOOGLE_API_KEY", ""))
    ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY", "")
    HUGGINGFACE_API_KEY = os.getenv("HUGGINGFACE_API_KEY", "")
    
    # Model Configuration
    MODEL_PROVIDER = os.getenv("MODEL_PROVIDER", "google") # google or openai
    DEFAULT_MODEL = os.getenv("MODEL_NAME", "gemini-pro")
    MAX_TOKENS = int(os.getenv("MAX_TOKENS", "2048"))
    TEMPERATURE = float(os.getenv("TEMPERATURE", "0.7"))
    
    # Paths
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    DATA_DIR = os.getenv("DATA_DIR", os.path.join(BASE_DIR, "data"))
    MODEL_DIR = os.getenv("MODEL_DIR", os.path.join(BASE_DIR, "models"))
    LOG_DIR = os.getenv("LOG_DIR", os.path.join(BASE_DIR, "logs"))
    OUTPUT_DIR = os.path.join(BASE_DIR, "outputs")
    
    # ML Model Configuration
    RANDOM_STATE = 42
    TEST_SIZE = 0.2
    VALIDATION_SPLIT = 0.2
    
    # Neural Network Configuration
    DEFAULT_EPOCHS = 50
    DEFAULT_BATCH_SIZE = 32
    DEFAULT_LEARNING_RATE = 0.001
    
    # Image Processing
    DEFAULT_IMAGE_SIZE = (224, 224)
    DEFAULT_NUM_CLASSES = 10
    
    # API Configuration
    API_HOST = os.getenv("API_HOST", "0.0.0.0")
    API_PORT = int(os.getenv("API_PORT", "8000"))
    
    @classmethod
    def create_directories(cls):
        """Create necessary directories"""
        directories = [cls.DATA_DIR, cls.MODEL_DIR, cls.LOG_DIR, cls.OUTPUT_DIR]
        for directory in directories:
            os.makedirs(directory, exist_ok=True)
    
    @classmethod
    def validate(cls):
        """Validate configuration"""
        errors = []
        
        if not cls.OPENAI_API_KEY and os.path.exists(os.path.join(cls.BASE_DIR, "chatbot.py")):
            errors.append("OPENAI_API_KEY not set (required for chatbot)")
        
        if errors:
            print("Configuration Warnings:")
            for error in errors:
                print(f"  - {error}")
        
        return len(errors) == 0


# Initialize directories on import
Config.create_directories()


