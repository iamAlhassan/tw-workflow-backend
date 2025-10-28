# Assignment Workflow Portal - Backend

A Node.js and Express.js backend API for managing assignments and submissions between teachers and students.

## Features

### Authentication
- User registration and login with JWT tokens
- Role-based access control (Teacher/Student)
- Secure token-based authentication

### Teacher Capabilities
- Create, update, and delete assignments
- Publish assignments to students
- View all submissions for their assignments
- Filter assignments by status (draft, published, completed)
- Pagination support for assignment lists

### Student Capabilities
- View published assignments
- Submit text-based answers
- View submission history
- Pagination support for assignment lists

## Tech Stack

- **Node.js** + **Express.js**
- **MongoDB** with **Mongoose**
- **JWT** for authentication
- **bcryptjs** for password hashing

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
PORT=5000
SECRET_KEY=your_secret_key_here
NODE_ENV=development
```

**Note:** The MongoDB connection string is currently hardcoded in `utils/config.js`. You can modify it there or update the code to use an environment variable.

### 3. Start MongoDB

Ensure MongoDB is running. If using local MongoDB:

```bash
mongod
```

For MongoDB Atlas, the connection is already configured in the code.

### 4. Run the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication

**POST** `/api/auth/signup` - Register a new user
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe",
  "role": "teacher"
}
```

**POST** `/api/auth/login` - Login
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Teacher Endpoints (Requires Teacher Role)

**POST** `/api/assignments` - Create assignment
**PUT** `/api/assignments/:id` - Update assignment
**DELETE** `/api/assignments/:id` - Delete assignment
**GET** `/api/teacher/assignments?status=published&page=1&limit=10` - Get assignments with pagination
**GET** `/api/assignments/:id/submissions` - View submissions

### Student Endpoints (Requires Student Role)

**GET** `/api/student/assignments?page=1&limit=10` - View published assignments with pagination
**POST** `/api/assignments/:id/submit` - Submit assignment
**GET** `/api/student/submissions` - View my submissions

## Authentication Header

Include JWT token in requests:
```
Authorization: Bearer <your-token>
```

## Project Structure

```
├── controllers/          # Request handlers
│   ├── Auth/            # Authentication controllers
│   ├── Teacher/         # Teacher-specific controllers
│   └── Student/         # Student-specific controllers
├── logic/               # Business logic layer
│   ├── Auth/
│   ├── Teacher/
│   └── Student/
├── helpers/             # Database schemas
│   └── mongoSchema/
├── middleware/          # Authentication middleware
├── routes/              # API route definitions
├── utils/               # Utility functions
└── server.js            # Application entry point
```

## Assumptions and Notes

1. **Password Storage:** Passwords are stored in plain text for simplicity. In production, implement proper hashing (bcryptjs is already included but not used in the User model).

2. **Database Connection:** The MongoDB connection string is hardcoded in `utils/config.js`. For better security, move this to environment variables.

3. **JWT Secret:** The JWT secret key 'passKey' is used by default. Override this with the `SECRET_KEY` environment variable.

4. **Pagination:** Default pagination is set to 10 items per page. Users can customize with `page` and `limit` query parameters.

5. **Role Validation:** Users must specify their role (teacher/student) during registration. There's no admin role or role change functionality.

6. **Assignment Deletion:** Deleting an assignment also deletes all related submissions automatically.

7. **Submission Updates:** Students can update their submissions multiple times before the teacher marks the assignment as completed.

8. **CORS:** CORS is enabled for all origins. In production, restrict this to specific domains.

## Response Format

### Success Response
```json
{
  "success": true,
  "token": "jwt-token",
  "user": { ... },
  "timestamp": "..."
}
```

### Error Response
```json
{
  "status": "Bad Request",
  "message": "Error message",
  "timestamp": "..."
}
```

## Testing

You can test the API using tools like:
- Postman
- Thunder Client (VS Code extension)
- curl commands

Example curl request:
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "teacher@test.com",
    "password": "pass123",
    "name": "Test Teacher",
    "role": "teacher"
  }'
```
