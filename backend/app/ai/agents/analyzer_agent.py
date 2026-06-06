import json
import re

from app.ai.gemini_client import model


def analyze_incident(description: str):

    prompt = f"""
    You are an emergency response AI.

    Analyze this incident:

    {description}

    Return ONLY valid JSON.

    No markdown.
    No explanation.
    No code blocks.

    Format:

    {{
        "category": "",
        "severity": "",
        "severity_score": 0,
        "escalation_probability": 0,
        "recommended_resource": ""
    }}
    """

    response = model.generate_content(prompt)

    try:
        text = response.text.strip()

        text = re.sub(r"```json", "", text)
        text = re.sub(r"```", "", text)

        text = text.strip()

        return json.loads(text)

    except Exception as e:

        return {
            "category": "Unknown",
            "severity": "Medium",
            "recommended_resource": "Manual Review",
            "error": str(e)
        }