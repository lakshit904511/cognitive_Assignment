# Pastebin Lite

A simple Pastebin-like web application where users can create text pastes
and share them via a link. Each paste can optionally expire based on
time-to-live (TTL) or a maximum view count.

This project is built as part of a take-home assignment and is designed
to pass automated backend tests.

---

## 🚀 Live URLs

- **Frontend**: https://cognitive-assignment.vercel.app  
- **Backend**: https://cognitive-assignment.onrender.com  

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- React Router (`HashRouter`)
- Deployed on **Vercel**

### Backend
- Node.js
- Express
- MongoDB Atlas (via Mongoose)
- Deployed on **Render**

---

## ✨ Features

- Create a text paste
- Generate a shareable link for each paste
- View a paste via the shared link
- Optional constraints:
  - Time-based expiry (TTL)
  - Maximum number of views
- Paste becomes unavailable (404) once constraints are exceeded
- Safe rendering of paste content (no script execution)

---

## 🔌 API Endpoints

### Health Check
