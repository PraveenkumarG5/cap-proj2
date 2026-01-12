# Banking Teller 360 Portal

The Banking Teller 360 Portal is a real-time, full-stack application designed to replace legacy interfaces with a modern, responsive web experience. It allows bank tellers to manage customers, accounts, and process transactions secure and efficiently.

## Project Structure

This project is organized as a monorepo with the following modules:

- **`backend/`**: A Spring Boot application providing the REST API, Authentication, and Business Logic.
- **`frontend/`**: A React application (built with Vite) providing the user interface.

## Prerequisites

- **Java 17+**
- **Node.js 18+** & **npm**
- **Maven** (optional, wrapper provided)

## Getting Started

### 1. Backend Setup

The backend uses an in-memory/file-based H2 database, so no external database installation is required.

```bash
cd backend
# Run the application
./mvnw spring-boot:run
```

- Server: `http://localhost:8080`
- API Docs: `http://localhost:8080/swagger-ui.html` (if enabled) or explore via Postman.
- H2 Console: `http://localhost:8080/h2-console`
  - JDBC URL: `jdbc:h2:file:./data/bankdb`
  - User: `sa`
  - Password: `password`

### 2. Frontend Setup

```bash
cd frontend
# Install dependencies
npm install
# Start the dev server
npm run dev
```

- UI: `http://localhost:5173`

## Features

- **Customer Search**: Find customers by name.
- **Customer Profile**: View account balances and details.
- **Transactions**: Deposit, Withdraw, and Transfer funds.
- **Validations**: Prevents negative amounts and handles numeric overflow (15 digit limit) gracefully.
- **Concurrency**: Optimistic locking prevents lost updates if two tellers modify the same account simultaneously.

---
*Created for the Capstone Project.*
