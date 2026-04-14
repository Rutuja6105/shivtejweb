# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Supabase production setup

This project supports Supabase/PostgreSQL when `DATABASE_URL` is set. To deploy with Supabase:

1. Create a Supabase project and database.
2. Copy the Supabase Postgres connection string.
3. Add it as `DATABASE_URL` in your local `.env` file or in Vercel environment variables.
4. Deploy to Vercel again.

Example Vercel env var:

- `DATABASE_URL=postgresql://username:password@host:5432/database`

The backend will automatically use Supabase in production when this variable is present.
