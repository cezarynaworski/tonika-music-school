# Tonika Music School — static website

Pure HTML, CSS and JavaScript. No build step, no dependencies.

## Folder structure

```
tonika/
├── index.html      Home – hero, featured courses, testimonials, FAQ, contact preview
├── about.html      Story, mission & values, why choose us
├── courses.html    Instruments, 3 career paths (dark section), Little Tonika 0–5 (bright section), prices, FAQ
├── teachers.html   Teacher cards
├── gallery.html    Filterable photo gallery
├── contact.html    Contact details, Google Maps and trial-lesson booking link
├── css/style.css   All styles (design tokens at the top — change colours there)
├── js/main.js      Navigation, reveal animations, gallery filters and footer year
└── images/         Logo + photo placeholders (SVG) — replace with real photos
```

## Editing content

* All text lives directly in the HTML files. Major sections are marked with `<!-- ===== SECTION ===== -->` comments.
* **Contact details** appear in three places: the footer of every page, `index.html` (contact preview) and `contact.html`. Search for `[Street name]` and `+48 000 000 000`.
* **Prices** – fill in the `[price]` cells in `courses.html`.
* **Teachers** – edit or duplicate an `<article class="card teacher">` block in `teachers.html`.
* **Testimonials** – edit the `.testimonial` blocks in `index.html`.
* **FAQ** – each question is a `<details>` element; copy one to add another.

## Replacing images

Every image is an `<img src="images/…">` tag. Drop your photo into `images/` and either keep the same file name (changing `.svg` to `.jpg` in the tag) or update the `src`.

| File | Used on | Recommended size |
|---|---|---|
| `logo.svg` | header, footer, favicon | square, SVG or 200×200 px PNG |
| `hero.svg` | home hero | 800×1000 px (portrait) |
| `about.svg` | About page | 900×700 px |
| `kids.svg` | Courses – Little Tonika | 800×600 px |
| `course-1…6.svg` | course cards | 900×600 px |
| `teacher-1…6.svg` | teacher cards | 600×600 px (square) |
| `gallery-1…9.svg`, `gallery-wide.svg` | gallery | 800×600 px, wide 1600×600 px |

Compress photos (e.g. JPG quality 75–80, WebP) to keep the site fast. Always update the `alt` text.

## Google Maps

In `index.html` and `contact.html` find the `<iframe … maps …>` and replace the `q=` parameter with your exact address.

## Trial lesson booking

The contact page links to Google Forms. Replace `https://forms.gle/your-form-id` in `contact.html` with the share link for your published form.

## Colours

Defined once in `css/style.css` under `:root`: `#5575B8` blue, `#D2E3F6` light blue, `#BEACD4` lilac, `#7967AC` violet, `#EDF0F4` off-white; dark section uses `#171B33` navy and `#241C3D` plum.
