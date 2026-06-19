# RideNow – Full Stack Application

This repository contains both the **backend** and **frontend** of the Uber clone project.
The application provides a complete ride-booking experience with separate flows for **users** and **captains**.

---

## 🚗 Uber Backend

This is the backend for the Uber clone application. It handles user registration, authentication, and other backend services.

### Features

* **User Registration & Authentication**
* **User Profile Management**
* **Captain Registration & Authentication**
* **Captain Profile Management**
* **Secure JWT-based Authentication**
* **Logout for Users and Captains**
* **Socket.io Integration (for real-time tracking)**

---

## 🔗 API Endpoints

Below is an overview of the main endpoints:

### 👤 User Endpoints

| Method | Endpoint          | Description                    |
| ------ | ----------------- | ------------------------------ |
| POST   | `/users/register` | Register a new user            |
| POST   | `/users/login`    | Log in an existing user        |
| GET    | `/users/profile`  | Get authenticated user profile |
| GET    | `/users/logout`   | Log out the current user       |

### 🚖 Captain Endpoints

| Method | Endpoint                  | Description                       |
| ------ | ------------------------- | --------------------------------- |
| POST   | `/captain/register`       | Register a new captain            |
| POST   | `/captain/logincaptain`   | Log in an existing captain        |
| GET    | `/captain/profilecaptain` | Get authenticated captain profile |
| GET    | `/captain/logoutcaptain`  | Log out the current captain       |

---

## 🧠 Backend Documentation

### Technology Stack

* **Node.js** (Runtime)
* **Express.js** (Web Framework)
* **MongoDB + Mongoose** (Database)
* **JWT** (Authentication)
* **bcrypt.js** (Password Hashing)
* **Socket.io** (Real-time Communication)
* **Cors & dotenv** (Middleware & Configuration)

### Folder Structure

```
Backend/
├── Models/           # Mongoose schemas for User, Captain, Ride
├── Routes/           # Express routes
├── Controllers/      # Route handlers
├── Middlewares/      # Authentication and utility middleware
├── Utils/            # Helper functions
├── server.js         # Entry point of the application
└── .env              # Environment variables
```

### Environment Variables

```
PORT=3000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
```

### Run the Backend

```bash
cd Backend
npm install
npm run dev
```

Server starts on: **[http://localhost:3000](http://localhost:3000)**

---

## 🖥️ Uber Frontend

This is the frontend for the Uber clone application built using **React + Vite + Tailwind CSS**.

### Features

#### For Users:

* Register / Login
* Book a ride (Pickup & Destination)
* View nearby captains
* Track live ride progress
* Logout securely

#### For Captains:

* Register / Login
* Accept rides
* Share live location
* End rides
* Logout securely

---

## 🧩 Frontend Structure

```
src/
├── assets/            # Images and icons
├── components/        # Reusable UI components
├── Context/           # React Context for managing state
├── pages/             # Application pages
├── App.jsx            # Root component
├── main.jsx           # App entry point
└── index.css          # Tailwind setup
```

### Important Components

| Component              | Description                               |
| ---------------------- | ----------------------------------------- |
| `ConfirmRide.jsx`      | Displays ride confirmation details        |
| `LiveTracking.jsx`     | Real-time ride tracking via Google Maps   |
| `VehiclePanel.jsx`     | Lets users choose a vehicle type          |
| `WaitingForDriver.jsx` | Shows waiting screen until driver accepts |

### Pages

| Page                | Description               |
| ------------------- | ------------------------- |
| `Home.jsx`          | Main ride booking page    |
| `UserSignup.jsx`    | User registration form    |
| `UserLogin.jsx`     | User login form           |
| `CaptainSignup.jsx` | Captain registration form |
| `CaptainLogin.jsx`  | Captain login form        |
| `Riding.jsx`        | Displays live ride data   |

---

## ⚙️ Frontend Configuration

### Environment Variables (`.env`)

```
VITE_BASE_URL=http://localhost:3000
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

### Run the Frontend

```bash
cd Frontend
npm install
npm run dev
```

App runs on: **[http://localhost:5173](http://localhost:5173)**

---

## 📘 Project Documentation

### 1. Authentication Flow

* **Users and Captains** both have separate registration & login APIs.
* JWT Tokens are issued upon successful login.
* Tokens are stored in localStorage and sent in `Authorization` headers for protected routes.

### 2. State Management

* Managed using **React Context API**:

  * `UserContext` → Handles user data and auth state.
  * `CaptainContext` → Handles captain data and auth state.
  * `SocketContext` → Manages WebSocket connections for live tracking.

### 3. Real-time Ride Updates

* Implemented via **Socket.io**.
* Users can view live ride progress and captain’s location.
* Captains share live coordinates during rides.

### 4. Database Models

#### User Model

```js
{
  fullName: String,
  email: String,
  password: String,
  socketid: String
}
```

#### Captain Model

```js
{
  fullname: {
    firstname: String,
    lastname: String
  },
  email: String,
  password: String,
  vehicle: {
    color: String,
    plate: String,
    capacity: Number,
    vehicleType: String
  }
}
```

### 5. Deployment

* **Backend** can be deployed to Render / Railway.
* **Frontend** can be deployed to Vercel / Netlify.
* Update `.env` files accordingly with production URLs.

---

## 📄 License

This project is licensed under the **MIT License**.
Feel free to use, modify, and distribute as per the license terms.

---

## 📚 Resources

* [Express.js Docs](https://expressjs.com/)
* [MongoDB Docs](https://docs.mongodb.com/)
* [React Docs](https://react.dev/)
* [Tailwind CSS Docs](https://tailwindcss.com/)
* [Socket.io Docs](https://socket.io/)
* [Google Maps API Docs](https://developers.google.com/maps/documentation)

---

**Author:** Nishant Chauhan
**Email:** [nishantchauhannn@gmail.com](mailto:nishantchauhannn@gmail.com)
