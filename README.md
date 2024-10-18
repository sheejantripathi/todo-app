Here’s a comprehensive README file based on your project's design choices, approach, and use of libraries and dependencies:

---

# Todo Application - Backend API

This project is a **FullStack Todo Application** built with **Node.js** and **TypeScript**, utilizing **Express.js** for the web server for the backend, **Sequelize** as the ORM for interacting with a **MySQL** database, and **Jest** for testing. The application is secured with **Helmet** and authenticated via **Passport.js**. On the frontend, **Reactjs** is used with the **Javascript** to introduce some variety of usge Js on the frontend and TS on the backend. This README will walk you through the approach taken, design choices made, the libraries and dependencies used, and testing strategies.

## Project Structure

```
backend/
├── src/
│   ├── config/         # Configuration files (e.g., database config)
│   ├── middleware/     # Authentication and other middlewares
│   ├── models/         # Sequelize models for database
│   ├── routes/         # API route files
│   ├── tests/          # Jest test files
│   ├── app.ts          # Main Express app entry point
│   └── server.ts       # Server bootstrap (exports app for testing)
├── jest.config.ts      # Jest configuration
├── package.json        # Dependencies and scripts
frontend/
├── public/             # static files and images
├── src/
│   ├── assets/         # Configuration files (e.g., database config)
│   ├── components/     # todo UI components
│   ├── hooks/          # hook fro google oauth
│   ├── app.jsx         # Holds core logic of the frontend
│   └── main.jsx        # Entry point of the react application
├── index.html          # Jest configuration
├── package.json        # Dependencies and scripts
└── README.md           # This file
```

## Key Features

- **Create, Read, Update, Delete (CRUD)** operations on Todos.
- User-based authorization for todos using **Passport.js**.
- **Sequelize ORM** for database interaction, making the app scalable and easily modifiable.
- **Helmet** for securing the app by setting various HTTP headers.
- Fully **TypeScript**-based for strong typing and enhanced developer experience.
- **Jest** for unit and integration testing of the API.

---

## Installation and Setup

### Prerequisites

- Node.js (v16+)
- MySQL Database
- npm or yarn package manager

### 1. Clone the repository

```bash
git clone https://github.com/sheejantripathi/todo-app.git
cd backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment variables

Create a `.env` file in the root directory with the following variables:

```bash
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=todo_app
JWT_SECRET=your_jwt_secret
PORT=3000
NODE_ENV=development
```

### 4. Run Migrations

Before starting the server, ensure your database is set up. If you haven't created the database, you can either create it manually or set Sequelize to auto-create tables.

Run the migration script to sync your database:

```bash
npx sequelize-cli db:migrate
```

### 5. Run the Application

```bash
npm run dev
```

This will start the development server on the specified port.

---

## API Endpoints

The following API endpoints are available:

### Todos

- **GET /todos** - Fetch all todos for the authenticated user.
- **GET /todos/:id** - Fetch a single todo by ID.
- **POST /todos** - Create a new todo.
- **PUT /todos/:id** - Update a specific todo.
- **DELETE /todos/:id** - Delete a specific todo.

### Authentication

- **POST /auth/login** - Log in with a username and password to receive a JWT token.
- **POST /auth/register** - Register a new user.

---

## Approach & Design Choices

### 1. **TypeScript**

The project is built entirely in **TypeScript** to enforce type safety and reduce runtime errors. This helps ensure more maintainable code with better autocompletion and type-checking during development.

### 2. **Express.js**

The project uses **Express.js** as the web framework. It is lightweight, has great community support, and provides a flexible routing system, making it an ideal choice for building a REST API.

### 3. **Sequelize ORM**

We chose **Sequelize** to interact with the MySQL database due to its simplicity and flexibility. Sequelize supports migrations, hooks, validations, and relationships, all of which are essential for this project. Sequelize also simplifies query writing, allowing for faster development.

Key Models:
- **Todo**: Represents the todos, containing fields such as task, deadline, isComplete, and userId.
- **User**: Represents the users and integrates with **Passport.js** for authentication.

### 4. **Authentication with Passport.js**

**Passport.js** was chosen for handling authentication using **JWT** tokens. JWT provides stateless authentication, which is useful for building APIs and simplifies scaling as there’s no need to store session data on the server.

- We secure routes by using `authMiddleware`, which verifies the JWT and attaches the user object to the request.

### 5. **Helmet**

Security is an important aspect of any web application. By using **Helmet**, we set various HTTP headers to protect the app from common vulnerabilities such as cross-site scripting (XSS), clickjacking, and others.

### 6. **Middleware**

Middleware was designed in a modular way to enhance the extensibility and maintainability of the codebase. We used:
- **authMiddleware**: Ensures only authenticated users can access the API routes.
- **errorHandler**: A simple middleware to handle errors globally (can be extended further).

### 7. **Testing with Jest**

For testing, we used **Jest** along with **Supertest** to test the API routes. This ensures that both the logic and the routes work as expected.

- **Supertest** allows us to simulate HTTP requests to the API without needing to start the server.
- Tests are located in the `/tests` folder, and the Jest config is specified in the `jest.config.ts` file.

---

## Libraries and Dependencies

### Core Dependencies

- **Express.js**: Web framework for building the API.
- **Sequelize**: ORM for MySQL.
- **Passport.js**: Authentication middleware.
- **Helmet**: Secures the app by setting various HTTP headers.
- **TypeScript**: Ensures static typing and enhanced developer experience.
- **bcrypt**: For password hashing.

### Testing Dependencies

- **Jest**: For unit and integration testing.
- **Supertest**: To simulate HTTP requests and test API endpoints.
- **ts-jest**: A TypeScript preprocessor for Jest.

---

## Running Tests

Tests are set up to ensure the correctness of the API. You can run them using:

```bash
npm run test
```

### Example Test

Here's a simple Jest test to check the `/todos` GET route:

```typescript
import request from 'supertest';
import app from '../src/app';

describe('GET /todos', () => {
  it('should return a list of todos for the authenticated user', async () => {
    const response = await request(app)
      .get('/todos')
      .set('Authorization', 'Bearer your_token_here');

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});
```

---

## Future Improvements

1. **Pagination**: Implement pagination for fetching large lists of todos.
2. **Validation**: Add more detailed validation on user inputs using libraries like `Joi` or `express-validator`.
3. **Error Handling**: Create a more robust error-handling system for better error reporting.
4. **Rate Limiting**: To protect the API from abuse, rate-limiting middleware like `express-rate-limit` can be introduced.

---

## Conclusion

This Todo application backend is a robust and scalable solution built with modern web development technologies. It leverages TypeScript for type safety, Sequelize for efficient database interactions, Passport for secure authentication, and Jest for test coverage. The design choices and libraries used help ensure the application is secure, maintainable, and easy to develop.

---

### Authors

- **Your Name** - Developer

