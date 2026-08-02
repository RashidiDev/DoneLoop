# DoneLoop - Offline-First Task Manager

A simple, privacy-focused task manager that works completely offline. Built with React 19, TypeScript, Vite, Tailwind CSS v4, and IndexedDB.

## Features

- **Offline-first**: All data stored locally in IndexedDB - works without internet
- **Task management**: Create, update, delete, mark complete/important
- **Categories**: View all, completed, or uncompleted tasks
- **PWA ready**: Installable as a native app on mobile/desktop
- **No backend**: Zero server dependency, your data stays on your device
- **Service Worker**: Caches app shell for offline loading

## Tech Stack

| Layer     | Technology                          |
| --------- | ----------------------------------- |
| Framework | React 19 + TypeScript               |
| Build     | Vite 8                              |
| Styling   | Tailwind CSS v4 + shadcn/ui (Radix) |
| Database  | IndexedDB (via custom wrapper)      |
| PWA       | Service Worker (Workbox-style)      |

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 9+

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

Opens at `http://localhost:5173`

### Build

```bash
pnpm build
```

Outputs to `dist/` - ready for static hosting (Vercel, Netlify, etc.)

### Preview Production Build

```bash
pnpm preview
```

### Lint

```bash
pnpm lint
```

## Database Schema

**IndexedDB: `TaskManagerDB` (v1)**

| Store   | Key Path             | Fields                                                               |
| ------- | -------------------- | -------------------------------------------------------------------- |
| `tasks` | `id` (autoIncrement) | `id`, `name`, `description`, `completed`, `isImportant`, `createdAt` |

All operations are synchronous with UI via React context - no queue, no sync needed.

## PWA / Service Worker

The app registers a Service Worker (`public/sw.js`) that:

- Caches app shell (HTML, CSS, JS, icons, manifest)
- Serves cached assets offline
- Handles app updates via `controllerchange` → auto-reload

Manifest at `public/manifest.json` enables "Add to Home Screen".

## Offline Behavior

| Action      | Offline Behavior                   |
| ----------- | ---------------------------------- |
| Create task | Written directly to IndexedDB      |
| Update task | Written directly to IndexedDB      |
| Delete task | Written directly to IndexedDB      |
| Reload app  | Loads from IndexedDB               |
| Go online   | No sync needed - already persisted |

## Deployment

### Vercel (Recommended)

```bash
# Connect repo to Vercel - auto-detects Vite
# Build command: pnpm run build
# Output directory: dist
```

### Static Hosting (Netlify, Cloudflare Pages, GitHub Pages)

```bash
pnpm run build
# Deploy dist/ folder
```

## License

MIT
