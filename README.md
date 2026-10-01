# 🎉 EventSphere

A full-stack **Event Management System** developed using the **MERN Stack** to simplify the process of creating, managing, organizing, and monitoring events through a centralized web application.

**EventSphere** provides an administrator-focused platform where events, employees, required items, technologies, event registrations, and other event-related information can be managed efficiently.

---

## 📌 About the Project

Managing events manually involves multiple activities such as maintaining event details, assigning employees, tracking required resources, managing technologies, and monitoring event status.

**EventSphere** provides a centralized digital platform to organize these activities and maintain event-related information in a structured and efficient manner.

The application follows a **client-server architecture**:

- **Frontend:** React.js
- **Backend:** Node.js + Express.js
- **Database:** MongoDB
- **API Communication:** REST API

---

## 🎯 Objectives

- Provide a centralized platform for event management.
- Allow administrators to create and manage events.
- Maintain event details in an organized manner.
- Assign employees to specific events.
- Manage required items for events.
- Manage technologies associated with events.
- Track the current status of events.
- Manage event registrations.
- Provide an easy-to-use administrative dashboard.
- Reduce manual effort involved in event organization.
- Maintain event-related resources in a structured manner.
- Provide a scalable full-stack application architecture.

---

## ✨ Key Features

### 📊 Admin Dashboard

The admin dashboard provides an overview of the system and displays important information such as:

- Total Events
- Event Status
- Employees
- Required Items
- Technologies
- Event Registrations

---

### 📅 Event Management

Administrators can create and manage event information including:

- Event Title
- Date & Time
- Venue
- Capacity
- Description
- Event Status
- Assigned Employees
- Required Items
- Technologies

### Event Status

Events can have one of the following statuses:

```text
Upcoming
Completed
Cancelled
👨‍💼 Employee Management

The system allows administrators to maintain employee information and assign employees to events according to event requirements.

🧰 Required Items Management

Event-related items can be maintained and associated with events to help organize the resources required for an event.

💻 Technology Management

Technologies required for an event can be maintained and associated with the corresponding event.

📝 Event Registration

The system supports event registration functionality for managing registration-related information associated with events.

🖼️ Gallery Management

The system supports gallery-related functionality for managing event images and other media uploaded through the application.

📞 Contact Management

The application includes contact-related functionality for handling contact information and enquiries.

🔐 Admin Management

The admin section provides a centralized interface for managing event-related data.

The application includes dedicated admin components such as:

Admin Header
Admin Navbar
Admin Sidebar
Admin Footer
Dashboard
Event Management
Employee Management
Item Management
Technology Management
Gallery Management
Registration Management
🛠️ Technology Stack
Frontend
React.js
JavaScript
HTML5
CSS3
Axios
React Router
React-Bootstrap
Backend
Node.js
Express.js
REST API
JWT Authentication
Middleware-based request handling
Database
MongoDB
Mongoose
Development Tools
Visual Studio Code
Git
GitHub
Postman
Thunder Client
🏗️ System Architecture
                         ┌──────────────────────┐
                         │        Admin         │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │    React Frontend    │
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
🔄 Event Management Flow
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
Manage Registrations
     ↓
Monitor Events
📋 Event Data

Each event can contain information such as:

Field	Description
Event Title	Name of the event
Date & Time	Scheduled event date and time
Venue	Event location
Capacity	Maximum number of participants
Description	Information about the event
Status	Upcoming, Completed, or Cancelled
Assigned Employees	Employees responsible for the event
Required Items	Items/resources required
Technologies	Technologies required for the event
📁 Project Structure

EventSphere uses a combined frontend-backend repository structure.

EventSphere/
│
├── public/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── admin/
│   └── ...
│
├── server2/
│   │
│   ├── controllers/
│   │   ├── AdminController.js
│   │   ├── ContactController.js
│   │   ├── EmployeeController.js
│   │   ├── EventController.js
│   │   ├── EventRegistrationController.js
│   │   ├── GalleryController.js
│   │   ├── ItemController.js
│   │   ├── TechController.js
│   │   └── UserController.js
│   │
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   │   ├── profileUpload.js
│   │   ├── roleMiddleware.js
│   │   └── upload.js
│   │
│   ├── models/
│   │   ├── Contact.js
│   │   ├── Employee.js
│   │   ├── Event.js
│   │   ├── EventRegistration.js
│   │   ├── Gallery.js
│   │   ├── Item.js
│   │   ├── Tech.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── AdminRouter.js
│   │   ├── ContactRouter.js
│   │   ├── EmployeeRouter.js
│   │   ├── EventRegistrationRouter.js
│   │   ├── EventRouter.js
│   │   ├── GalleryRouter.js
│   │   ├── TechRouter.js
│   │   ├── UserRouter.js
│   │   └── itemRouter.js
│   │
│   ├── uploads/
│   │
│   ├── index.js
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
├── package.json
├── package-lock.json
└── README.md

Note: server2/.env and server2/node_modules/ are intentionally excluded from GitHub through .gitignore.

⚙️ Installation & Setup
1. Clone the Repository
git clone https://github.com/ankitachougule54/EventSphere.git

Navigate into the project:

cd EventSphere
🎨 Frontend Setup
2. Install Frontend Dependencies

From the EventSphere root directory:

npm install
3. Start the Frontend
npm start

The React development server will normally run at:

http://localhost:3000
⚙️ Backend Setup
4. Navigate to Backend

Open another terminal and run:

cd EventSphere/server2
5. Install Backend Dependencies
npm install
6. Configure Environment Variables

Create a .env file inside:

EventSphere/server2/.env

Example:

PORT=9000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

⚠️ Important: Never upload your .env file to GitHub. It may contain sensitive information such as database credentials, passwords, secret keys, or API keys.

7. Start the Backend

From the server2 directory:

npm start

If the project uses Nodemon:

npm run dev

The backend server runs locally on:

https://eventsphere-5fey.onrender.com
🔗 Backend API

The backend provides RESTful APIs for different modules of the EventSphere application.

Event API

Example endpoints:

GET     /events
POST    /events
PUT     /events/:id
DELETE  /events/:id
API Modules

The backend contains routes for:

Admin
Users
Employees
Events
Event Registrations
Gallery
Items
Technologies
Contacts

The exact available endpoints depend on the implementation of each module.

🔄 Backend Architecture

The backend follows a structured architecture based on routes, controllers, models, and middleware.

Client Request
      ↓
    Routes
      ↓
  Middleware
      ↓
 Controllers
      ↓
   Models
      ↓
   MongoDB
Controllers

Controllers contain the application logic for handling requests and responses.

Models

Mongoose models define the structure of data stored in MongoDB.

Routes

Routes define the API endpoints through which the frontend communicates with the backend.

Middleware

Middleware is used for tasks such as authentication, authorization, file uploads, and request processing.

🔐 Authentication & Authorization

The backend supports authentication and protected API functionality using middleware.

The application includes functionality for:

User authentication
JWT-based authorization
Protected routes
Role-based access control

Sensitive authentication information should always be stored securely using environment variables.

🖼️ File Uploads

The backend contains an uploads directory for storing uploaded files and images used by the application.

server2/
└── uploads/
    ├── event images
    ├── user images
    └── other uploaded files
🎨 User Interface

The EventSphere admin interface is designed with a structured dashboard layout containing:

Navigation Bar
Sidebar
Dashboard
Event Management
Employee Management
Required Items Management
Technology Management
Gallery Management
Event Registration Management
Footer

The application uses a dark-themed interface with a consistent visual design across the admin section.

📊 Project Benefits
Centralized event information
Reduced manual work
Easy event tracking
Organized resource management
Simplified employee assignment
Structured technology management
Event registration management
Easy access to event information
Structured data management
Scalable application architecture
🚀 Deployment

EventSphere is designed to be deployed using separate hosting services for the frontend and backend.

Frontend

The React frontend can be deployed using:

Vercel
Backend

The Node.js and Express.js backend can be deployed using:

Render
Database

The MongoDB database can be hosted using:

MongoDB Atlas

After deployment, the production URLs can be added below:

Frontend: <Vercel URL>
Backend:  <Render URL>
🔧 Production Environment Variables

For production deployment, environment variables should be configured through the hosting platform instead of committing them to GitHub.

Example backend variables:

PORT=9000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

Never expose production credentials, database connection strings, JWT secrets, or other sensitive values in the source code.

🔮 Future Scope

The system can be further enhanced with:

📧 Email Notifications
🔔 Event Reminders
📱 Improved Mobile Responsiveness
📊 Advanced Event Analytics
📅 Calendar Integration
👥 Participant Management
🎟️ Online Event Registration
📈 Event Reports
🔐 Advanced Role-Based Access Control
☁️ Cloud Deployment
📷 Advanced Event Image and Media Management
📩 Automated Event Notifications
🔎 Advanced Event Search and Filtering
💡 Project Vision

The goal of EventSphere is to provide a structured and centralized solution for managing events and their associated resources.

The system can be further expanded into a complete event management platform supporting:

Event Planning → Employee Coordination → Resource Management → Participant Registration → Notifications → Analytics → Reporting

📌 Project Information
Category	Details
Project Name	EventSphere
Project Type	Full-Stack Web Application
Technology	MERN Stack
Frontend	React.js
Backend	Node.js + Express.js
Database	MongoDB
API	REST API
Purpose	Educational / Academic Project
👩‍💻 Development

EventSphere is a full-stack web application developed using the MERN Stack for centralized event organization and management.

The project demonstrates the integration of:

React.js frontend
Node.js backend
Express.js REST APIs
MongoDB database
Mongoose
Authentication and authorization
CRUD operations
File uploads
Admin dashboard
Event management
📄 License

This project is developed for educational and academic purposes.

⭐ Acknowledgement

This project was developed as part of the learning and practical implementation of Full-Stack Web Development using the MERN Stack.