import './App.css';
import { PostList } from './features/posts/PostList.component';
import { ConnectionStatus } from './components/ConnectionStatus.component';
import reactLogo from './assets/react.svg';

function App() {
  return (
    <div className="bg-base-200 min-h-screen" data-theme="cupcake">
      {/* 1. Navbar / Header area */}
      <header className="navbar bg-base-100 px-4 shadow-md lg:px-8">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl font-bold tracking-tight">
            Fullstack <span className="text-primary">Vite</span>
          </a>
        </div>
        <div className="flex-none">
          <button className="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-5 w-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
              ></path>
            </svg>
          </button>
        </div>
      </header>

      {/* 2. Main Page Container */}
      <main className="container mx-auto max-w-6xl px-4 py-12">
        {/* 3. Hero / Title Section */}
        <section className="mb-16 text-center">
          <div className="mb-4 flex items-center justify-center gap-4">
            <a href="https://react.dev" target="_blank" rel="noreferrer">
              <img
                src={reactLogo}
                className="h-12 w-12 animate-[spin_8s_linear_infinite] drop-shadow-[0_0_15px_rgba(97,218,251,0.5)]"
                alt="React logo"
              />
            </a>
            <h1 className="text-5xl font-extrabold tracking-tight">
              Vite Client <span className="text-secondary">Starter Page</span>
            </h1>
          </div>
          <p className="mx-auto max-w-2xl text-lg opacity-70">
            A template featuring local Postgres, Drizzle ORM, and a DaisyUI-powered React frontend.
          </p>
          <div className="divider mx-auto mt-8 w-24"></div>
        </section>

        {/* 4. The Content Area */}
        <section>
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Latest Posts</h2>
            <button className="btn btn-primary btn-sm md:btn-md">+ New Post</button>
          </div>

          <PostList />
        </section>
      </main>

      <footer className="footer footer-center bg-base-100 text-base-content border-base-200 mt-20 border-t p-10">
        <aside className="flex flex-col items-center gap-4">
          <ConnectionStatus />
          <p className="text-xs opacity-50">
            Fullstack Vite Starter &bull; {new Date().getFullYear()}
          </p>
        </aside>
      </footer>
    </div>
  );
}

export default App;
