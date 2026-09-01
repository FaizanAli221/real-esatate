# LuxeHaven Properties — Serverless API

A lightweight, serverless-ready backend for the LuxeHaven Properties real estate
landing page, built as native Vercel Serverless Functions (no Express server
required). Drop the `api/` folder and `vercel.json` into the root of any
Next.js or Vite/React project and deploy — Vercel auto-detects and builds
every file in `api/*.js` as its own function.

## File structure

```
├── api/
│   ├── _lib/
│   │   ├── cors.js              # shared CORS + method-guard wrapper
│   │   └── data.js               # mock in-memory data store (swap for Supabase/Postgres later)
│   ├── properties.js             # GET /api/properties
│   ├── inquiries.js              # POST /api/inquiries
│   ├── calculate-mortgage.js     # POST /api/calculate-mortgage
│   └── health.js                 # GET /api/health
├── vercel.json
├── package.json
└── README.md
```

> **Note on `_lib`:** folders/files prefixed with `_` inside `api/` are
> excluded from Vercel's file-system router, so `_lib` is safely importable
> without becoming a route itself.

> **Storage note:** data lives in-memory (`api/_lib/data.js`) for demo
> purposes. On serverless, memory resets between cold starts, so submitted
> inquiries aren't durable — fine for a portfolio piece, but swap
> `createInquiry` / `getProperties` for real Supabase/Postgres calls before
> using this in production. The rest of the API (routes, validation,
> response shapes) doesn't change.

## Local development

```bash
npm install
npm run dev
```

This starts the local development server at `http://localhost:3000` with an interactive API test dashboard and live reloading for all `/api/*` endpoints.

If you prefer using the Vercel CLI (requires Vercel login):
```bash
npm run dev:vercel
```

## Deploying

```bash
npx vercel --prod
```

If your frontend is **Next.js**, delete the `rewrites` block in
`vercel.json` — Next.js already owns page routing, and that block is only
needed for a plain Vite/React SPA build so client-side routes fall back to
`index.html` without breaking `/api/*`.

---

## API reference

### `GET /api/properties`
Query params (all optional): `type`, `minPrice`, `maxPrice`, `city`, or `id`
for a single-property lookup.

```
GET /api/properties?type=villa&minPrice=500000&maxPrice=3000000&city=Malibu
```

### `POST /api/inquiries`
```json
{
  "name": "Jordan Lee",
  "email": "jordan@example.com",
  "phone": "+1 512-555-0199",
  "propertyId": "lh-1001",
  "preferredDate": "2026-03-01",
  "message": "Interested in a private tour."
}
```
Returns `201` with the created inquiry, or `400` with a `details` array of
validation errors.

### `POST /api/calculate-mortgage`
```json
{
  "principal": 500000,
  "interestRate": 6.5,
  "downPayment": 100000,
  "tenureYears": 30
}
```
Returns monthly EMI, total interest, total payment, and a yearly
principal/interest/remaining-balance breakdown.

### `GET /api/health`
Returns API status, uptime, version, and environment.

---

## Frontend integration snippets

### Plain `fetch`

```js
// lib/api.js
const API_BASE = import.meta.env.VITE_API_BASE_URL || ""; // "" = same-origin on Vercel

export async function getProperties(filters = {}) {
  const params = new URLSearchParams(
    Object.entries(filters).filter(([, v]) => v !== undefined && v !== "")
  );
  const res = await fetch(`${API_BASE}/api/properties?${params}`);
  if (!res.ok) throw new Error(`Failed to load properties (${res.status})`);
  return res.json();
}

export async function submitInquiry(payload) {
  const res = await fetch(`${API_BASE}/api/inquiries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Inquiry submission failed.");
  return data;
}

export async function calculateMortgage(payload) {
  const res = await fetch(`${API_BASE}/api/calculate-mortgage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Mortgage calculation failed.");
  return data;
}
```

### Usage inside a React component

```jsx
import { useEffect, useState } from "react";
import { getProperties, submitInquiry } from "../lib/api";

function PropertyListings() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProperties({ city: "Austin", type: "condo" })
      .then((res) => setProperties(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleInquiry = async (propertyId) => {
    try {
      const result = await submitInquiry({
        name: "Jordan Lee",
        email: "jordan@example.com",
        phone: "+1 512-555-0199",
        propertyId,
        message: "I'd like to schedule a tour.",
      });
      alert(result.message);
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p>Loading listings…</p>;

  return (
    <ul>
      {properties.map((p) => (
        <li key={p.id}>
          {p.title} — ${p.price.toLocaleString()}
          <button onClick={() => handleInquiry(p.id)}>Request a tour</button>
        </li>
      ))}
    </ul>
  );
}
```

### Axios equivalent

```js
import axios from "axios";

const api = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL || "" });

export const getProperties = (filters) => api.get("/api/properties", { params: filters });
export const submitInquiry = (payload) => api.post("/api/inquiries", payload);
export const calculateMortgage = (payload) => api.post("/api/calculate-mortgage", payload);
```

---

## Portfolio / resume highlights

- Designed and shipped a **serverless REST API** (Node.js on Vercel Functions) powering a real estate platform — property search with dynamic filtering, lead-capture with server-side validation, and a mortgage amortization calculator, all deployed alongside the React frontend in a single repo with zero server management.
- Implemented **production-grade API patterns** on a lightweight footprint: shared CORS/error-handling middleware, structured JSON responses, input validation with meaningful error payloads, and a data-access layer decoupled from route handlers for a frictionless swap to Supabase/Postgres.
