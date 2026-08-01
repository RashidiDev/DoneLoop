# Task Manager - Agent Reference

## Project Overview
- **Stack**: React 19 + TypeScript + Vite + Tailwind CSS v4 + shadcn/ui (Radix) + IndexedDB
- **Package Manager**: pnpm
- **Entry Point**: `src/main.tsx` → `App.tsx`

---

## Database Schema (IndexedDB)

### Database Configuration
- **Name**: `TaskManagerDB`
- **Version**: `1`
- **Object Store**: `tasks`

### Object Store: `tasks`
| Property | Value |
|----------|-------|
| `keyPath` | `id` |
| `autoIncrement` | `true` |
| `indexes` | None |

### Data Models

#### `Task` (stored record)
```typescript
interface Task {
  id: number;              // Auto-generated primary key
  name: string;            // Required
  description: string | undefined;
  completed: boolean;      // Default: false
  isImportant: boolean;    // Default: false
  createdAt: number;       // Unix timestamp (ms)
}
```

#### `newTask` (input for creation)
```typescript
type newTask = {
  name: string;
  description: string | undefined;
  completed?: boolean;     // Optional, defaults to false
  isImportant?: boolean;   // Optional, defaults to false
  createdAt: number;       // Required timestamp
};
```

### IndexedDB API (`src/db/indexedDB.ts` → `taskDB` object)
| Method | Signature | Description |
|--------|-----------|-------------|
| `init()` | `Promise<void>` | Opens/creates DB, creates store if needed |
| `addTask(task)` | `Promise<number>` | Inserts task, returns generated `id` |
| `getTasks()` | `Promise<Task[]>` | Returns all tasks |
| `getTaskById(id)` | `Promise<Task \| undefined>` | Single task lookup |
| `updateTask(task)` | `Promise<void>` | Upsert by `id` (put) |
| `deleteTask(id)` | `Promise<void>` | Deletes by primary key |

### React Context (`src/context/TaskDBContext.tsx`)
- **Provider**: `TaskDBProvider` wraps app in `main.tsx`
- **Hook**: `useTaskDB()` returns `TaskDBContextValue`
- **State**: `tasks`, `loading`, `error`, `isReady`
- **Auto-init**: Calls `taskDB.init()` + `refreshTasks()` on mount
- **Refresh**: After every mutation (`addTask`, `updateTask`, `deleteTask`)

---

## Component Architecture

### UI Components (shadcn/ui, `radix-vega` style)
```
src/components/
├── ui/                    # shadcn primitives
│   ├── button.tsx
│   ├── dialog.tsx
│   ├── input.tsx
│   ├── select.tsx
│   ├── label.tsx
│   ├── field.tsx
│   ├── separator.tsx
│   ├── tooltip.tsx
│   └── empty.tsx
├── header.tsx             # App header
├── tasks-container.tsx    # Main tasks view
├── tasks.tsx              # Task list wrapper
├── TasksCategory.tsx      # Category tabs (all/completed/uncompleted)
├── task.tsx               # Individual task item
├── addTaskDialog.tsx      # Create/edit task dialog
├── addTasksButton.tsx     # FAB for new task
└── emptyTasks.tsx         # Empty state
```

### Path Aliases (`components.json`)
| Alias | Path |
|-------|------|
| `@/components` | `src/components` |
| `@/components/ui` | `src/components/ui` |
| `@/lib` | `src/lib` |
| `@/lib/utils` | `src/lib/utils` |
| `@/hooks` | `src/hooks` |

---

## TypeScript Conventions
- **Strict mode**: Enabled (`tsconfig.json`)
- **Path aliases**: Configured in `tsconfig.app.json` + `components.json`
- **Types**: Centralized in `src/lib/types.ts`
- **React 19**: Uses new JSX transform, no `@types/react` import needed

---

## Commands

| Command | Action |
|---------|--------|
| `pnpm dev` | Start dev server (Vite HMR) |
| `pnpm build` | Type-check (`tsc -b`) + production build |
| `pnpm lint` | ESLint (flat config, `eslint.config.js`) |
| `pnpm preview` | Preview production build |

### Lint Config
- `eslint.config.js`: Flat config with `typescript-eslint`, `react-hooks`, `react-refresh`
- `prettier.config.js`: With `prettier-plugin-tailwindcss`

---

## Adding Features Workflow

### New shadcn Component
```bash
pnpm dlx shadcn@latest add <component>
```
- Updates `components.json` registry
- Creates files in `src/components/ui/`

### New Feature Component
1. Create in `src/components/` (not `ui/`)
2. Use `@/components/ui` for primitives
3. Use `useTaskDB()` for data access
4. Follow existing patterns (see `task.tsx`, `addTaskDialog.tsx`)

### Database Schema Changes
1. **Increment `DB_VERSION`** in `src/db/indexedDB.ts`
2. **Add `onupgradeneeded` logic** for migrations
3. **Update TypeScript types** in `src/lib/types.ts`
4. **Update context methods** if new operations needed

---

## Performance Notes
- `getTasks()` loads **all tasks** at once (`getAll()`)
- No pagination or virtualization currently
- Consider IndexedDB indexes for large datasets
- Context refreshes full list after each mutation

---

## Error Handling
- `TaskDBContext` exposes `error: Error | null` state
- All `taskDB` methods throw on failure (caught in context)
- Components should handle `loading` and `error` states