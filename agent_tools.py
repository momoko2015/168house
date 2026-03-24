"""
Agent Tools for Antigravity AI
"""
from typing import Dict, Any, List, Callable, Optional
import inspect
import json
from ml_model import MLModel
# Note: Add other models as tools below when needed

class AgentTool:
    """Base class for Agent tools"""
    def __init__(self, name: str, description: str, func: Callable):
        self.name = name
        self.description = description
        self.func = func
        self.parameters = self._get_parameters()

    def _get_parameters(self) -> Dict[str, Any]:
        """Extract parameters from function signature for Gemini function calling"""
        sig = inspect.signature(self.func)
        params = {}
        for name, param in sig.parameters.items():
            if name == 'self': continue
            param_type = "string"
            if param.annotation == int:
                param_type = "integer"
            elif param.annotation == float:
                param_type = "number"
            elif param.annotation == bool:
                param_type = "boolean"
            elif param.annotation == list or param.annotation == List:
                param_type = "array"
            
            params[name] = {
                "type": param_type,
                "description": f"Parameter {name}" # Ideally parse docstring
            }
        return {
            "type": "object",
            "properties": params,
            "required": list(params.keys())
        }

    def to_gemini_format(self) -> Dict[str, Any]:
        """Convert to Gemini function declaration format"""
        return {
            "name": self.name,
            "description": self.description,
            "parameters": self.parameters
        }

    def to_openai_format(self) -> Dict[str, Any]:
        """Convert to OpenAI JSON Schema function declaration format"""
        # OpenAI expects slightly different formatting for tool calling
        return {
            "type": "function",
            "function": {
                "name": self.name,
                "description": self.description,
                "parameters": self.parameters
            }
        }

    def execute(self, **kwargs) -> str:
        """Execute the tool"""
        try:
            result = self.func(**kwargs)
            return str(result)
        except Exception as e:
            return f"Error executing tool {self.name}: {str(e)}"

# --- specialized tools ---

_ml_model_instance = MLModel()

def train_ml_model_wrapper(n_samples: int = 1000, model_type: str = "random_forest") -> str:
    """
    Trains a machine learning model on synthetic data.
    
    Args:
        n_samples: Number of samples to generate for training (default 1000)
        model_type: Type of model to serve (default "random_forest")
    """
    global _ml_model_instance
    _ml_model_instance = MLModel(model_type=model_type)
    X, y = _ml_model_instance.create_sample_data(n_samples=n_samples)
    accuracy = _ml_model_instance.train(X, y)
    _ml_model_instance.save_model("latest_model.pkl")
    return f"Model trained with accuracy: {accuracy:.4f}. Model saved to latest_model.pkl"

def predict_ml_wrapper(features: List[float]) -> str:
    """
    Makes a prediction using the trained ML model.
    
    Args:
        features: List of feature values (numbers)
    """
    try:
        if not _ml_model_instance.is_trained:
            # Try loading default
            _ml_model_instance.load_model("latest_model.pkl")
    except Exception:
         return "Model is not trained yet. Please train the model first."

    import numpy as np
    prediction = _ml_model_instance.predict(np.array([features]))
    return f"Prediction: {prediction[0]}"

# Tools Registry
_nn_model_instance = None
_image_model_instance = None

def train_neural_network_wrapper(epochs: int = 10) -> str:
    """
    Trains a neural network model on synthetic data.
    
    Args:
        epochs: Number of training epochs (default 10)
    """
    global _nn_model_instance
    try:
        from neural_network import NeuralNetwork
        _nn_model_instance = NeuralNetwork(input_dim=10, hidden_layers=[64, 32], output_dim=1)
        X, y = _nn_model_instance.create_sample_data(n_samples=500)
        _nn_model_instance.train(X, y, epochs=epochs, verbose=0)
        _nn_model_instance.save_model("latest_nn_model.h5")
        return f"Neural network trained successfully for {epochs} epochs. Model saved to latest_nn_model.h5."
    except ImportError as e:
        return f"Failed to import neural_network module. Ensure TensorFlow is installed. Error: {e}"
    except Exception as e:
        return f"Error training neural network: {e}"

def train_image_classifier_wrapper(epochs: int = 5) -> str:
    """
    Trains an image classification model using a simple CNN on synthetic data.
    
    Args:
        epochs: Number of training epochs (default 5)
    """
    global _image_model_instance
    try:
        from image_classifier import ImageClassifier
        _image_model_instance = ImageClassifier(input_shape=(32, 32, 3), num_classes=5)
        X, y = _image_model_instance.create_sample_data(n_samples=200)
        _image_model_instance.build_simple_cnn()
        _image_model_instance.train(X, y, epochs=epochs, verbose=0)
        _image_model_instance.save_model("latest_img_model.h5")
        return f"Image classifier trained successfully for {epochs} epochs. Model saved to latest_img_model.h5."
    except ImportError as e:
        return f"Failed to import image_classifier module. Ensure TensorFlow is installed. Error: {e}"
    except Exception as e:
        return f"Error training image classifier: {e}"

TOOLS = [
    AgentTool(
        name="train_ml_model",
        description="Trains a machine learning model. Use this when the user asks to build, train, or create a basic ML model.",
        func=train_ml_model_wrapper
    ),
    AgentTool(
        name="predict_ml",
        description="Makes a prediction using the trained model. Requires a list of features.",
        func=predict_ml_wrapper
    ),
    AgentTool(
        name="train_neural_network",
        description="Trains a deep neural network model. Use this when the user asks for deep learning or neural networks.",
        func=train_neural_network_wrapper
    ),
    AgentTool(
        name="train_image_classifier",
        description="Trains an image classification CNN model. Use this when the user asks about classifying images or computer vision.",
        func=train_image_classifier_wrapper
    )
]

def get_gemini_tools():
    """Returns the tools configuration for Gemini client"""
    return [tool.func for tool in TOOLS] # Gemini SDK now supports passing functions directly

def get_openai_tools():
    """Returns the tools configuration for OpenAI client"""
    return [tool.to_openai_format() for tool in TOOLS]
