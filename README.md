# Project Manager

A simple Project Manager web app built with **React (frontend)** and **Node.js/Express (backend)**.  
It lets you create projects, add tasks, update their status, and manage everything in one place.  

---

## 🚀 Features
- Create, edit, and delete projects
- Add and manage tasks for each project
- Update task status (e.g., Todo → In Progress → Done)
- Authentication with JWT
- Responsive UI built with TailwindCSS

---

## 🛠️ How to use the website locally

### 1. Clone the Repository
```bash
git clone https://github.com/georgeibrahim1/projects-manager
cd projects-manager
```

### 2. Backend Setup
```bash
cd backend/server
npm install
```

Run backend server:
```bash
npm run dev
```

> The backend should now be running at `http://localhost:3000`

---

### 3. Frontend Setup
```bash
cd projects-manager
npm install
```

Start the React app:
```bash
npm run dev
```

> The frontend will run at `http://localhost:5173` (Vite default)  
> or `http://localhost:3000` if using CRA.

---

## 🔧 Tech Stack
- **Frontend:** React, TailwindCSS, Vite  
- **Backend:** Node.js, Express.js, MongoDB  
- **Auth:** JWT
> ⚠️ Note: Passwords are stored in plain text. For security reasons, use only dummy/fake passwords when testing this project.

---

## 📜 License
MIT  
