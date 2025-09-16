
 🌍 Migrant Health Record System

A **full-stack healthcare solution** for migrants, foreigners, and returning citizens.
It integrates **doctor appointments, health records, outbreak tracking, notifications, and video consultations** into one secure system.

This repo contains both **backend (FastAPI + MongoDB)** and **frontend (React Native with maps)**.

## ✨ Features

* 🏥 **Doctor Appointments** → Book, manage, and get reminders
* 💊 **Medicine Reminders** → Smart notifications (Firebase + SMS)
* 🎥 **Video Consultations** → Integrated with Twilio
* 🌍 **Map Integration**

  * Nearby hospitals shown on map
  * Outbreak zones highlighted in red circles
* 📖 **Health Record Management**

  * Linked with **ABHA APIs** for secure health record storage
  * Blockchain concept for tamper-proof logs
* 🔔 **Notifications** → Push & SMS
* 🌐 **Multilingual support** → Migrant-friendly interface

## 🛠️ Tech Stack

### Backend

* **FastAPI** (Python)
* **MongoDB** for data storage
* **JWT Auth** for security
* APIs for hospitals, outbreaks, appointments, notifications

### Frontend

* **React Native** (cross-platform mobile app)
* **React Native Maps** for hospital & outbreak visualization
* **Axios** for API communication
* **Firebase** for push notifications


## 📂 Project Structure
migrant-health-system/
│
├── backend/                 # FastAPI backend
│   ├── main.py              # Main FastAPI app
│   ├── requirements.txt     # Python dependencies
│   └── ...                  
│
├── frontend/                # React Native app
│   ├── App.js               # Main mobile app
│   ├── package.json         # Node dependencies
│   └── ...
│
└── README.md

## ⚡ Getting Started

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/migrant-health-system.git
cd migrant-health-system
```

### 2️⃣ Backend Setup
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

* Runs on: **[http://127.0.0.1:8000](http://127.0.0.1:8000)**
* API docs: **[http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)**

Frontend Setup


cd frontend
npm install
npx react-native run-android   # for Android
npx react-native run-ios       # for iOS (Mac only)
```

* Backend URL in emulator: use **[http://10.0.2.2:8000](http://10.0.2.2:8000)

Map API Demo

* Hospitals are shown as **blue markers**
* Outbreak zones are shown as **red circles**

Hospital Example

```json
POST /api/map/hospitals
{
  "name": "AIIMS Delhi",
  "lat": 28.5672,
  "lng": 77.2100,
  "address": "AIIMS Campus, Delhi"
}

```json
POST /api/map/outbreaks
{
  "disease": "Dengue",
  "lat": 28.60,
  "lng": 77.20,
  "radius": 5000
}

## 🔒 Security

* JWT-based authentication
* End-to-end encryption for video consultations
* Blockchain-based logs for tamper-proof medical records


## 🚀 Future Enhancements

* Integrate with **ABHA APIs** for real records
* AI-powered **personalized health alerts**
* Twilio-based **video consultation screen**
* Firebase Cloud Messaging for live notifications
* Multi-language UI for migrant adoption


## 🤝 Contributing

Pull requests are welcome!
Please open an issue first to discuss proposed changes.



