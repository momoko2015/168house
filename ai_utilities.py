"""
AI Utility Functions
"""
import json
import pickle
import numpy as np
import pandas as pd
from typing import List, Dict, Any, Optional
from datetime import datetime
import os


class AIUtilities:
    """Collection of utility functions for AI development"""
    
    @staticmethod
    def save_json(data: Any, filepath: str, indent: int = 2):
        """Save data to JSON file"""
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=indent, ensure_ascii=False)
        print(f"Data saved to {filepath}")
    
    @staticmethod
    def load_json(filepath: str) -> Any:
        """Load data from JSON file"""
        with open(filepath, 'r', encoding='utf-8') as f:
            return json.load(f)
    
    @staticmethod
    def save_pickle(data: Any, filepath: str):
        """Save data to pickle file"""
        with open(filepath, 'wb') as f:
            pickle.dump(data, f)
        print(f"Data saved to {filepath}")
    
    @staticmethod
    def load_pickle(filepath: str) -> Any:
        """Load data from pickle file"""
        with open(filepath, 'rb') as f:
            return pickle.load(f)
    
    @staticmethod
    def normalize_text(text: str) -> str:
        """Normalize text (lowercase, strip whitespace)"""
        return text.lower().strip()
    
    @staticmethod
    def tokenize_text(text: str) -> List[str]:
        """Simple tokenization"""
        return text.split()
    
    @staticmethod
    def calculate_accuracy(y_true: np.ndarray, y_pred: np.ndarray) -> float:
        """Calculate accuracy score"""
        return np.mean(y_true == y_pred)
    
    @staticmethod
    def calculate_precision_recall(y_true: np.ndarray, y_pred: np.ndarray) -> Dict[str, float]:
        """Calculate precision and recall"""
        tp = np.sum((y_true == 1) & (y_pred == 1))
        fp = np.sum((y_true == 0) & (y_pred == 1))
        fn = np.sum((y_true == 1) & (y_pred == 0))
        
        precision = tp / (tp + fp) if (tp + fp) > 0 else 0.0
        recall = tp / (tp + fn) if (tp + fn) > 0 else 0.0
        f1 = 2 * (precision * recall) / (precision + recall) if (precision + recall) > 0 else 0.0
        
        return {
            'precision': precision,
            'recall': recall,
            'f1_score': f1
        }
    
    @staticmethod
    def create_logger(log_file: str = "ai_log.txt"):
        """Create a simple logger"""
        def log(message: str, level: str = "INFO"):
            timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            log_entry = f"[{timestamp}] [{level}] {message}\n"
            
            with open(log_file, 'a', encoding='utf-8') as f:
                f.write(log_entry)
            
            print(log_entry.strip())
        
        return log
    
    @staticmethod
    def load_dataset(filepath: str, format: str = "auto") -> pd.DataFrame:
        """
        Load dataset from file
        
        Args:
            filepath: Path to dataset file
            format: File format ('csv', 'json', 'excel', 'auto')
        """
        if format == "auto":
            format = filepath.split('.')[-1].lower()
        
        if format == "csv":
            return pd.read_csv(filepath)
        elif format == "json":
            return pd.read_json(filepath)
        elif format in ["xlsx", "xls"]:
            return pd.read_excel(filepath)
        else:
            raise ValueError(f"Unsupported format: {format}")
    
    @staticmethod
    def preprocess_dataframe(df: pd.DataFrame, 
                            drop_na: bool = True,
                            fill_na: Optional[Any] = None) -> pd.DataFrame:
        """Preprocess dataframe"""
        df_processed = df.copy()
        
        if drop_na:
            df_processed = df_processed.dropna()
        elif fill_na is not None:
            df_processed = df_processed.fillna(fill_na)
        
        return df_processed
    
    @staticmethod
    def split_data(X: np.ndarray, y: np.ndarray, 
                   test_size: float = 0.2, random_state: int = 42):
        """Split data into train and test sets"""
        from sklearn.model_selection import train_test_split
        return train_test_split(X, y, test_size=test_size, random_state=random_state)
    
    @staticmethod
    def create_directory(path: str):
        """Create directory if it doesn't exist"""
        os.makedirs(path, exist_ok=True)
        print(f"Directory created/verified: {path}")
    
    @staticmethod
    def get_file_info(filepath: str) -> Dict[str, Any]:
        """Get information about a file"""
        if not os.path.exists(filepath):
            return {"error": "File not found"}
        
        stat = os.stat(filepath)
        return {
            "path": filepath,
            "size": stat.st_size,
            "modified": datetime.fromtimestamp(stat.st_mtime).isoformat(),
            "created": datetime.fromtimestamp(stat.st_ctime).isoformat()
        }


def main():
    """Example usage"""
    print("AI Utilities Example")
    print("-" * 50)
    
    utils = AIUtilities()
    
    # Example: Save and load JSON
    data = {"name": "AI Model", "accuracy": 0.95, "epochs": 100}
    utils.save_json(data, "example_data.json")
    loaded_data = utils.load_json("example_data.json")
    print(f"Loaded data: {loaded_data}")
    
    # Example: Text processing
    text = "  Hello World AI  "
    normalized = utils.normalize_text(text)
    tokens = utils.tokenize_text(normalized)
    print(f"Normalized: '{normalized}'")
    print(f"Tokens: {tokens}")
    
    # Example: Metrics calculation
    y_true = np.array([1, 0, 1, 1, 0, 1])
    y_pred = np.array([1, 0, 1, 0, 0, 1])
    accuracy = utils.calculate_accuracy(y_true, y_pred)
    metrics = utils.calculate_precision_recall(y_true, y_pred)
    print(f"\nAccuracy: {accuracy:.4f}")
    print(f"Metrics: {metrics}")
    
    # Example: Logger
    log = utils.create_logger("example_log.txt")
    log("This is an info message", "INFO")
    log("This is an error message", "ERROR")
    
    print("\nExample completed!")


if __name__ == "__main__":
    main()


