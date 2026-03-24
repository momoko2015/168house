"""
Antigravity Agent - Powered by Gemini / OpenAI
"""
import os
import time
import json
from typing import List, Dict, Optional, Any
from google import genai
from google.genai import types
import openai
from dotenv import load_dotenv
import agent_tools

load_dotenv()

class Agent:
    def __init__(self, api_key: Optional[str] = None, model_name: Optional[str] = None):
        """
        Initialize the Antigravity Agent
        
        Args:
            api_key: Optional API key (will auto-detect from .env if omitted)
            model_name: Model to use
        """
        self.gemini_key = api_key or os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")
        self.openai_key = os.getenv("OPENAI_API_KEY")
        
        self.provider = "gemini" if self.gemini_key else ("openai" if self.openai_key else None)
        
        if not self.provider:
            raise ValueError("No API key found. Please set GEMINI_API_KEY or OPENAI_API_KEY in your .env file.")
        
        self.thought_process = [] # Log of thoughts/actions
        
        if self.provider == "gemini":
            self.model_name = model_name or "gemini-2.5-flash"
            self.client = genai.Client(api_key=self.gemini_key)
            self.tools = agent_tools.get_gemini_tools()
            
            # Initialize chat session
            self.chat_session = self.client.chats.create(
                model=self.model_name,
                config=types.GenerateContentConfig(
                    tools=self.tools,
                    system_instruction="You are a helpful assistant."
                )
            )
        else:
            self.model_name = model_name or "gpt-4o-mini"
            self.client = openai.OpenAI(api_key=self.openai_key)
            self.tools = agent_tools.get_openai_tools()
            self.messages = [{"role": "system", "content": "You are a helpful assistant."}]

    def chat(self, user_message: str) -> str:
        """
        Send a message to the agent and get a response.
        Handles tool calls automatically.
        """
        self.thought_process.append(f"User: {user_message}")
        
        try:
            if self.provider == "gemini":
                # Send message to Gemini
                response = self.chat_session.send_message(user_message)
                answer = response.text
                self.thought_process.append(f"Agent: {answer}")
                return answer
            
            else:
                # OpenAI implementation
                self.messages.append({"role": "user", "content": user_message})
                response = self.client.chat.completions.create(
                    model=self.model_name,
                    messages=self.messages,
                    tools=self.tools
                )
                
                message = response.choices[0].message
                
                if message.tool_calls:
                    # Append assistant's tool call request to history
                    self.messages.append(message)
                    
                    for tool_call in message.tool_calls:
                        func_name = tool_call.function.name
                        args = json.loads(tool_call.function.arguments)
                        
                        self.thought_process.append(f"Agent Action: executed {func_name} with {args}")
                        
                        # Find and execute tool
                        tool_def = next((t for t in agent_tools.TOOLS if t.name == func_name), None)
                        result_content = ""
                        
                        if tool_def:
                            result_content = tool_def.execute(**args)
                        else:
                            result_content = f"Error: Tool {func_name} not found."
                            
                        # Append tool response
                        self.messages.append({
                            "role": "tool",
                            "tool_call_id": tool_call.id,
                            "name": func_name,
                            "content": result_content
                        })
                    
                    # Second call to get final response
                    second_response = self.client.chat.completions.create(
                        model=self.model_name,
                        messages=self.messages,
                        tools=self.tools
                    )
                    
                    answer = second_response.choices[0].message.content
                    self.messages.append(second_response.choices[0].message)
                    self.thought_process.append(f"Agent: {answer}")
                    return answer
                else:
                    self.messages.append(message)
                    answer = message.content
                    self.thought_process.append(f"Agent: {answer}")
                    return answer
            
        except Exception as e:
            return f"Error during chat: {str(e)}"

    def get_thoughts(self) -> List[str]:
        """Return the thought process log"""
        return self.thought_process

    def clear_history(self):
        """Reset the conversation"""
        self.thought_process = []
        if self.provider == "gemini":
            self.chat_session = self.client.chats.create(
                model=self.model_name,
                config=types.GenerateContentConfig(
                    tools=self.tools,
                    system_instruction="You are a helpful assistant."
                )
            )
        else:
            self.messages = [{"role": "system", "content": "You are a helpful assistant."}]



def main():
    """Interactive CLI for the Agent"""
    print("Antigravity Agent (Gemini Powered)")
    print("----------------------------------")
    print("Type 'quit' to exit, 'clear' to reset")
    
    agent = Agent()
    
    while True:
        try:
            user_input = input("\nYou: ")
            if user_input.lower() in ['quit', 'exit']:
                break
            elif user_input.lower() == 'clear':
                agent.clear_history()
                print("Memory cleared.")
                continue
            
            print("Agent is thinking...")
            response = agent.chat(user_input)
            print(f"Agent: {response}")
            
        except KeyboardInterrupt:
            break
        except Exception as e:
            print(f"Error: {e}")

if __name__ == "__main__":
    main()
