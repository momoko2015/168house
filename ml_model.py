"""
Machine Learning Model - Classification Example
"""
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
from sklearn.preprocessing import StandardScaler
import joblib
import os


class MLModel:
    def __init__(self, model_type: str = "random_forest"):
        """
        Initialize ML Model
        
        Args:
            model_type: Type of model ('random_forest', 'svm', etc.)
        """
        self.model_type = model_type
        self.model = None
        self.scaler = StandardScaler()
        self.is_trained = False
    
    def create_sample_data(self, n_samples: int = 1000):
        """
        Create sample dataset for demonstration
        
        Args:
            n_samples: Number of samples to generate
            
        Returns:
            X (features), y (target)
        """
        np.random.seed(42)
        
        # Generate synthetic data
        X = np.random.randn(n_samples, 4)
        y = (X[:, 0] + X[:, 1] - X[:, 2] + X[:, 3] > 0).astype(int)
        
        return X, y
    
    def train(self, X, y, test_size: float = 0.2):
        """
        Train the model
        
        Args:
            X: Feature matrix
            y: Target vector
            test_size: Proportion of data for testing
        """
        # Split data
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=test_size, random_state=42
        )
        
        # Scale features
        X_train_scaled = self.scaler.fit_transform(X_train)
        X_test_scaled = self.scaler.transform(X_test)
        
        # Initialize and train model
        if self.model_type == "random_forest":
            self.model = RandomForestClassifier(n_estimators=100, random_state=42)
        else:
            raise ValueError(f"Unknown model type: {self.model_type}")
        
        self.model.fit(X_train_scaled, y_train)
        
        # Evaluate
        y_pred = self.model.predict(X_test_scaled)
        accuracy = accuracy_score(y_test, y_pred)
        
        print(f"Model trained successfully!")
        print(f"Test Accuracy: {accuracy:.4f}")
        print("\nClassification Report:")
        print(classification_report(y_test, y_pred))
        
        self.is_trained = True
        
        return accuracy
    
    def predict(self, X):
        """
        Make predictions
        
        Args:
            X: Feature matrix
            
        Returns:
            Predictions
        """
        if not self.is_trained:
            raise ValueError("Model must be trained before making predictions")
        
        X_scaled = self.scaler.transform(X)
        return self.model.predict(X_scaled)
    
    def predict_proba(self, X):
        """
        Get prediction probabilities
        
        Args:
            X: Feature matrix
            
        Returns:
            Prediction probabilities
        """
        if not self.is_trained:
            raise ValueError("Model must be trained before making predictions")
        
        X_scaled = self.scaler.transform(X)
        return self.model.predict_proba(X_scaled)
    
    def save_model(self, filepath: str):
        """Save the trained model"""
        if not self.is_trained:
            raise ValueError("Model must be trained before saving")
        
        model_data = {
            'model': self.model,
            'scaler': self.scaler,
            'model_type': self.model_type
        }
        joblib.dump(model_data, filepath)
        print(f"Model saved to {filepath}")
    
    def load_model(self, filepath: str):
        """Load a trained model"""
        if not os.path.exists(filepath):
            raise FileNotFoundError(f"Model file not found: {filepath}")
        
        model_data = joblib.load(filepath)
        self.model = model_data['model']
        self.scaler = model_data['scaler']
        self.model_type = model_data['model_type']
        self.is_trained = True
        print(f"Model loaded from {filepath}")


def main():
    """Example usage"""
    print("Machine Learning Model Example")
    print("-" * 50)
    
    # Create model
    ml_model = MLModel(model_type="random_forest")
    
    # Generate sample data
    print("\nGenerating sample data...")
    X, y = ml_model.create_sample_data(n_samples=1000)
    print(f"Data shape: {X.shape}, Target shape: {y.shape}")
    
    # Train model
    print("\nTraining model...")
    accuracy = ml_model.train(X, y)
    
    # Make predictions
    print("\nMaking predictions on new data...")
    new_data = np.random.randn(5, 4)
    predictions = ml_model.predict(new_data)
    probabilities = ml_model.predict_proba(new_data)
    
    print(f"\nPredictions: {predictions}")
    print(f"Probabilities:\n{probabilities}")
    
    # Save model
    print("\nSaving model...")
    ml_model.save_model("model.pkl")
    
    print("\nExample completed!")


if __name__ == "__main__":
    main()


