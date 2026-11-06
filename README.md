# Yashwanth Dhadi — Portfolio

Personal portfolio: Python Developer | AI/ML & Backend Development.

Built with React, TypeScript, Vite, Tailwind CSS v4, Motion and Lucide icons. There is no backend: it's a static site.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build
npm run lint
```

## Deployment (GitHub Pages)

Live site: **https://yashwanthdhadi.github.io/my-portfolio/**

Every push to `main` builds and publishes the site automatically (`.github/workflows/deploy.yml`). Progress shows in the repo's **Actions** tab.

To publish a change:
```bash
git add .
git commit -m "Describe the change"
git push
```

If you rename the repo or add a custom domain, update `VITE_SITE_URL` in `.env`. Asset paths are relative (`base: './'` in `vite.config.ts`), so nothing else needs changing.

## Updating content

All personal content lives in `src/data/`. You never need to edit components to change content.

| To change… | Edit |
|---|---|
| Name, headline, intro, About text, email, phone, links, "open to" line | `src/data/profile.ts` |
| Skills (add a line to a category, or add a category) | `src/data/skills.ts` |
| Projects (add, remove, reorder, add live links or screenshots) | `src/data/projects.ts` |
| Awards and certifications | `src/data/achievements.ts` |
| Internships / work experience | `src/data/experience.ts`. Adding one renames the section to "Experience & achievements" |
| Education | `src/data/education.ts` |
| Resume | Replace `public/documents/Yashwanth-Dhadi-Resume.pdf` (keep the same name) |
| Profile photo | Replace `source-assets/profile-photo.png`, then run `npm run images` |
| Site URL for SEO / link previews | `VITE_SITE_URL` in `.env` |
| Colours (light and dark themes) | `src/index.css`: `@theme` holds light values, `:root[data-theme='dark']` holds dark values |

TypeScript checks every data file, so a missing or misspelled field fails `npm run build` with a clear error.

### Adding a project

Copy an existing object in `src/data/projects.ts` and edit it. Notes:
- `slug` becomes the shareable link (`/#project/<slug>`).
- `flagship: true` puts the project in the full-width card. Use it on one project only.
- `team: 'Team project · …'` shows a team badge. Leave it out for solo work.
- `images: [{ src: 'images/projects/name.png', alt: '…' }]` adds screenshots. Put the files in `public/images/projects/`.
- Only add facts you can point to in the code.

## Structure

```
src/
  data/          all content (edit these)
  types/         TypeScript types for the data
  components/
    layout/      Navbar, Footer, Section wrapper
    sections/    Hero, About, Skills, Projects, Achievements, Education, Contact
    projects/    ProjectCard, ProjectModal, ProjectLinks, FlowSteps
    ui/          Button, Tag, Reveal (scroll animation), brand icons
  hooks/         active-section tracking, shareable project URLs
  assets/images/ optimised profile photo (generated)
public/          favicon, link-preview image, resume PDF
scripts/         image optimisation
source-assets/   original photo and resume
```
