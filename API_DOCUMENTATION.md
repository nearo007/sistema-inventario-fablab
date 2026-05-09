# API Documentation

This document describes the backend API surface for the frontend consumer of the `sistema-inventario-fablab` application.

## Base URL

The application exposes the API under the root path. Example:

- `http://localhost:<PORT>/`

`PORT` is set by the `PORT` environment variable.

## Authentication

### Login

- URL: `POST /auth/login`
- Public endpoint
- Request body:
  - `email` (string)
  - `password` (string)
- Response:
  - `accessToken` (string)
  - `refreshToken` (string)

Example response:

```json
{
  "accessToken": "...",
  "refreshToken": "..."
}
```

### Refresh Token

- URL: `POST /auth/refresh`
- Public endpoint
- Request body:
  - `refreshToken` (string)
- Response:
  - `accessToken` (string)
  - `refreshToken` (string)

## Authorization Header

Protected endpoints require a bearer token in the `Authorization` header:

```http
Authorization: Bearer <accessToken>
```

If the header is missing or invalid, the API responds with `401 Unauthorized`.

## Error Handling

There are two common error response formats:

- Authentication errors:
  - Status: `401`
  - Body: `{ "error": "<message>" }`
- Validation / operational errors:
  - Status: `400`
  - Body: `{ "errorMessage": "<message>" }`

Any other unexpected non-`Error` rejection may return `500` with `{ "errorMessage": "Erro interno" }`.

## Users

### Create user

- URL: `POST /user/create`
- Public endpoint
- Request body:
  - `username` (string)
  - `email` (string)
  - `password` (string)
  - `passwordConfirm` (string)
- Response: created user object

Returned fields:
- `id` (number)
- `email` (string)
- `username` (string)
- `passwordHash` (string)

> Note: the current implementation returns the raw created user model, including `passwordHash`.

### List all users

- URL: `GET /user/`
- Protected endpoint
- Response: array of user objects

Returned user object fields:
- `id` (number)
- `email` (string)
- `username` (string)
- `passwordHash` (string)

### Update user by ID

- URL: `PATCH /user/:id`
- Protected endpoint
- URL parameters:
  - `id` (number)
- Request body (any combination):
  - `name` (string)
  - `email` (string)
- Response: updated user object

Returned fields are the same as list/create.

### Delete user by ID

- URL: `DELETE /user/:id`
- Protected endpoint
- URL parameters:
  - `id` (number)
- Response: `200 OK` with empty body

## Items

### Create item

- URL: `POST /item/create`
- Protected endpoint
- Request body:
  - `name` (string)
  - `category` (string, optional)
  - `totalQuantity` (number)
  - `location` (string)
- Response: created item object

Returned fields:
- `id` (number)
- `name` (string)
- `category` (string | null)
- `totalQuantity` (number)
- `location` (string)

### List all items

- URL: `GET /item/`
- Protected endpoint
- Response: array of item objects

### List items by category

- URL: `GET /item/by-category`
- Protected endpoint
- Request body:
  - `category` (string)
- Response: array of item objects

### List items by location

- URL: `GET /item/by-location`
- Protected endpoint
- Request body:
  - `location` (string)
- Response: array of item objects

> Note: this endpoint is implemented as a `GET` with a request body.

### Update item by ID

- URL: `PATCH /item/:id`
- Protected endpoint
- URL parameters:
  - `id` (number)
- Request body (any combination):
  - `name` (string)
  - `category` (string)
  - `totalQuantity` (number)
  - `location` (string)
- Response: updated item object

### Delete item by ID

- URL: `DELETE /item/:id`
- Protected endpoint
- URL parameters:
  - `id` (number)
- Response: deleted item object

## Loans

### Create loan

- URL: `POST /loan/create`
- Protected endpoint
- Request body:
  - `userId` (number)
  - `itemId` (number)
  - `loanDate` (string, ISO format)
  - `dueDate` (string, ISO format)
  - `loanQuantity` (number)
  - `returnDate` (string, ISO format, optional)
- Response: created loan object

Returned fields:
- `id` (number)
- `loanDate` (string)
- `dueDate` (string)
- `returnDate` (string | null)
- `loanQuantity` (number)
- `userId` (number)
- `itemId` (number)

### List all loans

- URL: `GET /loan/`
- Protected endpoint
- Response: array of loan objects

### Update loan by ID

- URL: `PATCH /loan/:id`
- Protected endpoint
- URL parameters:
  - `id` (number)
- Request body (any combination):
  - `loanDate` (string, ISO format)
  - `dueDate` (string, ISO format)
  - `returnDate` (string, ISO format)
- Response: updated loan object

### Delete loan by ID

- URL: `DELETE /loan/:id`
- Protected endpoint
- URL parameters:
  - `id` (number)
- Response: `200 OK` with empty body

## Validation expectations

The backend performs validation before saving data. Some important frontend rules:

- `email` must be a valid email format.
- `password` must satisfy backend password policy.
- `passwordConfirm` must match `password` when creating a user.
- `username` must respect username rules for user creation.
- `totalQuantity` and `loanQuantity` must be valid positive numbers.
- Dates should be provided as valid date strings.

## Notes

- The API returns raw Prisma model objects in many endpoints.
- The `Authorization` header must include a valid JWT access token.
- `POST /auth/refresh` returns a fresh `accessToken` and `refreshToken`.
- Some `GET` endpoints accept request bodies instead of query parameters.
