# API Learning Server

A fully-functional REST API server designed for learning, testing, and demonstrating backend integrations. Built with Node.js, Express, and Supabase.

## Project Overview

This project provides a live, interactive API backend. Unlike static mock servers, this server connects to a real Supabase PostgreSQL database and updates in realtime. 

When you make a request from Postman, Power Automate, or a frontend app, the changes instantly appear in the web dashboard!

## Folder Structure

```
/
├── config/           # Supabase connection
├── controllers/      # (Optional) Extracted route logic
├── middleware/       # Custom Express middleware (auth, logging)
├── public/           # Static assets (CSS, JS, Images)
├── routes/           # Express routers for resources and views
├── views/            # HTML Templates
├── .env              # Environment variables
├── package.json      # Dependencies
└── server.js         # Entry point
```

## Installation

1. Clone the repository
2. Run `npm install`
3. Setup your `.env` file

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_KEY=your-anon-key
SESSION_SECRET=admin_secret_key_123
```

## Supabase Setup

1. Create a project on Supabase.
2. Get your URL and Anon Key from Project Settings > API.
3. Create the following tables (with RLS disabled for testing, or write proper policies):
   - `users`
   - `products`
   - `orders`
   - `employees`
   - `books`
   - `students`
   - `tasks`
4. Populate them with some sample data.
5. Enable **Realtime** on all these tables.

## Running Locally

Run `npm start` or `node server.js`. The server will start on `http://localhost:3000`.

## Testing

You can use the built-in API Docs page or any REST client to test the API.
For example, using `cURL`:

```bash
curl -X GET http://localhost:3000/users
```
