## Simple blog starter

A tiny blog built with the Next.js App Router, MongoDB, and Tailwind CSS. The homepage lists the latest posts, `/posts/[slug]` renders a full article, and `/admin` exposes a lightweight panel for publishing new content straight from the browser.

### Features

- Server-rendered blog list and post detail pages
- MongoDB persistence with automatic slug creation and timestamps
- Minimal admin dashboard that accepts optional token protection
- Tailwind-powered styling with no extra component libraries

### Prerequisites

- Node.js 18.18+ / 20+
- A MongoDB deployment (local or Atlas)

### Environment variables

Create a `.env.local` file with:

```
MONGODB_URI="mongodb+srv://..."
# Optional: overrides the database inferred from the URI
# MONGODB_DB="simple-blog"
# Optional: require this token when submitting the admin form
# ADMIN_TOKEN="super-secret-string"
```

- `MONGODB_URI` (**required**) – connection string with write access
- `MONGODB_DB` (optional) – database name when you don't want to rely on the URI default
- `ADMIN_TOKEN` (optional) – when set, the admin form requires the same token value in order to publish

### Run the project

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) for the public blog and [http://localhost:3000/admin](http://localhost:3000/admin) for the publisher.

### Publishing posts

1. Open `/admin`
2. Fill out the title, optional summary, and content fields
3. Provide the admin token if the environment variable is set
4. Submit the form – the post is saved to MongoDB, appears on the homepage, and generates a permalink at `/posts/your-slug`

Posts are rendered as plain text paragraphs. If you need Markdown or rich text, extend the rendering logic inside `app/posts/[slug]/page.tsx`.

### Deploying

Deploy to any platform that supports Next.js (Vercel, Netlify, etc.). Remember to copy the same environment variables into your hosting provider before going live.
