# ShelfSpace

A full-stack e-commerce bookstore web app — real book catalog, search,
authentication, a database-backed cart, checkout, and user reviews.

**Live app:** https://shelf-space-nine.vercel.app

> Payment processing is intentionally not included yet. Checkout creates
> a real order record in the database (status: "pending"); a
> `// TODO: integrate Stripe` marker in `client/src/pages/Checkout.jsx`
> shows exactly where payment would plug in later.

## Tech stack

| Layer     | Tech |
|-----------|------|
| Frontend  | React + Tailwind CSS, deployed on Vercel |
| Backend   | Node.js + Express, deployed on Render |
| Database  | MongoDB (Atlas), Mongoose schemas |
| Auth      | JWT in httpOnly cookies, bcrypt password hashing |

## Features

- **Book catalog & search** — server-side text search (title/author),
  filter by category and price, sort by price/title/rating. Not
  client-side filtering of a static list.
- **Auth** — register/login with hashed passwords, JWT issued in an
  httpOnly cookie, protected routes on both frontend and backend.
- **Cart** — persisted per-user in MongoDB, so it survives across
  sessions and devices, not just React state or localStorage.
- **Checkout** — shipping form, order review, creates a real order
  record linked to the user.
- **Reviews** — authenticated users leave a star rating + text review,
  persisted and linked to both user and book, with a live average
  rating shown on each book's page.

## Project structure                                                            ShelfSpace/
client/     React + Tailwind frontend (Vercel)
server/     Express + MongoDB backend (Render)                                  ## Running it locally

### Prerequisites
- Node.js (v18+)
- MongoDB running locally, or a MongoDB Atlas connection string

### 1. Clone and install
```bash
git clone https://github.com/KrishPGupta/ShelfSpace.git
cd ShelfSpace

cd client && npm install
cd ../server && npm install
```

### 2. Set up environment variables

Create `server/.env`:                                                           MONGO_URI=mongodb://localhost:27017/shelfspace
JWT_SECRET=your_secret_here
JWT_EXPIRES_IN=7d
CLIENT_ORIGIN=http://localhost:5173
NODE_ENV=development                                                            ### 3. Seed the database (sample books)
```bash
cd server
npm run seed
```

### 4. Run both servers (two terminal tabs)
```bash
# Terminal 1
cd server
npm run dev

# Terminal 2
cd client
npm run dev
```

Visit `http://localhost:5173`.

### Adding your own book cover / background images

Drop image files into:
- `client/src/assets/images/books/` — referenced by filename in seed data
- `client/src/assets/images/backgrounds/` — see the README in that folder
  for the exact slot names (hero, catalog banner, etc.)

Both resolve automatically via Vite's `import.meta.glob` — no manual
import statements needed.

## Deployment notes

- Frontend (Vercel) needs `VITE_API_URL` set to the deployed backend URL.
- Backend (Render) needs `CLIENT_ORIGIN` set to the deployed frontend
  URL, and `NODE_ENV=production` — this is required for the auth cookie
  to work cross-site (`secure: true`, `sameSite: "none"` in production).
- `client/vercel.json` contains a rewrite rule so client-side routes
  (e.g. `/catalog`) don't 404 on refresh — required for any React
  Router SPA on Vercel.


  ## Author

Built by Krish Gupta
