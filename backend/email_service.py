import os
import json
import smtplib
import urllib.request
import urllib.error
from email.message import EmailMessage
from typing import Optional, Dict, Any
from dotenv import load_dotenv

# Ensure .env is loaded
env_path = os.path.join(os.path.dirname(__file__), ".env")
load_dotenv(dotenv_path=env_path)

def build_email_content(full_name: str, email: str, company: Optional[str], service: str, message: str, timestamp: str):
    company_line = f"<p style='margin: 8px 0;'><strong>Company:</strong> {company}</p>" if company else ""
    html_body = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
    </head>
    <body style="margin: 0; padding: 24px; background-color: #0A0A0A; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #FFFFFF;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #121212; border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 8px; padding: 32px;">
            <div style="border-bottom: 1px solid rgba(255, 255, 255, 0.1); padding-bottom: 20px; margin-bottom: 24px;">
                <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.25em; color: rgba(255, 255, 255, 0.5); font-family: monospace;">NOIRFORM Lead Alert</span>
                <h1 style="font-size: 24px; font-weight: 700; color: #FFFFFF; margin: 8px 0 0 0;">New Inquiry Received</h1>
            </div>

            <div style="font-size: 14px; line-height: 1.6; color: rgba(255, 255, 255, 0.85);">
                <p style="margin: 8px 0;"><strong>Client Name:</strong> <span style="color: #FFFFFF;">{full_name}</span></p>
                <p style="margin: 8px 0;"><strong>Client Email:</strong> <a href="mailto:{email}" style="color: #FFFFFF; text-decoration: underline;">{email}</a></p>
                {company_line}
                <p style="margin: 8px 0;"><strong>Service Requested:</strong> <span style="color: #FFFFFF;">{service}</span></p>
                <p style="margin: 8px 0;"><strong>Submitted At:</strong> <span style="color: rgba(255, 255, 255, 0.5); font-family: monospace; font-size: 12px;">{timestamp}</span></p>

                <div style="margin-top: 24px; padding: 18px; background-color: #1A1A1A; border-left: 3px solid #FFFFFF; border-radius: 4px;">
                    <p style="margin: 0 0 6px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.2em; color: rgba(255, 255, 255, 0.5); font-family: monospace;">Project Details</p>
                    <p style="margin: 0; color: #FFFFFF; white-space: pre-wrap; font-size: 14px; line-height: 1.5;">{message}</p>
                </div>
            </div>

            <div style="margin-top: 32px; border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 20px; font-size: 12px; color: rgba(255, 255, 255, 0.4);">
                <p style="margin: 0;">💡 <em>You can click <strong>Reply</strong> in your mail app to respond directly to {full_name}.</em></p>
            </div>
        </div>
    </body>
    </html>
    """
    plain_text = (
        f"New Project Inquiry from NOIRFORM Website\n\n"
        f"Client Name: {full_name}\n"
        f"Email: {email}\n"
        f"Company: {company or 'N/A'}\n"
        f"Service: {service}\n"
        f"Submitted At: {timestamp}\n\n"
        f"Message:\n{message}\n"
    )
    return html_body, plain_text

def send_via_resend_api(
    api_key: str,
    recipient: str,
    client_email: str,
    subject: str,
    html_body: str,
    plain_text: str
) -> Dict[str, Any]:
    """
    Sends email over HTTPS Port 443 via Resend REST API.
    Guaranteed to work on Render Free Tier because port 443 is never blocked.
    """
    url = "https://api.resend.com/emails"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
        "User-Agent": "NOIRFORM-Studio/1.0"
    }
    payload = {
        "from": "NOIRFORM Studio <onboarding@resend.dev>",
        "to": [recipient],
        "reply_to": client_email,
        "subject": subject,
        "html": html_body,
        "text": plain_text
    }
    req = urllib.request.Request(
        url,
        data=json.dumps(payload).encode("utf-8"),
        headers=headers,
        method="POST"
    )
    with urllib.request.urlopen(req, timeout=15) as resp:
        res_data = json.loads(resp.read().decode("utf-8"))
        print(f"[RESEND SUCCESS] Email sent via HTTPS Port 443: {res_data}", flush=True)
        return {"status": "success", "provider": "resend", "data": res_data}

def send_via_smtp(
    smtp_host: str,
    smtp_port: int,
    smtp_user: str,
    smtp_pass: str,
    recipient: str,
    client_email: str,
    subject: str,
    html_body: str,
    plain_text: str
) -> Dict[str, Any]:
    """
    Sends email via standard SMTP (e.g. Gmail port 587).
    Works on local development or paid cloud tiers where outbound SMTP is unblocked.
    """
    msg = EmailMessage()
    msg["Subject"] = subject
    msg["From"] = f"NOIRFORM Studio <{smtp_user}>"
    msg["To"] = recipient
    msg["Reply-To"] = client_email
    msg.set_content(plain_text)
    msg.add_alternative(html_body, subtype="html")

    with smtplib.SMTP(smtp_host, smtp_port, timeout=12) as server:
        server.ehlo()
        server.starttls()
        server.ehlo()
        server.login(smtp_user, smtp_pass)
        server.send_message(msg)
    
    print(f"[SMTP SUCCESS] Instant email alert sent to {recipient} via {smtp_host}.", flush=True)
    return {"status": "success", "provider": "smtp"}

def send_notification_email(
    full_name: str,
    email: str,
    company: Optional[str],
    service: str,
    message: str,
    timestamp: str
) -> Dict[str, Any]:
    """
    Intelligent email dispatcher:
    1. If RESEND_API_KEY is present -> Uses HTTPS Port 443 (Recommended for Render).
    2. Else if SMTP_PASS is present -> Uses SMTP Port 587 (Works locally).
    3. Handles port blocking and network errors gracefully.
    """
    load_dotenv(dotenv_path=env_path, override=True)

    recipient = os.getenv("NOTIFICATION_EMAIL", "shiwammaddheshiya@gmail.com").strip()
    resend_key = os.getenv("RESEND_API_KEY", "").strip()
    smtp_host = os.getenv("SMTP_HOST", "smtp.gmail.com").strip()
    smtp_port = int(os.getenv("SMTP_PORT", 587))
    smtp_user = os.getenv("SMTP_USER", "").strip()
    smtp_pass = os.getenv("SMTP_PASS", "").strip()

    subject = f"🔔 New Project Inquiry: {full_name} — {service}"
    html_body, plain_text = build_email_content(full_name, email, company, service, message, timestamp)

    # 1. Try Resend HTTPS API (Preferred for cloud hosts like Render)
    if resend_key and not resend_key.startswith("your_"):
        try:
            return send_via_resend_api(resend_key, recipient, email, subject, html_body, plain_text)
        except urllib.error.HTTPError as e:
            err_body = e.read().decode("utf-8") if e.fp else str(e)
            print(f"[RESEND ERROR] HTTP {e.code}: {err_body}", flush=True)
            return {"status": "error", "provider": "resend", "detail": err_body}
        except Exception as e:
            print(f"[RESEND EXCEPTION] {str(e)}", flush=True)

    # 2. Try SMTP (Works locally on Windows or unblocked networks)
    if smtp_user and smtp_pass and not smtp_pass.startswith("your_"):
        try:
            return send_via_smtp(smtp_host, smtp_port, smtp_user, smtp_pass, recipient, email, subject, html_body, plain_text)
        except (TimeoutError, OSError) as e:
            err_msg = (
                f"[RENDER SMTP BLOCK] Connection to {smtp_host}:{smtp_port} timed out. "
                "Notice: Render Free Tier blocks outbound SMTP ports 25, 465, and 587. "
                "To fix this on Render, add RESEND_API_KEY to your Render Environment Variables "
                "so emails are sent over HTTPS (Port 443)."
            )
            print(err_msg, flush=True)
            return {"status": "error", "provider": "smtp", "detail": err_msg}
        except Exception as e:
            print(f"[SMTP ERROR] {str(e)}", flush=True)
            return {"status": "error", "provider": "smtp", "detail": str(e)}

    # 3. Neither configured
    print(f"[EMAIL NOTICE] Neither RESEND_API_KEY nor SMTP_PASS is set. Inquiry from '{full_name}' saved to contacts.json.", flush=True)
    return {"status": "simulated", "message": "Email credentials not configured"}
