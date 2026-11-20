import os
import json
from datetime import datetime, timezone
import re
from typing import Optional, List
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, field_validator

app = FastAPI(
    title="EXCENIUS API",
    description="Backend API for EXCENIUS Digital Studio",
    version="1.0.0"
)

# Enable CORS for local dev and production
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

CONTACTS_FILE = os.path.join(os.path.dirname(__file__), "contacts.json")

class ContactMessage(BaseModel):
    full_name: str
    email: str
    company: Optional[str] = None
    service: str
    message: str

    @field_validator("email")
    @classmethod
    def validate_email(cls, v: str) -> str:
        v = v.strip()
        if not re.match(r"^[^@]+@[^@]+\.[^@]+$", v):
            raise ValueError("Invalid email format")
        return v

@app.get("/")
@app.get("/api")
@app.get("/api/")
def root():
    return {"message": "Hello World", "service": "EXCENIUS API", "status": "online"}

@app.post("/api/contact", status_code=status.HTTP_200_OK)
def submit_contact(payload: ContactMessage):
    """
    Receives contact inquiry, validates fields, and records it to contacts.json.
    Instant client notifications are dispatched directly via Web3Forms (HTTPS Port 443).
    """
    if len(payload.full_name.strip()) < 2:
        raise HTTPException(status_code=400, detail="Full name must be at least 2 characters")
    if len(payload.message.strip()) < 10:
        raise HTTPException(status_code=400, detail="Message must be at least 10 characters")

    record = payload.model_dump()
    record["created_at"] = datetime.now(timezone.utc).isoformat()

    existing = []
    if os.path.exists(CONTACTS_FILE):
        try:
            with open(CONTACTS_FILE, "r", encoding="utf-8") as f:
                existing = json.load(f)
        except Exception:
            existing = []

    existing.append(record)
    with open(CONTACTS_FILE, "w", encoding="utf-8") as f:
        json.dump(existing, f, indent=2)

    return {
        "status": "success",
        "message": "Thank you! Your message has been received.",
        "data": {
            "name": payload.full_name,
            "service": payload.service
        }
    }

@app.get("/api/contacts", response_model=List[dict])
def get_contacts():
    """Returns stored contact submissions from contacts.json."""
    if os.path.exists(CONTACTS_FILE):
        try:
            with open(CONTACTS_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            return []
    return []

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8001))
    uvicorn.run("main:app", host="127.0.0.1", port=port, reload=True)
