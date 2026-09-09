# NoBroker admin portal

This is the standalone administrator sign-in page.

## Run locally

1. In `admin/backend`, copy `.env.example` to `.env`, set `MONGO_URI` and `JWT_SECRET`, then run `npm install` and `npm run dev`.
2. In `admin/frontend`, optionally copy `.env.example` to `.env`, then run `npm install` and `npm run dev`.

The admin frontend runs on `http://localhost:5174` and the API runs on `http://localhost:8001` by default. Admin users must have `role: "admin"` in the shared NoBroker database.
