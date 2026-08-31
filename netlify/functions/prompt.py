import json
import os
import urllib.request
import urllib.error


def handler(event, context):
    # Only allow POST requests
    if event.get("httpMethod") != "POST":
        return {
            "statusCode": 405,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps({"error": "Only POST is allowed"})
        }

    try:
        body = json.loads(event.get("body") or "{}")
        prompt = str(body.get("prompt", "")).strip()

        if not prompt:
            return {
                "statusCode": 400,
                "headers": {"Content-Type": "application/json"},
                "body": json.dumps({"error": "Prompt is required"})
            }

        api_key = os.environ.get("GEMINI_API_3")

        if not api_key:
            return {
                "statusCode": 500,
                "headers": {"Content-Type": "application/json"},
                "body": json.dumps({"error": "Gemini API key is not configured"})
            }

        url = (
            "https://generativelanguage.googleapis.com/"
            "v1beta/models/gemini-2.5-flash:generateContent"
            "?key=" + api_key
        )

        data = {
            "contents": [
                {
                    "parts": [
                        {
                            "text": (
                                "You are Muzammil AI, a helpful and friendly "
                                "AI assistant. Answer clearly and naturally. "
                                "The user may write in Urdu, Roman Urdu, or English. "
                                "Reply in the language the user uses.\n\n"
                                "User: " + prompt
                            )
                        }
                    ]
                }
            ]
        }

        request = urllib.request.Request(
            url,
            data=json.dumps(data).encode("utf-8"),
            headers={"Content-Type": "application/json"},
            method="POST"
        )

        with urllib.request.urlopen(request, timeout=30) as response:
            result = json.loads(response.read().decode("utf-8"))

        text = (
            result.get("candidates", [{}])[0]
            .get("content", {})
            .get("parts", [{}])[0]
            .get("text", "")
        )

        if not text:
            text = "Sorry, I couldn't generate a response."

        return {
            "statusCode": 200,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            "body": json.dumps({
                "ok": True,
                "prompt": text
            })
        }

    except urllib.error.HTTPError as e:
        error_text = e.read().decode("utf-8", errors="ignore")

        return {
            "statusCode": 500,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps({
                "error": "Gemini API error",
                "details": error_text
            })
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps({
                "error": "Server error",
                "details": str(e)
            })
  }
