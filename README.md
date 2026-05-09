# Ahmad Droobi Portfolio

Modern React/Vite portfolio for Ahmad Droobi. The site presents professional experience, education, publications, awards, advising, projects, philosophy, gallery, and contact information while preserving the legacy deployed HTML routes through redirects and Vercel SPA rewrites.

## Stack

- React with functional components
- Vite production build
- React Router route-based pages
- Lucide icons
- Global CSS design system with reusable tokens
- Vercel-compatible routing

## Local Development

```bash
npm install
npm run dev
```

Open `http://127.0.0.1:5173`.

## Production Build

```bash
npm run build
npm run preview
```

## Deploy

The project is ready for Vercel. Push the repository and let Vercel run:

```bash
npm run build
```

The output directory is `dist`, and `vercel.json` rewrites all routes to `index.html` so direct visits to React routes work.
