# School Event Attendance Monitoring System - Backend API

A robust REST API for managing school event attendance using QR codes. Built with Express.js, Passport.js, Prisma, and PostgreSQL.

## Technologies Used

- **Express.js**: Web application framework
- **Passport.js**: Authentication middleware
- **Prisma**: Database ORM
- **PostgreSQL**: Database
- **QR Code**: For generating attendance tokens

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v13 or higher)
- npm or yarn

## Installation

1. Clone the repository

```bash
git clone <repository-url>
cd qrcode
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables

```bash
cp .env.example .env
```

Configure the following variables in `.env`:

```
DATABASE_URL="postgresql://user:password@localhost:5432/db_name"
SESSION_SECRET="your-session-secret"
NODE_ENV="your-environment"
CORS_ACCESS = http://localhost:5173
PORT=3000
```

4. Run database migrations

```bash
npm run migrate
```

5. Start the server

```bash
npm run dev
```

## API Endpoints

### Authentication

#### POST /auth/login

- Login for students and administrators
- Body:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

#### POST /auth/logout

- Ends user session
- Requires authentication

### Student Routes

#### GET /api/v1/event

- Retrieves all available events
- Requires authentication

#### POST /api/v1/event/registration

- Register for an event
- Generates QR code for attendance
- Requires authentication
- Requires eventid and userId in the req body

#### POST /api/v1/attendance

- Records attendance using QR code
- Requires student authentication
- Body:
  ```json
  {
    "qrCode": "string",
    "eventId": "string"
  }
  ```

#### PUT /api/v1/attendance

- Records time of leaving an event
- Requires student authentication

### Admin Routes

#### POST /api/v1/event

- Creates a new event
- Requires admin authentication
- Body:
  ```json
  {
    "title": "string",
    "description": "string",
    "date": "string",
    "location": "string",
    "category": "string"
  }
  ```

#### PUT /api/v1/event/1:eventId

- Updates event details
- Requires admin authentication

#### DELETE /api/v1/event/1:eventId

- Deletes an event
- Requires admin authentication

#### GET /api/v1/attendance/event/:eventId

- Retrieves attendance records for specific event
- Requires admin authentication

## Error Handling

The API uses standard HTTP status codes:

- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 409: Conflict
- 500: Internal Server Error

Error responses follow this format:

```json
{
  "error": {
    "message": "Error description",
    "code": "ERROR_CODE"
  }
}
```

## Authentication

The API uses session-based authentication with Passport.js. Protected routes require a valid session cookie.

## Database Schema

Key entities in the database:

- User (Student/Admin)
- Event
- Registration
- Attendance

## Security Features

- Session-based authentication
- CSRF protection
- Input validation
- SQL injection prevention (via Prisma)
- XSS protection

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Create a Pull Request
