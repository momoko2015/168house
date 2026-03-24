"""
Neural Network Implementation using TensorFlow/Keras
"""
import numpy as np
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import matplotlib.pyplot as plt


class NeuralNetwork:
    def __init__(self, input_dim: int, hidden_layers: list = [64, 32], 
                 output_dim: int = 1, activation: str = 'relu'):
        """
        Initialize Neural Network
        
        Args:
            input_dim: Input dimension
            hidden_layers: List of hidden layer sizes
            output_dim: Output dimension
            activation: Activation function
        """
        self.input_dim = input_dim
        self.hidden_layers = hidden_layers
        self.output_dim = output_dim
        self.activation = activation
        self.model = None
        self.scaler = StandardScaler()
        self.history = None
    
    def build_model(self):
        """Build the neural network model"""
        model = keras.Sequential()
        
        # Input layer
        model.add(layers.Dense(self.hidden_layers[0], 
                              activation=self.activation, 
                              input_shape=(self.input_dim,)))
        
        # Hidden layers
        for layer_size in self.hidden_layers[1:]:
            model.add(layers.Dense(layer_size, activation=self.activation))
            model.add(layers.Dropout(0.2))  # Add dropout for regularization
        
        # Output layer
        if self.output_dim == 1:
            model.add(layers.Dense(1, activation='sigmoid'))
            loss = 'binary_crossentropy'
            metrics = ['accuracy']
        else:
            model.add(layers.Dense(self.output_dim, activation='softmax'))
            loss = 'sparse_categorical_crossentropy'
            metrics = ['accuracy']
        
        model.compile(
            optimizer='adam',
            loss=loss,
            metrics=metrics
        )
        
        self.model = model
        return model
    
    def create_sample_data(self, n_samples: int = 1000):
        """Create sample dataset"""
        np.random.seed(42)
        
        X = np.random.randn(n_samples, self.input_dim)
        
        if self.output_dim == 1:
            # Binary classification
            y = (np.sum(X, axis=1) > 0).astype(int)
        else:
            # Multi-class classification
            y = np.random.randint(0, self.output_dim, n_samples)
        
        return X, y
    
    def train(self, X, y, epochs: int = 50, batch_size: int = 32, 
              validation_split: float = 0.2, verbose: int = 1):
        """
        Train the neural network
        
        Args:
            X: Feature matrix
            y: Target vector
            epochs: Number of training epochs
            batch_size: Batch size
            validation_split: Proportion of data for validation
            verbose: Verbosity level
        """
        if self.model is None:
            self.build_model()
        
        # Scale features
        X_scaled = self.scaler.fit_transform(X)
        
        # Split data
        X_train, X_test, y_train, y_test = train_test_split(
            X_scaled, y, test_size=validation_split, random_state=42
        )
        
        # Train model
        self.history = self.model.fit(
            X_train, y_train,
            epochs=epochs,
            batch_size=batch_size,
            validation_data=(X_test, y_test),
            verbose=verbose
        )
        
        # Evaluate
        test_loss, test_accuracy = self.model.evaluate(X_test, y_test, verbose=0)
        print(f"\nTest Loss: {test_loss:.4f}")
        print(f"Test Accuracy: {test_accuracy:.4f}")
        
        return self.history
    
    def predict(self, X):
        """Make predictions"""
        if self.model is None:
            raise ValueError("Model must be built and trained before making predictions")
        
        X_scaled = self.scaler.transform(X)
        predictions = self.model.predict(X_scaled, verbose=0)
        
        if self.output_dim == 1:
            return (predictions > 0.5).astype(int).flatten()
        else:
            return np.argmax(predictions, axis=1)
    
    def plot_training_history(self):
        """Plot training history"""
        if self.history is None:
            print("No training history available")
            return
        
        fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 4))
        
        # Plot accuracy
        ax1.plot(self.history.history['accuracy'], label='Training Accuracy')
        if 'val_accuracy' in self.history.history:
            ax1.plot(self.history.history['val_accuracy'], label='Validation Accuracy')
        ax1.set_title('Model Accuracy')
        ax1.set_xlabel('Epoch')
        ax1.set_ylabel('Accuracy')
        ax1.legend()
        
        # Plot loss
        ax2.plot(self.history.history['loss'], label='Training Loss')
        if 'val_loss' in self.history.history:
            ax2.plot(self.history.history['val_loss'], label='Validation Loss')
        ax2.set_title('Model Loss')
        ax2.set_xlabel('Epoch')
        ax2.set_ylabel('Loss')
        ax2.legend()
        
        plt.tight_layout()
        plt.savefig('training_history.png')
        print("Training history plot saved to training_history.png")
    
    def save_model(self, filepath: str):
        """Save the trained model"""
        if self.model is None:
            raise ValueError("Model must be built and trained before saving")
        self.model.save(filepath)
        print(f"Model saved to {filepath}")
    
    def load_model(self, filepath: str):
        """Load a trained model"""
        self.model = keras.models.load_model(filepath)
        print(f"Model loaded from {filepath}")


def main():
    """Example usage"""
    print("Neural Network Example")
    print("-" * 50)
    
    # Create neural network
    nn = NeuralNetwork(
        input_dim=10,
        hidden_layers=[64, 32, 16],
        output_dim=1
    )
    
    # Generate sample data
    print("\nGenerating sample data...")
    X, y = nn.create_sample_data(n_samples=2000)
    print(f"Data shape: {X.shape}, Target shape: {y.shape}")
    
    # Build model
    print("\nBuilding model...")
    nn.build_model()
    nn.model.summary()
    
    # Train model
    print("\nTraining model...")
    nn.train(X, y, epochs=30, batch_size=32)
    
    # Make predictions
    print("\nMaking predictions...")
    new_data = np.random.randn(10, 10)
    predictions = nn.predict(new_data)
    print(f"Predictions: {predictions}")
    
    # Plot training history
    print("\nPlotting training history...")
    nn.plot_training_history()
    
    # Save model
    print("\nSaving model...")
    nn.save_model("neural_network_model.h5")
    
    print("\nExample completed!")


if __name__ == "__main__":
    main()


