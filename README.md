# AI Development Scripts for Cursor

A comprehensive collection of AI scripts and utilities for development in Cursor.

## 📁 Project Structure

```
ai code/
├── chatbot.py              # Conversational AI chatbot
├── ml_model.py             # Machine learning classification model
├── neural_network.py       # Neural network implementation
├── image_classifier.py     # Image classification model
├── ai_utilities.py         # Utility functions for AI development
├── api_server.py           # FastAPI server for AI models
├── config.py               # Configuration management
├── setup.py                # Setup script
├── requirements.txt        # Python dependencies
├── .env.example            # Environment variables template
└── README.md               # This file
```

## 🚀 Quick Start

### 1. Setup Environment

```bash
# Install dependencies
pip install -r requirements.txt

# Or run the setup script
python setup.py
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and add your API keys:

```bash
cp .env.example .env
```

Edit `.env` and add your OpenAI API key:
```
OPENAI_API_KEY=your_api_key_here
```

### 3. Run Examples

```bash
# Chatbot
python chatbot.py

# Machine Learning Model
python ml_model.py

# Neural Network
python neural_network.py

# Image Classifier
python image_classifier.py

# API Server
python api_server.py
```

## 📚 Scripts Overview

### 🤖 chatbot.py
Conversational AI chatbot using OpenAI API.

**Features:**
- Conversation history management
- System message configuration
- Save/load conversations
- Interactive chat interface

**Usage:**
```python
from chatbot import Chatbot

bot = Chatbot()
bot.add_system_message("You are a helpful assistant.")
response = bot.chat("Hello!")
print(response)
```

### 🧠 ml_model.py
Machine learning classification model using scikit-learn.

**Features:**
- Random Forest classifier
- Data preprocessing
- Model training and evaluation
- Save/load trained models

**Usage:**
```python
from ml_model import MLModel

model = MLModel()
X, y = model.create_sample_data()
model.train(X, y)
predictions = model.predict(new_data)
```

### 🧬 neural_network.py
Neural network implementation using TensorFlow/Keras.

**Features:**
- Customizable architecture
- Training history visualization
- Model save/load
- Support for binary and multi-class classification

**Usage:**
```python
from neural_network import NeuralNetwork

nn = NeuralNetwork(input_dim=10, hidden_layers=[64, 32], output_dim=1)
X, y = nn.create_sample_data()
nn.train(X, y, epochs=50)
predictions = nn.predict(new_data)
```

### 🖼️ image_classifier.py
Image classification using CNN and transfer learning.

**Features:**
- Simple CNN architecture
- Transfer learning (MobileNetV2, VGG16)
- Data augmentation
- Training visualization

**Usage:**
```python
from image_classifier import ImageClassifier

classifier = ImageClassifier(input_shape=(224, 224, 3), num_classes=10)
classifier.build_simple_cnn()
X, y = classifier.create_sample_data()
classifier.train(X, y)
```

### 🛠️ ai_utilities.py
Collection of utility functions for AI development.

**Features:**
- JSON/Pickle file operations
- Text preprocessing
- Metrics calculation
- Data loading and preprocessing
- Logging utilities

### 🌐 api_server.py
FastAPI server for deploying AI models as REST APIs.

**Features:**
- Chat endpoint
- Prediction endpoint
- Health check
- Interactive API documentation

**Usage:**
```bash
python api_server.py
# Visit http://localhost:8000/docs for API documentation
```

### ⚙️ config.py
Centralized configuration management.

**Features:**
- Environment variable loading
- Path management
- Model configuration
- Directory auto-creation

## 📦 Dependencies

See `requirements.txt` for full list. Key dependencies:

- **numpy**: Numerical computing
- **pandas**: Data manipulation
- **scikit-learn**: Machine learning
- **tensorflow**: Deep learning
- **openai**: OpenAI API client
- **fastapi**: Web framework
- **matplotlib**: Plotting

## 🔧 Configuration

All configuration is managed through `config.py` and `.env` file:

- API keys
- Model parameters
- File paths
- Training hyperparameters

## 📝 Examples

### Example 1: Simple Chatbot
```python
from chatbot import Chatbot

bot = Chatbot()
bot.add_system_message("You are a coding assistant.")
response = bot.chat("How do I write a Python function?")
print(response)
```

### Example 2: Train ML Model
```python
from ml_model import MLModel
import numpy as np

model = MLModel()
X, y = model.create_sample_data(n_samples=1000)
accuracy = model.train(X, y)
model.save_model("my_model.pkl")
```

### Example 3: Neural Network
```python
from neural_network import NeuralNetwork

nn = NeuralNetwork(input_dim=20, hidden_layers=[128, 64, 32], output_dim=1)
X, y = nn.create_sample_data(n_samples=2000)
nn.train(X, y, epochs=100)
nn.plot_training_history()
```

## 🚧 Development

### Adding New Models

1. Create a new Python file (e.g., `new_model.py`)
2. Follow the pattern of existing models
3. Add to `api_server.py` if needed
4. Update this README

### Testing

Run individual scripts to test:
```bash
python -m pytest  # If you add tests
python script_name.py  # Direct execution
```

## 📄 License

This is a collection of example scripts for AI development. Use as needed.

## 🤝 Contributing

Feel free to extend these scripts with:
- Additional model types
- More utilities
- Better error handling
- Tests
- Documentation

## 📞 Support

For issues or questions:
1. Check the script's docstrings
2. Review example usage in `main()` functions
3. Check configuration in `config.py`

---

**Happy AI Development! 🚀**


