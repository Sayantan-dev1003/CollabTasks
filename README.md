# CollabTasks: Multi-Tenant Task Management Platform

CollabTasks is a robust, multi-tenant task management application built using the MERN (MongoDB, Express.js, React, Node.js) stack. It's designed to provide organizations with a centralized platform to manage tasks efficiently, offering features like role-based access control, automated task status updates, and containerized deployment.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Containerization](#containerization)
- [Deployment](#deployment)
- [Testing](#testing)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## Features

CollabTasks offers a comprehensive set of features to cater to organizational task management needs:

### [cite_start]1. Multi-Tenant User Management 
- [cite_start]**Organization-based Multi-Tenancy**: Ensures data isolation per organization, with users only accessing data belonging to their organization. 
- [cite_start]**Role-Based Authentication**: Implements three distinct roles within an organization: 
    - [cite_start]**Admin**: Full access to organization and user management. 
    - [cite_start]**Manager**: Can manage tasks and assign them to members. 
    - [cite_start]**Member**: Can view and update only their assigned tasks. 
- **User Registration & Onboarding**:
    - Option to create a new organization during registration.
    - Option to join an existing organization via an invite.
- [cite_start]**Invitation System**: Admins/Managers can invite users to their organization via email or invite link. 
- [cite_start]**Authentication**: Utilizes JWT for secure session handling and includes role-based access control (RBAC) at the API level. 

### [cite_start]2. Task Management with Expiry 
- [cite_start]**CRUD Operations**: Create, read, update, and delete tasks, scoped to the organization, with actions restricted based on user roles. 
- [cite_start]**Task Assignment**: Tasks are assignable to members within the organization. 
- [cite_start]**Additional Task Features**: Includes task categories (e.g., Bug, Feature, Improvement), task priority (e.g., Low, Medium, High), and a due date for each task. 
- **Automated Task Status & Expiry**: Tasks have statuses (Todo, In Progress, Completed, Expired). [cite_start]A background job (e.g., using `node-cron`) automatically updates task status to 'Expired' once the due date passes. 
- [cite_start]**Overdue Notifications**: Notifies assigned users of overdue tasks (in-app notifications preferred). 

### [cite_start]3. Organization Management
- **Dashboard**: Provides an overview of task statistics (total, overdue, completed, per category/priority).
- **Member Management**: Admins can view, invite, remove users, and assign roles.
- [cite_start]**Organization Settings**: Basic preference configuration (name, theme - optional). 

## Technologies Used

* **Frontend**: React.js, Tailwind CSS, REST API
* **Backend**: Node.js, Express.js
* **Database**: MongoDB
* **Authentication**: JSON Web Tokens (JWT)
* **Background Jobs**: `node-cron`
* **Containerization**: Docker, Docker Compose
* **Deployment**: (To be specified, e.g., Nginx, PM2, Cloud Provider specific services)
* **Testing**: (e.g., Jest, Supertest, React Testing Library)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* Node.js (LTS version recommended)
* npm or Yarn
* MongoDB (local installation or cloud instance)
* Docker and Docker Compose (for containerized setup)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Sayantan-dev1003/CollabTasks.git](https://github.com/Sayantan-dev1003/CollabTasks.git)
    cd CollabTasks
    ```

2.  **Backend Setup:**
    ```bash
    cd backend
    npm install # or yarn install
    cp .env.example .env
    # Edit .env with your MongoDB URI, JWT secret, etc.
    cd ..
    ```

3.  **Frontend Setup:**
    ```bash
    cd frontend
    npm install # or yarn install
    cp .env.example .env
    # Edit .env with your backend API URL, etc.
    cd ..
    ```

### Running the Application

#### Development Mode (Separate Servers)

1.  **Start Backend:**
    ```bash
    cd backend
    npm start
    ```

2.  **Start Frontend:**
    ```bash
    cd frontend
    npm start
    ```
    The frontend will typically open in your browser at `http://localhost:3000`.

#### Production Mode (with Docker Compose)

Make sure Docker and Docker Compose are installed and running.

```bash
docker-compose up --build