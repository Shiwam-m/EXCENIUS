# import os
# import smtplib
# from email.message import EmailMessage
# from typing import Optional, Dict, Any
# from dotenv import load_dotenv

# # Ensure .env is loaded
# env_path = os.path.join(os.path.dirname(__file__), ".env")
# load_dotenv(dotenv_path=env_path)

# def send_notification_email(
#     full_name: str,
#     email: str,
#     company: Optional[str],
#     service: str,
#     message: str,
#     timestamp: str
# ) -> Dict[str, Any]:
#     """
#     Dispatches an HTML notification email to the studio owner whenever
#     a new contact inquiry is submitted on the website.
#     """
#     # Reload environment in case .env was edited while server was running
#     load_dotenv(dotenv_path=env_path, override=True)

#     smtp_host = os.getenv("SMTP_HOST", "smtp.gmail.com").strip()
#     smtp_port = int(os.getenv("SMTP_PORT", 587))
#     smtp_user = os.getenv("SMTP_USER", "").strip()
#     smtp_pass = os.getenv("SMTP_PASS", "").strip()
#     recipient = os.getenv("NOTIFICATION_EMAIL", "shiwammaddheshiya@gmail.com").strip()

#     if not smtp_user or not smtp_pass or smtp_pass.startswith("your_"):
#         print(f"[EMAIL NOTICE] SMTP credentials not set in backend/.env. Form lead from '{full_name}' ({email}) saved locally to contacts.json.")
#         return {
#             "status": "simulated",
#             "message": "SMTP_PASS is not configured in backend/.env. Simulated delivery only."
#         }

#     try:
#         msg = EmailMessage()
#         msg["Subject"] = f"🔔 New Project Inquiry: {full_name} — {service}"
#         msg["From"] = f"NOIRFORM Studio <{smtp_user}>"
#         msg["To"] = recipient
#         msg["Reply-To"] = email  # Enables clicking 'Reply' directly to the customer!

#         company_line = f"<p style='margin: 8px 0;'><strong>Company:</strong> {company}</p>" if company else ""

#         html_body = f"""
#         <!DOCTYPE html>
#         <html>
#         <head>
#             <meta charset="utf-8">
#         </head>
#         <body style="margin: 0; padding: 24px; background-color: #0A0A0A; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #FFFFFF;">
#             <div style="max-width: 600px; margin: 0 auto; background-color: #121212; border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 8px; padding: 32px;">
#                 <div style="border-bottom: 1px solid rgba(255, 255, 255, 0.1); padding-bottom: 20px; margin-bottom: 24px;">
#                     <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.25em; color: rgba(255, 255, 255, 0.5); font-family: monospace;">NOIRFORM Lead Alert</span>
#                     <h1 style="font-size: 24px; font-weight: 700; color: #FFFFFF; margin: 8px 0 0 0;">New Inquiry Received</h1>
#                 </div>

#                 <div style="font-size: 14px; line-height: 1.6; color: rgba(255, 255, 255, 0.85);">
#                     <p style="margin: 8px 0;"><strong>Client Name:</strong> <span style="color: #FFFFFF;">{full_name}</span></p>
#                     <p style="margin: 8px 0;"><strong>Client Email:</strong> <a href="mailto:{email}" style="color: #FFFFFF; text-decoration: underline;">{email}</a></p>
#                     {company_line}
#                     <p style="margin: 8px 0;"><strong>Service Requested:</strong> <span style="color: #FFFFFF;">{service}</span></p>
#                     <p style="margin: 8px 0;"><strong>Submitted At:</strong> <span style="color: rgba(255, 255, 255, 0.5); font-family: monospace; font-size: 12px;">{timestamp}</span></p>

#                     <div style="margin-top: 24px; padding: 18px; background-color: #1A1A1A; border-left: 3px solid #FFFFFF; border-radius: 4px;">
#                         <p style="margin: 0 0 6px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.2em; color: rgba(255, 255, 255, 0.5); font-family: monospace;">Project Details</p>
#                         <p style="margin: 0; color: #FFFFFF; white-space: pre-wrap; font-size: 14px; line-height: 1.5;">{message}</p>
#                     </div>
#                 </div>

#                 <div style="margin-top: 32px; border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 20px; font-size: 12px; color: rgba(255, 255, 255, 0.4);">
#                     <p style="margin: 0;">💡 <em>You can click <strong>Reply</strong> in your mail app to respond directly to {full_name}.</em></p>
#                 </div>
#             </div>
#         </body>
#         </html>
#         """

#         plain_text = (
#             f"New Project Inquiry from NOIRFORM Website\n\n"
#             f"Client Name: {full_name}\n"
#             f"Email: {email}\n"
#             f"Company: {company or 'N/A'}\n"
#             f"Service: {service}\n"
#             f"Submitted At: {timestamp}\n\n"
#             f"Message:\n{message}\n"
#         )

#         msg.set_content(plain_text)
#         msg.add_alternative(html_body, subtype="html")

#         with smtplib.SMTP(smtp_host, smtp_port, timeout=15) as server:
#             server.ehlo()
#             server.starttls()
#             server.ehlo()
#             server.login(smtp_user, smtp_pass)
#             server.send_message(msg)

#         print(f"[EMAIL SUCCESS] Instant email alert sent to {recipient} for lead '{full_name}'.", flush=True)
#         return {"status": "success", "message": f"Email delivered to {recipient}"}

#     except Exception as e:
#         print(f"[EMAIL ERROR] Failed to send email alert: {str(e)}", flush=True)
#         return {"status": "error", "message": str(e)}



import os
import smtplib
import ssl
from email.message import EmailMessage
from email.utils import formataddr
from html import escape
from typing import Optional, Dict, Any

from dotenv import load_dotenv

# Load local .env without overwriting Render variables
env_path = os.path.join(os.path.dirname(__file__), ".env")
load_dotenv(dotenv_path=env_path, override=False)


def send_notification_email(
    full_name: str,
    email: str,
    company: Optional[str],
    service: str,
    message: str,
    timestamp: str
) -> Dict[str, Any]:

    smtp_host = os.getenv("SMTP_HOST", "smtp.gmail.com").strip()
    smtp_user = os.getenv("SMTP_USER", "").strip()
    smtp_pass = os.getenv("SMTP_PASS", "").strip().replace(" ", "")
    recipient = os.getenv(
        "NOTIFICATION_EMAIL",
        "shiwammaddheshiya@gmail.com"
    ).strip()

    try:
        smtp_port = int(os.getenv("SMTP_PORT", "587"))

        if not smtp_user or not smtp_pass:
            print("[EMAIL ERROR] SMTP credentials missing", flush=True)
            return {"status": "error", "message": "SMTP credentials missing"}

        msg = EmailMessage()
        msg["Subject"] = f"New Project Inquiry: {full_name} - {service}"
        msg["From"] = formataddr(("NOIRFORM Studio", smtp_user))
        msg["To"] = recipient
        msg["Reply-To"] = email

        company_line = (
            f"<p><strong>Company:</strong> {escape(company)}</p>"
            if company else ""
        )

        html_body = f"""
        <html>
        <body style="background:#0A0A0A;color:white;padding:24px;font-family:Arial">
            <div style="max-width:600px;margin:auto;background:#121212;padding:30px">
                <h2>NOIRFORM - New Inquiry Received</h2>
                <hr>
                <p><strong>Client:</strong> {escape(full_name)}</p>
                <p><strong>Email:</strong> {escape(email)}</p>
                {company_line}
                <p><strong>Service:</strong> {escape(service)}</p>
                <p><strong>Submitted:</strong> {escape(timestamp)}</p>
                <h3>Project Details</h3>
                <p style="white-space:pre-wrap">{escape(message)}</p>
            </div>
        </body>
        </html>
        """

        plain_text = f"""
New Project Inquiry - NOIRFORM

Client: {full_name}
Email: {email}
Company: {company or "N/A"}
Service: {service}
Submitted: {timestamp}

Message:
{message}
"""

        msg.set_content(plain_text)
        msg.add_alternative(html_body, subtype="html")

        context = ssl.create_default_context()

        print(f"[EMAIL] Connecting to {smtp_host}:{smtp_port}", flush=True)

        with smtplib.SMTP(smtp_host, smtp_port, timeout=20) as server:
            server.ehlo()
            server.starttls(context=context)
            server.ehlo()
            server.login(smtp_user, smtp_pass)
            server.send_message(msg)

        print(f"[EMAIL SUCCESS] Sent to {recipient}", flush=True)

        return {
            "status": "success",
            "message": "Email sent successfully"
        }

    except Exception as e:
        print(f"[EMAIL ERROR] {type(e).__name__}: {e}", flush=True)
        return {"status": "error", "message": str(e)}
