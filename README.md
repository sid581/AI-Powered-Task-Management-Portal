# AI-Powered Task Management Portal

A full-stack task management application built using React, Spring Boot, MySQL and Gemini AI.

The application allows users to create, update, delete and manage their tasks. It also uses AI to generate a task description, suggest priority and estimate the completion time based on the task title.

---

## Features

- User registration and login
- JWT based authentication
- Protected routes
- Create tasks
- View tasks
- Update tasks
- Delete tasks
- Change task status
- Filter tasks by status
- AI generated task description
- AI suggested priority
- AI estimated completion time
- Responsive design
- Logout when authentication expires

---

## Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- React Router
- Axios

### Backend

- Java
- Spring Boot
- Spring Security
- JWT
- Spring Data JPA
- Maven

### Database

- MySQL

### AI

- Google Gemini API

---

## Project Structure

```
task-management-portal/
│
├── task-management-backend/
│   ├── src/
│   ├── pom.xml
│   └── .gitignore
│
├── task-management-frontend/
│   ├── src/
│   ├── package.json
│   └── .gitignore
│
├── database/
│   └── er-diagram.png
│
└── README.md

```
## Application Flow

The application works in the following way:

```
React Frontend
       |
       v
     Axios
       |
       v
Spring Boot REST API
       |
       v
Spring Security + JWT
       |
       v
  Service Layer
       |
       v
Repository Layer
       |
       v
   MySQL Database
 

```
## Authentication

The application uses JWT authentication.

The login flow is:

```
User Login
    |
    v
Spring Boot
    |
    v
Validate email and password
    |
    v
Generate JWT
    |
    v
React stores token
    |
    v
Token sent with API requests



```

## AI Feature

The application uses Google Gemini AI to help users create tasks faster.

The user enters a task title and clicks **Generate with AI**.

```
Task Title
    |
    v
Generate with AI
    |
    v
Spring Boot AI API
    |
    v
Gemini API
    |
    v
Description
Priority
Estimated Hours
    |
    v
Task form is automatically filled

```

## API Endpoints

### Authentication

| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user and generate JWT |

### Task Management

| POST | `/api/tasks` | Create a new task |
| GET | `/api/tasks` | Get all tasks of logged-in user |
| GET | `/api/tasks/{id}` | Get a task by ID |
| PUT | `/api/tasks/{id}` | Update a task |
| DELETE | `/api/tasks/{id}` | Delete a task |
| PATCH | `/api/tasks/{id}/status` | Update task status |

### AI

| POST | `/api/ai/generate-task` | Generate task description, priority and estimated hours using Gemini AI |



## AI Integration

The application uses Google Gemini API to help users create tasks faster.

The user only needs to enter the task title and click the "Generate with AI" button.

The backend sends the task title to the Gemini API with a prompt asking for:

- Task description
- Suggested priority
- Estimated completion time

The AI response is then processed by the backend and the generated values are sent back to the frontend.

The frontend automatically fills the task form with the generated values. The user can also edit these values before creating the task.



## Links

- **GitHub Repository:** https://github.com/yourusername/task-management-portal
- **Demo Video:** https://drive.google.com/file/d/1DJU7bmg2vWvj-pdrylg1PzU8z_olZp3u/view?usp=sharing

