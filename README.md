# Tasfia Tarannum — Portfolio

Personal portfolio website for **Tasfia Tarannum**, Junior Software Engineer. It presents projects, experience, skills, blog posts, and contact details in a dashboard-style layout, with CV viewing/updating and visitor info support.

## Purpose

This project showcases Tasfia’s professional profile in one place so visitors and recruiters can:

- Browse featured projects and case details
- Review work experience and skills
- Read blog posts
- View or download the CV
- Get in touch via contact / hire flows

Content is driven from JSON data under `public/data/` and served through Next.js API routes.

## Technologies

| Technology | Version |
|---|---|
| [Next.js](https://nextjs.org) | 15.3.8 |
| [React](https://react.dev) | 19.1.0 |
| [React DOM](https://react.dev) | 19.1.0 |
| [Tailwind CSS](https://tailwindcss.com) | 4.1.11 |
| [@tailwindcss/postcss](https://tailwindcss.com) | 4.1.11 |
| [Lucide React](https://lucide.dev) (icons) | 0.525.0 |
| [ESLint](https://eslint.org) | 9.39.4 |
| [eslint-config-next](https://nextjs.org) | 16.2.4 |
| Node.js (recommended) | 18+ (tested with 20.x) |
| npm | 10+ |

## How to run (new computer)

### Prerequisites

- [Node.js](https://nodejs.org/) **18 or later** (20.x recommended)
- npm (comes with Node.js)

### Steps

1. **Clone the repository**

```bash
git clone https://github.com/tarannumtasfia/portfolio-self.git
cd portfolio-self
```

2. **Install dependencies**

```bash
npm install
```

3. **Start the development server**

```bash
npm run dev
```

4. **Open the app**

Visit [http://localhost:3000](http://localhost:3000) in your browser.

### Other useful commands

| Command | Description |
|---|---|
| `npm run dev` | Start the local development server |
| `npm run build` | Create a production build |
| `npm start` | Run the production build (run `build` first) |
| `npm run lint` | Run ESLint |

## Project structure (overview)

- `src/app/` — App Router pages, layout, and components
- `src/app/api/` — API routes (dashboard, projects, skills, CV, etc.)
- `public/data/` — JSON content for the site
- `public/` — Static assets (images, CV, scripts)
