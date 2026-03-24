"""
Image Classification using TensorFlow/Keras
"""
import numpy as np
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.preprocessing.image import ImageDataGenerator
import matplotlib.pyplot as plt
import os


class ImageClassifier:
    def __init__(self, input_shape: tuple = (224, 224, 3), num_classes: int = 10):
        """
        Initialize Image Classifier
        
        Args:
            input_shape: Shape of input images (height, width, channels)
            num_classes: Number of classes to classify
        """
        self.input_shape = input_shape
        self.num_classes = num_classes
        self.model = None
        self.history = None
    
    def build_simple_cnn(self):
        """Build a simple CNN model"""
        model = keras.Sequential([
            layers.Conv2D(32, (3, 3), activation='relu', input_shape=self.input_shape),
            layers.MaxPooling2D((2, 2)),
            layers.Conv2D(64, (3, 3), activation='relu'),
            layers.MaxPooling2D((2, 2)),
            layers.Conv2D(64, (3, 3), activation='relu'),
            layers.Flatten(),
            layers.Dense(64, activation='relu'),
            layers.Dropout(0.5),
            layers.Dense(self.num_classes, activation='softmax')
        ])
        
        model.compile(
            optimizer='adam',
            loss='sparse_categorical_crossentropy',
            metrics=['accuracy']
        )
        
        self.model = model
        return model
    
    def build_transfer_learning_model(self, base_model_name: str = 'MobileNetV2'):
        """Build model using transfer learning"""
        # Load pre-trained base model
        if base_model_name == 'MobileNetV2':
            base_model = keras.applications.MobileNetV2(
                input_shape=self.input_shape,
                include_top=False,
                weights='imagenet'
            )
        elif base_model_name == 'VGG16':
            base_model = keras.applications.VGG16(
                input_shape=self.input_shape,
                include_top=False,
                weights='imagenet'
            )
        else:
            raise ValueError(f"Unknown base model: {base_model_name}")
        
        # Freeze base model
        base_model.trainable = False
        
        # Add custom layers
        model = keras.Sequential([
            base_model,
            layers.GlobalAveragePooling2D(),
            layers.Dense(128, activation='relu'),
            layers.Dropout(0.5),
            layers.Dense(self.num_classes, activation='softmax')
        ])
        
        model.compile(
            optimizer='adam',
            loss='sparse_categorical_crossentropy',
            metrics=['accuracy']
        )
        
        self.model = model
        return model
    
    def create_sample_data(self, n_samples: int = 1000):
        """Create sample image data for demonstration"""
        np.random.seed(42)
        
        # Generate random images
        X = np.random.randint(0, 255, (n_samples, *self.input_shape), dtype=np.uint8)
        X = X.astype('float32') / 255.0  # Normalize
        
        # Generate random labels
        y = np.random.randint(0, self.num_classes, n_samples)
        
        return X, y
    
    def train(self, X, y, epochs: int = 10, batch_size: int = 32, 
              validation_split: float = 0.2, verbose: int = 1):
        """Train the model"""
        if self.model is None:
            self.build_simple_cnn()
        
        from sklearn.model_selection import train_test_split
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=validation_split, random_state=42
        )
        
        # Data augmentation
        datagen = ImageDataGenerator(
            rotation_range=20,
            width_shift_range=0.2,
            height_shift_range=0.2,
            horizontal_flip=True
        )
        
        self.history = self.model.fit(
            datagen.flow(X_train, y_train, batch_size=batch_size),
            steps_per_epoch=len(X_train) // batch_size,
            epochs=epochs,
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
        
        predictions = self.model.predict(X, verbose=0)
        return np.argmax(predictions, axis=1)
    
    def predict_proba(self, X):
        """Get prediction probabilities"""
        if self.model is None:
            raise ValueError("Model must be built and trained before making predictions")
        
        return self.model.predict(X, verbose=0)
    
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
        plt.savefig('image_training_history.png')
        print("Training history plot saved to image_training_history.png")
    
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
    print("Image Classifier Example")
    print("-" * 50)
    
    # Create classifier
    classifier = ImageClassifier(
        input_shape=(32, 32, 3),
        num_classes=10
    )
    
    # Generate sample data
    print("\nGenerating sample data...")
    X, y = classifier.create_sample_data(n_samples=1000)
    print(f"Data shape: {X.shape}, Target shape: {y.shape}")
    
    # Build model
    print("\nBuilding model...")
    classifier.build_simple_cnn()
    classifier.model.summary()
    
    # Train model
    print("\nTraining model...")
    classifier.train(X, y, epochs=5, batch_size=32)
    
    # Make predictions
    print("\nMaking predictions...")
    test_images = X[:10]
    predictions = classifier.predict(test_images)
    print(f"Predictions: {predictions}")
    
    # Plot training history
    print("\nPlotting training history...")
    classifier.plot_training_history()
    
    # Save model
    print("\nSaving model...")
    classifier.save_model("image_classifier_model.h5")
    
    print("\nExample completed!")


if __name__ == "__main__":
    main()


