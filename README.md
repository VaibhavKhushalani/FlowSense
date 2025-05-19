# 🏪 Customer Flow Dashboard — Full Stack Monorepo

A full-stack real-time dashboard to track customers entering and leaving a store.

Built with:

- **Frontend**: Next.js (App Router), React, Tailwind CSS, TypeScript
- **Backend**: Node.js, Express.js, TypeScript (simulated Kafka)
- **Monorepo**: Managed with `pnpm` workspaces
- **Bundler**: Turbopack (Next.js 15)

---

## 📦 Folder Structure

```
FlowSense/
├── apps/
│   ├── client/        # Next.js frontend (Turbopack)
│   └── server/        # Express.js backend with simulated Kafka
├── packages/
│   └── shared/        # (Optional) Shared types/utilities
├── pnpm-workspace.yaml
├── package.json       # Root scripts to run both servers
└── README.md
```

---

## 🚀 Quick Start

### 1. Clone the repo & install dependencies

```bash
git clone https://github.com/VaibhavKhushalani/FlowSense.git
cd FlowSense
pnpm install
```

> You must have [pnpm](https://pnpm.io/installation) installed globally.

---

### 2. Start Development (Both Frontend & Backend)

```bash
pnpm run dev
```

This runs:

- `apps/client` at [http://localhost:3000](http://localhost:3000)
- `apps/server` at [http://localhost:4000](http://localhost:4000)

> Make sure port 4000 is free for backend API.

---

## 🌐 Frontend (Client)

Built with **Next.js 15 (Turbopack)** and **Tailwind CSS** for modern UI.

**Key Features**:

- Live Table: Realtime customer movements
- History Table: Aggregated hourly view (last 24h)
- Auto-refresh every 10 seconds

#### Run frontend only:

```bash
cd apps/client
pnpm dev
```

---

## 🖥️ Backend (Server)

Node + Express server simulating Kafka message stream every 10 seconds.

**APIs**:

- `GET /api/live` – Last 10 customer events
- `GET /api/history` – Hourly aggregates for last 24 hours

#### Run backend only:

```bash
cd apps/server
pnpm start
```

---

## 🛠️ Scripts

From the root (`FlowSense`):

| Script            | Description                          |
| ----------------- | ------------------------------------ |
| `pnpm run dev`    | Runs both frontend and backend       |
| `pnpm run client` | Runs frontend (Turbopack dev server) |
| `pnpm run server` | Runs backend server (Express)        |

---

## 🧪 Tech Stack

| Layer    | Technology                         |
| -------- | ---------------------------------- |
| Frontend | Next.js 15 (App Router, Turbopack) |
| UI       | React, Tailwind CSS                |
| Backend  | Node.js, Express.js                |
| Language | TypeScript                         |
| Tools    | PNPM Workspaces, Concurrently      |

---

## 📄 License

MIT — feel free to fork, use, or contribute.

---

## ✨ Author

Made with ❤️ by Vaibhav
