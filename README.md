# 🚨 Mahakumbh – AI Powered Emergency Response Coordination Platform

## Overview

Mahakumbh – AI Powered Emergency Response Coordination Platform is an intelligent emergency management system designed to improve response times, resource coordination, and situational awareness during large-scale public gatherings such as Mahakumbh.

The platform enables citizens to report incidents, uses AI to analyze emergencies, recommends appropriate resources, manages dispatch operations, and provides a real-time command center dashboard for emergency responders.

---

## Problem Statement

Large public gatherings often face challenges such as:

* Crowd congestion
* Medical emergencies
* Fires
* Missing persons
* Route blockages
* Security incidents
* Delayed emergency response
* Inefficient resource allocation

Traditional emergency response systems rely heavily on manual coordination, resulting in slower response times and reduced operational efficiency.

This platform addresses these challenges through AI-assisted decision-making, automated workflows, and real-time coordination.

---

# 🎯 Key Features

### 🤖 AI-Powered Incident Analysis

* Uses Google Gemini AI to analyze reported incidents.
* Automatically predicts:

  * Incident Category
  * Severity Level
  * Severity Score
  * Escalation Probability
  * Recommended Resource Type

---

### 🚨 Real-Time Emergency Response Workflow

Complete emergency lifecycle management:

Incident Reported
↓
AI Analysis
↓
Resource Recommendation
↓
Dispatch Creation
↓
En Route
↓
Arrived
↓
Completed
↓
Incident Resolved

---

### 🚑 Smart Resource Recommendation Engine

Automatically recommends suitable emergency resources.

Examples:

| Incident Type     | Recommended Resources             |
| ----------------- | --------------------------------- |
| Fire              | Fire Truck                        |
| Medical Emergency | Ambulance                         |
| Crime             | Police Unit                       |
| Stampede          | Ambulance + Medical Team + Police |
| Flood             | Ambulance + Police                |

Only currently available resources are recommended.

---

### 🚓 Resource Dispatch Management

Tracks deployment lifecycle through:

* Assigned
* En Route
* Arrived
* Completed
* Cancelled

When a dispatch is completed:

* Resource becomes available again
* Incident is automatically resolved
* Dashboard statistics are updated

---

### 📊 Real-Time Command Center Dashboard

Provides live operational visibility including:

* Total Incidents
* Active Incidents
* Resolved Incidents
* Available Resources
* Busy Resources
* Active Dispatches

---

### ⚡ WebSocket-Based Live Monitoring

Real-time updates without page refresh.

Supported live events:

* Incident Created
* Dispatch Created
* Dispatch Updated
* Incident Resolved
* Dashboard Updates
* Public Alerts

---

### 👥 Role-Based Emergency Operations

Dedicated operational interfaces for:

* Police Department
* Fire Department
* Ambulance Services
* Medical Teams
* Disaster Management Authority
* Central Command / Admin

---

### 📢 Public Alert System

Citizens can view:

* Emergency Alerts
* Crowd Density Warnings
* Route Closures
* Medical Advisories
* Safety Notifications

without requiring authentication.

---

### 📝 Citizen Incident Reporting

Citizens can report incidents directly without creating an account.

Benefits:

* Faster reporting
* Improved accessibility
* Reduced reporting friction
* Better public participation

---

### 🏗️ Scalable AI Architecture

Originally designed with multiple AI agents:

Incident
↓
Analyzer Agent
↓
Severity Agent
↓
Resource Agent

This caused Gemini API quota issues.

Current optimized architecture:

Incident
↓
Single Gemini Call
↓
Structured AI Output
↓
Rule-Based Recommendation Engine

Benefits:

* Reduced API usage
* Faster response times
* Better scalability
* Lower operational costs

---

# 🏛️ System Architecture

## Frontend

* React
* Vite
* Tailwind CSS
* TanStack Router
* Recharts

---

## Backend

* FastAPI
* SQLAlchemy
* JWT Authentication
* WebSockets

---

## Database

Current:

* SQLite

Future:

* PostgreSQL

---

## AI Layer

* Google Gemini API
* Single-Call AI Analysis Architecture

---

# 🔄 System Workflow

## Citizen Workflow

Citizen Reports Incident
↓
Incident Created
↓
AI Analysis
↓
Alert Generated
↓
Command Center Notified

---

## Emergency Response Workflow

Incident Reported
↓
AI Incident Analysis
↓
Resource Recommendation
↓
Resource Dispatch
↓
En Route
↓
Arrived
↓
Completed
↓
Incident Resolved

---

# 📡 API Modules

## Authentication Module

* Register User
* Login User
* JWT Authentication

---

## Incident Module

* Create Incident
* Get All Incidents
* Get Incident By ID
* Delete Incident

---

## Resource Module

* Create Resource
* Get Resources

---

## AI Module

* Incident Analysis
* Severity Prediction
* Category Classification

---

## Recommendation Module

* Resource Recommendation Engine

---

## Dispatch Module

* Create Dispatch
* Get Dispatches
* Update Dispatch Status
* Dispatch Lifecycle Management

---

## Dashboard Module

* Dashboard Statistics
* Live Dashboard Data

---

## WebSocket Module

* Real-Time Notifications
* Live Monitoring
* Event Broadcasting

---

# 🔑 Environment Variables & API Keys

This project uses external services that require API keys and secret credentials.

Create a `.env` file inside the backend directory:

```env
DATABASE_URL=sqlite:///./mahakumbh.db

SECRET_KEY=your_secret_key

ALGORITHM=HS256

GEMINI_API_KEY=your_gemini_api_key
```

---

## GEMINI_API_KEY

The platform uses Google's Gemini API for AI-powered incident analysis.

### Purpose

When a citizen reports an incident, Gemini AI analyzes the description and returns:

* Category
* Severity
* Severity Score
* Escalation Probability
* Recommended Resource Type

Example:

Input:

```text
Fire reported near Gate 12 with heavy smoke.
```

Output:

```json
{
  "category": "Fire",
  "severity": "Critical",
  "severity_score": 95,
  "escalation_probability": 90,
  "recommended_resource": "Fire Truck"
}
```

### How to Obtain a Gemini API Key

1. Visit: https://aistudio.google.com/
2. Sign in with a Google account.
3. Navigate to "Get API Key".
4. Create a new API key.
5. Copy the key into:

```env
GEMINI_API_KEY=your_generated_key
```

---

## SECRET_KEY

Used for:

* JWT Authentication
* Access Token Generation
* Secure API Access

Example:

```env
SECRET_KEY=your_random_secret_key
```

---

## DATABASE_URL

Current configuration:

```env
DATABASE_URL=sqlite:///./mahakumbh.db
```

Future PostgreSQL configuration:

```env
DATABASE_URL=postgresql://username:password@host/database
```

---

## Security Notice

Never commit:

```text
.env
.env.local
.env.production
```

These files may contain:

* API Keys
* Database Credentials
* Authentication Secrets

Always use environment variables for deployment.

---

# ⚙️ Installation & Setup

## Clone Repository

```bash
git clone <repository-url>

cd Mahakumbh---AI-Powered-Emergency-Response-Coordination-Platform
```

---

## Backend Setup

```bash
cd backend

python -m venv venv
```

Activate Virtual Environment:

### Windows

```bash
venv\Scripts\activate
```

### Linux / Mac

```bash
source venv/bin/activate
```

Install Dependencies:

```bash
pip install -r requirements.txt
```

Run Backend:

```bash
uvicorn app.main:app --reload
```

Backend URL:

```text
http://localhost:8000
```

Swagger Documentation:

```text
http://localhost:8000/docs
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

---

# 🚀 Future Enhancements

* PostgreSQL Integration
* GIS-Based Incident Mapping
* Predictive Crowd Management
* AI Multi-Agent Architecture
* SMS Alert System
* Mobile Application
* Drone-Based Monitoring
* Voice-Based Emergency Reporting
* Advanced Analytics & Forecasting

---

# 📈 Impact

This platform enables:

* Faster Emergency Response
* Better Resource Utilization
* Improved Situational Awareness
* Real-Time Coordination
* Enhanced Public Safety
* Scalable Emergency Management

making it suitable for:

* Mahakumbh Events
* Religious Gatherings
* Smart Cities
* Disaster Management Operations
* Public Safety Monitoring
* Large-Scale Crowd Events

---

# 🏆 Project Highlights

✅ AI-Powered Incident Analysis
✅ Smart Resource Recommendation Engine
✅ Real-Time Command Center Dashboard
✅ WebSocket-Based Live Monitoring
✅ Role-Based Emergency Operations
✅ Citizen Incident Reporting
✅ Automated Dispatch Management
✅ Automatic Incident Resolution
✅ Public Alert System
✅ Scalable AI Architecture

---

## Developed For

**Mahakumbh – AI Powered Emergency Response Coordination Platform**

An AI-enabled emergency management solution designed to enhance safety, coordination, and operational efficiency during large public gatherings and emergency situations.
