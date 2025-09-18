Nathan Cory — Portfolio

Retro-inspired developer portfolio featuring 8-bit Aseprite animations, Unity/Unreal work, and a clean one-page layout.

Live: (GitHub Pages) https://ncory44.github.io/<repo-name>/
Repo: https://github.com/ncory44/<repo-name>

Features

Hero section with background video + CRT scanline overlay and optional pixel-mascot spritesheet.

Sections: About, GitHub, Projects (Nuclear Control), Karateka Remaster study, Unreal systems, Dev Log, Contact.

Popup contact form with basic validation.

Smooth scroll / fade-in on About.

Pixel-perfect rendering for low-res art (image-rendering: pixelated).

Accessibility: respects prefers-reduced-motion.

Responsive (stacks rows on small screens).

Tech Stack

HTML5, CSS3 (Google Fonts: Black Han Sans, Syne, VT323), Vanilla JS

Aseprite (spritesheets, pixel art)

Optional capture/edit pipeline: OBS Studio → Premiere Pro

Deploy: GitHub Pages

Project Structure
root/
├─ index.html
├─ css/
│  └─ style.css
├─ JS/
│  └─ javascript.js
├─ images/
│  ├─ computing2.jpg
│  ├─ githublogo.png
│  ├─ mutusconcept.png
│  ├─ mainRoomSprite.png
│  ├─ karateka_thumb.png
│  ├─ unreal_offroad.png
│  ├─ sprites/
│  │  └─ robo_walk.png      # 12 frames, 48x48 each (horizontal strip)
│  └─ videos/
│     └─ coding.mp4         # hero background video
└─ README.md

Getting Started (Local)

Clone the repo:

git clone https://github.com/ncory44/<repo-name>.git
cd <repo-name>


Open index.html in a browser or run a tiny server:

# Python 3
python -m http.server 5500
# then visit http://localhost:5500

Deploy (GitHub Pages)

Push to GitHub.

Repo Settings → Pages → Source: Deploy from a branch, select main and / (root).

Your site will build at https://ncory44.github.io/<repo-name>/.

Content Editing
Add/Update Projects

Nuclear Control lives in the #Projects row (image left, text right).

Extra projects are cards in <section class="ProjectsGrid">. Duplicate a card:

<article class="ProjectCard">
  <img class="pixel" src="images/NEW_THUMB.png" alt="Project thumbnail" loading="lazy">
  <h3>Project Title</h3>
  <p class="stack"><em>Tech:</em> ...</p>
  <p>One-sentence outcome: what you built / why it matters.</p>
  <div class="links">
    <a href="https://github.com/ncory44/..." target="_blank" rel="noopener">Repo</a>
    <!-- <a href="https://..." target="_blank" rel="noopener">Demo</a> -->
  </div>
</article>

Pixel Art / Aseprite

Export spritesheets Nearest Neighbor at 400–800% scale for crisp edges.

Place in images/sprites/ and the site will render them with .pixel CSS.

Hero mascot expects: images/sprites/robo_walk.png (12 frames, 48×48, horizontal).

Videos (recommended over GIFs)

Export MP4 (H.264), 1080p or 720p.

Add to images/videos/ and embed with:

<video autoplay muted loop playsinline width="640" height="360">
  <source src="images/videos/your_demo.mp4" type="video/mp4">
</video>

Notable UI/Code Details

Palette tokens (see :root in css/style.css) unify colors.

Equal-height rows: .Row uses Flexbox; columns expand to the tallest sibling.

Contact popup: openForm/closeForm are exposed on window for navbar link use.

About fade-in: triggered on scroll once 75% into viewport.

Reduced-motion: disables animations for accessibility.

Known Pitfalls / Tips

Pixel art blurs if scaled non-integer. Keep scales at 200/400/800% and positions on whole pixels.

If you add new rows using .Row, keep the flex pattern from style.css.

Large images: add loading="lazy" and export thumbnails ≤ 640px wide when possible.

Roadmap

Add short MP4 demos for Karateka/Unreal cards.

Swap GIFs → MP4/WebM for smaller file sizes.

Add meta tags (title/description/social preview).

Optional: simple contact endpoint (Netlify Forms, Formspree) instead of dummy POST.