# Skillshare Marketplace App

A full-stack skill sharing platform where users can post tasks and providers can offer their services. Built with Next.js, NestJS, PostgreSQL, and TypeScript.

---

## 🚀 Features
- Role-based Signup/Login for Providers and Users
- Task management: Create, Update, Progress, Complete
- Skill management for Providers
- Offers: Providers submit, Users accept/reject
- Progress updates and timestamping
- Fully RESTful API with Swagger documentation

---

## 🛠️ Tech Stack
- **Frontend:** Next.js + TypeScript
- **Backend:** NestJS + TypeORM
- **Database:** PostgreSQL
- **API:** REST + Swagger (OpenAPI)

---

## 🧑‍💻 Local Development

### 1. Clone the Repository
```bash
git clone <repo-url>
cd skillshare-backend
```

### 2. Backend Setup
```bash
npm install
npm run start:dev
```

### 3. Frontend Setup
```bash
cd ../skillshare-frontend
npm install
npm run dev
```

### 4. Environment Variables (`skillshare-backend/.env`)
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=yourpassword
DB_NAME=skillshare
```

---

## 📘 API Docs
After starting the backend, access Swagger UI:
```
http://localhost:3000/api
```

---

