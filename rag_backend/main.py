from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from query_data import query_rag

app = FastAPI()

# CORS (To access from NextJS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow only while in development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
def chat(req: ChatRequest):
    response = query_rag(req.message)
    return {"answer": response}
