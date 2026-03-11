This `README.md` is designed to be the "source of truth" for your new project. It covers the workspace architecture, the pnpm workflow, and the modern tech stack you've built.

---

# 🚀 Modern PERN Stack Template (Vite + Express + Postgres)

Welcome to your high-performance, full-stack development environment! This project uses a **pnpm workspace** to manage a React frontend and a Node.js backend with shared speed and efficiency. ⚡️

## 🛠 The Tech Stack

| Layer | Technology | Description |
| --- | --- | --- |
| **Frontend** | ⚛️ **React + Vite** | Blazing fast dev server and modern UI builds. |
| **Backend** | 🟢 **Node.js + Express** | The industry-standard web framework for Node. |
| **Language** | 📘 **TypeScript** | Type-safe development across the entire stack. |
| **Database** | 🐘 **PostgreSQL** | Powerful relational database for structured data. |
| **Package Manager** | 📦 **pnpm** | Fast, disk-efficient package management with workspaces. |
| **Dev Tooling** | 🏎 **tsx** | Native ESM/TypeScript execution (replaces nodemon). |
| **Orchestration** | 📂 **Concurrently** | Runs both client and server in a single terminal window. |

---

## 📂 Project Structure

```text
my-toy-app/
├── packages/
│   ├── client/       # 💻 Vite + React + TS (Frontend)
│   └── server/       # ⚙️ Express + Node + TS (Backend)
├── .gitignore        # 🛡 Keeps your secrets safe
├── pnpm-workspace.yaml # 🔗 Links the apps together
└── package.json      # 🕹 Root scripts to run everything

```

---

## 🚦 Getting Started

### 1. Prerequisites

Make sure you have [pnpm](https://pnpm.io/installation) installed globally:

```bash
npm install -g pnpm

```

### 2. Installation

Install all dependencies for both the frontend and backend with a single command from the root:

```bash
pnpm install

```

### 3. Environment Setup

Copy the sample environment file and fill in your local details:

```bash
cp packages/server/.env.sample packages/server/.env

```

### 4. Run the Dev Server

Start your engines! This will launch the Vite frontend and the Express backend simultaneously:

```bash
pnpm dev

```

* **Frontend:** `http://localhost:5173`
* **Backend:** `http://localhost:5001` (Check the `/api/health` route!)

---

## 🔗 The Proxy Magic

This template uses a **Vite Proxy**. This means your React code can call:
`fetch('/api/health')`
...and Vite will automatically forward it to `http://localhost:5001/api/health`. No CORS headaches, no complicated URLs! 🪄

---

## 🧪 Testing

We use **Vitest** for a unified testing experience.

```bash
# Run server tests
pnpm test

```

---

## 🏗 Modern Patterns Used

* **3-Tier Architecture:** Organized by Routes, Controllers, and Services.
* **ESM Native:** Using `"type": "module"` for modern `import/export` syntax.
* **NodeNext Resolution:** Configured for the strictest, most modern TypeScript standards.
* **Clean Scripts:** Using `tsx watch` for instant backend hot-reloading.

---

## 🤝 Contributing

1. Create your feature branch (`git checkout -b feature/AmazingFeature`)
2. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
3. Push to the branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request

Happy coding! 👩‍💻👨‍💻

---

**Would you like me to add a "Troubleshooting" section specifically for that macOS AirPlay port 5000 conflict we encountered?**
