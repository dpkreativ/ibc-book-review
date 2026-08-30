# The Iroko Circle

A curated collection of book reviews and discussion questions for African literature — spanning Nigeria, Kenya, Ghana, Uganda, Zimbabwe, and beyond. Each review includes a synopsis and an interactive carousel of discussion questions.

## Features

- **Book review pages** with synopsis, cover art, genre tags, and discussion questions
- **Interactive question carousel** with keyboard navigation and staggered text animations
- **Staggered heading animation** on load (GSAP)
- **Floating back button** that stays visible while scrolling
- **Search & filter** books by title or author
- **Responsive design** built with Tailwind CSS v4
- **Clean, readable typography** (Lato)

## Books Reviewed

| Title | Author |
|---|---|
| A Kind of Madness | Uche Okonkwo |
| Bitter Honey | Lolá Ákínmádé |
| Sweet Medicine | Panashe Chigumadzi |
| Sugar Daddy Chronicles: Lewa | Tomilola Coco Adeyemo |
| Tiny Things Are Heavier | Esther Ifesinachi Okonkwo |
| The Smart Money Woman | Arese Ugwu |
| Kill Me Quick | Meja Mwangi |
| The River and The Source | Margaret A Ogola |
| David Mogo, God Hunter | Suyi Davies Okungbowa |
| Hafsatu Bebi | Fatima Bala |
| Abyssinian Chronicles | Moses Isegawa |
| Murder at Cape Three Points | Kwei Quartey |
| My Life as a Chameleon | Diana Anyakwo |

## Tech Stack

- **HTML5** — semantic markup with SEO/OG/Twitter metadata
- **Tailwind CSS v4** — utility-first styling (loaded via CDN)
- **GSAP** — heading text animation
- **Vanilla JavaScript** — carousel navigation, search filtering
- **Google Fonts** — Lato

## Getting Started

No build step required. Open any HTML file in a browser or serve the directory with any static file server:

```bash
npx serve .
```

## Project Structure

```
.
├── index.html                     # Homepage with book grid
├── styles.css                     # Custom animations & carousel styles
├── script.js                      # JS for carousel & search
├── tibc_logo.png
├── tribal_art.png
└── <book-slug>/
    ├── index.html                 # Individual review page
    └── book_photo.jpg             # Book cover image
```

## License

MIT
