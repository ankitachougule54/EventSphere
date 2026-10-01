# 🎉 Event Management System

A full-stack **Event Management System** developed using the **MERN Stack** to simplify the process of creating, managing, organizing, and monitoring events through a centralized web application.

The system provides an administrator-focused dashboard where **events, employees, required items, and technologies** can be managed efficiently.

---

## 📌 About the Project

Managing events manually involves multiple activities such as maintaining event details, assigning employees, tracking required resources, and monitoring event status.

The **Event Management System** provides a centralized digital platform to organize these activities and maintain event-related information in a structured and efficient manner.

The application is developed using the **MERN Stack** and follows a **client-server architecture**.

---

## 🎯 Objectives

* Provide a centralized platform for event management.
* Allow administrators to create and manage events.
* Maintain event details in an organized manner.
* Assign employees to specific events.
* Manage required items for events.
* Manage technologies associated with events.
* Track the current status of events.
* Provide an easy-to-use administrative dashboard.
* Reduce manual effort involved in event organization.
* Maintain event-related resources in a structured manner.

---

## ✨ Key Features

### 📊 Admin Dashboard

The admin dashboard provides an overview of the system and displays important information such as:

* Total Events
* Event Status
* Employees
* Required Items
* Technologies

---

### 📅 Event Management

Administrators can create and manage event information including:

* Event Title
* Date & Time
* Venue
* Capacity
* Description
* Event Status
* Assigned Employees
* Required Items
* Technologies

### Event Status

Events can have one of the following statuses:

```text
Upcoming
Completed
Cancelled
```

---

### 👨‍💼 Employee Management

The system allows administrators to maintain employee information and assign employees to events according to event requirements.

---

### 🧰 Required Items Management

Event-related items can be maintained and associated with events to help organize the resources required for an event.

---

### 💻 Technology Management

Technologies required for an event can be maintained and associated with the corresponding event.

---

### 🔐 Admin Management

The admin section provides a centralized interface for managing event-related data.

The system includes dedicated admin components such as:

* Admin Header
* Admin Navbar
* Admin Sidebar
* Admin Footer
* Dashboard

---

## 🛠️ Technology Stack

### Frontend

* React.js
* JavaScript
* HTML5
* CSS3
* Axios
* React Router
* React-Bootstrap

### Backend

* Node.js
* Express.js
* REST API

### Database

* MongoDB
* Mongoose

### Development Tools

* Visual Studio Code
* Git
* GitHub
* Postman / Thunder Client

---

## 🏗️ System Architecture

```text
                         ┌──────────────────────┐
                         │        Admin         │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │   React Frontend     │
                         │   Admin Dashboard    │
                         └──────────┬───────────┘
                                    │
                              HTTP / REST API
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │   Express.js Server  │
                         │       Backend        │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │       MongoDB        │
                         │       Database       │
                         └──────────────────────┘
```

---

## 🔄 Event Management Flow

```text
Admin Login
     ↓
Admin Dashboard
     ↓
Create / Manage Event
     ↓
Add Event Details
     ↓
Assign Employees
     ↓
Add Required Items
     ↓
Add Technologies
     ↓
Set Event Status
     ↓
Monitor Events
```

---

## 📋 Event Data

Each event can contain information such as:

| Field              | Description                         |
| ------------------ | ----------------------------------- |
| Event Title        | Name of the event                   |
| Date & Time        | Scheduled event date and time       |
| Venue              | Event location                      |
| Capacity           | Maximum number of participants      |
| Description        | Information about the event         |
| Status             | Upcoming, Completed, or Cancelled   |
| Assigned Employees | Employees responsible for the event |
| Required Items     | Items/resources required            |
| Technologies       | Technologies required for the event |

---

## 📁 Project Structure

The project follows a frontend-backend structure.

```text
Event-Management/
│
├── frontend/
│   │
│   ├── public/
│   │
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── admin/
│   │   └── ...
│   │
│   ├── package.json
│   └── ...
│
├── backend/
│   │
│   ├── Controllers/
│   ├── Models/
│   ├── Routes/
│   ├── Middlewares/
│   ├── index.js
│   ├── package.json
│   └── ...
│
└── README.md
```

> **Note:** Update the folder names above if your actual repository uses different names.

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Navigate to the Project

```bash
cd Event-Management
```

---

### 3. Install Backend Dependencies

```bash
cd backend
npm install
```

---

### 4. Configure Environment Variables

Create a `.env` file inside the backend folder.

Example:

```env
PORT=9000
MONGODB_URI=your_mongodb_connection_string
```

> ⚠️ **Important:** Keep your `.env` file private. Never upload database credentials, passwords, API keys, or other sensitive information to GitHub.

---

### 5. Start the Backend

```bash
npm start
```

If your project uses Nodemon:

```bash
npm run dev
```

The backend server runs on:

```text
http://localhost:9000
```

---

### 6. Install Frontend Dependencies

Open another terminal:

```bash
cd frontend
npm install
```

---

### 7. Start the Frontend

```bash
npm start
```

The frontend will run on the local development URL provided by the React development server.

---

## 🔗 Backend API

The backend provides RESTful APIs for managing different parts of the application.

### Event API

Example event endpoints:

```text
GET     /events
POST    /events
PUT     /events/:id
DELETE  /events/:id
```

> The exact available endpoints may vary according to the implementation.

### Backend Server

```text
http://localhost:9000
```

---

## 🔄 Backend Architecture

The backend follows a structured architecture:

```text
Client Request
      ↓
    Routes
      ↓
  Controllers
      ↓
    Models
      ↓
   MongoDB
```

This separation helps keep the backend organized, maintainable, and easier to extend.

---

## 🎨 User Interface

The admin interface is designed with a structured dashboard layout containing:

* Navigation Bar
* Sidebar
* Dashboard
* Event Management Pages
* Employee Management
* Required Items Management
* Technology Management
* Footer

The application uses a **dark-themed interface** with a consistent visual design across the admin section.

---

## 📊 Project Benefits

* Centralized event information
* Reduced manual work
* Easy event tracking
* Organized resource management
* Simplified employee assignment
* Easy access to event information
* Structured data management
* Scalable application architecture

---

## 🚀 Future Scope

The system can be further enhanced with:

* 📧 Email Notifications
* 🔔 Event Reminders
* 📱 Improved Mobile Responsiveness
* 📊 Advanced Event Analytics
* 📅 Calendar Integration
* 👥 Participant Management
* 🎟️ Online Event Registration
* 📈 Event Reports
* 🔐 Advanced Role-Based Access Control
* ☁️ Cloud Deployment
* 📷 Event Image and Media Management
* 📩 Automated Event Notifications

---

## 💡 Project Vision

The goal of this project is to provide a structured and centralized solution for managing events and their associated resources.

The system can be further expanded into a complete event management platform supporting **event planning, employee coordination, resource management, participant registration, notifications, analytics, and reporting**.

---

## 📌 Project Information

**Project Name:** Event Management System

**Project Type:** Full-Stack Web Application

**Technology:** MERN Stack

**Purpose:** Educational / Academic Project

---

## 👩‍💻 Development

The **Event Management System** is a full-stack web application developed using the **MERN Stack** for centralized event organization and management.

---

## 📄 License

This project was developed for **educational and academic purposes**.
