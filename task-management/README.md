# Task Management Project 📋

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)

## Introduction

This project is a Task Management application designed to help users manage their tasks efficiently. The application allows users to sign up, log in, and manage their tasks from a user-friendly interface. Users can filter tasks and perform CRUD operations (create, read, update, delete) on their tasks.

## Features

- User Authentication: Sign up and login functionalities.
- Task Management: Create, read, update, and delete tasks.
- Task Filtering: Filter tasks based on various criteria.
- Responsive Design: Optimized for both desktop and mobile devices.

## Tech Stack

- **Frontend:** Vite, React, Material-UI
- **Backend:** .NET, ASP.NET Core
- **Database:** PostgreSQL
- **API Documentation:** Swagger

## Installation

### Prerequisites

- Node.js
- .NET SDK
- PostgreSQL

### Frontend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/jvittor1/Task-Management.git
   cd task-management
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Backend Setup

1. Install dependencies:
   ```bash
   cd task-management/backend
   dotnet restore
   ```
2. Configure the database connection in `appsettings.json`:
   ```json
   "ConnectionStrings": {
       "DefaultConnection": "Host=localhost;Database=taskmanagement;Username=yourusername;Password=yourpassword"
   }
   ```
3. Apply database migrations:
   ```bash
   dotnet ef database update
   ```
4. Start the backend server:
   ```bash
   dotnet run
   ```

## Usage

1. Open your browser and navigate to `http://localhost:3000` to access the frontend.
2. Use the signup page to create a new account.
3. Log in using your credentials.
4. Navigate to the home page to manage your tasks.

## API Endpoints

### Auth Endpoints

- **POST** `/api/User/register`: Register a new user
- **POST** `/api/User/login`: Log in an existing user

### Task Endpoints

- **GET** `/api/Task/getAllTasks`: Get all tasks
- **GET** `/api/Task/getTaskById/{id}`: Get a specific task
- **POST** `/api/Task/createTask`: Create a new task
- **PUT** `/api/Task/updateTask/{id}`: Update an existing task
- **DELETE** `/api/Task/deleteTask/{id}`: Delete a task
