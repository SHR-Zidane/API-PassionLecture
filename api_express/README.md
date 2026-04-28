# REST API with Sequelize and MySQL

A modern REST API built with Express.js, TypeScript, Sequelize ORM, and MySQL. This project demonstrates database migrations, model relationships, and RESTful API design patterns.

## Tech Stack

- **Runtime:** Node.js (v24+)
- **Language:** TypeScript 5.9
- **Framework:** Express.js 5.2
- **ORM:** Sequelize 6.37 with TypeScript support (sequelize-typescript)
- **Database:** MySQL 8.0
- **Migration Tool:** Umzug 3.8
- **Dev Tools:** tsc-watch, ts-node
- **Middleware:** CORS, Morgan (request logging)

## Project Structure

```
src/
├── config.ts              # Configuration management
├── index.ts              # Entry point
├── server.ts             # Express server setup
├── umzug.ts              # Migration configuration
├── db/
│   ├── sequelize.ts      # Database connection
│   └── migrations/       # Migration files
├── models/
│   ├── User.ts           # User model
│   └── Post.ts           # Post model
```

## Features

- **Database Migrations** - Umzug-based migrations for schema versioning
- **User Management** - Create and retrieve users with email validation
- **Blog Posts** - Create, retrieve, update, and delete blog posts
- **Author Relationships** - Posts are associated with users
- **Publishing System** - Publish/unpublish posts
- **Request Logging** - Morgan middleware for HTTP request tracking
- **CORS Support** - Cross-origin resource sharing enabled
- **Type Safety** - Full TypeScript implementation

## Models

### User
- `id` (BIGINT, auto-increment, primary key)
- `name` (STRING, 3-100 characters)
- `email` (STRING, unique, validated)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### Post
- `id` (BIGINT, auto-increment, primary key)
- `user_id` (BIGINT, foreign key to User)
- `title` (STRING, 1-100 characters)
- `content` (TEXT)
- `published` (BOOLEAN)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

## API Endpoints

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users` | Get all users |
| POST | `/users` | Create a new user |

### Posts
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/posts` | Get recent posts (limit 10) |
| GET | `/posts/:id` | Get a specific post |
| GET | `/feed` | Get published posts with authors |
| POST | `/posts` | Create a new post |
| PUT | `/posts/publish/:id` | Publish a post |
| DELETE | `/posts/:id` | Delete a post |

## Installation

### Prerequisites
- Node.js 24+
- MySQL 8.0
- Docker & Docker Compose (optional)

### Setup

1. **Clone the repository and install dependencies:**
```bash
npm install
```

2. **Set up environment variables:**
Create a `.env` file in the root directory:
```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=secret
DB_DATABASE=sequelize_api
PORT=3000
NODE_ENV=development
```

3. **Start MySQL database (using Docker):**
```bash
docker-compose up -d
```

4. **Run migrations:**
```bash
npm run migrate
```

5. **Start the development server:**
```bash
npm run dev
```

The API will be available at `http://localhost:3000`

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run build` | Compile TypeScript to JavaScript |
| `npm start` | Run compiled application |
| `npm run dev` | Run in development mode with auto-reload |
| `npm run migrate` | Run pending migrations |
| `npm run migrate:rollback` | Rollback last migration |
| `npm run migration:create` | Create a new migration |

## Usage Examples

### Create a User
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com"}'
```

### Create a Post
```bash
curl -X POST http://localhost:3000/posts \
  -H "Content-Type: application/json" \
  -d '{"title":"My First Post","content":"Hello world!","authorEmail":"john@example.com"}'
```

### Get Feed
```bash
curl http://localhost:3000/feed
```

### Publish a Post
```bash
curl -X PUT http://localhost:3000/posts/publish/1
```

## Database Setup

### Docker Compose
The project includes a `docker-compose.yml` for easy MySQL setup:

```bash
docker-compose up -d    # Start database
docker-compose down     # Stop database
```

This will:
- Start MySQL 8.0 container
- Create database `sequelize_api`
- Mount a volume for data persistence
- Expose port 3306

## Configuration

Database configuration is managed through environment variables in `src/config.ts`:

```typescript
const config = {
  db: {
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "3306"),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    dialect: "mysql",
  },
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || "3000",
};
```

## Development

### TypeScript Compilation
```bash
npm run build
```

### Watch Mode
```bash
npm run dev
```

Automatically recompiles on file changes and restarts the server.

## Database Migrations

Migrations are managed using Umzug and TypeScript. Each migration file contains `up` and `down` functions:

```bash
# Create a new migration
npm run migration:create

# Run pending migrations
npm run migrate

# Rollback last migration
npm run migrate:rollback
```

## Error Handling

The API includes basic error handling for:
- Author not found (404) when creating posts
- Post not found (404) when updating/deleting
- Validation errors on user email and post title/content

## Logging

Morgan middleware logs all HTTP requests in "tiny" format, showing:
- Request method
- Route
- Status code
- Response time

## Next Steps

Consider implementing:
- Authentication & authorization (JWT)
- Input validation & error handling middleware
- Unit & integration tests
- API documentation (Swagger/OpenAPI)
- Rate limiting
- Pagination for list endpoints
- Search functionality
- Comments system for posts

## License

ISC
