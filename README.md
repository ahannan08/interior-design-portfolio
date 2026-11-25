# Space Styling

Next.js site for **Space Styling**, an interior design studio in Hyderabad. Built from mocks in `../mock_htmls/`.

## Stack

- [Next.js](https://nextjs.org/) (App Router)
- [Tailwind CSS v4](https://tailwindcss.com/) with custom design tokens in `globals.css`
- Content driven by JSON in `src/data/`

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Mock data

| File | Contents |
|------|----------|
| `site.json` | Brand, SEO, contact, footer |
| `navigation.json` | Nav links and CTA |
| `hero.json` | Hero copy and buttons |
| `metrics.json` | Stat counters |
| `services.json` | Service tabs and images |
| `projects.json` | Home featured projects |
| `portfolio.json` | Full project gallery |
| `whyUs.json` | Value propositions |
| `contact.json` | Form copy |
| `about.json` | About page content |
| `testimonials.json` | Client quotes |

Edit these files to update copy without touching components.