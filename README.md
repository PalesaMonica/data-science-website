# Data Science Interest Group website

Plain HTML, CSS and JavaScript. There is no build step: the files in this folder are the website.

## Put it on GitHub Pages

1. Create a new public repository on GitHub, for example `dsig-website`.
2. Upload everything in this folder (including `.nojekyll`) to the repository, with `index.html` at the top level.
3. In the repository, go to Settings, then Pages. Under "Build and deployment", choose "Deploy from a branch", pick the `main` branch and the `/ (root)` folder, then save.
4. After a minute or two the site is live at `https://<your-username>.github.io/<repository-name>/`.

## Edit the content

| To change | Edit |
| --- | --- |
| Home page text, latest news banner, topics | `index.html` |
| Events (copy an `<article class="event">` block to add one) | `events.html` |
| Manual chapters and links | `resources.html` |
| Competition results and team rosters | `achievements.html` |
| Organisers, how to join, contact | `team.html` |
| Menu and footer (shared by every page) | `js/main.js` |
| Colours and fonts | top of `css/style.css` |
| Photos and logo | `assets/img/` |

HTML comments (`<!-- ... -->`) in each page mark the spots meant for regular updates.

## Clean addresses

Links between pages leave out `.html`, so visitors see `/events` rather than `/events.html`. This works once the site is hosted (Netlify, GitHub Pages). If you open the files directly from your computer by double-clicking, the menu links will not work; open each page file individually, or preview on the host instead.

## The notebook look

The site is styled as a Jupyter notebook. Each block of content is a "cell": a decorative line of Python (`cell-in`) followed by the real content (`cell-out`). To change wording, edit the text inside `<div class="output">`. The code lines are decoration only; change them if you like, but nothing depends on them. The header tabs (`home.ipynb`, `events.ipynb` and so on) are defined at the top of `js/main.js`.
