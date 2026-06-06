import json
import re

from app.ai.gemini_client import model


def predict_severity(
    category: str,
    description: str
):

    prompt = f"""
    You are an emergency severity prediction AI.

    Category:
    {category}

    Description:
    {description}

    Return ONLY JSON.

    {{
      "severity_score": 0,
      "severity_level": "",
      "escalation_probability": 0
    }}
    """

    response = model.generate_content(prompt)

    text = response.text.strip()

    text = re.sub(r"```json", "", text)
    text = re.sub(r"```", "", text)

    return json.loads(text)