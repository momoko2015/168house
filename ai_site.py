"""
FastAPI Server for AI Models
"""
import os
import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import Optional, List
from dotenv import load_dotenv

# Import your AI models
from chatbot import Agent

load_dotenv()

app = FastAPI(title="Antigravity AI Server", version="1.0.0")

# Initialize global agent
agent = Agent()

# Request/Response Models
class ChatRequest(BaseModel):
    message: str
    conversation_id: Optional[str] = None

class ChatResponse(BaseModel):
    response: str
    conversation_id: str
    thoughts: Optional[List[str]] = None

# API Endpoints
@app.get("/health")
async def health():
    """Health check endpoint"""
    return {"status": "healthy"}

@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    Chat endpoint for conversational AI
    """
    try:
        response_text = agent.chat(request.message)
        thoughts = agent.get_thoughts()
        
        return ChatResponse(
            response=response_text,
            conversation_id="default",
            thoughts=thoughts
        )
    except ValueError as e:
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")

# Mount static files for Web UI
web_ui_path = os.path.join(os.path.dirname(__file__), "web_ui")
if os.path.exists(web_ui_path):
    app.mount("/static", StaticFiles(directory=web_ui_path), name="static")

    @app.get("/")
    async def read_root():
        index_path = os.path.join(web_ui_path, "index.html")
        if os.path.exists(index_path):
            return FileResponse(index_path)
        return {"error": "index.html not found"}
    
    @app.get("/{filename}")
    async def serve_static(filename: str):
        file_path = os.path.join(web_ui_path, filename)
        if os.path.exists(file_path):
            return FileResponse(file_path)
        # Fallback if file not found in web_ui
        raise HTTPException(status_code=404, detail="File not found")

def main():
    """Run the API server"""
    print("Starting Antigravity AI Server on port 8001...")
    uvicorn.run(app, host="0.0.0.0", port=8001)

if __name__ == "__main__":
    main()
