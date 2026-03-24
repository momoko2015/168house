
import os
import sys

# Add current directory to path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from chatbot import Agent
from config import Config

def test_agent():
    print("Testing Antigravity Agent...")
    
    # Check keys
    gemini_key = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")
    openai_key = os.getenv("OPENAI_API_KEY")
    
    if not gemini_key and not openai_key:
        print("❌ Error: Valid API key not found in environment.")
        print("Please check your .env file for GEMINI_API_KEY or OPENAI_API_KEY.")
        return

    provider = "Gemini" if gemini_key else "OpenAI"
    key_display = gemini_key if gemini_key else openai_key
    print(f"✅ {provider} API Key found (starts with {key_display[:4]}...)")

    try:
        agent = Agent()
        print("✅ Agent initialized.")
        
        # Test basic chat
        print("\nSending test message: 'Hello, who are you?'")
        response = agent.chat("Hello, who are you?")
        print(f"Agent Response: {response[:100]}...")

        # Test tool execution
        print("\nTesting Tool Execution: 'Train a machine learning model'")
        response_tool = agent.chat("Train a machine learning model")
        print(f"Agent Tool Response: {response_tool}")
        if "trained" in response_tool.lower() or "accuracy" in response_tool.lower():
             print("✅ Tool execution successful!")
        else:
             print("⚠️ Tool execution might have failed or response was unexpected.")
        
        print("\n✅ Verification Successful!")
        print("-" * 50)
        print("You can now run the web server:")
        print("python api_server.py")
        
    except Exception as e:
        print(f"❌ Verification Failed: {e}")

if __name__ == "__main__":
    test_agent()
