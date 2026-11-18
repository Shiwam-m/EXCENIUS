import os
import json
from datetime import datetime, timezone
import re
from typing import Optional, List
from fastapi import FastAPI, HTTPException, status, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, field_validator

try:
    from backend.email_service import send_notification_email
except ImportError:
    from email_service import send_notification_email

app = FastAPI(
    title="NOIRFORM API",
    description="Backend API for NOIRFORM Digital Studio",
    version="1.0.0"
)

# Enable CORS for local dev (Vite default port 5173, 3000, etc.)
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
    return {"message": "Hello World", "service": "NOIRFORM API", "status": "online"}

@app.post("/api/contact", status_code=status.HTTP_200_OK)
def submit_contact(payload: ContactMessage, background_tasks: BackgroundTasks):
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

    # Dispatch email notification in background (non-blocking)
    background_tasks.add_task(
        send_notification_email,
        full_name=payload.full_name,
        email=payload.email,
        company=payload.company,
        service=payload.service,
        message=payload.message,
        timestamp=record["created_at"]
    )

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
    if os.path.exists(CONTACTS_FILE):
        try:
            with open(CONTACTS_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            return []
    return []

@app.get("/api/email-status")
def email_status():
    from dotenv import load_dotenv
    env_file = os.path.join(os.path.dirname(__file__), ".env")
    load_dotenv(dotenv_path=env_file, override=True)
    smtp_pass = os.getenv("SMTP_PASS", "").strip()
    configured = bool(smtp_pass and not smtp_pass.startswith("your_"))
    return {
        "configured": configured,
        "recipient": os.getenv("NOTIFICATION_EMAIL", "shiwammaddheshiya@gmail.com"),
        "sender": os.getenv("SMTP_USER", "shiwammaddheshiya@gmail.com"),
        "host": os.getenv("SMTP_HOST", "smtp.gmail.com"),
        "instructions": "Enter your 16-character Google App Password in backend/.env to activate real inbox delivery."
    }

@app.post("/api/test-email")
def test_email():
    now_iso = datetime.now(timezone.utc).isoformat()
    return send_notification_email(
        full_name="Shiwam Maddhesiya (Test)",
        email="test@example.com",
        company="NOIRFORM Client",
        service="Website Development",
        message="This is a test notification to verify that instant email alerts are functioning properly.",
        timestamp=now_iso
    )

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8001))
    uvicorn.run("main:app", host="127.0.0.1", port=port, reload=True)
